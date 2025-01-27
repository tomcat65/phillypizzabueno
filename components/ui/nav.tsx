import Link from "next/link";
import { ShoppingCart, User, PizzaIcon } from "lucide-react";
import { Button } from "./button";

export function Nav() {
  return (
    <nav className="bg-red-600 text-white shadow-lg">
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
            className="text-white hover:text-red-100 hover:bg-red-700"
          >
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
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
