import React from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section>

      <div className="">
        <div className="flex">
            <Sparkles className="text-rose-600 h-6 w-6 mr-2"/>
        <p>Powered by AI</p>
        </div>
        <h1>Transform Your PDFs into concise summaries</h1>
        <h2>Get a beautiful summary of the document in seconds</h2>
        <Button variant="primary" className="bg-rose-600">Try Sommaire</Button>
      </div>
    </section>
  );
}
