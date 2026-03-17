import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  Search,
  MapPin,
  Briefcase,
  Linkedin,
  Github,
  Globe,
  Facebook,
  Instagram,
  MessageCircle,
  Phone,
  Mail,
  GraduationCap,
  Building2,
  Heart,
  Target,
  Loader2,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { get } from "@/lib/api";
import Sidebar from "@/components/Sidebar";

interface Member {
  id: number;
  full_name: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar?: string;
  role?: string;
  company?: string;
  city?: string;
  country?: string;
  year_of_experience?: number;
  introduction?: string;
  linkedin_url?: string;
  github_url?: string;
  personal_site_url?: string;
  facebook_url?: string;
  instagram_url?: string;
  whatsapp_url?: string;
  zalo_url?: string;
  phone?: string;
  interests?: any;
  educations?: Array<{
    school_name?: string;
    major?: string;
    academic_year?: string;
  }>;
  experiences?: Array<{
    role?: string;
    company?: string;
    years?: number;
  }>;
}

async function getMembers(params?: {
  search?: string;
  country?: string;
  role?: string;
  page?: number;
}) {
  const queryParams = new URLSearchParams();
  if (params?.search) queryParams.append('search', params.search);
  if (params?.country) queryParams.append('country', params.country);
  if (params?.role) queryParams.append('role', params.role);
  if (params?.page) queryParams.append('page', params.page.toString());

  return get(`/api/community/members${queryParams.toString() ? `?${queryParams.toString()}` : ''}`);
}

export default function Members() {
  const [filters, setFilters] = useState({
    search: '',
    country: '',
    role: '',
  });

  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: membersData, isLoading } = useQuery({
    queryKey: ['members', filters],
    queryFn: () => getMembers(filters),
  });

  const members = membersData?.data || [];
  const countries = [...new Set(members.map((m: Member) => m.country).filter(Boolean))];

  const handleSearch = () => {
    // Trigger refetch by updating filters
    setFilters({ ...filters });
  };

  const handleMemberClick = (memberData: Member) => {
    setSelectedMember(memberData);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-secondary/30 font-sans text-foreground flex">
      {/* Sidebar */}
      <Sidebar activePage="members" />

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {/* Header */}
        <header className="h-20 bg-white border-b border-gray-100 sticky top-0 z-10 px-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-serif font-bold text-gray-900">Community Members</h1>
            <p className="text-sm text-gray-500">Connect with fellow ATP members worldwide</p>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto space-y-6">
          {/* Filter Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search by name, company..."
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    className="pl-10"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
              </div>
              <div>
                <Select value={filters.country || "all"} onValueChange={(value) => setFilters({ ...filters, country: value === "all" ? "" : value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Countries" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Countries</SelectItem>
                    {countries.map((country: string) => (
                      <SelectItem key={country} value={country}>{country}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Button onClick={handleSearch} className="w-full bg-primary hover:bg-primary/90">
                  <Search className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </div>

          {/* Members Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : members.length === 0 ? (
            <div className="text-center py-20">
              <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No members found</h3>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {members.map((memberItem: Member, index: number) => (
                <motion.div
                  key={memberItem.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleMemberClick(memberItem)}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="text-center">
                    <div className="mb-4">
                      {memberItem.avatar ? (
                        <img
                          src={memberItem.avatar}
                          alt={memberItem.full_name}
                          className="w-16 h-16 rounded-full object-cover mx-auto border-2 border-gray-100"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto">
                          <User className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors">
                      {memberItem.full_name}
                    </h3>

                    {memberItem.role && (
                      <p className="text-sm text-gray-600 mb-2 flex items-center justify-center gap-1">
                        <Briefcase className="w-3 h-3" />
                        {memberItem.role}
                        {memberItem.company && ` at ${memberItem.company}`}
                      </p>
                    )}

                    {memberItem.city && memberItem.country && (
                      <p className="text-sm text-gray-500 mb-3 flex items-center justify-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {memberItem.city}, {memberItem.country}
                      </p>
                    )}

                    {/* Social Links */}
                    <div className="flex items-center justify-center gap-2 pt-3 border-t border-gray-100">
                      {memberItem.linkedin_url && (
                        <a href={memberItem.linkedin_url} target="_blank" rel="noopener noreferrer" 
                           onClick={(e) => e.stopPropagation()}
                           className="text-blue-600 hover:text-blue-700">
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                      {memberItem.github_url && (
                        <a href={memberItem.github_url} target="_blank" rel="noopener noreferrer"
                           onClick={(e) => e.stopPropagation()}
                           className="text-gray-700 hover:text-gray-900">
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {memberItem.personal_site_url && (
                        <a href={memberItem.personal_site_url} target="_blank" rel="noopener noreferrer"
                           onClick={(e) => e.stopPropagation()}
                           className="text-blue-500 hover:text-blue-600">
                          <Globe className="w-4 h-4" />
                        </a>
                      )}
                      {memberItem.facebook_url && (
                        <a href={memberItem.facebook_url} target="_blank" rel="noopener noreferrer"
                           onClick={(e) => e.stopPropagation()}
                           className="text-blue-600 hover:text-blue-700">
                          <Facebook className="w-4 h-4" />
                        </a>
                      )}
                      {memberItem.instagram_url && (
                        <a href={memberItem.instagram_url} target="_blank" rel="noopener noreferrer"
                           onClick={(e) => e.stopPropagation()}
                           className="text-pink-600 hover:text-pink-700">
                          <Instagram className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Member Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          </DialogHeader>

          {selectedMember && (
            <div className="space-y-6">
              {/* Profile Header */}
              <div className="text-center pb-6 border-b">
                {selectedMember.avatar ? (
                  <img
                    src={selectedMember.avatar}
                    alt={selectedMember.full_name}
                    className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-gray-100"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                    <User className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{selectedMember.full_name}</h2>
                {selectedMember.role && (
                  <p className="text-gray-600">
                    {selectedMember.role}
                    {selectedMember.company && ` at ${selectedMember.company}`}
                  </p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Contact Information */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <Mail className="w-5 h-5 text-primary" />
                      Contact Information
                    </h3>
                    <div className="space-y-2 text-sm">
                      {selectedMember.email && (
                        <div>
                          <span className="font-medium text-gray-700">Email:</span>
                          <p className="text-gray-600">{selectedMember.email}</p>
                        </div>
                      )}
                      {selectedMember.phone && (
                        <div>
                          <span className="font-medium text-gray-700">Phone:</span>
                          <p className="text-gray-600">{selectedMember.phone}</p>
                        </div>
                      )}
                      {selectedMember.city && selectedMember.country && (
                        <div>
                          <span className="font-medium text-gray-700">Location:</span>
                          <p className="text-gray-600">{selectedMember.city}, {selectedMember.country}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Education */}
                  {selectedMember.educations && selectedMember.educations.length > 0 && (
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-primary" />
                        Education
                      </h3>
                      <div className="space-y-3">
                        {selectedMember.educations.map((edu, idx) => (
                          <div key={idx} className="text-sm">
                            <p className="font-medium text-gray-700">{edu.school_name}</p>
                            <p className="text-gray-600">
                              {edu.major}
                              {edu.academic_year && ` (${edu.academic_year})`}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Social Links */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <Globe className="w-5 h-5 text-primary" />
                      Social Links
                    </h3>
                    <div className="flex items-center gap-3">
                      {selectedMember.linkedin_url && (
                        <a href={selectedMember.linkedin_url} target="_blank" rel="noopener noreferrer"
                           className="text-blue-600 hover:text-blue-700">
                          <Linkedin className="w-6 h-6" />
                        </a>
                      )}
                      {selectedMember.github_url && (
                        <a href={selectedMember.github_url} target="_blank" rel="noopener noreferrer"
                           className="text-gray-700 hover:text-gray-900">
                          <Github className="w-6 h-6" />
                        </a>
                      )}
                      {selectedMember.personal_site_url && (
                        <a href={selectedMember.personal_site_url} target="_blank" rel="noopener noreferrer"
                           className="text-blue-500 hover:text-blue-600">
                          <Globe className="w-6 h-6" />
                        </a>
                      )}
                      {selectedMember.facebook_url && (
                        <a href={selectedMember.facebook_url} target="_blank" rel="noopener noreferrer"
                           className="text-blue-600 hover:text-blue-700">
                          <Facebook className="w-6 h-6" />
                        </a>
                      )}
                      {selectedMember.instagram_url && (
                        <a href={selectedMember.instagram_url} target="_blank" rel="noopener noreferrer"
                           className="text-pink-600 hover:text-pink-700">
                          <Instagram className="w-6 h-6" />
                        </a>
                      )}
                      {selectedMember.whatsapp_url && (
                        <a href={selectedMember.whatsapp_url} target="_blank" rel="noopener noreferrer"
                           className="text-green-600 hover:text-green-700">
                          <Phone className="w-6 h-6" />
                        </a>
                      )}
                      {selectedMember.zalo_url && (
                        <a href={selectedMember.zalo_url} target="_blank" rel="noopener noreferrer"
                           className="text-blue-500 hover:text-blue-600">
                          <MessageCircle className="w-6 h-6" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Work Experience */}
                  {selectedMember.experiences && selectedMember.experiences.length > 0 && (
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-primary" />
                        Work Experience
                      </h3>
                      <div className="space-y-3">
                        {selectedMember.experiences.map((exp, idx) => (
                          <div key={idx} className="text-sm">
                            <p className="font-medium text-gray-700">{exp.company}</p>
                            <p className="text-gray-600">
                              {exp.role}
                              {exp.years && ` (${exp.years} years)`}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* About */}
                  {selectedMember.introduction && (
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <User className="w-5 h-5 text-primary" />
                        About
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                        {selectedMember.introduction}
                      </p>
                    </div>
                  )}

                  {/* Interests */}
                  {selectedMember.interests && (
                    <div>
                      {selectedMember.interests.interests && (
                        <div className="mb-4">
                          <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <Heart className="w-5 h-5 text-primary" />
                            Interests
                          </h3>
                          <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                            {selectedMember.interests.interests}
                          </p>
                        </div>
                      )}
                      {selectedMember.interests.atp_goals && (
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <Target className="w-5 h-5 text-primary" />
                            ATP Goals
                          </h3>
                          <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                            {selectedMember.interests.atp_goals}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
