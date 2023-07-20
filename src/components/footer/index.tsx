import { Lato } from "next/font/google"

const lato = Lato({ subsets: ['latin'], weight: '400' })

export default function Footer() {
    return (
        <footer className={`${lato.className} flex justify-center w-full py-3 mt-auto bg-white text-black `}>
            <div className="max-w-7xl grow flex px-12">
                <div className="h-16 flex">
                    <a href="/" className="px-3 flex">
                        <span className="self-center">Perguntas frequentes</span>
                    </a>
                    <a href="https://www.scarf.gg/quem-somos/" className="px-3 flex">
                        <span className="self-center">Quem somos</span>
                    </a>
                    <a href="https://www.scarf.gg/contato/" className="px-3 flex">
                        <span className="self-center">Contato</span>
                    </a>
                </div>
                <div className="h-16 flex ml-auto">
                    <span className="self-center">Scarf  2023. Todos os direitos reservados</span>                    
                </div>
            </div>
        </footer>
    )
}
