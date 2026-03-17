import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, ArrowLeft, Home } from "lucide-react";
import { motion } from "framer-motion";

export default function ApplySuccess() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
          <CardContent className="p-12 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mb-6 flex justify-center"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
            </motion.div>

            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">
              Application Submitted Successfully!
            </h1>
            
            <p className="text-lg text-gray-600 mb-2">
              Thank you for your interest in our internship program.
            </p>
            
            <p className="text-base text-gray-500 mb-8">
              Our team will review your application and get back to you shortly. 
              We'll send you an email confirmation at the address you provided.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button 
                  variant="outline" 
                  className="rounded-full border-primary/20 text-primary hover:bg-primary/5 px-8 py-6"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              
              <Link href="/student-portal">
                <Button className="rounded-full bg-primary text-white hover:bg-primary/90 px-8 py-6">
                  Go to Student Portal
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

