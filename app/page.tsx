"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";

export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center h-screen gap-6">
        <Button asChild>
          <Link href="/signIn">Sign-in</Link>
        </Button>

        <Button asChild>
          <Link href="/signUp">Sign-up</Link>
        </Button>
      </div>
    </>
  );
}
