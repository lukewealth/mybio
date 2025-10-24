// jsx.d.ts
import "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Add r3f elements here
      mesh: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      planeGeometry: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      meshBasicMaterial: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      // Add other r3f elements you use if needed
    }
  }
}
