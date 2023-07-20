import Link from "next/link";

export default function PageButtons() {
    return (
        <>
            <Link href="/" className="px-3 flex">
                <span className="self-center">Perguntas frequentes</span>
            </Link>
            <Link href="https://www.scarf.gg/quem-somos/" className="px-3 flex">
                <span className="self-center">Quem somos</span>
            </Link>
            <Link href="https://www.scarf.gg/contato/" className="px-3 flex">
                <span className="self-center">Contato</span>
            </Link>
        </>
    )
}