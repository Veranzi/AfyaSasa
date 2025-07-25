"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Heart, Menu, X, Phone, Mail } from "lucide-react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { auth } from "@/lib/firebase"
import { signOut, User } from "firebase/auth"
import { useUserRole } from "@/hooks/useUserRole";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  const { role, loading } = useUserRole(user);
  console.log("Header: user", user, "role", role, "loading", loading);

  const handleSignOut = async () => {
    await signOut(auth)
    router.replace("/signup")
  }

  const handleGetStarted = () => {
    router.push("/signup");
  };

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
  const safePath = pathname ?? '';
  const isHome = safePath === "/" || safePath === "/#home";
  const isFeatures = safePath === "/#features";
  const isDemo = safePath.startsWith("/demo");
  const isDashboard = safePath.startsWith("/dashboard");
  const isBlogs = safePath.startsWith("/blogs");

  if (loading) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-pink-100">
        <div className="container mx-auto px-4 h-20 flex items-center justify-center">
          <div>Loading...</div>
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-pink-100">
      <div className="container mx-auto px-4">
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
            {user ? (
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
            ) : null}
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
            {/* Only show Live Demo for clinician and admin */}
            {role === "clinician" || role === "admin" ? (
              <Link href="/demo" className={`text-gray-700 hover:text-pink-600 font-medium transition-colors ${isDemo ? "underline underline-offset-4 text-pink-600" : ""}`}>
                Live Demo
              </Link>
            ) : null}
            {user && !loading && (
              <div className="relative group">
                <button className={`text-gray-700 hover:text-pink-600 font-medium transition-colors flex items-center gap-1 bg-transparent border-0 cursor-pointer ${isDashboard ? "underline underline-offset-4 text-pink-600" : ""}`}
                  tabIndex={0}
                >
                  Dashboard
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </button>
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50">
                  {/* Show dashboard links based on role */}
                  {role === "patient" && (
                    <>
                      <Link href="/dashboard/chatbot" className="block px-4 py-2 text-gray-700 hover:bg-pink-50">Medical Chatbot</Link>
                      <Link href="/dashboard/appointments" className="block px-4 py-2 text-gray-700 hover:bg-pink-50">Appointments</Link>
                      <Link href="/dashboard/reminders" className="block px-4 py-2 text-gray-700 hover:bg-pink-50">Reminders</Link>
                      <Link href="/blogs" className="block px-4 py-2 text-gray-700 hover:bg-pink-50">Blogs</Link>
                    </>
                  )}
                  {role === "clinician" && (
                    <>
                      <Link href="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-pink-50">Overview</Link>
                      <Link href="/dashboard/analytics" className="block px-4 py-2 text-gray-700 hover:bg-pink-50">Analytics</Link>
                      <Link href="/dashboard/inventory" className="block px-4 py-2 text-gray-700 hover:bg-pink-50">Inventory</Link>
                      <Link href="/dashboard/patients" className="block px-4 py-2 text-gray-700 hover:bg-pink-50">Patients</Link>
                      <Link href="/dashboard/reports" className="block px-4 py-2 text-gray-700 hover:bg-pink-50">Reports</Link>
                      <Link href="/dashboard/settings" className="block px-4 py-2 text-gray-700 hover:bg-pink-50">Settings</Link>
                      <Link href="/dashboard/treatment" className="block px-4 py-2 text-gray-700 hover:bg-pink-50">Treatment</Link>
                      <Link href="/dashboard/notifications" className="block px-4 py-2 text-gray-700 hover:bg-pink-50">Notifications</Link>
                    </>
                  )}
                  {role === "admin" && (
                    <>
                      <Link href="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-pink-50">Overview</Link>
                      <Link href="/dashboard/analytics" className="block px-4 py-2 text-gray-700 hover:bg-pink-50">Analytics</Link>
                      <Link href="/dashboard/inventory" className="block px-4 py-2 text-gray-700 hover:bg-pink-50">Inventory</Link>
                      <Link href="/dashboard/patients" className="block px-4 py-2 text-gray-700 hover:bg-pink-50">Patients</Link>
                      <Link href="/dashboard/reports" className="block px-4 py-2 text-gray-700 hover:bg-pink-50">Reports</Link>
                      <Link href="/dashboard/settings" className="block px-4 py-2 text-gray-700 hover:bg-pink-50">Settings</Link>
                      <Link href="/dashboard/treatment" className="block px-4 py-2 text-gray-700 hover:bg-pink-50">Treatment</Link>
                      <Link href="/dashboard/notifications" className="block px-4 py-2 text-gray-700 hover:bg-pink-50">Notifications</Link>
                      <Link href="/dashboard/chatbot" className="block px-4 py-2 text-gray-700 hover:bg-pink-50">Medical Chatbot</Link>
                      <Link href="/dashboard/appointments" className="block px-4 py-2 text-gray-700 hover:bg-pink-50">Appointments</Link>
                      <Link href="/dashboard/reminders" className="block px-4 py-2 text-gray-700 hover:bg-pink-50">Reminders</Link>
                      <Link href="/blogs" className="block px-4 py-2 text-gray-700 hover:bg-pink-50">Blogs</Link>
                      <Link href="/dashboard/appointments/clinician-page" className="block px-4 py-2 text-gray-700 hover:bg-pink-50">Manage Appointments</Link>
                      <Link href="/dashboard/reminders/clinician-page" className="block px-4 py-2 text-gray-700 hover:bg-pink-50">Manage Reminders</Link>
                      <Link href="/dashboard/reports/clinician-page" className="block px-4 py-2 text-gray-700 hover:bg-pink-50">Manage Reports</Link>
                    </>
                  )}
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
          <div className="lg:hidden bg-white/95 backdrop-blur-sm py-4">
            <nav className="flex flex-col items-center gap-4">
              <button
                onClick={() => handleSectionNav("home")}
                className={`text-gray-700 hover:text-pink-600 font-medium transition-colors ${isHome ? "text-pink-600" : ""}`}
              >
                Home
              </button>
              <button
                onClick={() => handleSectionNav("features")}
                className={`text-gray-700 hover:text-pink-600 font-medium transition-colors ${isFeatures ? "text-pink-600" : ""}`}
              >
                Features
              </button>
              {user && role && (
                <Link
                  href={role === "admin" ? "/dashboard" : "/demo"}
                  className={`text-gray-700 hover:text-pink-600 font-medium transition-colors ${isDashboard || isDemo ? "text-pink-600" : ""}`}
                >
                  Dashboard
                </Link>
              )}
              <Link
                href="/blogs"
                className={`text-gray-700 hover:text-pink-600 font-medium transition-colors ${isBlogs ? "text-pink-600" : ""}`}
              >
                Blogs
              </Link>
              <Link href="/dashboard/settings" className="text-gray-700 hover:text-pink-600 font-medium transition-colors">
                Settings
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
