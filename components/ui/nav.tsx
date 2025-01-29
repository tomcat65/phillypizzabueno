"use client";

import Link from "next/link";
import { ShoppingCart, User, PizzaIcon } from "lucide-react";
import { Button } from "./button";
import { useCart } from "@/lib/cart";
import { Badge } from "./badge";

export function Nav() {
  const { items } = useCart();
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-red-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold flex items-center gap-2 hover:text-red-100 transition-colors"
        >
          <PizzaIcon className="h-8 w-8 rotate-45" />
          <span className="font-serif">PhillyPizzaBueno</span>
        </Link>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="text-white hover:text-red-100 hover:bg-red-700 relative"
          >
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0"
                >
                  {itemCount}
                </Badge>
              )}
              <span className="sr-only">Cart</span>
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            asChild
            className="text-white hover:text-red-100 hover:bg-red-700"
          >
            <Link href="/account">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
