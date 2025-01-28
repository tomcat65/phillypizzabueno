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
import type { Database } from "@/types/supabase";

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
    if (!selectedSize) return;

    let price = item.base_price;
    const size = sizes.find((s) => s.id === selectedSize);

    if (item.category_id === "pizza") {
      const pizzaSize = size as PizzaSize;
      price *= pizzaSize.price_multiplier;

      // Add topping prices
      selectedToppings.forEach((toppingId) => {
        const topping = toppings.find((t) => t.id === toppingId);
        if (topping) {
          price += topping.price * pizzaSize.price_multiplier;
        }
      });
    } else if (item.category_id === "wings") {
      const wingQuantity = size as WingQuantity;
      price = wingQuantity.price;
    }

    setTotalPrice(price);
  }, [item, selectedSize, selectedToppings, sizes, toppings]);

  const handleAddToCart = () => {
    if (!selectedSize) return;

    const size = sizes.find((s) => s.id === selectedSize);
    const cartItem = {
      id: `${item.id}-${Date.now()}`,
      type: item.category_id as "pizza" | "wings" | "sides" | "beverages",
      name: item.name,
      variant_id: selectedSize,
      quantity: 1,
      customizations: {
        size,
        toppings: selectedToppings.map((id) =>
          toppings.find((t) => t.id === id)
        ),
        sauces: selectedSauces.map((id) => sauces.find((s) => s.id === id)),
      },
      price: totalPrice,
    };

    addItem(cartItem);
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    });
    router.push("/cart");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{item.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Size Selection */}
        <div className="space-y-4">
          <Label>Size</Label>
          <div className="grid gap-4">
            {sizes.map((size) => {
              const label =
                item.category_id === "pizza"
                  ? `${(size as PizzaSize).size_inches}" - $${(
                      item.base_price * (size as PizzaSize).price_multiplier
                    ).toFixed(2)}`
                  : `${(size as WingQuantity).pieces}pc - $${(
                      size as WingQuantity
                    ).price.toFixed(2)}`;

              return (
                <div key={size.id} className="flex items-center space-x-2">
                  <RadioGroup
                    value={selectedSize}
                    onValueChange={setSelectedSize}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={size.id} id={size.id} />
                      <Label htmlFor={size.id}>{label}</Label>
                    </div>
                  </RadioGroup>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pizza Toppings */}
        {item.category_id === "pizza" && toppings.length > 0 && (
          <div className="space-y-4">
            <Label>Toppings</Label>
            <div className="grid gap-4 sm:grid-cols-2">
              {toppings.map((topping) => (
                <div key={topping.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={topping.id}
                    checked={selectedToppings.includes(topping.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedToppings([...selectedToppings, topping.id]);
                      } else {
                        setSelectedToppings(
                          selectedToppings.filter((id) => id !== topping.id)
                        );
                      }
                    }}
                  />
                  <Label htmlFor={topping.id}>
                    {topping.name} (+${topping.price.toFixed(2)})
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Wing Sauces */}
        {item.category_id === "wings" && sauces.length > 0 && (
          <div className="space-y-4">
            <Label>Sauces</Label>
            <div className="grid gap-4 sm:grid-cols-2">
              {sauces.map((sauce) => (
                <div key={sauce.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={sauce.id}
                    checked={selectedSauces.includes(sauce.id)}
                    onCheckedChange={(checked) => {
                      const size = sizes.find(
                        (s) => s.id === selectedSize
                      ) as WingQuantity;
                      if (checked) {
                        if (selectedSauces.length < size.max_sauces) {
                          setSelectedSauces([...selectedSauces, sauce.id]);
                        } else {
                          toast({
                            title: "Maximum sauces reached",
                            description: `You can only select ${size.max_sauces} sauces for this quantity.`,
                            variant: "destructive",
                          });
                        }
                      } else {
                        setSelectedSauces(
                          selectedSauces.filter((id) => id !== sauce.id)
                        );
                      }
                    }}
                  />
                  <Label htmlFor={sauce.id}>
                    {sauce.name}
                    {sauce.heat_level > 0 &&
                      ` (${"\u{1F336}".repeat(sauce.heat_level)})`}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-lg font-bold">Total: ${totalPrice.toFixed(2)}</div>
        <Button onClick={handleAddToCart}>Add to Cart</Button>
      </CardFooter>
    </Card>
  );
}
