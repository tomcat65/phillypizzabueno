import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";

interface PizzaItemProps {
  pizza: {
    id: string;
    name: string;
    description: string;
    image_url: string;
    variants: Array<{
      id: string;
      base_price: number;
      size: {
        size_inches: number;
        size_name: string;
      };
    }>;
  };
  categoryId: string;
}

export function PizzaItem({ pizza, categoryId }: PizzaItemProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={pizza.image_url}
          alt={pizza.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardHeader className="pb-3">
        <h3 className="text-lg font-semibold">{pizza.name}</h3>
        <p className="text-sm text-gray-600">{pizza.description}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {pizza.variants
            .sort((a, b) => a.size.size_inches - b.size.size_inches)
            .map((variant) => (
              <div
                key={variant.id}
                className="flex justify-between items-center py-2 border-b last:border-0"
              >
                <span className="text-sm font-medium">
                  {variant.size.size_name}&nbsp;&nbsp;&nbsp;(
                  {variant.size.size_inches}")
                </span>
                <span className="text-sm font-semibold ml-16">
                  {formatPrice(variant.base_price)}
                </span>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
