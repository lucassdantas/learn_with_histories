// The root template only remounts when the first URL segment changes (/ → /stories). This one
// remounts inside /stories too (list → story, story → story), so those navigations crossfade as well.
export { default } from '../template';
