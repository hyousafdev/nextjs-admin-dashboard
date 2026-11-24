"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { deleteUserAction } from "@/actions/users";
import { useCurrentUser } from "@/components/auth/CurrentUserProvider";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import DropdownMenu from "@/components/ui/DropdownMenu";
import type { DropdownItem } from "@/components/ui/DropdownMenu";
import Modal from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import EditUserForm from "@/components/users/EditUserForm";
import { can } from "@/lib/auth-access";
import type { User } from "@/types";

type UserActionsProps = {
  user: User;
};

export default function UserActions({ user }: UserActionsProps) {
  const router = useRouter();
  const { toast } = useToast();
  const currentUser = useCurrentUser();
  const [, startTransition] = useTransition();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Hiding items is only for a clean UI. The real check for Delete
  // happens again on the server, inside deleteUserAction.
  const items: DropdownItem[] = [
    {
      label: "View profile",
      icon: Eye,
      onSelect: () => router.push(`/users/${user.id}`),
    },
  ];

  if (can(currentUser.role, "editUsers")) {
    items.push({
      label: "Edit user",
      icon: Pencil,
      onSelect: () => setIsEditOpen(true),
    });
  }

  if (can(currentUser.role, "deleteUsers")) {
    items.push({
      label: "Delete user",
      icon: Trash2,
      destructive: true,
      onSelect: () => setIsDeleteOpen(true),
    });
  }

  return (
    <>
      <DropdownMenu label={`Actions for ${user.name}`} items={items} />

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

          startTransition(async () => {
            const result = await deleteUserAction(user.id);

            toast({
              variant: result.ok ? "success" : "error",
              title: result.ok ? "User deleted" : "Could not delete user",
              description: result.ok
                ? `${user.name} was removed. Demo only: nothing was deleted.`
                : result.message,
            });
          });
        }}
      />
    </>
  );
}