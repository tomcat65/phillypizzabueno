import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  options?: {
    name: string;
    choices: {
      id: string;
      name: string;
      price: number;
    }[];
  }[];
}

const menuItems: Record<string, MenuItem> = {
  margherita: {
    id: "margherita",
    name: "Margherita Pizza",
    description: "Fresh tomatoes, mozzarella, and basil",
    price: 14.99,
    image: "/margherita.jpg",
    category: "pizza",
    options: [
      {
        name: "Size",
        choices: [
          { id: "small", name: 'Small (12")', price: 0 },
          { id: "medium", name: 'Medium (14")', price: 3 },
          { id: "large", name: 'Large (16")', price: 5 },
        ],
      },
      {
        name: "Crust",
        choices: [
          { id: "regular", name: "Regular", price: 0 },
          { id: "thin", name: "Thin", price: 0 },
          { id: "stuffed", name: "Stuffed", price: 3 },
        ],
      },
    ],
  },
  // Add more items here
};

interface Props {
  params: {
    category: string;
    itemId: string;
  };
}

export default function ItemPage({ params }: Props) {
  const item = menuItems[params.itemId];

  if (!item || item.category !== params.category) {
    notFound();
  }

  return (
    <main className="flex-1">
      <div className="container py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Image */}
          <div className="aspect-square overflow-hidden rounded-lg">
            <div
              className="h-full w-full bg-cover bg-center"
              style={{
                backgroundImage: `url('${item.image}')`,
              }}
            />
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold">{item.name}</h1>
            <p className="mt-2 text-xl font-medium">${item.price.toFixed(2)}</p>
            <p className="mt-4 text-muted-foreground">{item.description}</p>

            {/* Options */}
            {item.options?.map((option) => (
              <div key={option.name} className="mt-8">
                <h3 className="mb-4 text-lg font-semibold">{option.name}</h3>
                <div className="grid gap-2">
                  {option.choices.map((choice) => (
                    <label
                      key={choice.id}
                      className="flex cursor-pointer items-center justify-between rounded-lg border p-4 hover:bg-accent"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={option.name.toLowerCase()}
                          value={choice.id}
                          className="h-4 w-4"
                        />
                        <span>{choice.name}</span>
                      </div>
                      {choice.price > 0 && (
                        <span className="text-sm">
                          +${choice.price.toFixed(2)}
                        </span>
                      )}
                    </label>
                  ))}
                </div>
              </div>
            ))}

            {/* Add to Cart Button */}
            <Button size="lg" className="mt-8">
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
