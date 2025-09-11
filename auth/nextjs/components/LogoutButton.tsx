"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";
import { logOut } from "@/auth/nextjs/action";

const LogoutButton = () => {
  const router = useRouter();
  async function userLogout() {
    await logOut();
    router.push("/");
  }
  return (
    <Button
      variant="destructive"
      onClick={() => userLogout()}
      className="hover:cursor-pointer"
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
