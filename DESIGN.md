# Africa Property Index – Design System

## Philosophy
Database-inspired, structured, technical. The site should feel like API documentation or a data terminal — not a typical marketing page.

## Typography
- **Headings**: Inter/system sans-serif, `font-black`, `uppercase`, `tracking-tight`
- **Body**: JetBrains Mono (monospace), `text-sm`
- **Labels**: JetBrains Mono, `text-[10px]`, `uppercase`, `tracking-[0.2em]`
- **Data values**: JetBrains Mono, tabular-nums

## Colors (Tailwind / CSS)
| Token              | Light          | Dark           |
|--------------------|----------------|----------------|
| background         | `#ffffff`      | `#000000`      |
| foreground         | `#000000`      | `#ffffff`      |
| primary            | `#000000`      | `#ffffff`      |
| muted              | `#f5f5f5`      | `#171717`      |
| muted-foreground   | `#717171`      | `#a3a3a3`      |
| border             | `#e5e5e5`      | `#262626`      |

## Components
- **Border radius**: `0` everywhere — no rounded corners
- **Shadow**: `4px 4px 0px #000` (brutalist offset shadow)
- **Borders**: `1px solid` using border color
- **Buttons**: Solid black bg, white text, uppercase, mono font, brutalist shadow
- **Inputs**: Black border, no radius, mono font
- **Cards**: White bg, black border, brutalist shadow

## Spacing
- Generous whitespace
- Grid-based layout with visible structure
- Section dividers using horizontal rules or borders

## Interactions
- Hover: invert colors (black → white, white → black)
- Focus: 2px solid black outline, offset 2px
- Transitions: none or minimal (keep it snappy)
