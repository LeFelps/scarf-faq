import { ChangeEventHandler } from "react"

export default function TextArea({ label, value, required, disabled, onChange }: { label: string, value: string, required?: boolean, disabled?: boolean, onChange: ChangeEventHandler<HTMLTextAreaElement> | undefined }) {
    return (
        <>
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="description-input">
                {label}
            </label>
            <textarea className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="description-input" placeholder="Descricao" required={required}
                value={value}
                disabled={disabled}
                onChange={onChange} />
        </>
    )
}