import { Button } from "@/components/ui/button";
import {
  Calendar,
  CalendarDays,
  Users,
  Video,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import Sidebar from "@/components/Sidebar";

const upcomingEventTypes = [
  {
    icon: Users,
    title: "Local Meetups",
    description: "Connect with ATP members in your city over coffee or dinner.",
    color: "bg-blue-50 text-blue-600",
    count: 0,
  },
  {
    icon: Video,
    title: "Online Workshops",
    description: "Join virtual sessions on career development and professional skills.",
    color: "bg-purple-50 text-purple-600",
    count: 0,
  },
  {
    icon: CalendarDays,
    title: "ATP Circles",
    description: "Participate in our flagship peer learning and accountability groups.",
    color: "bg-green-50 text-green-600",
    count: 0,
  },
];

export default function Events() {
  return (
    <div className="min-h-screen bg-secondary/30 font-sans text-foreground flex">
      {/* Sidebar */}
      <Sidebar activePage="events" />

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {/* Header */}
        <header className="h-20 bg-white border-b border-gray-100 sticky top-0 z-10 px-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-serif font-bold text-gray-900">Community Events</h1>
            <p className="text-sm text-gray-500">Connect, learn, and grow with fellow ATP members</p>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto space-y-8">
          {/* Empty State - Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-primary/5 via-red-50/50 to-orange-50/30 rounded-3xl p-12 text-center border border-primary/10"
          >
            <div className="max-w-2xl mx-auto">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-red-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/20">
                <Calendar className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                Exciting Events Coming Soon!
              </h2>
              
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We're currently planning amazing events for our community. Stay tuned for workshops, 
                meetups, and networking opportunities that will help accelerate your career journey.
              </p>
              
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-6 text-base">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Notify Me When Events Are Available
                </Button>
                <Button variant="outline" className="border-2 px-6 py-6 text-base">
                  Suggest an Event Idea
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Event Types Preview */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">What to Expect</h3>
              <p className="text-gray-600">Here are the types of events we'll be hosting:</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {upcomingEventTypes.map((type, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-all"
                >
                  <div className={clsx(
                    "w-14 h-14 rounded-xl flex items-center justify-center mb-4",
                    type.color
                  )}>
                    <type.icon className="w-7 h-7" />
                  </div>
                  
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    {type.title}
                  </h4>
                  
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {type.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-sm font-medium text-gray-500">
                      {type.count} upcoming
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* How to Get Involved */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-3xl p-8 border border-gray-100"
          >
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Want to Host an Event?
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  ATP members can organize and host their own events! Whether it's a local meetup, 
                  an online workshop, or an ATP Circle, we provide the support and platform you need.
                </p>
                <div className="flex items-center gap-3 flex-wrap">
                  <Button className="bg-primary hover:bg-primary/90">
                    Learn How to Host
                  </Button>
                  <Button variant="outline" className="border-2">
                    View Resources
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Past Events Placeholder */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Past Events</h3>
                <p className="text-gray-600">Highlights from our community gatherings</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 border-dashed">
              <CalendarDays className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">
                No past events yet. Check back soon!
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
