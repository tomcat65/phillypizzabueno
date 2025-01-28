import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ItemLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-48" />
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Size Selection */}
          <div className="space-y-4">
            <Skeleton className="h-4 w-16" />
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-32" />
                </div>
              ))}
            </div>
          </div>

          {/* Toppings/Sauces */}
          <div className="space-y-4">
            <Skeleton className="h-4 w-24" />
            <div className="grid gap-4 sm:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-10 w-32" />
        </CardFooter>
      </Card>
    </div>
  );
}
