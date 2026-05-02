import { Link } from 'react-router-dom';
import { FiShoppingCart, FiStar, FiHeart, FiEye } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { resolveImage } from '../utils/imageUrl';

const FREE_SHIPPING_THRESHOLD = 999;

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggle } = useWishlist();
  const wished = isInWishlist(product._id);

  const final = product.discount > 0
    ? +(product.price - (product.price * product.discount) / 100).toFixed(2)
    : product.price;
  const saved = product.discount > 0 ? product.price - final : 0;
  const lowStock = product.stock > 0 && product.stock <= 5;
  const eligibleFreeShip = final >= FREE_SHIPPING_THRESHOLD;
  const stars = Math.max(0, Math.min(5, product.rating || 0));

  return (
    <div className="group relative bg-white rounded-xl border border-gray-100 hover:border-primary-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col">
      {/* Top-left badge stack — kept minimal so the image stays the hero */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
        {product.discount > 0 && (
          <span className="bg-primary-500 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded shadow-sm">
            -{product.discount}%
          </span>
        )}
        {product.newArrival && (
          <span className="bg-yellow-400 text-gray-900 text-[9px] font-extrabold px-1.5 py-0.5 rounded shadow-sm">
            NEW
          </span>
        )}
        {product.bestSeller && (
          <span className="bg-orange-500 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded shadow-sm">
            BESTSELLER
          </span>
        )}
      </div>

      {/* Wishlist heart */}
      <button
        type="button"
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(product); }}
        aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
        className={`absolute top-2 right-2 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-sm transition
          ${wished ? 'bg-primary-500 text-white' : 'bg-white/95 text-gray-600 hover:bg-primary-500 hover:text-white'}`}
      >
        <FiHeart size={13} className={wished ? 'fill-current' : ''} />
      </button>

      {/* IMAGE — the hero. 4:5 aspect = ~63% of card height, leaving compact room for info below. */}
      <Link
        to={`/product/${product._id}`}
        className="block aspect-[4/5] overflow-hidden bg-gradient-to-br from-gray-50 to-white relative"
      >
        <img
          src={resolveImage(product.image || product.images?.[0])}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-contain p-3 sm:p-4 group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/400?text=Toy'; }}
        />
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-white/85 flex items-center justify-center">
            <span className="bg-gray-900 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full">
              OUT OF STOCK
            </span>
          </div>
        )}
      </Link>

      {/* INFO — compact, subtle typography so the image stays the focus */}
      <div className="px-2.5 py-2 flex flex-col gap-1.5 flex-1">
        {/* Brand · always one line, very small */}
        <p className="text-[9px] uppercase tracking-wide text-gray-400 truncate font-semibold">
          {product.brand}
        </p>

        {/* Title · small but readable, fixed 2-line height for grid alignment */}
        <Link to={`/product/${product._id}`}>
          <h3 className="text-[11px] sm:text-xs text-gray-800 font-medium line-clamp-2 hover:text-primary-500 leading-snug min-h-[2rem]">
            {product.name}
          </h3>
        </Link>

        {/* Rating row + price packed tight */}
        <div className="flex items-center justify-between gap-2">
          {/* Tiny green rating pill */}
          {stars > 0 ? (
            <span className="bg-emerald-600 text-white text-[9px] font-bold px-1 py-0.5 rounded inline-flex items-center gap-0.5">
              {stars.toFixed(1)} <FiStar className="fill-current" size={8} />
            </span>
          ) : <span /> /* placeholder so price stays right-aligned */}
        </div>

        {/* Price block — slightly highlighted but not loud */}
        <div className="-mt-0.5">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-sm sm:text-base font-bold text-gray-900">₹{final.toFixed(0)}</span>
            {product.discount > 0 && (
              <span className="text-[10px] text-gray-400 line-through">₹{product.price.toFixed(0)}</span>
            )}
            {product.discount > 0 && (
              <span className="text-[9px] text-emerald-600 font-bold">{product.discount}% off</span>
            )}
          </div>
          {/* Subtle save line — only when meaningful */}
          {saved > 0 && (
            <p className="text-[9px] text-gray-500 leading-tight">Save ₹{saved.toFixed(0)}</p>
          )}
        </div>

        {/* Stock / shipping signal — compact, hidden when nothing important */}
        {(eligibleFreeShip || lowStock) && product.stock > 0 && (
          <p className="text-[9px] leading-tight">
            {lowStock
              ? <span className="text-orange-600 font-semibold">Only {product.stock} left</span>
              : <span className="text-emerald-600 font-semibold">Free delivery</span>}
          </p>
        )}

        {/* Spacer pushes buttons to bottom for grid alignment */}
        <div className="flex-1" />

        {/* CTA — clearly visible but compact */}
        <div className="flex gap-1.5">
          {/* View — secondary, hidden on smallest mobile to keep card cleaner */}
          <Link
            to={`/product/${product._id}`}
            aria-label="View product"
            className="hidden sm:inline-flex w-9 items-center justify-center border border-gray-200 hover:border-primary-500 hover:text-primary-500 rounded-md text-gray-500 transition"
          >
            <FiEye size={12} />
          </Link>
          <button
            disabled={product.stock === 0}
            onClick={() => addToCart(product)}
            className="flex-1 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-[11px] font-bold py-1.5 rounded-md flex items-center justify-center gap-1 transition active:scale-95"
          >
            <FiShoppingCart size={11} />
            {product.stock === 0 ? 'Sold Out' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
