import { useEffect, useRef, useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { resolveImage } from '../utils/imageUrl';

// Slim sticky bar that snaps to the bottom of the viewport once the
// customer scrolls past the in-page buy buttons. Mirrors the FirstCry /
// Amazon / Flipkart pattern — keeping the Add-to-Cart action one tap
// away no matter how far down the page the customer scrolls. Especially
// important on mobile where product pages are long (gallery, price,
// description, specs, reviews, related products) and the customer
// almost always scrolls past the original buttons.
//
// Props:
//   anchorRef       — ref pointing at the in-page buy block. Bar shows
//                     once that anchor has scrolled out of view.
//   image, name, price — product display fields for the bar's left side.
//   discount        — optional %, used to render the strikethrough.
//   stock           — 0 = sold out (we render a disabled "Sold Out" state).
//   onAddToCart     — handler for the Add-to-Cart button.
//   onBuyNow        — handler for the Buy Now button.
//   priceLabel      — optional small caption under price (e.g. "for Yellow").
export default function StickyBuyBar({
  anchorRef,
  image,
  name,
  price,
  originalPrice,
  discount,
  stock,
  onAddToCart,
  onBuyNow,
  priceLabel,
}) {
  const [visible, setVisible] = useState(false);
  // Track scroll direction too — only show on scroll DOWN past the
  // anchor, hide instantly when the customer scrolls back up to the
  // anchor (otherwise the bar feels noisy on rapid scroll).
  const obsRef = useRef(null);

  useEffect(() => {
    const el = anchorRef?.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        // entry.isIntersecting === true when the anchor is on-screen.
        // We only want the bar when the anchor is OFF-screen AND the
        // customer has scrolled past it (boundingClientRect.top < 0).
        const passed = entry.boundingClientRect.top < 0;
        setVisible(!entry.isIntersecting && passed);
      },
      { threshold: 0, rootMargin: '0px' }
    );
    obs.observe(el);
    obsRef.current = obs;
    return () => obs.disconnect();
  }, [anchorRef]);

  if (!image && !name) return null;

  return (
    <div
      // Mobile: sits above the BottomNav (which is ~56 px). Desktop:
      // sits at bottom of viewport. Translate-y animation gives a smooth
      // slide-up the moment the buy buttons go out of view.
      className={`fixed inset-x-0 z-30 bg-white border-t shadow-[0_-4px_20px_rgba(0,0,0,0.08)] transition-all duration-300 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
      } bottom-14 sm:bottom-0`}
      role="region"
      aria-label="Quick buy bar"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-2.5 flex items-center gap-2 sm:gap-3">
        {/* Thumbnail */}
        <div className="w-11 h-11 sm:w-12 sm:h-12 flex-shrink-0 rounded-lg bg-gray-50 border overflow-hidden p-1">
          <img
            src={resolveImage(image)}
            alt={name}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Name + price */}
        <div className="min-w-0 flex-1">
          <p className="text-[11px] sm:text-xs font-semibold text-gray-900 truncate leading-tight">
            {name}
          </p>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="text-sm sm:text-base font-extrabold text-gray-900">
              ₹{Number(price || 0).toFixed(0)}
            </span>
            {originalPrice && originalPrice > price && (
              <>
                <span className="text-[10px] sm:text-xs text-gray-400 line-through">
                  ₹{Number(originalPrice).toFixed(0)}
                </span>
                {discount > 0 && (
                  <span className="text-[10px] sm:text-xs text-emerald-600 font-bold">
                    {discount}% off
                  </span>
                )}
              </>
            )}
          </div>
          {priceLabel && (
            <p className="text-[9px] text-primary-600 font-medium leading-tight truncate">
              {priceLabel}
            </p>
          )}
        </div>

        {/* Action buttons */}
        {stock === 0 ? (
          <button
            disabled
            className="flex-shrink-0 bg-gray-300 text-gray-500 text-[11px] sm:text-xs font-bold px-3 sm:px-4 py-2 rounded-full cursor-not-allowed"
          >
            Sold Out
          </button>
        ) : (
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              onClick={onAddToCart}
              className="inline-flex items-center justify-center gap-1 border border-primary-500 text-primary-500 hover:bg-primary-50 text-[11px] sm:text-xs font-bold px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full transition active:scale-95"
            >
              <FiShoppingCart size={12} className="hidden sm:inline" />
              <span className="hidden sm:inline">Add</span>
              <span className="sm:hidden">+ Cart</span>
            </button>
            <button
              onClick={onBuyNow}
              className="inline-flex items-center justify-center gap-1 bg-primary-500 hover:bg-primary-600 text-white text-[11px] sm:text-xs font-bold px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full transition shadow active:scale-95"
            >
              ⚡ Buy Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
