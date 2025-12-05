import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function DashboardPage() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto flex flex-col gap-4">
        <div className=" px-12 py-12 sm:py-24">
         <div className="flex justify-between gap-4 mb-8"> 
            <div className="flex flex-col gap-4">
                <h1>Your Summaries</h1>
             <p>Transform your PDFs into concise,actionable insights</p>
            </div>
          <Button
            variant={"link"}
            className="bg-linear-to-r from-rose-500 to bg-rose-700 hover:from-rose-600  hover:to-rose800 hover:scale-105 transition-all duration-300 group hover:no-underline">
            <Link href="upload" className="flex items-center text-white">
              <Plus className="w-5 h-5 mr-2" />
              New Summary
            </Link>
          </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
