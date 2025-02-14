'use client'

import { ModeToggle } from "@/components/ui/modetoggle"
import { ArrowRight, Stethoscope, Shield, Users, Heart, Clock, Award, CheckCircle, Phone } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="absolute top-4 right-4 z-50">
        <ModeToggle />
      </div>

      {/* Hero Section with Enhanced Animation */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
        <div className="container mx-auto px-4 pt-20">
          <div className="text-center space-y-8 relative">
            {/* Enhanced Animated Logo */}
            <div className="relative w-32 h-32 mx-auto">
              <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping" />
              <div className="absolute inset-0 bg-blue-400/20 rounded-full animate-pulse delay-75" />
              <div className="absolute inset-0 bg-blue-300/20 rounded-full animate-pulse delay-150" />
              <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 p-8 rounded-full">
                <Stethoscope className="w-16 h-16 text-white animate-bounce" />
              </div>
            </div>

            {/* Enhanced Hero Text */}
            <div className="space-y-6">
              <h1 className="text-7xl md:text-8xl font-bold tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                  Healthcare
                </span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600">
                  Excellence
                </span>
              </h1>
              <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Transform your healthcare experience with our state-of-the-art platform
              </p>
            </div>

            {/* Quick Contact Bar */}
            <div className="flex justify-center items-center gap-8 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-500" />
                <span>24/7 Helpline: 1800-HEALTH</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-green-500" />
                <span>Always Available</span>
              </div>
            </div>

            {/* Enhanced Feature Cards */}
            <div className="grid md:grid-cols-4 gap-8 mt-16">
              {[
                { icon: Users, label: "Expert Doctors", desc: "Top specialists available", color: "text-blue-500" },
                { icon: Shield, label: "Secure Data", desc: "256-bit encryption", color: "text-green-500" },
                { icon: Heart, label: "Quality Care", desc: "Patient-focused approach", color: "text-rose-500" },
                { icon: Award, label: "Certified", desc: "ISO 9001:2015", color: "text-amber-500" }
              ].map((Feature, index) => (
                <div key={index}
                  className="group p-8 bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 backdrop-blur-sm border border-gray-100 dark:border-gray-700">
                  <Feature.icon className={`w-12 h-12 ${Feature.color} mb-4 group-hover:scale-110 transition-transform`} />
                  <h3 className="font-semibold text-lg mb-2">{Feature.label}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{Feature.desc}</p>
                </div>
              ))}
            </div>

            {/* Enhanced Stats with Icons */}
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              {[
                { icon: Users, number: "10k+", label: "Happy Patients", color: "text-blue-500" },
                { icon: Clock, number: "24/7", label: "Available Support", color: "text-green-500" },
                { icon: CheckCircle, number: "100%", label: "Success Rate", color: "text-purple-500" }
              ].map((stat, index) => (
                <div key={index} className="p-8 bg-white/90 dark:bg-gray-800/90 rounded-2xl backdrop-blur-sm border border-gray-100 dark:border-gray-700">
                  <stat.icon className={`w-8 h-8 ${stat.color} mb-4`} />
                  <h3 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                    {stat.number}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Enhanced CTA Section */}
            <div className="mt-20 space-y-8">
              <h2 className="text-3xl font-bold">Ready to Experience Better Healthcare?</h2>
              <div className="flex justify-center gap-4">
                <Link href="/register">
                  <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300">
                    <span className="flex items-center gap-2">
                      Get Started Now
                      <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </Link>
                <button className="px-8 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-full font-semibold text-lg hover:border-blue-500 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
