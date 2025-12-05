import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";

export default function DashboardPage() {
        const uploadLimit=5;

  return (
    
    <main className="min-h-screen">
      <div className="container mx-auto flex flex-col gap-4">
        <div className=" px-12 py-12 sm:py-24">
          <div className="flex justify-between gap-4 mb-8">
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl font-bold tracking-tight bg-linear-to-r from-gray-600 to-gray-900 text-transparent bg-clip-text">
                Your Summaries
              </h1>
              <p className="text-gray-600">
                Transform your PDFs into concise,actionable insights
              </p>
            </div>
            <Button
              variant={"link"}
              className="bg-linear-to-r from-rose-500 to bg-rose-700 hover:from-rose-600  hover:to-rose800 hover:scale-105 transition-all duration-300 group hover:no-underline"
            >
              <Link href="upload" className="flex items-center text-white">
                <Plus className="w-5 h-5 mr-2" />
                New Summary
              </Link>
            </Button>
          </div>
          <div className="mb-8">
            <div className="bg-rose-50 border border-rose-300 rounded-lg p-4 text-rose-800">
              <p className="text-sm">
                You've Reached the limit of {uploadLimit} uploads on the Basic Plan.
                <Link href={"/#pricing"}
                className="text-rose-800 underline font-medium items-center underline-offset-2 inline-flex">
                  Click here to upgrade to Pro{" "}
                  <ArrowRight className=" w-4 h-4  inline-block" />
                    </Link>{' '}
                   for unlimited uploads
               
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
