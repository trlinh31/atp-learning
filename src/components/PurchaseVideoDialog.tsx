import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Loader2, Coins } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { purchaseVideo, type Video } from "@/services/videoService";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import TopUpDialog from "@/components/TopUpDialog";
import { useState } from "react";
import masterclass1 from "@assets/generated_images/interview_masterclass_thumbnail.png";

interface PurchaseVideoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  video: Video | null;
  type: 'full' | 'short';
  onSuccess?: () => void;
}

export default function PurchaseVideoDialog({
  open,
  onOpenChange,
  video,
  type,
  onSuccess
}: PurchaseVideoDialogProps) {
  const { member, refreshMember } = useAuth();
  const userCredits = member?.total_credit || 0;
  const queryClient = useQueryClient();
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);

  // Purchase mutation
  const purchaseMutation = useMutation({
    mutationFn: (videoId: number) => purchaseVideo(videoId),
    onSuccess: (data) => {
      toast.success(data.message || 'Video purchased successfully!');
      // Refresh member data to get updated credits
      refreshMember();
      // Invalidate video queries to refetch
      queryClient.invalidateQueries({ queryKey: ['video'] });
      queryClient.invalidateQueries({ queryKey: ['videos'] });
      queryClient.invalidateQueries({ queryKey: ['videos-shorts'] });
      // Close dialog
      onOpenChange(false);
      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to purchase video');
    }
  });

  const handlePurchase = () => {
    if (video) {
      const cost = video.price_credit;
      if (userCredits >= cost) {
        purchaseMutation.mutate(video.id);
      } else {
        toast.error("Insufficient credits!");
      }
    }
  };

  if (!video) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif font-bold">
            Unlock {type === 'full' ? 'Video' : 'Quick Tip'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-6 space-y-6">
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-200 shrink-0">
              <img 
                src={video.thumbnail_url || masterclass1} 
                alt="" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 line-clamp-2">{video.title}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {type === 'full' ? 'Full Masterclass' : 'Quick Tip'}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Current Balance</span>
              <span className="font-medium text-gray-900">{userCredits} credits</span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Cost</span>
              <span className="font-bold text-red-600">-{video.price_credit} credits</span>
            </div>
            <div className="h-px bg-gray-100 my-2" />
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-900">Balance After</span>
              <div className="flex items-center gap-1 font-bold text-primary">
                <Coins className="w-4 h-4 fill-current" />
                {userCredits - video.price_credit} credits
              </div>
            </div>
          </div>

          {userCredits < video.price_credit && (
            <div className="p-3 bg-red-50 border border-red-100 rounded-lg space-y-2">
              <p className="text-sm text-red-600 font-medium">
                Insufficient credits! You need {video.price_credit - userCredits} more credits to purchase this video.
              </p>
              <Button
                size="sm"
                onClick={() => setIsTopUpOpen(true)}
                className="w-full bg-primary text-white hover:bg-primary/90"
              >
                Top Up Credits
              </Button>
            </div>
          )}
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            disabled={purchaseMutation.isPending}
          >
            Cancel
          </Button>
          <Button 
            onClick={handlePurchase} 
            className="bg-primary text-white hover:bg-primary/90"
            disabled={purchaseMutation.isPending || userCredits < video.price_credit}
          >
            {purchaseMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              'Confirm Purchase'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>

      <TopUpDialog
        open={isTopUpOpen}
        onOpenChange={setIsTopUpOpen}
        onSuccess={() => {
          refreshMember();
        }}
      />
    </Dialog>
  );
}
