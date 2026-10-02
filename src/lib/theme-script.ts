// Inlined in <head> by the root layout: applies the saved (or system) theme before the first paint.
// Kept out of ThemeContext because exports of a 'use client' module can't be read by server components.
export const THEME_SCRIPT = `try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}`;
