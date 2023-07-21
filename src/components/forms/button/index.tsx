import Spinner from "@/components/spinner";
import { MouseEventHandler } from "react";

export default function Button({ className, label, type, outlined, variant, disabled, loading, onClick }: {
    className?: string | undefined,
    label: string,
    type?: "button" | "submit" | "reset" | undefined,
    outlined?: boolean,
    variant: "red" | "purple",
    disabled?: boolean,
    loading?: boolean,
    onClick?: MouseEventHandler<HTMLButtonElement> | undefined
}) {

    const variants = {
        red: outlined ?
            "border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
            : "bg-red-500 hover:bg-red-700 text-white",
        purple: outlined ?
            "border border-purple-500 text-purple-500 hover:bg-purple-700 hover:border-purple-700 hover:text-white"
            : "bg-purple-500 hover:bg-purple-700 text-white"
    }

    return (
        <button
            type={type}
            className={`inline-flex justify-center rounded-md px-4 py-2 font-medium focus-visible:ring-offset-2 ${variants[variant]} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {loading ? <span className="mr-3"><Spinner /></span> : null}
            {label}
        </button>
    )
}