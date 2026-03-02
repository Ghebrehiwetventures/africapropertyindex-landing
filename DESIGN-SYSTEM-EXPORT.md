# Design System — Export för återanvändning i andra projekt

Detta dokument innehåller all designrelaterad kod från Africa Real Estate Index Landing så att du kan använda samma designmall i ett annat projekt.

---

## 1. Teknisk stack

- **React** + **Vite**
- **Tailwind CSS v4** med `@tailwindcss/vite`
- **Typsnitt:** Inter (sans), JetBrains Mono (mono)

### package.json (relevant)

```json
"dependencies": {
  "react": "^19.2.0",
  "react-dom": "^19.2.0"
},
"devDependencies": {
  "@tailwindcss/vite": "^4.1.18",
  "tailwindcss": "^4.1.18",
  "@vitejs/plugin-react": "^5.1.1",
  "vite": "^7.3.1"
}
```

### vite.config.ts

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

---

## 2. Fonts (i index.html <head>)

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;900&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
```

---

## 3. Hela design-CSS (src/index.css)

Kopiera hela filen nedan till ditt nya projekts `src/index.css` (eller motsvarande) och importera Tailwind enligt projektet.

```css
@import "tailwindcss";

/* ── Custom theme ─────────────────────────────────── */
@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, "Cascadia Code", monospace;

  --color-background: #ffffff;
  --color-foreground: #000000;
  --color-primary: #000000;
  --color-primary-foreground: #ffffff;
  --color-muted: #f5f5f5;
  --color-muted-foreground: #717171;
  --color-border: #e5e5e5;

  --color-green: #22c55e;
  --color-amber: #f59e0b;
}

/* ── Base ─────────────────────────────────────────── */
* {
  border-radius: 0 !important;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-mono);
  background: var(--color-background);
  color: var(--color-foreground);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::selection {
  background: var(--color-foreground);
  color: var(--color-background);
}

/* ── Utilities ────────────────────────────────────── */
@utility brutalist-shadow {
  box-shadow: 4px 4px 0px var(--color-foreground);
}

@utility brutalist-shadow-sm {
  box-shadow: 2px 2px 0px var(--color-foreground);
}

@utility brutalist-shadow-white {
  box-shadow: 4px 4px 0px var(--color-background);
}

@utility tracking-ultra {
  letter-spacing: 0.1em;
}

@utility label-style {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-muted-foreground);
  font-family: var(--font-mono);
}

/* ── Animations ───────────────────────────────────── */

@utility animate-fade-up {
  animation: fadeUp 0.6s ease-out both;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@utility animate-fade-in {
  animation: fadeIn 0.8s ease-out both;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@utility animate-slide-left {
  animation: slideLeft 0.6s ease-out both;
}

@keyframes slideLeft {
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@utility animate-slide-right {
  animation: slideRight 0.6s ease-out both;
}

@keyframes slideRight {
  from {
    opacity: 0;
    transform: translateX(40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@utility animate-scale-in {
  animation: scaleIn 0.5s ease-out both;
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@utility animate-pulse-dot {
  animation: pulseDot 2s ease-in-out infinite;
}

@keyframes pulseDot {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

@utility animate-ticker {
  animation: ticker 30s linear infinite;
}

@keyframes ticker {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.animate-carousel {
  animation: carousel 20s linear infinite;
}

@media (min-width: 640px) {
  .animate-carousel {
    animation: carousel 45s linear infinite;
  }
}

@keyframes carousel {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@utility animate-blink {
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

@utility animate-stagger {
  animation: fadeUp 0.5s ease-out both;
}

@utility animate-ping-slow {
  animation: pingSlow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes pingSlow {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  75%, 100% {
    transform: scale(2.5);
    opacity: 0;
  }
}

@utility animate-row-highlight {
  animation: rowHighlight 8s ease-in-out infinite;
}

@keyframes rowHighlight {
  0%, 100% { background-color: transparent; }
  50% { background-color: var(--color-muted); }
}

@utility tabular-nums {
  font-variant-numeric: tabular-nums;
}

.observe-hidden {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.observe-visible {
  opacity: 1;
  transform: translateY(0);
}

.delay-100 { animation-delay: 100ms; }
.delay-200 { animation-delay: 200ms; }
.delay-300 { animation-delay: 300ms; }
.delay-400 { animation-delay: 400ms; }
.delay-500 { animation-delay: 500ms; }
.delay-600 { animation-delay: 600ms; }
.delay-700 { animation-delay: 700ms; }
.delay-800 { animation-delay: 800ms; }
```

---

## 4. Hooks (scroll reveal + count-up)

Skapa t.ex. `src/hooks/useScrollReveal.ts`:

```ts
import { useEffect, useRef, useState } from "react";

export function useScrollReveal<T extends HTMLElement>(
  threshold = 0.15
): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

export function useCountUp(
  end: number,
  duration: number = 2000,
  startOnVisible: boolean = true
): [React.RefObject<HTMLDivElement | null>, number] {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!startOnVisible) {
      setStarted(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [startOnVisible]);

  useEffect(() => {
    if (!started) return;

    const startTime = performance.now();
    const step = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * end));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [started, end, duration]);

  return [ref, value];
}
```

---

## 5. Designregler och klassnamn

| Syfte | Klasser / variabler |
|--------|----------------------|
| **Layout** | `max-w-7xl mx-auto px-4 sm:px-6`, `py-12 sm:py-20` |
| **Brutalist skugga** | `brutalist-shadow`, `brutalist-shadow-sm`, `brutalist-shadow-white` |
| **Sektionsetiketter** | `label-style` (uppercase, mono, muted) |
| **Rubriker** | `font-sans font-black text-3xl sm:text-4xl uppercase tracking-tight` |
| **Body** | `font-mono`, `text-foreground`, `text-muted-foreground` |
| **Färger** | `bg-background`, `bg-foreground`, `text-background`, `text-foreground`, `bg-muted`, `text-muted-foreground`, `border-border`, `bg-green`, `bg-amber` |
| **Knappar** | `uppercase tracking-widest`, kant med `border border-foreground`, hover: `hover:bg-foreground hover:text-background` |
| **Scroll-reveal** | `opacity-0 translate-y-8` → `opacity-100 translate-y-0` med `transition-all duration-700` |
| **Animationer** | `animate-fade-up`, `animate-fade-in`, `animate-scale-in`, `animate-ping-slow`, `delay-200` m.fl. |

---

## 6. Snabbchecklista för nytt projekt

1. Installera: `tailwindcss`, `@tailwindcss/vite`, `vite`, `react`, `react-dom`, `@vitejs/plugin-react`.
2. Lägg till `tailwindcss()` i `vite.config.ts` enligt ovan.
3. Kopiera **index.css** (avsnitt 3) till `src/index.css` och importera i entry (t.ex. `main.tsx`).
4. Lägg till **font-länkarna** (avsnitt 2) i `index.html`.
5. Kopiera **hooks** (avsnitt 4) till t.ex. `src/hooks/useScrollReveal.ts`.
6. Använd **designreglerna** (avsnitt 5) i dina komponenter.

När du vill använda samma design i ett annat projekt räcker det att följa denna export.
