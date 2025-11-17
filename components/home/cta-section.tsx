import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className=" bg-gray-50 py-12">
      <div className="py-12 lg:py-20 mx-auto px-4   sm:px-6 lg:px-8 max-w-5xl lg:pt-12">
        <div className=" flex flex-col items-center justify-center space-y-4 text-center">
          <div>
            <h2>Ready to Save Hours of Reading Time ?</h2>
            <p>
              Transform Lengthy documents into clear, actionable insights with
              our AI-powered summarizer
            </p>
          </div>
          <div>
            <div>
              <Button variant={'link'} className='bg-rose-500 w-full min-[400px]:w-auto bg-linear-to-r from-slate-900 to-rose-500 hover:from-rose-500 hover:to-slate-900 hover:text-white text-white transition-all duration-300 '>
                <Link href="/#pricing"> Get Started {' '} <ArrowRight  className='ml-2 h-4 w-4 animate-pulse'/></Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
