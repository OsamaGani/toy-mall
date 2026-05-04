import { useReveal } from '../hooks/useReveal';

// Scroll-triggered reveal wrapper. Adds a `reveal` class on mount and
// flips to `reveal visible` when the element enters the viewport.
//
// Props:
//   direction: 'up' (default) | 'left' | 'right' | 'scale'
//   delay:     ms transition-delay (good for staggering siblings)
//   once:      pass-through to useReveal (default true — fire once)
//   as:        custom HTML tag (default 'div')
//
// The CSS classes (.reveal, .reveal-left, .reveal-right, .reveal-scale,
// .visible) are defined in index.css.
export default function Reveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  once = true,
  as: Tag = 'div',
}) {
  const [ref, visible] = useReveal({ once });
  const dirClass = direction === 'left' ? 'reveal-left'
    : direction === 'right' ? 'reveal-right'
    : direction === 'scale' ? 'reveal-scale'
    : ''; // 'up' is the default reveal class
  return (
    <Tag
      ref={ref}
      className={`reveal ${dirClass} ${visible ? 'visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
