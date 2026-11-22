"use client";

import { useFormStatus } from "react-dom";
import Button from "@/components/ui/Button";

type SubmitButtonProps = {
  children: React.ReactNode;
  pendingText: string;
};

export default function SubmitButton({
  children,
  pendingText,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="h-10 w-full">
      {pending ? pendingText : children}
    </Button>
  );
}