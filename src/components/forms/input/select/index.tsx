import { ChangeEventHandler } from "react"

export default function Select({ label, value, required, disabled, onChange, children }: { label: string, value: string, required?: boolean, disabled?: boolean, onChange: ChangeEventHandler<HTMLSelectElement> | undefined, children: React.ReactNode }) {
    return (
        <>
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="parent-input">
                {label}
            </label>
            <div className="relative">
                <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="parent-input"
                    value={value}
                    disabled={disabled} required={required}
                    onChange={onChange}
                >
                    {children}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
            </div>
        </>
    )
}