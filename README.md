# Philly Pizza Bueno Web App

A modern web application for a pizza restaurant built with Next.js 14, TypeScript, Tailwind CSS, and Supabase.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn UI
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Deployment:** Vercel

## Features

- Modern, responsive design
- Server-side rendering
- Dynamic menu system
- Category-based navigation
- Real-time menu updates
- Dark mode support

## Getting Started

1. Clone the repository:

   ```bash
   git clone [your-repo-url]
   cd phillypizzabueno-web-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your Supabase credentials:

   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Database Schema

The application uses a PostgreSQL database with the following main tables:

- `menu_categories`
- `menu_items`
- `pizza_sizes`
- `toppings`

Plus several views and functions for efficient data access.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
