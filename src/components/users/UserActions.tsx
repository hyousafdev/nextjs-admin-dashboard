"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, Pencil, Trash2 } from "lucide-react";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import DropdownMenu from "@/components/ui/DropdownMenu";
import Modal from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import EditUserForm from "@/components/users/EditUserForm";
import type { User } from "@/types";

type UserActionsProps = {
  user: User;
};

export default function UserActions({ user }: UserActionsProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      <DropdownMenu
        label={`Actions for ${user.name}`}
        items={[
          {
            label: "View profile",
            icon: Eye,
            onSelect: () => router.push(`/users/${user.id}`),
          },
          {
            label: "Edit user",
            icon: Pencil,
            onSelect: () => setIsEditOpen(true),
          },
          {
            label: "Delete user",
            icon: Trash2,
            destructive: true,
            onSelect: () => setIsDeleteOpen(true),
          },
        ]}
      />

      <Modal
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Edit user"
        description={`Update the details of ${user.name}.`}
      >
        <EditUserForm
          user={user}
          onCancel={() => setIsEditOpen(false)}
          onSave={(values) => {
            setIsEditOpen(false);
            toast({
              variant: "success",
              title: "Changes saved",
              description: `${values.name} was updated. Demo only: changes are not stored.`,
            });
          }}
        />
      </Modal>

      <ConfirmDialog
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="Delete user?"
        description={`${user.name} will be removed from your users list. This cannot be undone.`}
        confirmLabel="Delete"
        destructive
        onConfirm={() => {
          setIsDeleteOpen(false);
          toast({
            variant: "success",
            title: "User deleted",
            description: `${user.name} was removed. Demo only: nothing was deleted.`,
          });
        }}
      />
    </>
  );
}