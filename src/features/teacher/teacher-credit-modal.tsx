"use client";

import { ManualPaymentModal } from "@/features/payments/manual-payment-modal";
import { useManualPayments } from "@/features/payments/use-manual-payments";

type TeacherCreditModalProps = {
  onClose: () => void;
  open: boolean;
};

export function TeacherCreditModal({ onClose, open }: TeacherCreditModalProps) {
  const payment = useManualPayments();

  return (
    <ManualPaymentModal
      config={payment.config}
      onClose={onClose}
      onSubmit={payment.submit}
      open={open}
      product="TEACHER_PUBLISH_CREDIT"
    />
  );
}
