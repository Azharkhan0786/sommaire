import { Pizza } from "lucide-react";

export default function DemoSection() {
  return (
    <section className="relative ">
      <div className="py-12 lg:py-20 mx-auto px-4   sm:px-6 lg:px-8 max-w-5xl lg:pt-12">
        <div></div>
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="inline-flex items-center justify-center p-2 rounded-2xl bg-gray-100/80
          backdrop-blur-xs border border-gray-500/20 mb-4">
            <Pizza className="w-6 h-6 text-rose-500" />
          </div>
          <div className="tcext-center mb-16">
            <h3 className="font-bold text-3xl max-w-3xl mx-auto px-4 sm:px-6 ">
            Watch how Sommaire transforms{" "}
            <span className="bg-linear-to-r from-rose-500 to-rose-700 bg-clip-text text-transparent ">
              this Next.js course PDF
            </span>{" "}
            into an easy-to-read summary!
          </h3>
          </div>

          <div className="flex justify-center items-center px-2 sm:px-2"></div>
          {/* Summary Viewer */}
        </div>
      </div>
    </section>
  );
}
