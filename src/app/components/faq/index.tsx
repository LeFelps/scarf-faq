"use client";
import { useState } from "react"
import Accordion from "../layout/accordion";

const mockData = [
    {
        id: "5d60baf2-4539-5563-9db1-2e5822e3230e",
        title: "Lorem ipsum dolor sit amet consectetur?",
        description: "Lorem ipsum dolor sit amet consectetur. Et ipsum amet cras ac. Vestibulum eu felis massa nibh iaculis. Neque sit mattis in vulputate auctor at accumsan nisl. Donec purus fusce duis enim tortor cursus egestas vitae.",
    },
    {
        id: "5d60baf2-4539-5563-9db1-2e5822e3230e",
        title: "Lorem ipsum dolor sit amet consectetur?",
        description: "Lorem ipsum dolor sit amet consectetur. Et ipsum amet cras ac. Vestibulum eu felis massa nibh iaculis. Neque sit mattis in vulputate auctor at accumsan nisl. Donec purus fusce duis enim tortor cursus egestas vitae.",
        children: [
            {
                id: "e32d746d-4009-5df4-8189-ab1d750929a4",
                title: "Lorem ipsum dolor sit amet consectetur?",
                description: "Lorem ipsum dolor sit amet consectetur. Et ipsum amet cras ac. Vestibulum eu felis massa nibh iaculis. Neque sit mattis in vulputate auctor at accumsan nisl. Donec purus fusce duis enim tortor cursus egestas vitae.",
                children: [
                    {
                        id: "7f30ece2-717a-55ee-8cc1-df67e4749002",
                        title: "Lorem ipsum dolor sit amet consectetur?",
                        description: "Lorem ipsum dolor sit amet consectetur. Et ipsum amet cras ac. Vestibulum eu felis massa nibh iaculis. Neque sit mattis in vulputate auctor at accumsan nisl. Donec purus fusce duis enim tortor cursus egestas vitae.",
                    },
                    {
                        id: "b280bcf7-4d3d-572e-a723-aaaa737d8f08",
                        title: "Lorem ipsum dolor sit amet consectetur?",
                        description: "Lorem ipsum dolor sit amet consectetur. Et ipsum amet cras ac. Vestibulum eu felis massa nibh iaculis. Neque sit mattis in vulputate auctor at accumsan nisl. Donec purus fusce duis enim tortor cursus egestas vitae.",
                    }
                ]
            },
            {
                id: "76b878cf-51df-512c-9202-ad7c711bd97b",
                title: "Lorem ipsum dolor sit amet consectetur?",
                description: "Lorem ipsum dolor sit amet consectetur. Et ipsum amet cras ac. Vestibulum eu felis massa nibh iaculis. Neque sit mattis in vulputate auctor at accumsan nisl. Donec purus fusce duis enim tortor cursus egestas vitae.",
            }
        ]
    },
    {
        id: "85ba0172-7954-5413-ba7d-b53b49e07c82",
        title: "Lorem ipsum dolor sit amet consectetur?",
        description: "Lorem ipsum dolor sit amet consectetur. Et ipsum amet cras ac. Vestibulum eu felis massa nibh iaculis. Neque sit mattis in vulputate auctor at accumsan nisl. Donec purus fusce duis enim tortor cursus egestas vitae.",
        children: [
            {
                id: "6600a4ad-5197-5dec-8d45-078add29af23",
                title: "Lorem ipsum dolor sit amet consectetur?",
                description: "Lorem ipsum dolor sit amet consectetur. Et ipsum amet cras ac. Vestibulum eu felis massa nibh iaculis. Neque sit mattis in vulputate auctor at accumsan nisl. Donec purus fusce duis enim tortor cursus egestas vitae.",
            }
        ]
    }
]

interface Question {
    id: string
    title: string
    description: string
    children?: Question[]
}

export default function Faq() {

    const [questions, setQuestions] = useState<Question[]>(mockData)

    function renderQuestion(question: Question, mainSection: boolean, indexString: string) {
        return (
            <Accordion title={indexString + " - " + question.title} bottomLine={mainSection}>
                <span className="text-xl">{question.description}</span>
                {question.children ?
                    <>
                        {question.children.map((child, index) =>
                            <div key={child.id} className="pl-7 border-l mt-5" style={{ borderColor: "#584D66" }}>
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