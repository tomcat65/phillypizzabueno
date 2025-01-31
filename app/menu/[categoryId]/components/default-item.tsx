import Image from "next/image";
import Link from "next/link";
import type { Database } from "@/types/supabase";

type MenuItem = Database["public"]["Tables"]["menu_items"]["Row"] & {
  image_url?: string | null;
  description?: string | null;
};

export function DefaultItem({
  item,
  categoryId,
}: {
  item: MenuItem;
  categoryId: string;
}) {
  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
      {item.image_url && (
        <div className="relative h-56 w-full">
          <Image
            src={item.image_url}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            priority={false}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-2xl font-serif text-gray-900 mb-3">{item.name}</h3>
        {item.description && (
          <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>
        )}

        <div className="text-xl font-medium text-red-700 mb-4">
          ${item.base_price.toFixed(2)}
        </div>

        <div className="mt-4 flex justify-end">
          <Link
            href={`/menu/${categoryId}/${item.id}`}
            className="inline-flex items-center text-red-700 hover:text-red-800 font-medium transition-colors"
          >
            Customize
            <span className="ml-2">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
