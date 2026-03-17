import { post, get } from '../lib/api';

export interface TopUpIntentResponse {
  success: boolean;
  client_secret: string;
  payment_intent_id: string;
  amount_aud: number;
  credit_amount: number;
  currency: string;
  error?: string;
}

export interface ConfirmPaymentResponse {
  success: boolean;
  message: string;
  credit_amount: number;
  new_balance: number;
  error?: string;
}

export interface PaymentTransaction {
  id: number;
  member_id: number;
  stripe_payment_intent_id: string;
  amount: number;
  currency: string;
  credit_amount: number;
  status: 'pending' | 'succeeded' | 'failed';
  metadata?: any;
  created_at: string;
  updated_at: string;
}

export interface PaymentHistoryResponse {
  success: boolean;
  transactions: PaymentTransaction[];
  error?: string;
}

/**
 * Create top-up payment intent
 */
export async function createTopUpIntent(creditAmount: number): Promise<TopUpIntentResponse> {
  return post('/api/community/payments/top-up', {
    credit_amount: creditAmount
  });
}

/**
 * Confirm payment after Stripe payment is successful
 */
export async function confirmTopUp(paymentIntentId: string): Promise<ConfirmPaymentResponse> {
  return post('/api/community/payments/confirm', {
    payment_intent_id: paymentIntentId
  });
}

/**
 * Get payment history
 */
export async function getPaymentHistory(): Promise<PaymentHistoryResponse> {
  return get('/api/community/payments/history');
}
