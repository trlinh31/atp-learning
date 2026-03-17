import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  PlayCircle,
  Calendar,
  BookOpen,
  User,
  LogOut,
  Coins,
} from "lucide-react";
import { clsx } from "clsx";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import ConsultationDialog from "@/components/ConsultationDialog";
import LogoutDialog from "@/components/LogoutDialog";
import TopUpDialog from "@/components/TopUpDialog";
import studentPortrait from "@assets/generated_images/friendly_female_student_portrait.png";

interface SidebarProps {
  activePage?: 'videos' | 'resources' | 'events' | 'members';
}

const SidebarItem = ({ icon: Icon, label, active = false, to }: {
  icon: any;
  label: string;
  active?: boolean;
  to: string;
}) => {
  const content = (
    <div
      className={clsx(
        "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm cursor-pointer",
        active
          ? "bg-primary text-white shadow-lg shadow-primary/20"
          : "text-gray-500 hover:bg-secondary hover:text-primary",
      )}
    >
      <Icon className="w-5 h-5" />
      {label}
    </div>
  );

  return <Link href={to}>{content}</Link>;
};

export default function Sidebar({ activePage }: SidebarProps) {
  const { member, logout } = useAuth();
  const userCredits = member?.total_credit || 0;
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setShowLogoutDialog(false);
  };

  return (
    <aside className="w-72 bg-white border-r border-gray-100 h-screen sticky top-0 hidden lg:flex flex-col p-6 z-20">
      <Link href="/student-portal" className="flex items-center gap-2 mb-10 px-2">
        <img src="https://atp-global.com.au/images/logo.webp" alt="ATP Global" className="h-12 w-auto object-contain" />
      </Link>

      <div className="space-y-2 flex-1">
        <div className="px-4 mb-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
          Menu
        </div>
        <SidebarItem 
          icon={PlayCircle} 
          label="Videos" 
          active={activePage === 'videos'} 
          to="/student-portal" 
        />
        <SidebarItem 
          icon={BookOpen} 
          label="Resources" 
          active={activePage === 'resources'} 
          to="/resources" 
        />
        <SidebarItem 
          icon={Calendar} 
          label="Events" 
          active={activePage === 'events'} 
          to="/events" 
        />
        <SidebarItem 
          icon={User} 
          label="Members" 
          active={activePage === 'members'} 
          to="/members" 
        />
      </div>

      <div className="mt-auto pt-6 border-t border-gray-100 space-y-4">
        <div className="px-4">
          <Button 
            onClick={() => setIsConsultationOpen(true)}
            className="w-full bg-gradient-to-r from-primary to-red-600 hover:from-red-700 hover:to-red-800 text-white shadow-lg shadow-red-200 border-0"
          >
            Book Consultation
          </Button>
        </div>

        <div className="flex items-center gap-3 px-4">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/10">
            <img
              src={member?.avatar || studentPortrait}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold text-gray-900 truncate">
              {member?.full_name}
            </div>
            <div className="text-xs text-gray-500 truncate">
              Student Member
            </div>
            <div className="flex items-center justify-between mt-1.5">
              <div className="flex items-center gap-1.5 text-xs font-medium text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100">
                <Coins className="w-3 h-3 fill-current" />
                {userCredits}
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsTopUpOpen(true)}
                className="text-xs h-7"
              >
                Top Up
              </Button>
            </div>
          </div>
        </div>

        <button 
          onClick={() => setShowLogoutDialog(true)}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors text-sm font-medium"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>

      <LogoutDialog 
        open={showLogoutDialog}
        onOpenChange={setShowLogoutDialog}
        onConfirm={handleLogout}
      />

      <ConsultationDialog 
        open={isConsultationOpen}
        onOpenChange={setIsConsultationOpen}
      />

      <TopUpDialog 
        open={isTopUpOpen}
        onOpenChange={setIsTopUpOpen}
      />
    </aside>
  );
}
