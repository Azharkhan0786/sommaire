import { FileText } from "lucide-react";
import NavLink from "./nav-link";
import {Button } from "@/components/ui/button";

export default function Header() {
  const isLoggedIn = false;

  return (
    <nav className="container flex items-center justify-between py-4 px-2 mx-auto lg:px-8">
      <div className="flex">
        <NavLink href="/" className="flex items-center gap-1  shrink-0 lg:gap:2">
          <FileText className="h-5 w-5 lg:w-8 lg:h-8 text-gray-900 hover:rotate-12 transition-transform duration-200 ease-in-out" />
          <span className="font-extrabold lg:text-xl text-green-900">
            Sommaire
          </span>
        </NavLink>
      </div>

      <div className="flex gap-4 lg:justify-center lg:items-center">
        <NavLink href="/pricing">Pricing</NavLink>
        {isLoggedIn && <NavLink href="/dashboard">Your Summaries</NavLink>}
      </div>

      <div className="flex lg:justify-end">
        {isLoggedIn ? (
          <div className="flex gap-2 items-center">
            <NavLink href="/upload">Upload a PDF</NavLink>
            <div>Pro</div>
            <div>User</div>
          </div>
        ) : (
          <div>
            <Link href="/sign-in">Sign In</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
