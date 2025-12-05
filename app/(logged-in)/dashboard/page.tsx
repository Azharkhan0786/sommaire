import { Button } from "@/components/ui/button";
import Link from "next/link";
import {Plus} from 'lucide-react'

export default function DashboardPage() {
  return(
    <main className="min-h-screen">
        <div className="container mx-auto flex flex-col gap-4">
            <h1>Your Summaries</h1>
            <p>transform your PDFs into concise,actionable insights</p>
            <div>
                <Button variant={'link'} className="bg-rose-500">
                    <Link href="upload" className="flex items-center text-white">
                    <Plus  className="w-5 h-5 mr-2"/>
                    New Summary</Link>
                </Button>
            </div>
        </div>

    </main>
  ) 
  
}