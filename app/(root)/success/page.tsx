'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Building2, CalendarCheck2, ArrowLeft, Mail, Star, Bell } from 'lucide-react'
import Link from 'next/link'
import { ModeToggle } from '@/components/ui/modetoggle'

const SuccessPage = () => {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4"
    >
      <div className="absolute top-4 right-4 space-x-4">
        <ModeToggle/>
      </div>

      <motion.div 
        variants={itemVariants}
        className="w-full max-w-3xl rounded-2xl dark:shadow-blue-500/10 p-8 md:p-12"
      >
        <div className="text-center">
          <motion.div
            className="relative inline-block"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
            <CheckCircle className="text-green-500 w-24 h-24 md:w-32 md:h-32 mx-auto stroke-[1.5] relative z-10" />
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="mt-8 text-3xl md:text-4xl font-bold text-gray-800 dark:text-white"
          >
            Registration Successful! 🎉
          </motion.h1>

          <motion.div 
            variants={itemVariants}
            className="mt-4 flex items-center justify-center gap-2 text-gray-600 dark:text-gray-300"
          >
            <Mail className="w-5 h-5" />
            <p className="text-lg">Confirmation email sent to your inbox</p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="group bg-blue-50 dark:bg-gray-700 p-6 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <Building2 className="text-blue-600 dark:text-blue-400 w-10 h-10 mx-auto stroke-[1.5] group-hover:scale-110 transition-transform" />
              <h3 className="mt-4 font-semibold text-gray-800 dark:text-white">Next Steps</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Medical team review in progress</p>
            </div>

            <div className="group bg-green-50 dark:bg-gray-700 p-6 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CalendarCheck2 className="text-green-600 dark:text-green-400 w-10 h-10 mx-auto stroke-[1.5] group-hover:scale-110 transition-transform" />
              <h3 className="mt-4 font-semibold text-gray-800 dark:text-white">Appointment</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Check email for details</p>
            </div>

            <div className="group bg-purple-50 dark:bg-gray-700 p-6 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <Bell className="text-purple-600 dark:text-purple-400 w-10 h-10 mx-auto stroke-[1.5] group-hover:scale-110 transition-transform" />
              <h3 className="mt-4 font-semibold text-gray-800 dark:text-white">Notifications</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Updates enabled</p>
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="mt-12 space-y-6"
          >
            <div className="flex items-center justify-center space-x-2 text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-current" />
              ))}
            </div>

            <Link href="/">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full my-5 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-purple-500 text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5" />
                Return to Home
              </motion.button>
            </Link>
            
           
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default SuccessPage
