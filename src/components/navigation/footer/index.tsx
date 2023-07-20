import { Lato } from "next/font/google"
import PageButtons from "../page-buttons"

const lato = Lato({ subsets: ['latin'], weight: '400' })

export default function Footer() {
    return (
        <footer className={`${lato.className} flex justify-center w-full py-3 mt-auto bg-white text-black `}>
            <div className="max-w-7xl grow flex px-12">
                <div className="h-16 flex">
                    <PageButtons />
                </div>
                <div className="h-16 flex ml-auto">
                    <span className="self-center">Scarf  2023. Todos os direitos reservados</span>
                </div>
            </div>
        </footer>
    )
}
