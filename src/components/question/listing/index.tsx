"use client";

import Button from "@/components/forms/button";
import { Question } from "@/types/question";
import { Dialog, Transition } from '@headlessui/react'
import axios from "axios";
import { Fragment, useCallback, useEffect, useState } from "react";
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

export default function QuestionListing() {

    const router = useRouter()

    const [questions, setQuestions] = useState<Question[]>([])
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
    const [selectedQuestion, setSelectedQuestion] = useState<Question | null>()
    const [deleting, setDeleting] = useState<boolean>(false)

    const getQuestions = useCallback(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/faq`)
            .then(resp => {
                setQuestions(resp.data || [])
            })
    }, [])

    useEffect(() => {
        getQuestions()
    }, [getQuestions])

    function closeDeleteQuestionModal() {
        setSelectedQuestion(null)
        setShowDeleteModal(false)
    }

    function deleteQuestion(id: string) {

        setDeleting(true)
        axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/faq/${id}`)
            .then((resp) => {
                toast.success('Pergunta excluida com sucesso!')
                getQuestions()
            })
            .catch((err) => {
                console.error(err)
                toast.error('Ocorreu um erro ao excluir a pergunta.')
            })
            .finally(() => {
                setDeleting(false)
                closeDeleteQuestionModal()
            })
    }

    function renderQuestion(question: Question, indexString: string) {
        return (
            <div className="rounded-lg shadow-sm p-8 mt-4 border border-l-4" style={{ borderColor: "#584D66" }}>
                <div className="mb-4 flex flex-row">
                    <span className="text-2xl text-bold">{indexString + " - " + question.title}</span>
                    <div className="ml-auto">
                        <Button type="submit" label="Editar"
                            variant="purple"
                            onClick={() => {
                                router.push(`/question/${question._id}`)
                            }}
                        />
                        <Button type="submit" label="Excluir" className="ml-2"
                            variant="red"
                            onClick={() => {
                                setSelectedQuestion(question)
                                setShowDeleteModal(true)
                            }}
                        />
                    </div>
                </div>
                <span className="text-xl">{question.description}</span>
                {question.children ?
                    <div>
                        {question.children.map((child, index) =>
                            <div key={child._id}>
                                {renderQuestion(child, indexString + "." + (index + 1))}
                            </div>
                        )}
                    </div>
                    : null}
            </div>
        )
    }

    return (
        <div>

            {questions.length > 0 ?
                questions.map((question, index) => (
                    renderQuestion(question, (index + 1).toString())
                )) : <div className="flex justify-center">
                    <span className="text-stone-500 font-black text-3xl">Ops! parece que nao existe nenhuma pergunta cadastrada!</span>
                </div>}

            <Transition appear show={showDeleteModal} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => closeDeleteQuestionModal()}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg leading-6 font-bold text-gray-900"
                                    >
                                        Excluir pergunta
                                    </Dialog.Title>
                                    <Dialog.Description className="mt-3">
                                        Deseja excluir a pergunta selecionada?
                                    </Dialog.Description>
                                    <Dialog.Description>
                                        Titulo: <span className="font-bold">{selectedQuestion?.title}</span>
                                    </Dialog.Description>
                                    <div className="mt-4">
                                        {selectedQuestion?.children?.length && selectedQuestion?.children?.length > 0 ?
                                            <>
                                                <span className="text-red-500 font-bold">Atenção</span>
                                                <p>
                                                    A pergunta tem dependencias e por isso <b>não pode ser excluida</b>.
                                                </p>
                                            </>
                                            :
                                            <div className="flex justify-end">
                                                <Button label="Excluir"
                                                    loading={deleting} disabled={deleting}
                                                    outlined variant="red"
                                                    onClick={() => {
                                                        if (selectedQuestion?._id) deleteQuestion(selectedQuestion._id);
                                                        else {
                                                            toast.error('Ops, algo deu errado!')
                                                            setShowDeleteModal(false)
                                                        }
                                                    }}
                                                />
                                            </div>
                                        }
                                    </div>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}