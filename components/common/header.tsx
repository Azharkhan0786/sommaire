import Link from "next/link"
import { FileText } from "lucide-react"

export default function Header() {
    return (
        <nav className="container flex items-center justify-between py-4 px-2 mx-auto lg:px-8" >
        <div className="flex">
            <Link href="/" className="flex items-center gap-1  shrink-0 lg:gap:2">
            <FileText className="h-5 w-5 lg:w-8 lg:h-8 text-gray-900 hover:rotate-12 transition-transform duration-200 ease-in-out" />
            
            
            Sommaire</Link></div>



        <div><Link href="/pricing">Pricing</Link></div>
        <div><Link href="/sign-in">Sign In</Link></div>

    </nav>
)
}