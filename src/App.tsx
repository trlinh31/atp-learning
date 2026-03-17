import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
// import Home from "@/pages/home";
// import Programs from "@/pages/programs";
import InternshipProgram from "@/pages/internship-program";
// import InternJobs from "@/pages/intern-jobs";
// import StudentPortal from "@/pages/student-portal";
import AboutUs from "@/pages/about-us";
import ApplyInternship from "@/pages/apply-internship";
import ApplySuccess from "@/pages/apply-success";
import GoogleAuthCallback from "@/pages/auth-callback-google";
import LinkedInAuthCallback from "@/pages/auth-callback-linkedin";
import Blocked from "@/pages/blocked";
import BlogArticlePage from "@/pages/blog-article";
import ContactUs from "@/pages/contact-us";
import DataCAP from "@/pages/datacap";
import Events from "@/pages/events";
import JobSearch from "@/pages/job-search";
import Login from "@/pages/login";
import Members from "@/pages/members";
import NotFound from "@/pages/not-found";
import Partners from "@/pages/partners";
import PartnersOpportunities from "@/pages/partners-opportunities";
import Pending from "@/pages/pending";
import QuickTips from "@/pages/quick-tips";
import QuickTipsOld from "@/pages/quick-tips-old";
import Register from "@/pages/register";
import Resources from "@/pages/resources";
import StudentsGraduates from "@/pages/students-graduates";
import SuccessStories from "@/pages/success-stories";
import UploadCV from "@/pages/upload-cv";
import VideoPlayer from "@/pages/video-player";

function Router() {
  return (
    <Switch>
      {/* Public routes */}
      <Route path='/' component={BlogArticlePage} />
      <Route path='/job-search' component={JobSearch} />
      <Route path='/internship-program' component={InternshipProgram} />
      <Route path='/students-graduates' component={StudentsGraduates} />
      <Route path='/about-us' component={AboutUs} />
      <Route path='/contact-us' component={ContactUs} />
      <Route path='/partners' component={Partners} />
      <Route path='/partners-opportunities' component={PartnersOpportunities} />
      <Route path='/success-stories' component={SuccessStories} />
      <Route path='/recruitment' component={SuccessStories} />
      <Route path='/datacap' component={DataCAP} />
      <Route path='/login' component={Login} />
      {/* <Route path="/programs" component={Programs} />
      <Route path="/intern-jobs" component={InternJobs} /> */}
      <Route path='/apply-internship/:jobId' component={ApplyInternship} />
      <Route path='/apply-internship' component={ApplyInternship} />
      <Route path='/apply-success' component={ApplySuccess} />
      <Route path='/upload-cv' component={UploadCV} />
      <Route path='/blog' component={BlogArticlePage} />

      {/* OAuth callback routes */}
      <Route path='/auth/google/callback' component={GoogleAuthCallback} />
      <Route path='/auth/linkedin/callback' component={LinkedInAuthCallback} />

      {/* Auth flow routes */}
      <Route path='/register' component={Register} />
      <Route path='/pending' component={Pending} />
      <Route path='/blocked' component={Blocked} />

      {/* Protected routes */}
      {/* <Route path="/student-portal">
        <ProtectedRoute requireStatus="joined">
          <StudentPortal />
        </ProtectedRoute>
      </Route> */}

      <Route path='/resources'>
        <ProtectedRoute requireStatus='joined'>
          <Resources />
        </ProtectedRoute>
      </Route>

      <Route path='/events'>
        <ProtectedRoute requireStatus='joined'>
          <Events />
        </ProtectedRoute>
      </Route>

      <Route path='/members'>
        <ProtectedRoute requireStatus='joined'>
          <Members />
        </ProtectedRoute>
      </Route>

      {/* Quick Tips - Standalone mockup route (for development/preview) */}
      <Route path='/video' component={VideoPlayer} />

      {/* Quick Tips - Standalone mockup route (for development/preview) */}
      <Route path='/quick-tips-old' component={QuickTipsOld} />

      <Route path='/video/:id'>
        <ProtectedRoute>
          <VideoPlayer />
        </ProtectedRoute>
      </Route>

      {/* Quick Tips - Standalone mockup route (for development/preview) */}
      <Route path='/quick-tips' component={QuickTips} />

      <Route path='/quick-tips/:id'>
        <ProtectedRoute>
          <QuickTips />
        </ProtectedRoute>
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function ScrollRestoration() {
  const [location] = useLocation();

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0 });
    }
  }, [location]);

  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <ScrollRestoration />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
