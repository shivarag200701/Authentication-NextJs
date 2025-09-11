import { Button } from "@/components/ui/button";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { getCurrentUser } from "@/auth/core/currentUser";

const page = async () => {
  //   await getCurrentUser({ redirectIfNotFound: true });
  return (
    <div className="flex items-center justify-center h-screen ">
      <Card className="w-full max-w-sm">
        <CardContent>
          <div className="flex justify-between">
            <Button asChild>
              <a href="#">Toggle Role</a>
            </Button>
            <Button asChild>
              <a href="/">Home</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
