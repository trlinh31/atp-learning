import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { ProtectedRoute } from "@/components/ProtectedRoute";

function PendingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
          <CardTitle>Application Under Review</CardTitle>
          <CardDescription>
            Thank you for submitting your registration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Your application is currently being reviewed by our team. 
            We'll notify you via email once your membership has been approved.
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            This usually takes 1-2 business days.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default function Pending() {
  return (
    <ProtectedRoute requireStatus="pending">
      <PendingPage />
    </ProtectedRoute>
  );
}

