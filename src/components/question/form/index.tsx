"use client";

import Spinner from "@/components/spinner";
import { NewQuestion, Question } from "@/types/question";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify'

import { useRouter } from "next/navigation";
import TextArea from "@/components/forms/input/textarea";
import TextInput from "@/components/forms/input/text";
import Select from "@/components/forms/input/select";
import Button from "@/components/forms/button";

export default function QuestionForm({ id }: { id?: string }) {

    const [loadingQuestions, setLoadingQuestions] = useState<boolean>(false)
    const [loadingQuestionData, setLoadingQuestionData] = useState<boolean>(false)
    const [saving, setSaving] = useState<boolean>(false)
    const [questions, setQuestions] = useState<Question[]>([])
    const [questionData, setQuestionData] = useState<NewQuestion>({
        title: "",
        description: ''
    })

    const router = useRouter()

    useEffect(() => {
        if (id != null) {
            setLoadingQuestionData(true)
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}/faq/${id}`)
                .then(resp => {
                    setQuestionData(resp.data || [])
                })
                .catch((err) => {
                    toast.error('Ocorreu um erro ao buscar dados da pergunta')
                })
                .finally(() => {
                    setLoadingQuestionData(false)
                });
        }
        setLoadingQuestions(true)
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/faq?flattened=true`)
            .then(resp => {
                setQuestions(resp.data || [])
            })
            .catch((err) => {
                toast.error('Ocorreu um erro ao buscar lista de perguntas')
            })
            .finally(() => {
                setLoadingQuestions(false)
            });
    }, [])

    return (
        <form className="w-full" onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()

            const type = id != null ? 'patch' : 'post'

            setSaving(true)
            axios[type](`${process.env.NEXT_PUBLIC_API_URL}/faq`, questionData)
                .then((resp) => {
                    const newId = resp.data?._id
                    console.log(resp.data)
                    setQuestionData(resp.data)
                    toast.success('Pergunta criada com sucesso!')
                    if (id == null) router.replace(`/question/${newId}`);
                })
                .catch((err) => {
                    console.error(err)
                    toast.error('Ocorreu um erro ao salvar a pergunta')
                })
                .finally(() => {
                    setSaving(false)
                })
        }}>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3 mb-6">
                    <TextInput
                        label="Título"
                        disabled={loadingQuestionData} required
                        value={questionData?.title}
                        onChange={(e) => {
                            setQuestionData({
                                ...questionData,
                                title: e.target.value
                            })
                        }}
                    />
                </div>
                <div className="w-full px-3 mb-6">
                    <TextArea
                        label="Descrição"
                        disabled={loadingQuestionData} required
                        value={questionData?.description}
                        onChange={(e) => {
                            setQuestionData({
                                ...questionData,
                                description: e.target.value
                            })
                        }}
                    />
                </div>
                <div className="w-full px-3 mb-6">
                    <Select
                        label="Seção Pai"
                        disabled={loadingQuestionData || loadingQuestions}
                        value={questionData?.parent || ""}
                        onChange={(e) => {
                            setQuestionData({
                                ...questionData,
                                parent: e.target.value
                            })
                        }}
                    >
                        <option value="">Selecione uma opção</option>
                        {questions.map(question => (
                            <option key={question._id} value={question._id}>{question.title}</option>
                        ))}
                    </Select>
                </div>
                <div className="w-full px-3 mb-6 flex justify-end">
                    <Button type="submit" label="Salvar" className="ml-2"
                        loading={saving} disabled={saving}
                        variant="purple"
                    />
                </div>
            </div>
        </form>
    )
}