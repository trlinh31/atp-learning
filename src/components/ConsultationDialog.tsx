import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { submitInternApplication } from "@/services/internService";
import { toast } from "sonner";

interface ConsultationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Map month abbreviation to full month name for date conversion
const monthMap: Record<string, string> = {
  jan: "January",
  feb: "February",
  mar: "March",
  apr: "April",
  may: "May",
  jun: "June",
  jul: "July",
  aug: "August",
  sep: "September",
  oct: "October",
  nov: "November",
  dec: "December",
};

export default function ConsultationDialog({ open, onOpenChange }: ConsultationDialogProps) {
  const { member } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    country: "",
    city: "",
    degree: "",
    gradYear: "",
    startMonth: "",
  });
  const [loading, setLoading] = useState(false);

  // Pre-fill form when member data is available or dialog opens
  useEffect(() => {
    if (member && open) {
      // Get degree/major from educations array if available
      const latestEducation = member.educations && member.educations.length > 0 
        ? member.educations[member.educations.length - 1] 
        : null;
      
      const degree = latestEducation?.degree || latestEducation?.major || latestEducation?.field_of_study || "";
      const gradYear = latestEducation?.graduation_year 
        ? String(latestEducation.graduation_year) 
        : "";

      setFormData((prev) => ({
        fullName: member.full_name || "",
        email: member.email || "",
        country: member.country || "",
        city: member.city || "",
        degree: degree,
        gradYear: gradYear,
        startMonth: prev.startMonth, // Keep user's selection
      }));
    }
  }, [member, open]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Convert month abbreviation to date string (first day of the month, current or next year)
  const convertMonthToDate = (monthAbbr: string): string => {
    if (!monthAbbr) return "";
    
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // 0-11
    const currentYear = currentDate.getFullYear();
    
    const monthIndex = Object.keys(monthMap).indexOf(monthAbbr);
    if (monthIndex === -1) return "";
    
    // If selected month is in the past, use next year
    const year = monthIndex < currentMonth ? currentYear + 1 : currentYear;
    const date = new Date(year, monthIndex, 1);
    
    // Format as YYYY-MM-DD
    return date.toISOString().split('T')[0];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.email) {
      toast.error("Email is required");
      return;
    }

    if (!formData.startMonth) {
      toast.error("Please select a preferred start month");
      return;
    }

    try {
      setLoading(true);

      // Convert startMonth to start_date
      const startDate = convertMonthToDate(formData.startMonth);
      
      // Create education object if degree and gradYear are provided
      const educations = [];
      if (formData.degree || formData.gradYear) {
        educations.push({
          school: "", // Not provided in consultation form
          major: formData.degree || "",
          year: formData.gradYear || "",
        });
      }

      // Create introduction from available data
      const introduction = formData.fullName 
        ? `Consultation request from ${formData.fullName}. ${formData.degree ? `Degree: ${formData.degree}.` : ""} ${formData.gradYear ? `Graduation Year: ${formData.gradYear}.` : ""}`
        : "";

      const formDataToSend = new FormData();
      formDataToSend.append('job_id', '0'); // No specific job for consultation
      formDataToSend.append('email', formData.email);
      formDataToSend.append('introduction', introduction);
      formDataToSend.append('positions', JSON.stringify([])); // No specific positions selected
      formDataToSend.append('preferred_location', formData.city || formData.country || '');
      formDataToSend.append('start_date', startDate);
      formDataToSend.append('internship_type', 'onsite'); // Default to onsite
      formDataToSend.append('has_cv', 'no'); // Consultation form doesn't have CV upload
      
      // Add education if available
      if (educations.length > 0) {
        formDataToSend.append('educations', JSON.stringify(educations));
      }
      
      if (formData.country) {
        formDataToSend.append('country', formData.country);
      }
      if (formData.city) {
        formDataToSend.append('city', formData.city);
      }
      
      formDataToSend.append('whatsapp', ''); // Not required for consultation
      formDataToSend.append('what_to_gain', '');
      formDataToSend.append('how_did_you_hear', 'consultation_dialog'); // Mark as from consultation dialog

      await submitInternApplication(formDataToSend);
      toast.success("Consultation request submitted successfully! We'll contact you soon.");
      onOpenChange(false);
      
      // Reset form after successful submission
      setFormData({
        fullName: "",
        email: "",
        country: "",
        city: "",
        degree: "",
        gradYear: "",
        startMonth: "",
      });
    } catch (error: any) {
      console.error("Consultation submission error:", error);
      toast.error(error.message || "Failed to submit consultation request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-transparent border-0 shadow-none p-0 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <DialogTitle className="sr-only">Book Consultation</DialogTitle>
        <div className="flex flex-col items-center justify-center">
          <div className="w-full bg-[#c71018] p-6 md:p-8 lg:p-12 text-center rounded-t-3xl relative z-10">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-white mb-3 md:mb-4">
              Book your free internship <br /> placement session.
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed">
              No commitment. We'll understand your goals, review your CV,
              and suggest the best internship options for you.
            </p>
          </div>

          <div className="w-full bg-white p-6 md:p-8 lg:p-12 rounded-b-3xl -mt-4 relative z-20 shadow-2xl max-w-3xl mx-auto">
            <form
              className="space-y-6"
              onSubmit={handleSubmit}
            >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="fullName"
                  className="text-gray-700 font-medium"
                >
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  className="bg-gray-50 border-gray-200 h-12 rounded-xl focus:ring-primary/20"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-gray-700 font-medium"
                >
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="bg-gray-50 border-gray-200 h-12 rounded-xl focus:ring-primary/20"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="country"
                  className="text-gray-700 font-medium"
                >
                  Country
                </Label>
                <Input
                  id="country"
                  placeholder="Current Country"
                  value={formData.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  className="bg-gray-50 border-gray-200 h-12 rounded-xl focus:ring-primary/20"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="city"
                  className="text-gray-700 font-medium"
                >
                  City
                </Label>
                <Input
                  id="city"
                  placeholder="Current City"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className="bg-gray-50 border-gray-200 h-12 rounded-xl focus:ring-primary/20"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="degree"
                  className="text-gray-700 font-medium"
                >
                  Degree / Major
                </Label>
                <Input
                  id="degree"
                  placeholder="e.g. Master of IT"
                  value={formData.degree}
                  onChange={(e) => handleInputChange("degree", e.target.value)}
                  className="bg-gray-50 border-gray-200 h-12 rounded-xl focus:ring-primary/20"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="gradYear"
                  className="text-gray-700 font-medium"
                >
                  Graduation Year
                </Label>
                <Input
                  id="gradYear"
                  placeholder="e.g. 2025"
                  value={formData.gradYear}
                  onChange={(e) => handleInputChange("gradYear", e.target.value)}
                  className="bg-gray-50 border-gray-200 h-12 rounded-xl focus:ring-primary/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="startMonth"
                className="text-gray-700 font-medium"
              >
                Preferred Internship Start Month
              </Label>
              <Select value={formData.startMonth} onValueChange={(value) => handleInputChange("startMonth", value)}>
                <SelectTrigger className="bg-gray-50 border-gray-200 h-12 rounded-xl focus:ring-primary/20">
                  <SelectValue placeholder="Select Month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jan">January</SelectItem>
                  <SelectItem value="feb">February</SelectItem>
                  <SelectItem value="mar">March</SelectItem>
                  <SelectItem value="apr">April</SelectItem>
                  <SelectItem value="may">May</SelectItem>
                  <SelectItem value="jun">June</SelectItem>
                  <SelectItem value="jul">July</SelectItem>
                  <SelectItem value="aug">August</SelectItem>
                  <SelectItem value="sep">September</SelectItem>
                  <SelectItem value="oct">October</SelectItem>
                  <SelectItem value="nov">November</SelectItem>
                  <SelectItem value="dec">December</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              type="submit"
              className="w-full bg-[#bf360c] hover:bg-[#a02e0a] text-white h-14 text-lg font-bold rounded-full shadow-lg shadow-orange-900/20 mt-4"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Book My Session"}
            </Button>

            <div className="flex items-center justify-center gap-2 text-gray-400 text-xs mt-4">
              <Lock className="w-3 h-3" />
              <span>
                Your details are kept private and only used to contact
                you about internship options.
              </span>
            </div>
          </form>
        </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
