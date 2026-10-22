import { ViewTransition } from 'react';

// A template remounts on every navigation, so the old page "exits" and the new one "enters".
// The animations (page-out / page-in) live in globals.css. Initial loads aren't transitions,
// so they don't animate here.
export default function Template({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      {children}
    </ViewTransition>
  );
}
