import { Button } from "@/components/ui/button";
import LogoutButton from "@/auth/nextjs/components/LogoutButton";
import Link from "next/link";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCurrentUser } from "@/auth/core/currentUser";

export default async function Home() {
  const user = await getCurrentUser({ redirectIfNotFound: true });

  return user ? (
    <div className="flex items-center justify-center h-screen w-full">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome back! {user.name}</CardTitle>
          <CardDescription>Here are you're details</CardDescription>
        </CardHeader>
        <CardFooter>
          <div className="flex items-center justify-between w-full gap-6 px-10">
            <LogoutButton />
            <span>User</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  ) : (
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
