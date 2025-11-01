//

import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function HeroSection() {
  return (
    <section className="flex items-center mx-auto z-0  py-16  sm:py-20 lg:pb-20 relative transition-all animate-in justify-center">
      <div>
        <div className="flex items-center justify-center">
          <div
            className="flex items-center justify-center gap-2 px-5 py-3 text-base font-medium     relative p-px overflow-hidden rounded-full 
                       bg-gradient-to-r from-rose-200 via-rose-400 to-rose-600 
                      group mb-4 
                       transition-all duration-1000 ease-in-out 
                       hover:scale-105 hover:shadow-lg "
          >
           
            <Sparkles
              className="text-rose-700 h-8 w-8 mr-1 animate-pulse 
                         transition-transform duration-300 ease-in-out 
                       group-hover:rotate-12"
            />
            <p className="text-base text-rose-900">Powered by AI</p>
          </div>
        </div>

        <h1 className="text-4xl text-center font-bold mt-4">
          Transform Your PDFs into concise summaries
        </h1>
        <h2 className="text-lg text-center text-gray-600 mb-6">
          Get a beautiful summary of the document in seconds
        </h2>

      <div className="flex justify-center items-center mt-6">
          <Button
          variant={"link"}
          className="bg-rose-500 px-6 py-3 text-lg  transition-all duration-300 hover:scale-105"
        >
          Try Sommaire
        </Button>
      </div>
      </div>
    </section>
  );
}
