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
        className="px-6 py-2.5 rounded-lg "
      >
       Admin
      </motion.button>
    </AlertDialogTrigger>

    <AlertDialogContent className="max-w-md rounded-xl shadow-2xl">
      <AlertDialogHeader>
        <AlertDialogTitle className="text-2xl font-bold text-center mb-6">
          Enter Verification Code
        </AlertDialogTitle>
        
        <p className="text-muted-foreground text-center text-sm mb-8">
          We sent a code to your phone. Enter it below to verify.
        </p>

        <div className="space-y-8">
          <InputOTP 
            maxLength={6} 
            onChange={(e: string) => setCode(e)}
            className="gap-2 flex justify-center"
          >
            <InputOTPGroup className="gap-2">
              {[0,1,2].map((index) => (
                <InputOTPSlot 
                  key={index} 
                  index={index}
                  className="w-12 h-14 rounded-lg border-2 focus:border-primary focus:ring-primary"
                />
              ))}
            </InputOTPGroup>

            <InputOTPSeparator className="mx-2">-</InputOTPSeparator>

            <InputOTPGroup className="gap-2">
              {[3,4,5].map((index) => (
                <InputOTPSlot 
                  key={index} 
                  index={index}
                  className="w-12 h-14 rounded-lg border-2 focus:border-primary focus:ring-primary"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>

          {error && (
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-destructive text-center text-sm"
            >
              {error}
            </motion.p>
          )}
        </div>
      </AlertDialogHeader>

      <AlertDialogFooter className="sm:justify-center gap-4 mt-8">
        <AlertDialogCancel className="rounded-lg border-2 hover:bg-muted/50 transition-colors">
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction 
          onClick={handleLogin}
          className="rounded-lg bg-primary hover:bg-primary/90"
        >
         {loading ? (
						<>
							<Loader2 className="h-4 w-4 animate-spin" />
							verify...
						</>
					) : (
						"verify"
					)}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  );
};

export default OTPForm;
