import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

export default function Page() {
    return <section className="min-h-screen">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
            <div className="flex flex-col items-center justify-center gap-6 text-center">
                <div className="relative  p-[1px]rounded-full bg-linear-to-r overflow-hidden from-rose-200 via-red-500 to-rose-800 animate-gradient-x group">
                <Badge variant={'secondary'} className="relative px-6 py-2 text-rose-500 font-medium bg-white rounded-full group-hover:bg-gray-50 transition-colors " >
                    <Sparkles/>
                    <span>AI-powered Content Creation</span>
                </Badge>
                </div>
                <div className="capitalize text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Start Uploading Your PDF's
                <p>Upload your PDF and let our AI do the magic</p>
                </div>
            </div>
        </div>
    </section>
}