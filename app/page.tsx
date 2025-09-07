import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>Hi how are you</h1>
      <Button asChild>
        <Link href="/signIn">Sign-in</Link>
      </Button>
      <></>
    </>
  );
}
