import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Coins, CreditCard, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTopUpIntent, confirmTopUp } from "@/services/paymentService";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

interface TopUpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const CREDIT_TO_AUD_RATE = 10; // 10 credit = 1 AUD
const MIN_CREDITS = 10; // Minimum 10 credits (1 AUD)
const MAX_CREDITS = 10000; // Maximum 10000 credits (1000 AUD)

// Predefined credit packages
const CREDIT_PACKAGES = [
  { credits: 100, label: "100 credits", aud: 10 },
  { credits: 500, label: "500 credits", aud: 50 },
  { credits: 1000, label: "1000 credits", aud: 100 },
  { credits: 2000, label: "2000 credits", aud: 200 },
];

function PaymentForm({ 
  creditAmount, 
  amountAud, 
  onSuccess, 
  onCancel 
}: { 
  creditAmount: number; 
  amountAud: number;
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const { refreshMember } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState<{
    creditAmount: number;
    newBalance: number;
  } | null>(null);
  const [paymentError, setPaymentError] = useState<{
    title: string;
    message: string;
    canRetry: boolean;
  } | null>(null);

  // Create payment intent when component mounts
  useEffect(() => {
    if (creditAmount > 0 && !clientSecret && !paymentError) {
      createTopUpIntent(creditAmount)
        .then((response) => {
          if (response.success) {
            setClientSecret(response.client_secret);
            setPaymentIntentId(response.payment_intent_id);
            setPaymentError(null); // Clear any previous errors
          } else {
            const errorMessage = response.error || 'Failed to create payment intent';
            setPaymentError({
              title: 'Payment Setup Failed',
              message: errorMessage,
              canRetry: true,
            });
            toast.error(errorMessage);
          }
        })
        .catch((error: any) => {
          const errorMessage = error.message || 'Failed to create payment intent. Please try again.';
          setPaymentError({
            title: 'Connection Error',
            message: errorMessage,
            canRetry: true,
          });
          toast.error(errorMessage);
        });
    }
  }, [creditAmount, clientSecret, paymentError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    setIsProcessing(true);

    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error('Card element not found');
      }

      // Confirm payment with Stripe
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
          }
        }
      );

      if (stripeError) {
        const errorMessage = stripeError.message || 'Payment failed. Please check your card details and try again.';
        setPaymentError({
          title: 'Payment Failed',
          message: errorMessage,
          canRetry: true,
        });
        toast.error(errorMessage, {
          duration: 6000,
        });
        setIsProcessing(false);
        return;
      }

      if (paymentIntent?.status === 'succeeded' && paymentIntentId) {
        // Confirm payment with backend
        const confirmResponse = await confirmTopUp(paymentIntentId);
        
        if (confirmResponse.success) {
          // Store success data to show in UI
          setPaymentSuccess({
            creditAmount: confirmResponse.credit_amount,
            newBalance: confirmResponse.new_balance,
          });
          
          // Show detailed success message
          toast.success(
            `Top-up successful! You've received ${confirmResponse.credit_amount} credits. Your new balance is ${confirmResponse.new_balance} credits.`,
            {
              duration: 5000,
            }
          );
          
          refreshMember();
          
          // Auto close after 3 seconds
          setTimeout(() => {
            onSuccess();
          }, 3000);
        } else {
          const errorMessage = confirmResponse.error || 'Failed to confirm payment. Please contact support if the issue persists.';
          setPaymentError({
            title: 'Payment Confirmation Failed',
            message: errorMessage,
            canRetry: false,
          });
          toast.error(errorMessage, {
            duration: 6000,
          });
        }
      } else {
        // Payment intent status is not succeeded
        const errorMessage = 'Payment was not completed. Please try again.';
        setPaymentError({
          title: 'Payment Incomplete',
          message: errorMessage,
          canRetry: true,
        });
        toast.error(errorMessage);
      }
    } catch (error: any) {
      const errorMessage = error.message || 'An unexpected error occurred. Please try again or contact support.';
      setPaymentError({
        title: 'Payment Error',
        message: errorMessage,
        canRetry: true,
      });
      toast.error(errorMessage, {
        duration: 6000,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  // Show error state
  if (paymentError) {
    return (
      <div className="space-y-6 py-6">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <XCircle className="w-10 h-10 text-red-600" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-gray-900">{paymentError.title}</h3>
            <p className="text-gray-600">{paymentError.message}</p>
          </div>
        </div>

        <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
            <div className="text-sm text-red-700">
              <p className="font-medium mb-1">What you can do:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                {paymentError.canRetry && (
                  <li>Check your card details and try again</li>
                )}
                <li>Ensure you have sufficient funds</li>
                <li>Contact your bank if the issue persists</li>
                <li>Reach out to support at wecare@atp-global.com.au</li>
              </ul>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => {
              setPaymentError(null);
              setClientSecret(null);
              setPaymentIntentId(null);
            }}
          >
            Try Again
          </Button>
          <Button
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </DialogFooter>
      </div>
    );
  }

  // Show success state
  if (paymentSuccess) {
    return (
      <div className="space-y-6 py-6">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-gray-900">Payment Successful!</h3>
            <p className="text-gray-600">Your credits have been added to your account</p>
          </div>
        </div>

        <div className="p-6 bg-green-50 border border-green-200 rounded-lg space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">Credits Added:</span>
            <span className="text-2xl font-bold text-green-600">+{paymentSuccess.creditAmount}</span>
          </div>
          <div className="h-px bg-green-200"></div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">New Balance:</span>
            <div className="flex items-center gap-2">
              <Coins className="w-5 h-5 text-primary" />
              <span className="text-2xl font-bold text-primary">{paymentSuccess.newBalance} credits</span>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          This dialog will close automatically...
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Card Details</Label>
        <div className="p-3 border rounded-md">
          <CardElement options={cardElementOptions} />
        </div>
      </div>

      <div className="p-4 bg-gray-50 rounded-lg space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Credits</span>
          <span className="font-medium">{creditAmount}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Amount</span>
          <span className="font-medium">AUD ${amountAud.toFixed(2)}</span>
        </div>
      </div>

      <DialogFooter className="flex-col sm:flex-row gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isProcessing}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={!stripe || isProcessing || !clientSecret}
          className="bg-primary text-white hover:bg-primary/90"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="w-4 h-4 mr-2" />
              Pay AUD ${amountAud.toFixed(2)}
            </>
          )}
        </Button>
      </DialogFooter>
    </form>
  );
}

export default function TopUpDialog({
  open,
  onOpenChange,
  onSuccess
}: TopUpDialogProps) {
  const { member } = useAuth();
  const userCredits = member?.total_credit || 0;
  const [creditAmount, setCreditAmount] = useState(100);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [amountAud, setAmountAud] = useState(creditAmount / CREDIT_TO_AUD_RATE);

  useEffect(() => {
    setAmountAud(creditAmount / CREDIT_TO_AUD_RATE);
  }, [creditAmount]);

  const handleCreditChange = (value: number) => {
    const clampedValue = Math.max(MIN_CREDITS, Math.min(MAX_CREDITS, value));
    setCreditAmount(clampedValue);
  };

  const handlePackageSelect = (credits: number) => {
    setCreditAmount(credits);
  };

  const handleContinue = () => {
    if (creditAmount < MIN_CREDITS) {
      toast.error(`Minimum top-up is ${MIN_CREDITS} credits (AUD $${(MIN_CREDITS / CREDIT_TO_AUD_RATE).toFixed(2)})`);
      return;
    }
    if (creditAmount > MAX_CREDITS) {
      toast.error(`Maximum top-up is ${MAX_CREDITS} credits (AUD $${(MAX_CREDITS / CREDIT_TO_AUD_RATE).toFixed(2)})`);
      return;
    }
    setShowPaymentForm(true);
  };

  const handleSuccess = () => {
    setShowPaymentForm(false);
    setCreditAmount(100);
    onOpenChange(false);
    if (onSuccess) {
      onSuccess();
    }
  };

  const handleCancel = () => {
    setShowPaymentForm(false);
  };

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif font-bold">
            Top Up Credits
          </DialogTitle>
        </DialogHeader>

        {!showPaymentForm ? (
          <>
            <div className="py-6 space-y-6">
              <div className="space-y-3">
                <Label>Current Balance</Label>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <Coins className="w-5 h-5 text-primary" />
                  <span className="text-lg font-bold">{userCredits} credits</span>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Select Credit Package</Label>
                <div className="grid grid-cols-2 gap-2">
                  {CREDIT_PACKAGES.map((pkg) => (
                    <button
                      key={pkg.credits}
                      type="button"
                      onClick={() => handlePackageSelect(pkg.credits)}
                      className={`p-3 border rounded-lg text-left transition-colors ${
                        creditAmount === pkg.credits
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-bold">{pkg.credits} credits</div>
                      <div className="text-sm text-gray-500">AUD ${pkg.aud}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Or Enter Custom Amount</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min={MIN_CREDITS}
                    max={MAX_CREDITS}
                    value={creditAmount}
                    onChange={(e) => handleCreditChange(parseInt(e.target.value) || 0)}
                    className="flex-1"
                  />
                  <span className="text-sm text-gray-500 whitespace-nowrap">credits</span>
                </div>
                <div className="text-sm text-gray-500">
                  = AUD ${amountAud.toFixed(2)} (Rate: 10 credits = 1 AUD)
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">You will receive:</span>
                  <span className="font-bold text-primary">{creditAmount} credits</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-600">Total cost:</span>
                  <span className="font-bold">AUD ${amountAud.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleContinue}
                className="bg-primary text-white hover:bg-primary/90"
              >
                Continue to Payment
              </Button>
            </DialogFooter>
          </>
        ) : (
          <Elements stripe={stripePromise}>
            <PaymentForm
              creditAmount={creditAmount}
              amountAud={amountAud}
              onSuccess={handleSuccess}
              onCancel={handleCancel}
            />
          </Elements>
        )}
      </DialogContent>
    </Dialog>
  );
}
