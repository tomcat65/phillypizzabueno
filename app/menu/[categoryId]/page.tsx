import { Suspense } from "react";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoadingPage } from "@/components/ui/loading";
import { Pizza } from "lucide-react";
import Link from "next/link";
import { Database } from "@/types/supabase";

type MenuItem = Database["public"]["Tables"]["menu_items"]["Row"];
type MenuCategory = Database["public"]["Tables"]["menu_categories"]["Row"] & {
  menu_items: MenuItem[];
};

interface MenuCategoryPageProps {
  params: {
    categoryId: string;
  };
}

function MenuItem({
  item,
  categoryId,
}: {
  item: MenuItem;
  categoryId: string;
}) {
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 bg-white">
      {item.image_url && (
        <div className="relative h-48 w-full bg-gray-100">
          <Image
            src={item.image_url}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <CardHeader className="bg-red-500 text-white">
        <CardTitle className="text-xl">{item.name}</CardTitle>
        <CardDescription className="text-red-100">
          {item.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 bg-white">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-red-600">
            ${item.base_price.toFixed(2)}
          </span>
          <Button asChild className="bg-red-600 hover:bg-red-700 text-white">
            <Link href={`/menu/${categoryId}/${item.id}`}>Customize</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default async function MenuCategoryPage({
  params,
}: MenuCategoryPageProps) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const { data: category } = await supabase
    .from("menu_categories")
    .select("*, menu_items(*)")
    .eq("id", params.categoryId)
    .single();

  if (!category) {
    notFound();
  }

  const typedCategory = category as MenuCategory;

  return (
    <div className="min-h-screen bg-red-600">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center gap-3 mb-8">
          <Pizza className="h-10 w-10 text-white" />
          <h1 className="text-4xl font-bold text-white text-center">
            {typedCategory.name}
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {typedCategory.menu_items?.map((item) => (
            <MenuItem key={item.id} item={item} categoryId={typedCategory.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
