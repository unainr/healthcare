'use client'
import React, { useState } from 'react'
import { motion } from "framer-motion"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "@/components/ui/input-otp"
  import { Button } from "@/components/ui/button"
  import { useRouter } from "next/navigation";
import { passCode } from '@/lib/actions/user.actions'
import { Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

const OTPForm = () => {
  const [code, setCode] = useState<string>(""); // Store OTP as a string first
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    try {
      if (!code || code.length !== 6 || isNaN(Number(code))) {
        setError("Please enter a valid 6-digit OTP.");
        return;
      }

      const otpNumber = Number(code);

      const response = await passCode(otpNumber);

      if (response.success) {
         document.cookie = 'adminAccess=true; path=/'
        router.push("/dashboard"); 
        toast.success("PassCode verified successfully");
      } else {
        setError("Invalid PassCode");
        toast.error("Invalid PassCode");
      }
    } catch (error: any) {
      setError(error.message || "An error occurred");
      toast.error(error.message || "An error occurred");
    }finally{
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
  <AlertDialogTrigger asChild>
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="rounded-lg bg-gradient-to-r  px-4 py-2.5  shadow-lg transition-all "
    >
      Admin
    </motion.button>
  </AlertDialogTrigger>

  <AlertDialogContent className="max-w-md rounded-xl border-0 p-6 shadow-2xl">
    <AlertDialogHeader>
      <AlertDialogTitle className="mb-6 text-center text-2xl font-bold text-gray-800">
        <span className="mb-2 block text-blue-600">🔐</span>
        Admin Verification
      </AlertDialogTitle>

      <p className="mb-8 text-center text-sm text-gray-600">
        Please enter the 6-digit verification code sent to your device
      </p>

      <div className="space-y-8">
        <InputOTP
          maxLength={6}
          onChange={(e: string) => setCode(e)}
          className="flex justify-center gap-2"
        >
          <InputOTPGroup className="gap-2">
            {[0,1,2].map((index) => (
              <InputOTPSlot
                key={index}
                index={index}
                className="h-14 w-12 rounded-lg border-2  text-lg font-semibold transition-all focus:border-blue-500  focus:ring-blue-500"
              />
            ))}
          </InputOTPGroup>

          <InputOTPSeparator className="mx-2 text-gray-400">-</InputOTPSeparator>

          <InputOTPGroup className="gap-2">
            {[3,4,5].map((index) => (
              <InputOTPSlot
                key={index}
                index={index}
                className="h-14 w-12 rounded-lg border-2  text-lg font-semibold transition-all focus:border-blue-500  focus:ring-blue-500"
              />
            ))}
          </InputOTPGroup>
        </InputOTP>

        {error && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-sm text-red-500"
          >
            {error}
          </motion.p>
        )}
      </div>
    </AlertDialogHeader>

    <AlertDialogFooter className="mt-8 gap-4 sm:justify-center">
      <AlertDialogCancel className="rounded-lg border-2 px-6 py-2.5 font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-800">
        Cancel
      </AlertDialogCancel>
      <AlertDialogAction
        onClick={handleLogin}
        className="rounded-lg bg-blue-600 px-8 py-2.5 font-medium text-white  hover:bg-blue-700"
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Verifying...</span>
          </div>
        ) : (
          "Verify"
        )}
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

  );
};

export default OTPForm;
