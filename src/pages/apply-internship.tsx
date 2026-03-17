import { useState, useEffect } from "react";
import { useLocation, Link, useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Plus, Trash2, Upload, ArrowLeft, X, ChevronsUpDown } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { submitInternApplication } from "@/services/internService";
import { useAuth } from "@/contexts/AuthContext";

const INTERNSHIP_POSITIONS = [
  "Accounting & Finance",
  "Administration & Office Support",
  "Analytics & Business Intelligence",
  "Architecture & Construction",
  "Banking & Financial Services",
  "Consulting & Strategy",
  "Customer Service & Call Centre",
  "Data Science & AI",
  "Design (Graphic / UX / UI)",
  "Education & Training",
  "Engineering (Civil / Electrical / Mechanical / Software)",
  "Healthcare & Medical",
  "Human Resources & Recruitment",
  "Information Technology (IT)",
  "Legal & Compliance",
  "Logistics, Supply Chain & Procurement",
  "Manufacturing & Operations",
  "Marketing, Advertising & PR",
  "Media, Communications & Content",
  "Non-Profit & Social Impact",
  "Product Management",
  "Project & Program Management",
  "Research & Development",
  "Retail & Hospitality",
  "Sales & Business Development",
  "Science & Laboratory",
  "Software Development",
  "Startups & Entrepreneurship",
  "Sustainability & Environmental",
  "Trades & Technical Services",
  "Other"
];

const SOCIAL_MEDIA_OPTIONS = [
  "LinkedIn",
  "Facebook",
  "Instagram",
  "Portfolio/Website",
  "Other"
];

export default function ApplyInternship() {
  const [location, setLocation] = useLocation();
  const { member, loading: authLoading } = useAuth();
  const [hasJobId, params] = useRoute("/apply-internship/:jobId");
  const jobId = hasJobId && params?.jobId ? parseInt(params.jobId) : null;
  
  const [educations, setEducations] = useState([{ id: 1, school: "", major: "", year: "" }]);
  const [hasExperience, setHasExperience] = useState<"yes" | "no" | null>(null);
  const [hasCV, setHasCV] = useState<"yes" | "no" | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Multi-select state for positions
  const [openCombobox, setOpenCombobox] = useState(false);
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
  const [otherPosition, setOtherPosition] = useState("");

  // Form data
  const [formData, setFormData] = useState({
    email: member?.email || "",
    introduction: "",
    preferredLocation: "",
    startDate: "",
    internshipType: "",
    country: "",
    state: "",
    city: "",
    whatsapp: "",
    socialMediaPlatform: "",
    socialMediaLink: "",
    whatToGain: "",
    howDidYouHear: "",
    experienceDescription: "",
  });

  // Auto-fill email from member when logged in
  useEffect(() => {
    if (member?.email && !authLoading) {
      setFormData(prev => ({
        ...prev,
        email: member.email
      }));
    }
  }, [member?.email, authLoading]);

  const togglePosition = (currentValue: string) => {
    if (selectedPositions.includes(currentValue)) {
      setSelectedPositions(selectedPositions.filter((item) => item !== currentValue));
    } else {
      if (selectedPositions.length < 3) {
        setSelectedPositions([...selectedPositions, currentValue]);
      }
    }
  };

  const addEducation = () => {
    setEducations([...educations, { id: Date.now(), school: "", major: "", year: "" }]);
  };

  const removeEducation = (id: number) => {
    if (educations.length > 1) {
      setEducations(educations.filter(edu => edu.id !== id));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        toast.error("File size must be less than 8MB");
        return;
      }
      if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
        toast.error("Please upload a PDF or DOCX file");
        return;
      }
      setCvFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (selectedPositions.length === 0) {
      toast.error("Please select at least one internship position");
      return;
    }

    if (hasCV === "yes" && !cvFile) {
      toast.error("Please upload your CV");
      return;
    }

    if (hasCV === "no" && educations.some(edu => !edu.school || !edu.major || !edu.year)) {
      toast.error("Please fill in all education fields");
      return;
    }

    if (!formData.preferredLocation || !formData.startDate || !formData.internshipType) {
      toast.error("Please fill in all required internship preference fields");
      return;
    }

    if (!formData.email && !member?.email) {
      toast.error("Email is required");
      return;
    }

    if (!formData.whatsapp) {
      toast.error("WhatsApp is required");
      return;
    }

    if (!formData.howDidYouHear) {
      toast.error("Please select how you heard about ATP Intern");
      return;
    }

    try {
      setLoading(true);

      const formDataToSend = new FormData();
      // job_id is optional - can be 0 or null if applying without specific job
      formDataToSend.append('job_id', jobId ? jobId.toString() : '0');
      if (formData.email) {
        formDataToSend.append('email', formData.email);
      }
      formDataToSend.append('introduction', formData.introduction || '');
      formDataToSend.append('positions', JSON.stringify(selectedPositions));
      if (otherPosition) {
        formDataToSend.append('other_position', otherPosition);
      }
      formDataToSend.append('preferred_location', formData.preferredLocation);
      formDataToSend.append('start_date', formData.startDate);
      formDataToSend.append('internship_type', formData.internshipType);
      formDataToSend.append('has_cv', hasCV || 'no');
      
      if (hasCV === "yes" && cvFile) {
        formDataToSend.append('cv_file', cvFile);
      } else if (hasCV === "no") {
        formDataToSend.append('educations', JSON.stringify(educations));
        formDataToSend.append('country', formData.country);
        formDataToSend.append('state', formData.state || '');
        formDataToSend.append('city', formData.city || '');
        if (hasExperience === "yes") {
          formDataToSend.append('experience_description', formData.experienceDescription);
        }
      }
      
      formDataToSend.append('whatsapp', formData.whatsapp);
      if (formData.socialMediaPlatform && formData.socialMediaLink) {
        formDataToSend.append('social_media_platform', formData.socialMediaPlatform);
        formDataToSend.append('social_media_link', formData.socialMediaLink);
      }
      formDataToSend.append('what_to_gain', formData.whatToGain || '');
      formDataToSend.append('how_did_you_hear', formData.howDidYouHear);

      await submitInternApplication(formDataToSend);
      toast.success("Application submitted successfully!");
      setLocation("/apply-success");
    } catch (error: any) {
      console.error("Application error:", error);
      toast.error(error.message || "Failed to submit application");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
            <Link href="/">
              <span className="text-2xl font-serif font-bold text-primary tracking-tight cursor-pointer">ATP Global.</span>
            </Link>
            <div className="flex items-center gap-4">
                <Link href="/">
                    <Button variant="ghost" className="text-gray-500 hover:text-primary">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                    </Button>
                </Link>
            </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-10 text-center">
            <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Internship Application</h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                Tell us about yourself, your background, and what you're looking for. We'll help you find the perfect match.
            </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
            <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
              <div className="bg-primary/5 px-8 py-4 border-b border-primary/10">
                <h2 className="text-xl font-bold text-primary">Contact Information</h2>
              </div>
              <CardContent className="p-8">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-base font-medium">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      className="bg-gray-50 border-gray-200 focus:bg-white transition-all"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 1. Introduction Section (Optional) */}
            <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                <div className="bg-primary/5 px-8 py-4 border-b border-primary/10">
                    <h2 className="text-xl font-bold text-primary">Introduction (Optional)</h2>
                </div>
                <CardContent className="p-8">
                    <div className="space-y-4">
                        <Label htmlFor="intro" className="text-base font-medium">
                            Tell us about your background, your study focus, and what you're passionate about
                        </Label>
                        <Textarea 
                            id="intro" 
                            placeholder="I am a recent graduate with a passion for..." 
                            className="min-h-[120px] bg-gray-50 border-gray-200 focus:bg-white transition-all"
                            value={formData.introduction}
                            onChange={(e) => setFormData({...formData, introduction: e.target.value})}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* 2. Desired Internship Position */}
            <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                <div className="bg-primary/5 px-8 py-4 border-b border-primary/10">
                    <h2 className="text-xl font-bold text-primary">Desired Internship Position</h2>
                </div>
                <CardContent className="p-8 space-y-8">
                    {/* Multi-select Position */}
                    <div className="space-y-3">
                        <Label className="text-base font-medium">Select up to 3 positions *</Label>
                        
                        <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
                          <PopoverTrigger asChild>
                            <Button
                              type="button"
                              variant="outline"
                              role="combobox"
                              aria-expanded={openCombobox}
                              className="w-full justify-between bg-gray-50 border-gray-200 h-12 text-base"
                            >
                              {selectedPositions.length > 0 
                                ? `${selectedPositions.length} selected` 
                                : "Search and select positions..."}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                            <Command>
                              <CommandInput placeholder="Search positions..." />
                              <CommandList>
                                <CommandEmpty>No position found.</CommandEmpty>
                                <CommandGroup className="max-h-64 overflow-auto">
                                  {INTERNSHIP_POSITIONS.map((position) => (
                                    <CommandItem
                                      key={position}
                                      value={position}
                                      onSelect={() => togglePosition(position)}
                                      disabled={!selectedPositions.includes(position) && selectedPositions.length >= 3}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          selectedPositions.includes(position) ? "opacity-100" : "opacity-0"
                                        )}
                                      />
                                      {position}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>

                        {/* Selected Badges */}
                        <div className="flex flex-wrap gap-2 min-h-[2rem]">
                          {selectedPositions.map((pos) => (
                            <Badge key={pos} variant="secondary" className="px-3 py-1 text-sm gap-2">
                              {pos}
                              <X 
                                className="w-3 h-3 cursor-pointer hover:text-red-500" 
                                onClick={() => togglePosition(pos)}
                              />
                            </Badge>
                          ))}
                        </div>

                        {selectedPositions.length === 3 && (
                          <p className="text-sm text-amber-600">
                            You have selected the maximum of 3 positions.
                          </p>
                        )}

                        {selectedPositions.includes("Other") && (
                           <div className="pt-2 animate-in fade-in slide-in-from-top-2">
                              <Label htmlFor="other-pos" className="mb-2 block">Please specify "Other"</Label>
                              <Input 
                                id="other-pos"
                                value={otherPosition}
                                onChange={(e) => setOtherPosition(e.target.value)}
                                placeholder="Type your desired position..."
                                className="bg-gray-50 border-gray-200"
                              />
                           </div>
                        )}
                    </div>

                    <div className="h-px bg-gray-100 my-6" />
                    
                    {/* Internship Preferences Details */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="prefLocation">Preferred Location *</Label>
                            <Input 
                              id="prefLocation" 
                              placeholder="e.g. Melbourne" 
                              className="bg-gray-50 border-gray-200" 
                              value={formData.preferredLocation}
                              onChange={(e) => setFormData({...formData, preferredLocation: e.target.value})}
                              required 
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>When do you want to start? *</Label>
                            <div className="relative">
                                <Input 
                                  type="date" 
                                  className="bg-gray-50 border-gray-200" 
                                  value={formData.startDate}
                                  onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                                  required 
                                />
                            </div>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label>Type of Internship *</Label>
                            <Select 
                              required
                              value={formData.internshipType}
                              onValueChange={(value) => setFormData({...formData, internshipType: value})}
                            >
                                <SelectTrigger className="bg-gray-50 border-gray-200">
                                    <SelectValue placeholder="Select Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="remote">Remote</SelectItem>
                                    <SelectItem value="onsite">Onsite</SelectItem>
                                    <SelectItem value="hybrid">Hybrid</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* 3. CV / Background Info */}
            <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                <div className="bg-primary/5 px-8 py-4 border-b border-primary/10">
                    <h2 className="text-xl font-bold text-primary">Resume / CV</h2>
                </div>
                <CardContent className="p-8 space-y-6">
                    <div className="space-y-4">
                        <Label className="text-base">Do you have a Resume/CV? *</Label>
                        <RadioGroup 
                            onValueChange={(val) => setHasCV(val as "yes" | "no")} 
                            className="flex gap-6"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yes" id="cv-yes" />
                                <Label htmlFor="cv-yes" className="font-normal cursor-pointer">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id="cv-no" />
                                <Label htmlFor="cv-no" className="font-normal cursor-pointer">No</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {hasCV === "yes" && (
                         <div className="animate-in fade-in slide-in-from-top-4 space-y-4 pt-2">
                            <Label>Please upload your most recent CV or resume for our review *</Label>
                            <div className="flex items-center gap-4">
                                <input
                                  type="file"
                                  id="cv-upload"
                                  accept=".pdf,.doc,.docx"
                                  onChange={handleFileChange}
                                  className="hidden"
                                />
                                <Button 
                                  type="button" 
                                  variant="outline" 
                                  className="bg-gray-50"
                                  onClick={() => document.getElementById('cv-upload')?.click()}
                                >
                                  Choose file
                                </Button>
                                <span className="text-gray-500 text-sm">
                                  {cvFile ? cvFile.name : "No file chosen"}
                                </span>
                            </div>
                            <p className="text-xs text-gray-400 flex items-center gap-1">
                                <Upload className="w-3 h-3" /> Upload PDF or DOCX file (max 8MB)
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {hasCV === "no" && (
                <div className="space-y-8 animate-in fade-in slide-in-from-top-8">
                    {/* 4. Location */}
                    <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                        <div className="bg-primary/5 px-8 py-4 border-b border-primary/10">
                            <h2 className="text-xl font-bold text-primary">Current Location</h2>
                        </div>
                        <CardContent className="p-8">
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="country">Country *</Label>
                                    <Input 
                                      id="country" 
                                      placeholder="e.g. Australia" 
                                      className="bg-gray-50 border-gray-200" 
                                      value={formData.country}
                                      onChange={(e) => setFormData({...formData, country: e.target.value})}
                                      required 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="state">State *</Label>
                                    <Input 
                                      id="state" 
                                      placeholder="e.g. Victoria" 
                                      className="bg-gray-50 border-gray-200" 
                                      value={formData.state}
                                      onChange={(e) => setFormData({...formData, state: e.target.value})}
                                      required 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="city">City (Optional)</Label>
                                    <Input 
                                      id="city" 
                                      placeholder="e.g. Melbourne" 
                                      className="bg-gray-50 border-gray-200" 
                                      value={formData.city}
                                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 5. Education */}
                    <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                        <div className="bg-primary/5 px-8 py-4 border-b border-primary/10 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-primary">Education</h2>
                        </div>
                        <CardContent className="p-8 space-y-6">
                            {educations.map((edu, index) => (
                                <div key={edu.id} className="grid md:grid-cols-12 gap-4 items-end pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                                    <div className="md:col-span-4 space-y-2">
                                        <Label>University Name</Label>
                                        <Input 
                                          placeholder="e.g. Deakin University" 
                                          className="bg-gray-50 border-gray-200" 
                                          value={edu.school}
                                          onChange={(e) => {
                                            const newEducations = [...educations];
                                            newEducations[index].school = e.target.value;
                                            setEducations(newEducations);
                                          }}
                                        />
                                    </div>
                                    <div className="md:col-span-4 space-y-2">
                                        <Label>Major/Field of Study</Label>
                                        <Input 
                                          placeholder="e.g. Computer Science" 
                                          className="bg-gray-50 border-gray-200" 
                                          value={edu.major}
                                          onChange={(e) => {
                                            const newEducations = [...educations];
                                            newEducations[index].major = e.target.value;
                                            setEducations(newEducations);
                                          }}
                                        />
                                    </div>
                                    <div className="md:col-span-3 space-y-2">
                                        <Label>Start Year</Label>
                                        <Input 
                                          placeholder="e.g. 2021" 
                                          className="bg-gray-50 border-gray-200" 
                                          value={edu.year}
                                          onChange={(e) => {
                                            const newEducations = [...educations];
                                            newEducations[index].year = e.target.value;
                                            setEducations(newEducations);
                                          }}
                                        />
                                    </div>
                                    <div className="md:col-span-1">
                                        {educations.length > 1 && (
                                            <Button type="button" variant="ghost" size="icon" onClick={() => removeEducation(edu.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50">
                                                <Trash2 className="w-5 h-5" />
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))}
                            <Button type="button" variant="outline" onClick={addEducation} className="mt-2 text-primary border-primary/20 hover:bg-primary/5">
                                <Plus className="w-4 h-4 mr-2" /> Add Education
                            </Button>
                        </CardContent>
                    </Card>

                    {/* 6. Experience */}
                    <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                        <div className="bg-primary/5 px-8 py-4 border-b border-primary/10 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-primary">Experience</h2>
                        </div>
                        <CardContent className="p-8 space-y-6">
                            <div className="space-y-4">
                                <Label className="text-base">Do you have previous work experience?</Label>
                                <RadioGroup 
                                    onValueChange={(val) => setHasExperience(val as "yes" | "no")} 
                                    className="flex gap-6"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="yes" id="exp-yes" />
                                        <Label htmlFor="exp-yes" className="font-normal cursor-pointer">Yes</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="no" id="exp-no" />
                                        <Label htmlFor="exp-no" className="font-normal cursor-pointer">No</Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            {hasExperience === "yes" && (
                                <div className="animate-in fade-in slide-in-from-top-4 pt-2">
                                    <Label htmlFor="exp-desc" className="mb-2 block">Please shortly describe what you have done</Label>
                                    <Textarea 
                                        id="exp-desc"
                                        placeholder="I worked as a..." 
                                        className="min-h-[100px] bg-gray-50 border-gray-200"
                                        value={formData.experienceDescription}
                                        onChange={(e) => setFormData({...formData, experienceDescription: e.target.value})}
                                    />
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* 7. Contact */}
            <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                <div className="bg-primary/5 px-8 py-4 border-b border-primary/10">
                    <h2 className="text-xl font-bold text-primary">Contact</h2>
                </div>
                <CardContent className="p-8">
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                         <div className="space-y-2">
                            <Label>WhatsApp *</Label>
                            <Input 
                              placeholder="+61 ..." 
                              className="bg-gray-50 border-gray-200" 
                              value={formData.whatsapp}
                              onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                              required 
                            />
                            <p className="text-xs text-gray-500">
                                WhatsApp is mandatory. If you do not have one, please provide your Facebook profile link below so we can reach you.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <Label>Social Media (Optional)</Label>
                            <div className="flex gap-2">
                                <Select
                                  value={formData.socialMediaPlatform}
                                  onValueChange={(value) => setFormData({...formData, socialMediaPlatform: value})}
                                >
                                    <SelectTrigger className="w-[140px] bg-gray-50 border-gray-200">
                                        <SelectValue placeholder="Platform" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {SOCIAL_MEDIA_OPTIONS.map(opt => (
                                            <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Input 
                                  placeholder="Link to profile (Preferably Facebook)" 
                                  className="flex-1 bg-gray-50 border-gray-200" 
                                  value={formData.socialMediaLink}
                                  onChange={(e) => setFormData({...formData, socialMediaLink: e.target.value})}
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

             {/* 8. Final Questions */}
             <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                <div className="bg-primary/5 px-8 py-4 border-b border-primary/10">
                    <h2 className="text-xl font-bold text-primary">Final Questions</h2>
                </div>
                <CardContent className="p-8 space-y-6">
                    <div className="space-y-2">
                        <Label>What do you hope to gain from this internship? (Optional)</Label>
                        <Textarea 
                          className="min-h-[100px] bg-gray-50 border-gray-200" 
                          value={formData.whatToGain}
                          onChange={(e) => setFormData({...formData, whatToGain: e.target.value})}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>How did you hear about ATP Intern? *</Label>
                        <Select 
                          required
                          value={formData.howDidYouHear}
                          onValueChange={(value) => setFormData({...formData, howDidYouHear: value})}
                        >
                            <SelectTrigger className="bg-gray-50 border-gray-200">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="linkedin">LinkedIn</SelectItem>
                                <SelectItem value="facebook">Facebook</SelectItem>
                                <SelectItem value="friend">Friend</SelectItem>
                                <SelectItem value="search">Search Engine</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                </CardContent>
            </Card>

             {/* Submit Button */}
            <div className="bg-sky-50 border border-sky-100 rounded-2xl p-8 flex flex-col items-center text-center">
                <h3 className="text-xl font-bold text-sky-900 mb-2">Ready to Submit?</h3>
                <p className="text-sky-800 mb-6 max-w-xl">
                    Our team will review your application and get back to you shortly.
                </p>
                <Button 
                  type="submit" 
                  className="bg-primary hover:bg-primary/90 text-white px-12 py-6 text-lg rounded-full font-medium w-full md:w-auto"
                  disabled={loading}
                >
                    {loading ? "Submitting..." : "Submit Application"}
                </Button>
            </div>
        </form>
      </div>
    </div>
  );
}