"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import LogoutDialog from "./logoutButton"; // Ensure this path is correct
import { useState } from "react";

export function DropdownMenuDemo(props: any) {
  const router = useRouter();
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const closeLogoutDialog = () => {
    setIsLogoutDialogOpen(false);
  };

  const openLogoutDialog = () => {
    setIsLogoutDialogOpen(true);
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
      toast.success("Logout successful");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="bg-blue-300">
            {props.userData?.username}
            <span className="ml-2">🔻</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link href="/profile">
              <DropdownMenuItem>Profile</DropdownMenuItem>
            </Link>
            <Link href="studentProfile/billing">
              <DropdownMenuItem>Billing</DropdownMenuItem>
            </Link>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Keyboard shortcuts</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Email</DropdownMenuItem>
                <DropdownMenuItem>Message</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>More...</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuItem>New Team</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>GitHub</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuItem disabled>API</DropdownMenuItem>
          <DropdownMenuSeparator />

          <LogoutDialog
            isOpen={isLogoutDialogOpen}
            title="Are you sure you want to logout?"
            onConfirm={logout}
            onCancel={closeLogoutDialog}
            confirmButtonText="Yes"
            cancelButtonText="No"
            onLogout={logout}
          />
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Render the LogoutDialog outside of the DropdownMenu */}
    </div>
  );
}

export default DropdownMenuDemo;
