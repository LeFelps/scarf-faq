"use client";

import { Question } from "@/types/question";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function QuestionListing() {

    const [questions, setQuestions] = useState<Question[]>([])

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/faq`)
            .then(resp => {
                setQuestions(resp.data || [])
            })
    }, [])

    function renderQuestion(question: Question, indexString: string) {
        return (
            <div className="rounded-lg shadow-sm p-8 mt-4 border border-l-4" style={{ borderColor: "#584D66" }}>
                <div className="mb-4 flex flex-row">
                    <span className="text-2xl text-bold">{indexString + " - " + question.title}</span>
                    <div className="ml-auto">
                        <Link href={`/question/${question.id}`} className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded ml-4"
                            type="submit">
                            Editar
                        </Link>
                        <button className="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-4"
                            type="submit">
                            Excluir
                        </button>
                    </div>
                </div>
                <span className="text-xl">{question.description}</span>
                {question.children ?
                    <div>
                        {question.children.map((child, index) =>
                            <div key={child.id}>
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
        </div>
    )
}