"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function ItemError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <CardTitle className="text-red-500">
              Something went wrong!
            </CardTitle>
          </div>
          <CardDescription className="text-red-700">
            {error.message || "There was an error loading this item."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-red-600">
            Please try again later or contact support if the problem persists.
          </p>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button
            onClick={() => reset()}
            variant="outline"
            className="border-red-200 hover:bg-red-100"
          >
            Try again
          </Button>
          <Button
            onClick={() => (window.location.href = "/menu")}
            variant="outline"
            className="border-red-200 hover:bg-red-100"
          >
            Return to Menu
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
