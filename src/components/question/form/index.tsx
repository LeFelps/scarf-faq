"use client";

import { NewQuestion, Question } from "@/types/question";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function QuestionForm({ id }: { id?: string }) {

    const [loadingQuestions, setLoadingQuestions] = useState<boolean>(false)
    const [loadingQuestionData, setLoadingQuestionData] = useState<boolean>(false)
    const [questions, setQuestions] = useState<Question[]>([])
    const [questionData, setQuestionData] = useState<NewQuestion>({
        title: "",
        description: ''
    })

    useEffect(() => {
        if (id !== null) axios.get(`${process.env.NEXT_PUBLIC_API_URL}/faq/${id}`)
            .then(resp => {
                setQuestionData(resp.data || [])
            });

        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/faq?flattened=true`)
            .then(resp => {
                setQuestions(resp.data || [])
            })
    }, [])

    return (
        <form className="w-full" onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()

            const type = id != null ? 'put' : 'post'

            setLoadingQuestionData(true)
            axios[type](`${process.env.NEXT_PUBLIC_API_URL}/faq`, questionData)
                .then((resp) => {

                })
                .catch((err) => {
                    console.error(err)
                })
                .finally(() => {
                    setLoadingQuestionData(false)
                })
            //TODO add error and response handling

        }}>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3 mb-6">
                    {/* TODO - Componentizar inputs de formulario */}
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="title-input">
                        Título
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="title-input" type="text" placeholder="Titulo" required
                        value={questionData?.title}
                        disabled={loadingQuestionData}
                        onChange={(e) => {
                            setQuestionData({
                                ...questionData,
                                title: e.target.value
                            })
                        }} />
                </div>
                <div className="w-full px-3 mb-6">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="description-input">
                        Descrição
                    </label>
                    <textarea className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="description-input" placeholder="Descricao" required
                        value={questionData?.description}
                        disabled={loadingQuestionData}
                        onChange={(e) => {
                            setQuestionData({
                                ...questionData,
                                description: e.target.value
                            })
                        }} />
                </div>
                <div className="w-full px-3 mb-6">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="parent-input">
                        
                        Seção Pai
                    </label>
                    <div className="relative">
                        <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="parent-input"
                            value={questionData?.parent}
                            disabled={loadingQuestionData || loadingQuestions}
                            onChange={(e) => {
                                setQuestionData({
                                    ...questionData,
                                    parent: e.target.value
                                })
                            }} >
                            <option value="">Selecione uma opção</option>
                            {questions.map(question => (
                                <option key={question.id} value={question.id}>{question.title}</option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>
                </div>
                <div className="w-full px-3 mb-6 flex justify-end">
                    <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                        type="submit">
                        Salvar
                    </button>
                </div>
            </div>
        </form>
    )
}