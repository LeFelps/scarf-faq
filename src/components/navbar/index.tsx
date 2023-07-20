import { Lato } from "next/font/google"
import Logo from "../../../public/Scarf-Horizontal-Logo-White-Small.png"
import Image from "next/image"

const lato = Lato({ subsets: ['latin'], weight: '400' })

export default function Navbar({ transparent }: { transparent?: boolean }) {
    return (
        <div className={`${lato.className} flex justify-center w-full py-4 text-white ${transparent ? '' : ' bg-purple-600 '}`}>
            <div className="max-w-7xl grow flex px-7">
                <a href="/" className="flex">
                    <Image className="self-center" src={Logo.src} alt="Scarf logo" width={120} height={45} />
                </a>
                <div className="ml-auto h-16 flex">
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
            </div>
        </div>
    )
}
