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
        <div className="flex flex-col items-center justify-center mb-16">
          <img
            src="/AfyaSasa logo.png"
            alt="AfyaSasa Logo"
            width={160}
            height={160}
            className="object-contain rounded-full"
          />
          <p className="text-pink-200 text-lg mt-2 text-center w-full">AI-Powered Women's Health</p>
        </div>

        <p className="text-lg text-gray-200 max-w-2xl mx-auto mb-8">
          Revolutionizing women's healthcare with AI-powered ovarian cyst prediction and comprehensive care management
          designed for low-resource settings across Africa.
        </p>

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

        {/* Footer Bottom - Social Left-Aligned */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-pink-900/30 pt-8 mt-12">
          <div className="text-center text-sm text-pink-200 py-4 border-t border-pink-900/30 mt-12">
            © 2025 AfyaSasa. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
