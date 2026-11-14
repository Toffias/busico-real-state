import { ViewTransition, type ReactNode } from 'react';

/** Al navegar, la página vieja se va hacia arriba con blur y la nueva sube suavemente. */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page" exit="page" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
