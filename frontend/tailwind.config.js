/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    // 'xs' = 480 px — sits between Tailwind's default mobile (none) and
    // the built-in `sm` (640 px). Useful when an element needs to behave
    // differently on tiny phones (≤375 px iPhone SE) vs. mid-range
    // phones (≥414 px iPhone 14 Pro / Android XL).
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        // PRIMARY = warm charcoal / near-black. Every CTA, focus ring,
        // active state, etc. that used to be brand-red is now a tasteful
        // dark grey — the West Elm / Article / futuristicconcepts.in
        // palette the user asked for. Red is no longer the brand colour;
        // it's reserved for genuine SALE / promo tags only (see `sale`).
        primary: {
          50:  '#f7f5f2',  // warm off-white surface (cards, hover bgs)
          100: '#ebe7e1',  // light divider
          200: '#d8d2c8',  // muted border
          500: '#1f1d1b',  // main CTA / brand colour
          600: '#0f0e0c',  // hover state for primary
          700: '#000000',
        },
        // ACCENT = warm champagne / tan. Used for eyebrows, small icons,
        // hover hints — the subtle 'editorial' colour every premium
        // retail site leans on.
        accent: '#b8956a',
        // SALE = a real red, kept ONLY for explicit promo / discount /
        // limited-time markers (discount badges, 50% Off pill in nav,
        // 'today's deals' tag). Use `bg-sale text-white` etc. directly.
        sale: '#dc2626',
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        // Editorial display serif used by the homepage hero headlines
        // and any other 'magazine cover' style copy that needs to feel
        // crafted rather than utilitarian.
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
