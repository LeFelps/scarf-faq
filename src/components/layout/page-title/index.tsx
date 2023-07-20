'use client'

import { useRouter } from 'next/navigation'

export default function PageTitle({ title, returnButton }: { title: string, returnButton?: boolean }) {

    const router = useRouter()

    return (
        <h1 className="text-4xl font-bold mb-12">
            {returnButton ?
                <button onClick={() => {
                    router.back()
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" className="w-6 h-6 mr-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                </button>
                : null}
            {title}
        </h1>
    )
};