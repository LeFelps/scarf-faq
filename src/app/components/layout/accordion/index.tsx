"use client";
import { ReactNode, useState } from "react"

export default function Accordion({ title, bottomLine, children, ...props }: { title: string, bottomLine?: boolean, children: ReactNode }) {

    const [open, setOpen] = useState<boolean>(false)

    return (
        <div style={{ borderColor: "#584D66" }} className={`flex flex-col w-full py-6 px-4 ${bottomLine ? ' border-b ' : null}`} {...props}>
            <div className="flex flex-row flex-grow">
                <span className="font-bold text-xl mb-4 flex-grow">{title}</span>
                <button style={{
                    transform: `rotate(${open ? '45deg' : '0'})`
                }} type="button" className="text-3xl font-bold"
                    onClick={() => setOpen(!open)}
                >+</button>
            </div>
            {open ?
                <div>
                    {children}
                </div>
                : null}
        </div>
    )
}