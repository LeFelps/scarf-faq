import { StaticImageData } from "next/image"
import { Poppins } from "next/font/google"
import Navbar from "../navigation/navbar"

const poppins = Poppins({ subsets: ['latin'], weight: '700' })

export default function Banner({ image, title }: { image: StaticImageData, title: string }) {
    return (
        <div style={{
            backgroundImage: `url(${image.src})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundColor: 'grey',
            backgroundBlendMode: 'multiply',
            width: '100%',
            height: '420px',
            color: "white",
        }} className="flex flex-col relative">
            <Navbar transparent/>
            <h1 className={`${poppins.className} text-7xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}>{title}</h1>
        </div>
    )
}
