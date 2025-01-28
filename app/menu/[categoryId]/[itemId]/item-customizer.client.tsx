"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import { ErrorBoundary } from "react-error-boundary";
import type { Database } from "@/types/supabase";

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div
      role="alert"
      className="p-4 bg-red-50 border border-red-200 rounded-md"
    >
      <p className="text-red-800 font-medium">Something went wrong:</p>
      <pre className="text-sm text-red-600 mt-2">{error.message}</pre>
      <button
        onClick={resetErrorBoundary}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
      >
        Try again
      </button>
    </div>
  );
}

type PizzaSize = Database["public"]["Tables"]["pizza_sizes"]["Row"];
type WingQuantity = Database["public"]["Tables"]["wing_quantities"]["Row"];
type Topping = Database["public"]["Tables"]["toppings"]["Row"];
type WingSauce = Database["public"]["Tables"]["wing_sauces"]["Row"];
type MenuItem = Database["public"]["Tables"]["menu_items"]["Row"];

interface ItemCustomizerProps {
  item: MenuItem;
  sizes: (PizzaSize | WingQuantity)[];
  toppings: Topping[];
  sauces: WingSauce[];
  categoryId: string;
}

export function ItemCustomizer({
  item,
  sizes,
  toppings,
  sauces,
  categoryId,
}: ItemCustomizerProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>(sizes[0]?.id || "");
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [selectedSauces, setSelectedSauces] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState(item.base_price);

  useEffect(() => {
    try {
      if (!selectedSize) return;

      let price = item.base_price;
      const size = sizes.find((s) => s.id === selectedSize);

      if (!size) {
        throw new Error("Selected size not found");
      }

      // Calculate price based on category
      if (item.category_id === "f85eeca1-7e83-47ab-9159-3708644b530f") {
        // Pizza category
        const pizzaSize = size as PizzaSize;
        price *= pizzaSize.price_multiplier;

        // Add topping prices
        selectedToppings.forEach((toppingId) => {
          const topping = toppings.find((t) => t.id === toppingId);
          if (topping) {
            price += topping.price * pizzaSize.price_multiplier;
          }
        });
      } else if (item.category_id === "5089a01b-267d-4210-a9f3-d7f9205cb8d0") {
        // Wings category
        const wingQuantity = size as WingQuantity;
        price = wingQuantity.price;
      }

      setTotalPrice(price);
    } catch (error) {
      toast({
        title: "Error calculating price",
        description:
          error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    }
  }, [item, selectedSize, selectedToppings, sizes, toppings]);

  const handleAddToCart = () => {
    try {
      if (!selectedSize) {
        throw new Error("Please select a size");
      }

      const size = sizes.find((s) => s.id === selectedSize);
      if (!size) {
        throw new Error("Selected size not found");
      }

      const cartItem = {
        id: `${item.id}-${Date.now()}`,
        type: item.category_id,
        name: item.name,
        size_id: selectedSize,
        quantity: 1,
        customizations: {
          size,
          toppings: selectedToppings.map((id) => {
            const topping = toppings.find((t) => t.id === id);
            if (!topping) throw new Error("Selected topping not found");
            return topping;
          }),
          sauces: selectedSauces.map((id) => {
            const sauce = sauces.find((s) => s.id === id);
            if (!sauce) throw new Error("Selected sauce not found");
            return sauce;
          }),
        },
        price: totalPrice,
      };

      addItem(cartItem);
      toast({
        title: "Added to cart",
        description: `${item.name} has been added to your cart.`,
      });
      router.push(`/menu/${categoryId}`);
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader className="relative">
        <Button
          variant="ghost"
          className="absolute left-4 top-4"
          onClick={() => router.push(`/menu/${categoryId}`)}
        >
          ← Back to Menu
        </Button>
        <CardTitle className="text-center pt-4">{item.name}</CardTitle>
        <p className="text-center text-muted-foreground">{item.description}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Size Selection */}
        {sizes.length > 0 && (
          <div className="space-y-4">
            <Label className="text-lg font-semibold">Select Size</Label>
            <RadioGroup
              value={selectedSize}
              onValueChange={setSelectedSize}
              className="grid gap-4"
            >
              {sizes.map((size) => (
                <div key={size.id} className="flex items-center space-x-3">
                  <RadioGroupItem value={size.id} id={size.id} />
                  <Label
                    htmlFor={size.id}
                    className="flex justify-between w-full"
                  >
                    <span>
                      {"size_inches" in size
                        ? `${size.size_inches}" Pizza`
                        : `${size.quantity} Wings`}
                    </span>
                    <span className="font-semibold">
                      $
                      {("price" in size
                        ? size.price
                        : item.base_price * (size as PizzaSize).price_multiplier
                      ).toFixed(2)}
                    </span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}

        {/* Toppings Selection */}
        {item.category_id === "f85eeca1-7e83-47ab-9159-3708644b530f" &&
          toppings.length > 0 && (
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Select Toppings</Label>
              <div className="grid grid-cols-2 gap-4">
                {toppings.map((topping) => (
                  <div key={topping.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={topping.id}
                      checked={selectedToppings.includes(topping.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedToppings([
                            ...selectedToppings,
                            topping.id,
                          ]);
                        } else {
                          setSelectedToppings(
                            selectedToppings.filter((id) => id !== topping.id)
                          );
                        }
                      }}
                    />
                    <Label
                      htmlFor={topping.id}
                      className="flex justify-between w-full"
                    >
                      <span>{topping.name}</span>
                      <span className="font-semibold">
                        +${topping.price.toFixed(2)}
                      </span>
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Sauces Selection */}
        {item.category_id === "5089a01b-267d-4210-a9f3-d7f9205cb8d0" &&
          sauces.length > 0 && (
            <div className="space-y-4">
              <Label className="text-lg font-semibold">
                Select Sauces {item.max_sauces && `(Max ${item.max_sauces})`}
              </Label>
              <div className="grid grid-cols-2 gap-4">
                {sauces.map((sauce) => (
                  <div key={sauce.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={sauce.id}
                      checked={selectedSauces.includes(sauce.id)}
                      onCheckedChange={(checked) => {
                        if (
                          checked &&
                          (!item.max_sauces ||
                            selectedSauces.length < item.max_sauces)
                        ) {
                          setSelectedSauces([...selectedSauces, sauce.id]);
                        } else if (!checked) {
                          setSelectedSauces(
                            selectedSauces.filter((id) => id !== sauce.id)
                          );
                        }
                      }}
                      disabled={
                        !selectedSauces.includes(sauce.id) &&
                        item.max_sauces &&
                        selectedSauces.length >= item.max_sauces
                      }
                    />
                    <Label
                      htmlFor={sauce.id}
                      className="flex justify-between w-full"
                    >
                      <span>{sauce.name}</span>
                      {sauce.heat_level > 0 && (
                        <span className="text-red-500">
                          {"🌶️".repeat(sauce.heat_level)}
                        </span>
                      )}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="text-2xl font-bold">
          Total: ${totalPrice.toFixed(2)}
        </div>
        <Button
          onClick={handleAddToCart}
          className="bg-red-600 hover:bg-red-700 text-white"
          disabled={!selectedSize}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
