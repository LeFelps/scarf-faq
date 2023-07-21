import { ChangeEventHandler } from "react";

export default function TextInput({ label, value, required, disabled, onChange }: { label: string, value: string, required?: boolean, disabled?: boolean, onChange: ChangeEventHandler<HTMLInputElement> | undefined }) {
    return (
        <>
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="title-input">
                {label}
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="title-input" type="text" placeholder="Titulo" required={required}
                value={value}
                disabled={disabled}
                onChange={onChange} />
        </>
    )
}