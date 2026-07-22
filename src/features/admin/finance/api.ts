import { apiFetch } from "@/lib/api/client";

export type RevenuePeriod = 0 | 30 | 90 | 365;

export type RevenueReport = {
  days: RevenuePeriod;
  generatedAt: string;
  summary: {
    totalRevenue: number;
    studentRevenue: number;
    teacherRevenue: number;
    paidTransactions: number;
    averageTransaction: number;
  };
  products: RevenueProduct[];
  months: RevenueMonth[];
  transactions: RevenueTransaction[];
};

export type RevenueProduct = {
  product: string;
  label: string;
  revenue: number;
  transactions: number;
};

export type RevenueMonth = {
  month: string;
  revenue: number;
  transactions: number;
};

export type RevenueTransaction = {
  id: string;
  invoiceCode: string;
  customerName: string;
  customerEmail: string;
  product: string;
  productLabel: string;
  amount: number;
  paidAt: string;
};

export function getRevenueReport(days: RevenuePeriod, token: string) {
  return apiFetch<RevenueReport>(`/admin/finance/revenue?days=${days}`, {
    token,
  });
}
