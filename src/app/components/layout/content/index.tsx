import { ReactNode } from "react";

export default function PageContent({ children }: { children: ReactNode }) {
    return (
        <div className="w-full max-w-5xl py-24">
            {children}
        </div>
    )
};