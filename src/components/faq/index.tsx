"use client";
import { useEffect, useState } from "react"
import Accordion from "../layout/accordion";
import axios from "axios";
import { Question } from "@/types/question";

export default function Faq() {

    const [questions, setQuestions] = useState<Question[]>([])

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/faq`).then(resp => {
            setQuestions(resp.data)
        })
    }, [])

    function renderQuestion(question: Question, mainSection: boolean, indexString: string) {
        return (
            <Accordion title={indexString + " - " + question.title} bottomLine={mainSection}>
                <span className="text-xl ml-2">{question.description}</span>
                {question.children ?
                    <>
                        {question.children.map((child, index) =>
                            <div key={child._id} className="pl-5 border-l mt-5" style={{ borderColor: "#584D66" }}>
                                {renderQuestion(child, false, indexString + "." + (index + 1))}
                            </div>
                        )}
                    </>
                    : null}
            </Accordion>
        )
    }

    return (
        <>
            {questions.map((question, index) => (
                renderQuestion(question, true, (index + 1).toString())
            ))}
        </>
    )
}