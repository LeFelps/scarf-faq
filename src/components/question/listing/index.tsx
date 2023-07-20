"use client";

import Spinner from "@/components/spinner";
import { Question } from "@/types/question";
import { Dialog, Transition } from '@headlessui/react'
import axios from "axios";
import Link from "next/link";
import { Fragment, useCallback, useEffect, useState } from "react";
import { toast } from 'react-toastify'

export default function QuestionListing() {

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
                        <Link href={`/question/${question._id}`} className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded ml-4"
                            type="submit">
                            Editar
                        </Link>
                        <button className="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-4"
                            type="submit"
                            onClick={() => {
                                setSelectedQuestion(question)
                                setShowDeleteModal(true)
                            }}>
                            Excluir
                        </button>
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

            {questions.map((question, index) => (
                renderQuestion(question, (index + 1).toString())
            ))}

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
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium border-red-500 text-red-500 hover:bg-red-500 hover:text-white focus-visible:ring-offset-2"
                                                    onClick={() => {
                                                        if (selectedQuestion?._id) deleteQuestion(selectedQuestion._id);
                                                        else {
                                                            toast.error('Ops, algo deu errado!')
                                                            setShowDeleteModal(false)
                                                        }
                                                    }}
                                                    disabled={deleting}
                                                >
                                                    {deleting ? <span className="mr-3"><Spinner /></span> : null}
                                                    Excluir
                                                </button>
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