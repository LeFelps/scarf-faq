"use client";
import { ReactNode, useState } from "react"

export default function Accordion({ title, bottomLine, children, ...props }: { title: string, bottomLine?: boolean, children: ReactNode }) {

    const [open, setOpen] = useState<boolean>(false)

    return (
        <div style={{ borderColor: "#584D66" }} className={`flex flex-col w-full ${bottomLine ? ' border-b py-4 ' : 'pt-4'}`} {...props}>
            <button className="flex flex-row flex-grow px-4" type="button" onClick={() => setOpen(!open)}>
                <span className="font-bold text-xl text-left flex-grow">{title}</span>
                <div style={{
                    transform: `rotate(${open ? '45deg' : '0'})`
                }} className="text-3xl font-bold"><span className="select-none">+</span>
                </div>
            </button>
            <div hidden={!open} className="mt-4">
                {children}
            </div>
        </div>
    )
}