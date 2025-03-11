"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Job Listings", href: "/jobs" },
  { name: "Candidates", href: "/candidates" },
  { name: "Employers", href: "/employers" },
  { name: "AI Matching", href: "/ai-matching" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="h-16 px-6 w-full bg-background border-b shadow-sm">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">

        {/* Logo */}
        <Link href="/" className="font-bold flex items-center">
          <Image src="/logo.png" alt="CV Insight Logo" width={40} height={40} />
          <span className="text-blue-600 text-2xl">CV</span>
          <span className="text-xl">Insight</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium hover:text-blue-600 transition",
                pathname === link.href ? "text-blue-600" : "text-gray-500"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <ModeToggle />
        {/* Right-side buttons */}
        {/* <div className="flex items-center space-x-4">
          <Button asChild>
            <Link href="/log-in">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/sign-up">SignUp</Link>
          </Button>
        </div> */}
      </div>
    </nav>
  );
}

