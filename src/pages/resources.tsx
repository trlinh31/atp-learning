import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Heart,
  FileText,
  MessageCircle,
  Globe,
  Wine,
  CheckSquare,
  Users,
  BookOpen,
  Slack,
} from "lucide-react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import Sidebar from "@/components/Sidebar";

const resources = [
  {
    icon: Heart,
    title: "The ATP Code",
    description: "What makes ATP great and how we keep it great together.",
    link: "#",
    color: "bg-red-50 text-red-600",
  },
  {
    icon: FileText,
    title: "ATP Offerings Overview",
    description: "Overview of the most important things your ATP membership offers.",
    link: "#",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Slack,
    title: "ATP Zalo Channels",
    description: "Overview of our current Zalo channels, local chapters & conversation topics.",
    link: "#",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: MessageCircle,
    title: "How to use Zalo",
    description: "Learn how we interact, write good posts & have fruitful discussions.",
    link: "#",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: Globe,
    title: "How to connect with members",
    description: "The many ways to proactively connect with members.",
    link: "#",
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    icon: Wine,
    title: "How to host a local meetup",
    description: "Learn how to host a great ATP meetup in your city.",
    link: "#",
    color: "bg-orange-50 text-orange-600",
  },
  {
    icon: CheckSquare,
    title: "How to organise an online event",
    description: "Learn how to host an online workshop or session for the community.",
    link: "#",
    color: "bg-teal-50 text-teal-600",
  },
  {
    icon: Users,
    title: "About ATP Circles",
    description: "Learn about our flagship community activity and how to participate.",
    link: "#",
    color: "bg-pink-50 text-pink-600",
  },
  {
    icon: BookOpen,
    title: "ATP Circles Playbook",
    description: "Learn how to successfully do and run your ATP Circle.",
    link: "#",
    color: "bg-amber-50 text-amber-600",
  },
];

export default function Resources() {
  return (
    <div className="min-h-screen bg-secondary/30 font-sans text-foreground flex">
      {/* Sidebar */}
      <Sidebar activePage="resources" />

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {/* Header */}
        <header className="h-20 bg-white border-b border-gray-100 sticky top-0 z-10 px-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-serif font-bold text-gray-900">ATP Resources</h1>
            <p className="text-sm text-gray-500">Important resources to help you succeed & get the most from ATP</p>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          {/* Resources Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all group cursor-pointer"
              >
                <div className={clsx(
                  "w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110",
                  resource.color
                )}>
                  <resource.icon className="w-7 h-7" />
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                  {resource.title}
                </h3>
                
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {resource.description}
                </p>
                
                <Button 
                  variant="outline" 
                  className="w-full border-2 hover:bg-primary hover:text-white hover:border-primary transition-all"
                >
                  Read
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Additional Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 bg-gradient-to-r from-primary/5 to-red-50 rounded-3xl p-8 border border-primary/10"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Need more help?
                </h3>
                <p className="text-gray-600 mb-4">
                  If you have questions or need assistance, feel free to reach out to our team at{" "}
                  <a href="mailto:wecare@atp-global.com.au" className="text-primary font-medium hover:underline">
                    wecare@atp-global.com.au
                  </a>
                </p>
                <Button className="bg-primary hover:bg-primary/90">
                  Contact Support
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
