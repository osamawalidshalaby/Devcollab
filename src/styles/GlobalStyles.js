import { createGlobalStyle } from "styled-components";

const GloalStyle = createGlobalStyle`
*{
  font-family: Arial, Helvetica, sans-serif;
  margin: 0%;
  padding: 0%;
  box-sizing: border-box;
}


body {
    overflow-y: scroll
  }

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(168, 85, 247, 0.5);
    border-radius: 3px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(51, 65, 85, 0.5);
    border-radius: 3px;
  }


/* dark-theme.css */
:root {
  /* Base */
  --color-bg: #0f172a;
  --color-surface: #222222;
  --color-navbar: rgba(30, 41, 59, 0.95);

  /* Text */
  --color-text-primary: #e5e5e5;
  --color-text-secondary: #a1a1a1;
  --color-text-disabled: #6b6b6b;

  /* Accent */
  --color-accent-blue: #3b82f6;
  --color-accent-teal: #14b8a6;
  --color-accent-purple: #8b5cf6;
  --color-accent-red: #ef4444;
  --color-accent-emerald: #10b981;
  --color-accent-amber: #f59e0b;

  /* Borders */
  --color-border: #2e2e2e;
  --color-border-hover: #3a3a3a;

  /* Hover / Glow */
  --color-hover: #2a2a2a;
  --color-glow-blue: rgba(59, 130, 246, 0.3);

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.6);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.7);
  --shadow-glow: 0 0 15px var(--color-glow-blue);
}

/* Global */
body {
  background-color: var(--color-bg);
  color: var(--color-text-primary);
  font-family: system-ui, sans-serif;
}

/* Navbar */


/* Links */
a {
  color: var(--color-accent-blue);
  text-decoration: none;
  transition: 0.2s;
}

a:hover {
  color: var(--color-accent-purple);
  text-shadow: 0 0 5px var(--color-accent-purple);
}

/* Buttons */
button {
  background: var(--color-accent-blue);
  color: var(--color-text-primary);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;
  box-shadow: var(--shadow-sm);
}

button:hover {
  background: var(--color-accent-purple);
  box-shadow: var(--shadow-glow);
}

/* Card */
.card {
  background: var(--color-surface);
  padding: 1rem;
  border-radius: 12px;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-border);
  transition: 0.2s;
}

.card:hover {
  box-shadow: var(--shadow-lg);
}

`;

export {GloalStyle}