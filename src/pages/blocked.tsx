import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Ban } from "lucide-react";
import { ProtectedRoute } from "@/components/ProtectedRoute";

function BlockedPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <Ban className="w-8 h-8 text-red-600" />
            </div>
          </div>
          <CardTitle>Account Blocked</CardTitle>
          <CardDescription>
            Your account has been blocked
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Your account has been blocked from accessing ATP Community. 
            If you believe this is an error, please contact our support team.
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Email: support@atp-global.com.au
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default function Blocked() {
  return (
    <ProtectedRoute requireStatus="blocked">
      <BlockedPage />
    </ProtectedRoute>
  );
}

