import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import type { Database } from "@/types/supabase";

type MenuItem = Database["public"]["Tables"]["menu_items"]["Row"];

interface DefaultItemProps {
  item: MenuItem;
  categoryId: string;
}

export function DefaultItem({ item, categoryId }: DefaultItemProps) {
  return (
    <Card className="overflow-hidden">
      {item.image_url && (
        <div className="relative h-48 w-full">
          <Image
            src={item.image_url}
            alt={item.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <CardHeader className="pb-3">
        <h3 className="text-lg font-semibold">{item.name}</h3>
        {item.description && (
          <p className="text-sm text-gray-600">{item.description}</p>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Price</span>
          <span className="text-sm font-semibold">
            {formatPrice(item.base_price)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
