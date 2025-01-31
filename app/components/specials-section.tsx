"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, ChevronDown } from "lucide-react";

type Special = {
  id: string | null;
  name: string | null;
  description: string | null;
  special_price: number | null;
  base_item_name: string | null;
  discount_percentage: number | null;
  start_date: string | null;
  end_date: string | null;
};

export function SpecialsSection({ specials }: { specials: Special[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-16">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-center mb-8 group"
      >
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="h-6 w-6 text-yellow-500" />
          <h2 className="text-3xl font-bold text-[#E63946]">
            Today's Specials
          </h2>
          <Sparkles className="h-6 w-6 text-yellow-500" />
          <ChevronDown
            className={`h-6 w-6 text-[#E63946] transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {isOpen && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {specials.map((special) => (
            <div
              key={special.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {special.name}
                </h3>
                <p className="text-gray-600 mb-4">{special.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {special.special_price && (
                      <span className="text-2xl font-bold text-red-600">
                        ${special.special_price.toFixed(2)}
                      </span>
                    )}
                    {special.discount_percentage && (
                      <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-sm font-medium">
                        {special.discount_percentage}% OFF
                      </span>
                    )}
                  </div>
                  {special.id && (
                    <Link
                      href={`/menu/specials/${special.id}`}
                      className="inline-flex items-center text-red-600 hover:text-red-700 font-medium"
                    >
                      Order Now
                      <span className="ml-2">→</span>
                    </Link>
                  )}
                </div>
                {special.end_date && (
                  <div className="mt-4 text-sm text-gray-500">
                    Valid until{" "}
                    {new Date(special.end_date).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
