export default {
    darkMode: 'class', // Enable selector-based dark mode
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
      ],
      theme: {
        extend: {
          colors: {
            background: 'var(--color-background)',
            foreground: 'var(--color-foreground)',
            foregroundDark: 'var(--color-foreground-dark)',
            backgroundDark: 'var(--color-background-dark)',
          },
        },  
      },
    
      plugins: [],
    }