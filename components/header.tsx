"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart, Menu, X, Phone, Mail } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter();

  // Helper for smooth scrolling to section
  const handleSectionNav = (sectionId: string) => {
    if (typeof window !== "undefined") {
      if (window.location.pathname === "/") {
        const el = document.getElementById(sectionId)
        if (el) {
          el.scrollIntoView({ behavior: "smooth" })
        }
      } else {
        router.push(`/#${sectionId}`)
      }
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-pink-100">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="hidden md:flex items-center justify-between py-2 text-sm border-b border-pink-50">
          <div className="flex items-center gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-pink-500" />
              <span>+254740875071</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-purple-500" />
              <span>info@afyasasa.com</span>
            </div>
          </div>
          <div className="text-gray-600">
            <span className="text-pink-600 font-medium">Code Her Care 2025</span> - Transforming Women's Health
          </div>
        </div>

        {/* Main Navigation */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
                AfyaSasa
              </h1>
              <p className="text-xs text-gray-500 -mt-1">AI-Powered Women's Health</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <button onClick={() => handleSectionNav("home")}
              className="text-gray-700 hover:text-pink-600 font-medium transition-colors bg-transparent border-0 cursor-pointer">
              Home
            </button>
            <button onClick={() => handleSectionNav("features")}
              className="text-gray-700 hover:text-pink-600 font-medium transition-colors bg-transparent border-0 cursor-pointer">
              Features
            </button>
            <Link href="/demo" className="text-gray-700 hover:text-pink-600 font-medium transition-colors">
              Live Demo
            </Link>
            <Link href="/dashboard" className="text-gray-700 hover:text-pink-600 font-medium transition-colors">
              Dashboard
            </Link>
            <Link href="/blogs" className="text-gray-700 hover:text-pink-600 font-medium transition-colors">
              Blogs
            </Link>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700">
                Get Started
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-pink-600"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-pink-50">
            <nav className="flex flex-col gap-4">
              <button onClick={() => { setIsMenuOpen(false); handleSectionNav("home") }}
                className="text-gray-700 hover:text-pink-600 font-medium transition-colors py-2 bg-transparent border-0 text-left cursor-pointer">
                Home
              </button>
              <button onClick={() => { setIsMenuOpen(false); handleSectionNav("features") }}
                className="text-gray-700 hover:text-pink-600 font-medium transition-colors py-2 bg-transparent border-0 text-left cursor-pointer">
                Features
              </button>
              <Link href="/demo" className="text-gray-700 hover:text-pink-600 font-medium transition-colors py-2">
                Live Demo
              </Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-pink-600 font-medium transition-colors py-2">
                Dashboard
              </Link>
              <Link href="/blogs" className="text-gray-700 hover:text-pink-600 font-medium transition-colors py-2">
                Blogs
              </Link>
              <Link href="/signup">
                <Button className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 mt-4">
                  Get Started
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
