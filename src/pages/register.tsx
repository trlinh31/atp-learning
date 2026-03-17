import { useState } from "react";
import { useLocation, Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Check,
  ChevronRight,
  ArrowLeft,
  Building2,
  GraduationCap,
  Search,
  X,
  ChevronsUpDown,
} from "lucide-react";
import { clsx } from "clsx";
import { useAuth } from "@/contexts/AuthContext";
import { completeRegistration } from "@/services/memberService";
import { toast } from "sonner";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

function RegisterPage() {
  const [, setLocation] = useLocation();
  const { member, refreshMember } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState<
    "student" | "employer" | "visitor" | null
  >(null);
  const [openExplorationPopover, setOpenExplorationPopover] = useState(false);
  const [formData, setFormData] = useState({
    first_name: member?.first_name || "",
    last_name: member?.last_name || "",
    email: member?.email || "",
    phone: "",
    country: "",
    state: "",
    city: "",
    role: "",
    company: "",
    degree: "",
    grad_year: "",
    exploration_goal: [] as string[],
    custom_country: "",
    introduction: "",
    linkedin_url: "",
    why_you_join: "",
  });

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleExplorationGoal = (value: string) => {
    setFormData((prev) => {
      const currentGoals = prev.exploration_goal || [];
      if (currentGoals.includes(value)) {
        return {
          ...prev,
          exploration_goal: currentGoals.filter((g) => g !== value),
        };
      } else {
        return {
          ...prev,
          exploration_goal: [...currentGoals, value],
        };
      }
    });
  };

  const handleNext = () => {
    if (step === 1) {
      if (formData.first_name && formData.last_name && formData.email) {
        setStep(2);
      }
    } else if (step === 2) {
      if (userType) {
        setStep(3);
      }
    } else if (step === 3) {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Prepare data for API
      const registrationData: any = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone: formData.phone || undefined,
        country: formData.country === "other" ? formData.custom_country : formData.country,
        state: formData.state || undefined,
        city: formData.city || undefined,
        role: formData.role || undefined,
        company: formData.company || undefined,
        introduction: formData.introduction || undefined,
        linkedin_url: formData.linkedin_url || undefined,
        why_you_join: formData.why_you_join || undefined,
      };

      // Store user type and additional fields in interests
      registrationData.interests = {
        user_type: userType,
        degree: formData.degree || undefined,
        grad_year: formData.grad_year || undefined,
        exploration_goal: Array.isArray(formData.exploration_goal) && formData.exploration_goal.length > 0
          ? formData.exploration_goal
          : undefined,
      };

      await completeRegistration(registrationData);
      await refreshMember();
      toast.success("Registration submitted successfully!");
      setLocation("/student-portal");
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(error.message || "Failed to submit registration");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md mb-8 text-center flex justify-center">
        <Link href="/">
          <img
            src="https://atp-global.com.au/images/logo.webp"
            alt="ATP Global"
            className="h-16 w-auto object-contain cursor-pointer"
          />
        </Link>
      </div>

      <Card className="w-full max-w-2xl shadow-xl border-0 overflow-hidden bg-white rounded-3xl">
        <div className="h-2 bg-gray-100 w-full">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: "33%" }}
            animate={{ width: `${(step / 3) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        <CardHeader className="pt-8 px-8 pb-2">
          <div className="flex items-center justify-between mb-2">
            {step > 1 ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="text-gray-500 -ml-2 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 mr-1" /> Back
              </Button>
            ) : (
              <div />
            )}
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Step {step} of 3
            </span>
          </div>
          <CardTitle className="text-3xl font-serif font-bold text-gray-900">
            {step === 1 && "Let's get started"}
            {step === 2 && "Tell us about yourself"}
            {step === 3 && "Final details"}
          </CardTitle>
          <CardDescription className="text-base text-gray-500 mt-2">
            {step === 1 &&
              "Enter your basic information to create your account."}
            {step === 2 &&
              "Help us customize your experience by selecting your role."}
            {step === 3 && "Just a few more details to complete your profile."}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-8 pt-4">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-5"
              >
                <div className="space-y-2">
                  <Label htmlFor="first_name">First Name *</Label>
                  <Input
                    id="first_name"
                    placeholder="E.g. John"
                    className="h-12 bg-gray-50 border-gray-200 focus:bg-white transition-all"
                    value={formData.first_name}
                    onChange={(e) =>
                      handleInputChange("first_name", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name *</Label>
                  <Input
                    id="last_name"
                    placeholder="E.g. Smith"
                    className="h-12 bg-gray-50 border-gray-200 focus:bg-white transition-all"
                    value={formData.last_name}
                    onChange={(e) =>
                      handleInputChange("last_name", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="h-12 bg-gray-50 border-gray-200 focus:bg-white transition-all"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-4"
              >
                <p className="text-sm font-medium text-gray-700 mb-2">
                  What best describes you?
                </p>

                <button
                  onClick={() => setUserType("student")}
                  className={clsx(
                    "w-full p-4 rounded-2xl border-2 flex items-center gap-4 transition-all text-left group",
                    userType === "student"
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-gray-100 bg-white hover:border-primary/30 hover:bg-gray-50",
                  )}
                >
                  <div
                    className={clsx(
                      "w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors",
                      userType === "student"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-500 group-hover:bg-primary/10 group-hover:text-primary",
                    )}
                  >
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Student</div>
                    <div className="text-sm text-gray-500">
                      I'm studying or recently graduated
                    </div>
                  </div>
                  {userType === "student" && (
                    <Check className="w-5 h-5 text-primary ml-auto" />
                  )}
                </button>

                <button
                  onClick={() => setUserType("employer")}
                  className={clsx(
                    "w-full p-4 rounded-2xl border-2 flex items-center gap-4 transition-all text-left group",
                    userType === "employer"
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-gray-100 bg-white hover:border-primary/30 hover:bg-gray-50",
                  )}
                >
                  <div
                    className={clsx(
                      "w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors",
                      userType === "employer"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-500 group-hover:bg-primary/10 group-hover:text-primary",
                    )}
                  >
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Employer</div>
                    <div className="text-sm text-gray-500">
                      I'm hiring or looking for talent
                    </div>
                  </div>
                  {userType === "employer" && (
                    <Check className="w-5 h-5 text-primary ml-auto" />
                  )}
                </button>

                <button
                  onClick={() => setUserType("visitor")}
                  className={clsx(
                    "w-full p-4 rounded-2xl border-2 flex items-center gap-4 transition-all text-left group",
                    userType === "visitor"
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-gray-100 bg-white hover:border-primary/30 hover:bg-gray-50",
                  )}
                >
                  <div
                    className={clsx(
                      "w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors",
                      userType === "visitor"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-500 group-hover:bg-primary/10 group-hover:text-primary",
                    )}
                  >
                    <Search className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Visitor</div>
                    <div className="text-sm text-gray-500">
                      Researching internship opportunities
                    </div>
                  </div>
                  {userType === "visitor" && (
                    <Check className="w-5 h-5 text-primary ml-auto" />
                  )}
                </button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-5"
              >
                {userType === "student" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="degree">Program</Label>
                      <Select
                        onValueChange={(val) =>
                          handleInputChange("degree", val)
                        }
                        value={formData.degree}
                      >
                        <SelectTrigger className="h-12 bg-gray-50 border-gray-200">
                          <SelectValue placeholder="Select Program" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high_school">High school</SelectItem>
                          <SelectItem value="foundation">
                            Foundation course
                          </SelectItem>
                          <SelectItem value="college">College</SelectItem>
                          <SelectItem value="elicos">ELICOS</SelectItem>
                          <SelectItem value="university">University</SelectItem>
                          <SelectItem value="master">Master</SelectItem>
                          <SelectItem value="phd">PhD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="gradYear">Expected Graduation Year</Label>
                        <Select
                          onValueChange={(val) =>
                            handleInputChange("grad_year", val)
                          }
                          value={formData.grad_year}
                        >
                          <SelectTrigger className="h-12 bg-gray-50 border-gray-200">
                            <SelectValue placeholder="Year" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2023">2023</SelectItem>
                            <SelectItem value="2024">2024</SelectItem>
                            <SelectItem value="2025">2025</SelectItem>
                            <SelectItem value="2026">2026</SelectItem>
                            <SelectItem value="2027">2027</SelectItem>
                            <SelectItem value="2028">2028</SelectItem>
                            <SelectItem value="2029">2029</SelectItem>
                            <SelectItem value="2030">2030</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country of Residence</Label>
                        <Select
                          onValueChange={(val) =>
                            handleInputChange("country", val)
                          }
                          value={formData.country}
                        >
                          <SelectTrigger className="h-12 bg-gray-50 border-gray-200">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent className="max-h-[200px]">
                            <SelectItem value="au">Australia</SelectItem>
                            <SelectItem value="vn">Vietnam</SelectItem>
                            <SelectItem value="in">India</SelectItem>
                            <SelectItem value="cn">China</SelectItem>
                            <SelectItem value="kr">Korean</SelectItem>
                            <SelectItem value="us">
                              The United States
                            </SelectItem>
                            <SelectItem value="ph">Philippines</SelectItem>
                            <SelectItem value="np">Nepal</SelectItem>
                            <SelectItem value="id">Indonesia</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    {formData.country === "au" && (
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Select
                          onValueChange={(val) =>
                            handleInputChange("state", val)
                          }
                          value={formData.state}
                        >
                          <SelectTrigger className="h-12 bg-gray-50 border-gray-200">
                            <SelectValue placeholder="Select State" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="nsw">
                              NSW – New South Wales
                            </SelectItem>
                            <SelectItem value="vic">VIC – Victoria</SelectItem>
                            <SelectItem value="qld">QLD – Queensland</SelectItem>
                            <SelectItem value="sa">SA – South Australia</SelectItem>
                            <SelectItem value="wa">WA – Western Australia</SelectItem>
                            <SelectItem value="tas">TAS – Tasmania</SelectItem>
                            <SelectItem value="act">
                              ACT – Australian Capital Territory
                            </SelectItem>
                            <SelectItem value="nt">
                              NT – Northern Territory
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    {formData.country === "other" && (
                      <div className="space-y-2">
                        <Label htmlFor="customCountry">
                          Please specify country
                        </Label>
                        <Input
                          id="customCountry"
                          placeholder="Enter your country"
                          className="h-12 bg-gray-50 border-gray-200"
                          value={formData.custom_country}
                          onChange={(e) =>
                            handleInputChange("custom_country", e.target.value)
                          }
                        />
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="explore">
                        What do you want to explore?
                      </Label>
                      <Popover open={openExplorationPopover} onOpenChange={setOpenExplorationPopover}>
                        <PopoverTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            role="combobox"
                            aria-expanded={openExplorationPopover}
                            className="w-full justify-between h-12 bg-gray-50 border-gray-200"
                          >
                            {formData.exploration_goal.length > 0
                              ? `${formData.exploration_goal.length} selected`
                              : "Select options"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                          <div className="p-2 space-y-2">
                            {[
                              { value: "internships", label: "Finding internships" },
                              { value: "learning", label: "Learning about Australia" },
                              { value: "advice", label: "Career advice" },
                              { value: "content", label: "Exploring content" },
                            ].map((option) => (
                              <div
                                key={option.value}
                                className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                                onClick={() => toggleExplorationGoal(option.value)}
                              >
                                <Checkbox
                                  checked={formData.exploration_goal.includes(option.value)}
                                  onCheckedChange={() => toggleExplorationGoal(option.value)}
                                />
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                      {formData.exploration_goal.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {formData.exploration_goal.map((goal) => {
                            const labels: Record<string, string> = {
                              internships: "Finding internships",
                              learning: "Learning about Australia",
                              advice: "Career advice",
                              content: "Exploring content",
                            };
                            return (
                              <Badge
                                key={goal}
                                variant="secondary"
                                className="px-3 py-1 text-sm gap-2"
                              >
                                {labels[goal] || goal}
                                <X
                                  className="w-3 h-3 cursor-pointer hover:text-red-500"
                                  onClick={() => toggleExplorationGoal(goal)}
                                />
                              </Badge>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </>
                )}

                {userType === "employer" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="companyName">
                        Company Name{" "}
                        <span className="text-gray-400 font-normal">
                          (Optional)
                        </span>
                      </Label>
                      <Input
                        id="companyName"
                        placeholder="Your Organization"
                        className="h-12 bg-gray-50 border-gray-200"
                        value={formData.company}
                        onChange={(e) =>
                          handleInputChange("company", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">
                        Role / Position{" "}
                        <span className="text-gray-400 font-normal">
                          (Optional)
                        </span>
                      </Label>
                      <Input
                        id="role"
                        placeholder="e.g. HR Manager"
                        className="h-12 bg-gray-50 border-gray-200"
                        value={formData.role}
                        onChange={(e) =>
                          handleInputChange("role", e.target.value)
                        }
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="empCountry">Country</Label>
                        <Select
                          onValueChange={(val) =>
                            handleInputChange("country", val)
                          }
                          value={formData.country}
                        >
                          <SelectTrigger className="h-12 bg-gray-50 border-gray-200">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent className="max-h-[200px]">
                            <SelectItem value="au">Australia</SelectItem>
                            <SelectItem value="vn">Vietnam</SelectItem>
                            <SelectItem value="in">India</SelectItem>
                            <SelectItem value="cn">China</SelectItem>
                            <SelectItem value="kr">Korean</SelectItem>
                            <SelectItem value="us">
                              The United States
                            </SelectItem>
                            <SelectItem value="ph">Philippines</SelectItem>
                            <SelectItem value="np">Nepal</SelectItem>
                            <SelectItem value="id">Indonesia</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {formData.country === "au" && (
                        <div className="space-y-2">
                          <Label htmlFor="empState">
                            State{" "}
                            <span className="text-gray-400 font-normal">
                              (Optional)
                            </span>
                          </Label>
                          <Select
                            onValueChange={(val) =>
                              handleInputChange("state", val)
                            }
                            value={formData.state}
                          >
                            <SelectTrigger className="h-12 bg-gray-50 border-gray-200">
                              <SelectValue placeholder="Select State" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="nsw">
                                NSW – New South Wales
                              </SelectItem>
                              <SelectItem value="vic">VIC – Victoria</SelectItem>
                              <SelectItem value="qld">QLD – Queensland</SelectItem>
                              <SelectItem value="sa">SA – South Australia</SelectItem>
                              <SelectItem value="wa">WA – Western Australia</SelectItem>
                              <SelectItem value="tas">TAS – Tasmania</SelectItem>
                              <SelectItem value="act">
                                ACT – Australian Capital Territory
                              </SelectItem>
                              <SelectItem value="nt">
                                NT – Northern Territory
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>
                    {formData.country === "other" && (
                      <div className="space-y-2">
                        <Label htmlFor="customCountry">
                          Please specify country
                        </Label>
                        <Input
                          id="customCountry"
                          placeholder="Enter your country"
                          className="h-12 bg-gray-50 border-gray-200"
                          value={formData.custom_country}
                          onChange={(e) =>
                            handleInputChange("custom_country", e.target.value)
                          }
                        />
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="explore">
                        What do you want to explore?
                      </Label>
                      <Popover open={openExplorationPopover} onOpenChange={setOpenExplorationPopover}>
                        <PopoverTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            role="combobox"
                            aria-expanded={openExplorationPopover}
                            className="w-full justify-between h-12 bg-gray-50 border-gray-200"
                          >
                            {formData.exploration_goal.length > 0
                              ? `${formData.exploration_goal.length} selected`
                              : "Select options"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                          <div className="p-2 space-y-2">
                            {[
                              { value: "internships", label: "Finding internships" },
                              { value: "learning", label: "Learning about Australia" },
                              { value: "advice", label: "Career advice" },
                              { value: "content", label: "Exploring content" },
                            ].map((option) => (
                              <div
                                key={option.value}
                                className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                                onClick={() => toggleExplorationGoal(option.value)}
                              >
                                <Checkbox
                                  checked={formData.exploration_goal.includes(option.value)}
                                  onCheckedChange={() => toggleExplorationGoal(option.value)}
                                />
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                      {formData.exploration_goal.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {formData.exploration_goal.map((goal) => {
                            const labels: Record<string, string> = {
                              internships: "Finding internships",
                              learning: "Learning about Australia",
                              advice: "Career advice",
                              content: "Exploring content",
                            };
                            return (
                              <Badge
                                key={goal}
                                variant="secondary"
                                className="px-3 py-1 text-sm gap-2"
                              >
                                {labels[goal] || goal}
                                <X
                                  className="w-3 h-3 cursor-pointer hover:text-red-500"
                                  onClick={() => toggleExplorationGoal(goal)}
                                />
                              </Badge>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </>
                )}

                {userType === "visitor" && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Select
                          onValueChange={(val) =>
                            handleInputChange("country", val)
                          }
                          value={formData.country}
                        >
                          <SelectTrigger className="h-12 bg-gray-50 border-gray-200">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent className="max-h-[200px]">
                            <SelectItem value="au">Australia</SelectItem>
                            <SelectItem value="vn">Vietnam</SelectItem>
                            <SelectItem value="in">India</SelectItem>
                            <SelectItem value="cn">China</SelectItem>
                            <SelectItem value="kr">Korean</SelectItem>
                            <SelectItem value="us">
                              The United States
                            </SelectItem>
                            <SelectItem value="ph">Philippines</SelectItem>
                            <SelectItem value="np">Nepal</SelectItem>
                            <SelectItem value="id">Indonesia</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {formData.country === "au" && (
                        <div className="space-y-2">
                          <Label htmlFor="state">
                            State{" "}
                            <span className="text-gray-400 font-normal">
                              (Optional)
                            </span>
                          </Label>
                          <Select
                            onValueChange={(val) =>
                              handleInputChange("state", val)
                            }
                            value={formData.state}
                          >
                            <SelectTrigger className="h-12 bg-gray-50 border-gray-200">
                              <SelectValue placeholder="Select State" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="nsw">
                                NSW – New South Wales
                              </SelectItem>
                              <SelectItem value="vic">VIC – Victoria</SelectItem>
                              <SelectItem value="qld">QLD – Queensland</SelectItem>
                              <SelectItem value="sa">SA – South Australia</SelectItem>
                              <SelectItem value="wa">WA – Western Australia</SelectItem>
                              <SelectItem value="tas">TAS – Tasmania</SelectItem>
                              <SelectItem value="act">
                                ACT – Australian Capital Territory
                              </SelectItem>
                              <SelectItem value="nt">
                                NT – Northern Territory
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>
                    {formData.country === "other" && (
                      <div className="space-y-2">
                        <Label htmlFor="customCountry">
                          Please specify country
                        </Label>
                        <Input
                          id="customCountry"
                          placeholder="Enter your country"
                          className="h-12 bg-gray-50 border-gray-200"
                          value={formData.custom_country}
                          onChange={(e) =>
                            handleInputChange("custom_country", e.target.value)
                          }
                        />
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="explore">
                        What do you want to explore?
                      </Label>
                      <Popover open={openExplorationPopover} onOpenChange={setOpenExplorationPopover}>
                        <PopoverTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            role="combobox"
                            aria-expanded={openExplorationPopover}
                            className="w-full justify-between h-12 bg-gray-50 border-gray-200"
                          >
                            {formData.exploration_goal.length > 0
                              ? `${formData.exploration_goal.length} selected`
                              : "Select options"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                          <div className="p-2 space-y-2">
                            {[
                              { value: "internships", label: "Finding internships" },
                              { value: "learning", label: "Learning about Australia" },
                              { value: "advice", label: "Career advice" },
                              { value: "content", label: "Exploring content" },
                            ].map((option) => (
                              <div
                                key={option.value}
                                className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                                onClick={() => toggleExplorationGoal(option.value)}
                              >
                                <Checkbox
                                  checked={formData.exploration_goal.includes(option.value)}
                                  onCheckedChange={() => toggleExplorationGoal(option.value)}
                                />
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                      {formData.exploration_goal.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {formData.exploration_goal.map((goal) => {
                            const labels: Record<string, string> = {
                              internships: "Finding internships",
                              learning: "Learning about Australia",
                              advice: "Career advice",
                              content: "Exploring content",
                            };
                            return (
                              <Badge
                                key={goal}
                                variant="secondary"
                                className="px-3 py-1 text-sm gap-2"
                              >
                                {labels[goal] || goal}
                                <X
                                  className="w-3 h-3 cursor-pointer hover:text-red-500"
                                  onClick={() => toggleExplorationGoal(goal)}
                                />
                              </Badge>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>

        <CardFooter className="p-8 pt-0 flex items-center justify-between">
          {step === 1 && (
            <div className="text-sm text-gray-500">
              Already have an account?{" "}
              <span className="text-primary font-bold cursor-pointer hover:underline">
                Log in
              </span>
            </div>
          )}
          <Button
            onClick={handleNext}
            className="ml-auto rounded-full bg-primary hover:bg-primary/90 text-white px-8 h-12 shadow-lg shadow-primary/20"
            disabled={
              loading ||
              (step === 1 &&
                (!formData.first_name ||
                  !formData.last_name ||
                  !formData.email)) ||
              (step === 2 && !userType)
            }
          >
            {loading
              ? "Submitting..."
              : step === 3
                ? "Let's join!"
                : "Next Step"}
            {step !== 3 && !loading && (
              <ChevronRight className="w-4 h-4 ml-2" />
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default function Register() {
  return (
    <ProtectedRoute requireStatus="created">
      <RegisterPage />
    </ProtectedRoute>
  );
}
