import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

export default function InternshipForm() {
  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Full Name</label>
          <input type="text" className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900" placeholder="John Doe" />
        </div>
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">Email Address</label>
      <input type="email" className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900" placeholder="john@example.com" />
    </div>
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">Phone (Optional)</label>
      <input type="tel" className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900" placeholder="+61 ..." />
    </div>
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">Degree / Major</label>
      <input type="text" className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900" placeholder="e.g. Master of IT" />
    </div>
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">Graduation Year</label>
      <input type="text" className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900" placeholder="e.g. 2025" />
    </div>
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">City in Australia</label>
      <select className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900">
        <option>Select City</option>
        <option>Sydney</option>
        <option>Melbourne</option>
        <option>Brisbane</option>
        <option>Perth</option>
        <option>Adelaide</option>
        <option>Other</option>
      </select>
    </div>
    <div className="md:col-span-2 space-y-2">
      <label className="text-sm font-medium text-gray-700">Preferred Internship Start Month</label>
      <select className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900">
        <option>Select Month</option>
        <option>Immediately</option>
        <option>Next Month</option>
        <option>In 3 Months</option>
        <option>Next Year</option>
      </select>
    </div>
  </div>

  <Button className="w-full rounded-xl bg-primary text-white hover:bg-primary/90 py-6 text-lg font-bold shadow-lg hover:shadow-xl transition-all">
    Book My Session
  </Button>

      <div className="text-center flex items-center justify-center gap-2 text-gray-500 text-xs">
        <Lock className="w-3 h-3" />
        Your details are kept private and only used to contact you about internship options.
      </div>
    </form>
  );
}
