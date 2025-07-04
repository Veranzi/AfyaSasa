"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Heart, Menu, X, Phone, Mail } from "lucide-react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { auth } from "@/lib/firebase"
import { signOut, User } from "firebase/auth"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser)
    })
    return () => unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await signOut(auth)
    setUser(null)
    router.replace("/signup")
  }

  // Helper for smooth scrolling to section
  const handleSectionNav = (sectionId: string) => {
    if (typeof window !== "undefined") {
      if (window.location.pathname === "/") {
        const el = document.getElementById(sectionId)
        if (el) {
          el.scrollIntoView({ behavior: "smooth" })
        }
        // Update hash in URL for highlighting
        window.history.replaceState(null, '', `/#${sectionId}`)
      } else {
        router.replace(`/#${sectionId}`)
      }
    }
  }

  // Determine active nav
  const isHome = pathname === "/" || pathname === "/#home"
  const isFeatures = pathname === "/#features"
  const isDemo = pathname.startsWith("/demo")
  const isDashboard = pathname.startsWith("/dashboard")
  const isBlogs = pathname.startsWith("/blogs")

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
          <div className="w-full flex justify-end items-center gap-4 pr-6" style={{ height: '40px' }}>
            <a href="https://github.com/afyacenter" className="icon-animate icon-delay-0 flex items-center justify-center w-8 h-8 bg-gray-800/50 rounded-xl hover:bg-pink-600/30 transition-all duration-300 group">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5C5.648.5.5 5.648.5 12c0 5.084 3.292 9.387 7.86 10.907.574.105.784-.25.784-.555 0-.274-.01-1.18-.015-2.14-3.197.695-3.872-1.54-3.872-1.54-.522-1.326-1.276-1.68-1.276-1.68-1.044-.714.08-.7.08-.7 1.155.08 1.763 1.187 1.763 1.187 1.026 1.76 2.693 1.252 3.35.958.104-.743.402-1.252.73-1.54-2.553-.29-5.238-1.277-5.238-5.687 0-1.256.448-2.283 1.184-3.088-.12-.29-.513-1.46.112-3.045 0 0 .965-.31 3.164 1.18.92-.256 1.91-.384 2.894-.388.983.004 1.974.132 2.895.388 2.197-1.49 3.16-1.18 3.16-1.18.627 1.585.234 2.755.115 3.045.738.805 1.183 1.832 1.183 3.088 0 4.42-2.688 5.393-5.25 5.677.413.355.78 1.057.78 2.132 0 1.54-.014 2.78-.014 3.16 0 .308.207.664.79.552C20.71 21.384 24 17.08 24 12c0-6.352-5.148-11.5-12-11.5z"/></svg>
            </a>
            <a href="https://instagram.com/afyacenter" className="icon-animate icon-delay-1 flex items-center justify-center w-8 h-8 bg-gray-800/50 rounded-xl hover:bg-pink-500/30 transition-all duration-300 group">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.242-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.363 3.678 1.344c-.98.98-1.213 2.092-1.272 3.373C2.013 8.332 2 8.741 2 12c0 3.259.013 3.668.072 4.948.059 1.281.292 2.393 1.272 3.373.98.98 2.092 1.213 3.373 1.272C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.281-.059 2.393-.292 3.373-1.272.98-.98 1.213-2.092 1.272-3.373.059-1.28.072-1.689.072-4.948 0-3.259-.013-3.668-.072-4.948-.059-1.281-.292-2.393-1.272-3.373-.98-.98-2.092-1.213-3.373-1.272C15.668.013 15.259 0 12 0zm0 5.838A6.162 6.162 0 0 0 5.838 12 6.162 6.162 0 0 0 12 18.162 6.162 6.162 0 0 0 18.162 12 6.162 6.162 0 0 0 12 5.838zm0 10.162A3.999 3.999 0 1 1 12 8a3.999 3.999 0 0 1 0 7.999zm6.406-11.845a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"/></svg>
            </a>
            <a href="https://x.com/afyasasa" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="icon-animate icon-delay-2 flex items-center justify-center w-8 h-8 bg-gray-800/50 rounded-xl hover:bg-blue-400/30 transition-all duration-300 group">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M17.53 2.47A12 12 0 0 0 2.47 17.53 12 12 0 0 0 17.53 2.47zm-1.06 1.06A10 10 0 1 1 3.53 18.47 10 10 0 0 1 16.47 3.53zm-6.36 2.83l4.24 4.24-4.24 4.24 1.41 1.41 4.24-4.24 4.24 4.24 1.41-1.41-4.24-4.24 4.24-4.24-1.41-1.41-4.24 4.24-4.24-4.24-1.41 1.41z"/></svg>
            </a>
            <a href="https://linkedin.com/company/afyasasa" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="icon-animate icon-delay-3 flex items-center justify-center w-8 h-8 bg-gray-800/50 rounded-xl hover:bg-blue-600/30 transition-all duration-300 group">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.27c-.966 0-1.75-.79-1.75-1.76 0-.97.784-1.76 1.75-1.76s1.75.79 1.75 1.76c0 .97-.784 1.76-1.75 1.76zm15.5 11.27h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.88v1.36h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v5.61z"/></svg>
            </a>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="/AfyaSasa logo.png"
              alt="AfyaSasa Logo"
              width={128}
              height={128}
              className="object-contain rounded-full"
            />
            <p className="text-xs text-gray-500 mt-2 text-center w-full">AI-Powered Women's Health</p>
          </div>

          {/* Right: Social & User */}
          <div className="flex items-center gap-4">
            {/* User Avatar/Dropdown here */}
            {user && (
              <div className="relative group ml-4">
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user.photoURL || undefined} alt={user.email || "User"} />
                  <AvatarFallback>{user.email ? user.email[0].toUpperCase() : "U"}</AvatarFallback>
                </Avatar>
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">{user.email}</div>
                  <button onClick={handleSignOut} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-b-lg">Sign Out</button>
                </div>
              </div>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <button
              onClick={() => handleSectionNav("home")}
              className={`text-gray-700 hover:text-pink-600 font-medium transition-colors bg-transparent border-0 cursor-pointer ${isHome ? "underline underline-offset-4 text-pink-600" : ""}`}
            >
              Home
            </button>
            <button
              onClick={() => handleSectionNav("features")}
              className={`text-gray-700 hover:text-pink-600 font-medium transition-colors bg-transparent border-0 cursor-pointer ${isFeatures ? "underline underline-offset-4 text-pink-600" : ""}`}
            >
              Features
            </button>
            <Link href="/demo" className={`text-gray-700 hover:text-pink-600 font-medium transition-colors ${isDemo ? "underline underline-offset-4 text-pink-600" : ""}`}>
              Live Demo
            </Link>
            {user && (
              <div className="relative group">
                <button className={`text-gray-700 hover:text-pink-600 font-medium transition-colors flex items-center gap-1 bg-transparent border-0 cursor-pointer ${isDashboard ? "underline underline-offset-4 text-pink-600" : ""}`}
                  tabIndex={0}
                >
                  Dashboard
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </button>
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50">
                  <Link href="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-pink-50">Overview</Link>
                  <Link href="/dashboard/analytics" className="block px-4 py-2 text-gray-700 hover:bg-pink-50">Analytics</Link>
                  <Link href="/dashboard/inventory" className="block px-4 py-2 text-gray-700 hover:bg-pink-50">Inventory</Link>
                  <Link href="/dashboard/patients" className="block px-4 py-2 text-gray-700 hover:bg-pink-50">Patients</Link>
                  <Link href="/dashboard/reports" className="block px-4 py-2 text-gray-700 hover:bg-pink-50">Reports</Link>
                  <Link href="/dashboard/settings" className="block px-4 py-2 text-gray-700 hover:bg-pink-50">Settings</Link>
                  <Link href="/dashboard/treatment" className="block px-4 py-2 text-gray-700 hover:bg-pink-50">Treatment</Link>
                  <Link href="/dashboard/notifications" className="block px-4 py-2 text-gray-700 hover:bg-pink-50">Notifications</Link>
                </div>
              </div>
            )}
            <Link href="/blogs" className={`text-gray-700 hover:text-pink-600 font-medium transition-colors ${isBlogs ? "underline underline-offset-4 text-pink-600" : ""}`}>
              Blogs
            </Link>
            {!user && (
              <Link href="/signup">
                <Button className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700">
                  Get Started
                </Button>
              </Link>
            )}
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
                className={`text-gray-700 hover:text-pink-600 font-medium transition-colors py-2 bg-transparent border-0 text-left cursor-pointer ${isHome ? "underline underline-offset-4 text-pink-600" : ""}`}>
                Home
              </button>
              <button onClick={() => { setIsMenuOpen(false); handleSectionNav("features") }}
                className={`text-gray-700 hover:text-pink-600 font-medium transition-colors py-2 bg-transparent border-0 text-left cursor-pointer ${isFeatures ? "underline underline-offset-4 text-pink-600" : ""}`}>
                Features
              </button>
              <Link href="/demo" className={`text-gray-700 hover:text-pink-600 font-medium transition-colors py-2 ${isDemo ? "underline underline-offset-4 text-pink-600" : ""}`}>
                Live Demo
              </Link>
              {user && (
                <div className="relative group">
                  <button className={`text-gray-700 hover:text-pink-600 font-medium transition-colors flex items-center gap-1 bg-transparent border-0 cursor-pointer py-2 ${isDashboard ? "underline underline-offset-4 text-pink-600" : ""}`}
                    tabIndex={0}
                  >
                    Dashboard
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50">
                    <Link href="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-pink-50">Overview</Link>
                    <Link href="/dashboard/analytics" className="block px-4 py-2 text-gray-700 hover:bg-pink-50">Analytics</Link>
                    <Link href="/dashboard/inventory" className="block px-4 py-2 text-gray-700 hover:bg-pink-50">Inventory</Link>
                    <Link href="/dashboard/patients" className="block px-4 py-2 text-gray-700 hover:bg-pink-50">Patients</Link>
                    <Link href="/dashboard/reports" className="block px-4 py-2 text-gray-700 hover:bg-pink-50">Reports</Link>
                    <Link href="/dashboard/settings" className="block px-4 py-2 text-gray-700 hover:bg-pink-50">Settings</Link>
                    <Link href="/dashboard/treatment" className="block px-4 py-2 text-gray-700 hover:bg-pink-50">Treatment</Link>
                    <Link href="/dashboard/notifications" className="block px-4 py-2 text-gray-700 hover:bg-pink-50">Notifications</Link>
                  </div>
                </div>
              )}
              <Link href="/blogs" className={`text-gray-700 hover:text-pink-600 font-medium transition-colors py-2 ${isBlogs ? "underline underline-offset-4 text-pink-600" : ""}`}>
                Blogs
              </Link>
              {!user && (
                <Link href="/signup">
                  <Button className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 mt-4">
                    Get Started
                  </Button>
                </Link>
              )}
              {user && (
                <div className="relative group ml-4">
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user.photoURL || undefined} alt={user.email || "User"} />
                    <AvatarFallback>{user.email ? user.email[0].toUpperCase() : "U"}</AvatarFallback>
                  </Avatar>
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">{user.email}</div>
                    <button onClick={handleSignOut} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-b-lg">Sign Out</button>
                  </div>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
