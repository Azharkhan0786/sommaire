import Link from "next/link";
import { FileText, Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-16">
        
        {/* Top Section */}
        <div className="grid gap-10 md:grid-cols-4">
          
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white">
              <FileText className="h-6 w-6 text-rose-500" />
              <span className="text-lg font-semibold">Sommaire</span>
            </div>
            <p className="text-sm text-slate-400">
              AI-powered PDF summaries. Read less. Understand more.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Product</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="/upload" className="hover:text-white">Upload PDF</Link></li>
              <li><Link href="/#pricing" className="hover:text-white">Pricing</Link></li>
              <li><Link href="/features" className="hover:text-white">Features</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Company</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="/about" className="hover:text-white">About</Link></li>
              <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Connect</h4>
            <div className="flex gap-4">
              <Link href="#" className="text-slate-400 hover:text-white">
                <Github />
              </Link>
              <Link href="#" className="text-slate-400 hover:text-white">
                <Twitter />
              </Link>
              <Link href="#" className="text-slate-400 hover:text-white">
                <Linkedin />
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-white/10" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-slate-500 md:flex-row">
          <p>© {new Date().getFullYear()} Sommaire. All rights reserved.</p>
          <p>Built with ❤️ using Next.js & AI</p>
        </div>

      </div>
    </footer>
  );
}
