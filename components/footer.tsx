"use client"

import {
  Heart,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Award,
  Users,
  Zap,
  Shield,
} from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-pink-500 rounded-full blur-xl"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-purple-500 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-rose-500 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-18 h-18 bg-indigo-500 rounded-full blur-xl"></div>
      </div>

      <div className="relative container mx-auto px-4 py-16">
        {/* Top Section - Brand & Hackathon */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="p-4 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl shadow-2xl">
              <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="18" r="6" fill="#F472B6"/>
                <rect x="14" y="24" width="4" height="12" rx="2" fill="#F472B6"/>
                <rect x="8" y="28" width="16" height="2" rx="1" fill="#F472B6"/>
                <path d="M36 38C36 38 28 30.5 28 25.5C28 22.42 30.42 20 33.5 20C35.24 20 36.91 20.81 38 22.08C39.09 20.81 40.76 20 42.5 20C45.58 20 48 22.42 48 25.5C48 30.5 40 38 40 38H36Z" fill="#F43F5E" stroke="#F43F5E" stroke-width="1"/>
                <rect x="36" y="4" width="12" height="12" rx="6" fill="#a21caf"/>
                <rect x="41" y="8" width="2" height="8" rx="1" fill="#fff"/>
                <rect x="37" y="12" width="10" height="2" rx="1" fill="#fff"/>
              </svg>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-rose-300">
                AfyaSasa
              </h2>
              <p className="text-pink-200 text-lg">Empowering Women's Health Through AI</p>
            </div>
          </div>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Revolutionizing women's healthcare with AI-powered ovarian cyst prediction and comprehensive care management
            designed for low-resource settings across Africa.
          </p>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Quick Links */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-pink-600/20 rounded-lg">
                <Zap className="h-5 w-5 text-pink-400" />
              </div>
              <h4 className="text-lg font-semibold text-pink-300">Quick Access</h4>
            </div>
            <ul className="space-y-3 pl-10">
              <li>
                <a href="#home" className="text-gray-300 hover:text-pink-300 transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-pink-400 rounded-full"></span>
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-gray-300 hover:text-purple-300 transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                  Features
                </a>
              </li>
              <li>
                <a href="#demo" className="text-gray-300 hover:text-rose-300 transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-rose-400 rounded-full"></span>
                  Live Demo
                </a>
              </li>
              <li>
                <a
                  href="#dashboard"
                  className="text-gray-300 hover:text-indigo-300 transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 bg-indigo-400 rounded-full"></span>
                  Dashboard
                </a>
              </li>
            </ul>
          </div>

          {/* AI Services */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-600/20 rounded-lg">
                <Shield className="h-5 w-5 text-purple-400" />
              </div>
              <h4 className="text-lg font-semibold text-purple-300">AI Solutions</h4>
            </div>
            <ul className="space-y-3 pl-10">
              <li className="text-gray-300 flex items-center gap-2">
                <span className="w-1 h-1 bg-pink-400 rounded-full"></span>
                Risk Assessment AI
              </li>
              <li className="text-gray-300 flex items-center gap-2">
                <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                Growth Prediction
              </li>
              <li className="text-gray-300 flex items-center gap-2">
                <span className="w-1 h-1 bg-rose-400 rounded-full"></span>
                Treatment Planning
              </li>
              <li className="text-gray-300 flex items-center gap-2">
                <span className="w-1 h-1 bg-indigo-400 rounded-full"></span>
                Smart Inventory
              </li>
              <li className="text-gray-300 flex items-center gap-2">
                <span className="w-1 h-1 bg-pink-400 rounded-full"></span>
                Cost Optimization
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-rose-600/20 rounded-lg">
                <Mail className="h-5 w-5 text-rose-400" />
              </div>
              <h4 className="text-lg font-semibold text-rose-300">Get In Touch</h4>
            </div>
            <div className="space-y-4 pl-10">
              <div className="group">
                <div className="flex items-center gap-3 text-gray-300 group-hover:text-pink-300 transition-colors">
                  <Mail className="h-4 w-4 text-pink-400" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Email</p>
                    <a href="mailto:info@afyasasa.com" className="font-medium">
                      info@afyasasa.com
                    </a>
                  </div>
                </div>
              </div>
              <div className="group">
                <div className="flex items-center gap-3 text-gray-300 group-hover:text-purple-300 transition-colors">
                  <Phone className="h-4 w-4 text-purple-400" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Phone</p>
                    <a href="tel:+254740875071" className="font-medium">
                      +254 740 875 071
                    </a>
                  </div>
                </div>
              </div>
              <div className="group">
                <div className="flex items-center gap-3 text-gray-300 group-hover:text-rose-300 transition-colors">
                  <MapPin className="h-4 w-4 text-rose-400" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Location</p>
                    <p className="font-medium">Nairobi, Kenya</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social & Community */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-600/20 rounded-lg">
                <Users className="h-5 w-5 text-indigo-400" />
              </div>
              <h4 className="text-lg font-semibold text-indigo-300">Connect</h4>
            </div>
            <div className="pl-10">
              <p className="text-gray-300 mb-4 text-sm">Follow our journey</p>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="https://github.com/afyacenter"
                  className="flex items-center justify-center w-12 h-12 bg-gray-800/50 rounded-xl hover:bg-pink-600/30 transition-all duration-300 group"
                >
                  <Github className="h-5 w-5 text-gray-400 group-hover:text-pink-300" />
                </a>
                <a
                  href="https://linkedin.com/company/afyacenter"
                  className="flex items-center justify-center w-12 h-12 bg-gray-800/50 rounded-xl hover:bg-blue-600/30 transition-all duration-300 group"
                >
                  <Linkedin className="h-5 w-5 text-gray-400 group-hover:text-blue-300" />
                </a>
                <a
                  href="https://twitter.com/afyacenter"
                  className="flex items-center justify-center w-12 h-12 bg-gray-800/50 rounded-xl hover:bg-blue-400/30 transition-all duration-300 group"
                >
                  <Twitter className="h-5 w-5 text-gray-400 group-hover:text-blue-300" />
                </a>
                <a
                  href="https://instagram.com/afyacenter"
                  className="flex items-center justify-center w-12 h-12 bg-gray-800/50 rounded-xl hover:bg-pink-500/30 transition-all duration-300 group"
                >
                  <Instagram className="h-5 w-5 text-gray-400 group-hover:text-pink-300" />
                </a>
              </div>
              <div className="mt-4 text-xs text-gray-400">
                <p>@afyacenter</p>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 p-8 bg-gradient-to-r from-pink-900/20 to-purple-900/20 rounded-2xl border border-pink-500/20">
          <div className="text-center">
            <div className="text-3xl font-bold text-pink-300 mb-1">94%</div>
            <div className="text-sm text-gray-400">AI Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-300 mb-1">1.2M+</div>
            <div className="text-sm text-gray-400">Women Helped</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-rose-300 mb-1">60%</div>
            <div className="text-sm text-gray-400">Faster Diagnosis</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-300 mb-1">40%</div>
            <div className="text-sm text-gray-400">Cost Reduction</div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-300">
                © {currentYear} <span className="text-pink-400 font-semibold">AfyaSasa</span>. All rights reserved.
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Powered by{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400 font-semibold">
                  AfyaSasa
                </span>{" "}
                - Transforming Women's Healthcare with AI
              </p>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <a href="#privacy" className="text-gray-400 hover:text-pink-400 transition-colors">
                Privacy
              </a>
              <a href="#terms" className="text-gray-400 hover:text-purple-400 transition-colors">
                Terms
              </a>
              <a href="#support" className="text-gray-400 hover:text-rose-400 transition-colors">
                Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
