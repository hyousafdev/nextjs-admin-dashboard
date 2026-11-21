"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MoreHorizontal } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type DropdownItem = {
  label: string;
  icon?: LucideIcon;
  onSelect: () => void;
  destructive?: boolean;
};

type DropdownMenuProps = {
  label: string;
  items: DropdownItem[];
};

const ITEM_HEIGHT = 40;

export default function DropdownMenu({ label, items }: DropdownMenuProps) {
  const [position, setPosition] = useState<{
    top: number;
    right: number;
  } | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const isOpen = position !== null;

  // The menu is rendered in a portal with fixed positioning so that
  // a table's overflow container can never clip it.
  function openMenu() {
    const rect = triggerRef.current?.getBoundingClientRect();

    if (!rect) {
      return;
    }

    const menuHeight = items.length * ITEM_HEIGHT + 8;
    const opensUpward = rect.bottom + menuHeight + 8 > window.innerHeight;

    setPosition({
      top: opensUpward ? rect.top - menuHeight - 4 : rect.bottom + 4,
      right: window.innerWidth - rect.right,
    });
  }

  function closeMenu(returnFocus = true) {
    setPosition(null);

    if (returnFocus) {
      triggerRef.current?.focus();
    }
  }

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    menuRef.current?.querySelector<HTMLElement>('[role="menuitem"]')?.focus();

    function handlePointerDown(event: MouseEvent) {
      const target = event.target as Node;

      if (
        !menuRef.current?.contains(target) &&
        !triggerRef.current?.contains(target)
      ) {
        setPosition(null);
      }
    }

    function handleDismiss() {
      setPosition(null);
    }

    document.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("resize", handleDismiss);
    window.addEventListener("scroll", handleDismiss, true);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("resize", handleDismiss);
      window.removeEventListener("scroll", handleDismiss, true);
    };
  }, [isOpen]);

  function handleMenuKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const menuItems = Array.from(
      menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? [],
    );
    const index = menuItems.indexOf(document.activeElement as HTMLElement);

    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      menuItems[(index + 1) % menuItems.length]?.focus();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      menuItems[(index - 1 + menuItems.length) % menuItems.length]?.focus();
    } else if (event.key === "Home") {
      event.preventDefault();
      menuItems[0]?.focus();
    } else if (event.key === "End") {
      event.preventDefault();
      menuItems[menuItems.length - 1]?.focus();
    } else if (event.key === "Tab") {
      setPosition(null);
    }
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={isOpen ? menuId : undefined}
        onClick={() => (isOpen ? closeMenu(false) : openMenu())}
        className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>

      {isOpen &&
        position &&
        createPortal(
          <div
            ref={menuRef}
            id={menuId}
            role="menu"
            aria-label={label}
            onKeyDown={handleMenuKeyDown}
            style={{ top: position.top, right: position.right }}
            className="fixed z-[60] w-44 rounded-lg border bg-card p-1 shadow-lg"
          >
            {items.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.label}
                  type="button"
                  role="menuitem"
                  tabIndex={-1}
                  onClick={() => {
                    closeMenu();
                    item.onSelect();
                  }}
                  className={cn(
                    "flex h-10 w-full items-center gap-2 rounded-md px-3 text-sm outline-none hover:bg-muted focus:bg-muted",
                    item.destructive && "text-danger",
                  )}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {item.label}
                </button>
              );
            })}
          </div>,
          document.body,
        )}
    </>
  );
}