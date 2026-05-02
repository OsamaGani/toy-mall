import { Link } from 'react-router-dom';
import { FiShoppingCart, FiStar, FiHeart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { resolveImage } from '../utils/imageUrl';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggle } = useWishlist();
  const wished = isInWishlist(product._id);

  const final = product.discount > 0
    ? +(product.price - (product.price * product.discount) / 100).toFixed(2)
    : product.price;
  const stars = Math.max(0, Math.min(5, product.rating || 0));

  return (
    <div className="card group relative bg-white rounded-lg border hover:border-primary-300 hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col h-[280px] sm:h-[340px] md:h-[400px]">
      {/* Top-left badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
        {product.discount > 0 && (
          <span className="bg-primary-500 text-white text-[9px] sm:text-[10px] font-extrabold px-1.5 py-0.5 rounded shadow">
            -{product.discount}%
          </span>
        )}
        {product.newArrival && (
          <span className="bg-yellow-400 text-gray-900 text-[9px] sm:text-[10px] font-extrabold px-1.5 py-0.5 rounded shadow">
            NEW
          </span>
        )}
        {product.bestSeller && (
          <span className="bg-orange-500 text-white text-[9px] sm:text-[10px] font-extrabold px-1.5 py-0.5 rounded shadow">
            BEST
          </span>
        )}
      </div>

      {/* Wishlist heart (top-right) */}
      <button
        type="button"
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(product); }}
        aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
        className={`absolute top-2 right-2 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow transition
          ${wished ? 'bg-primary-500 text-white' : 'bg-white/95 text-gray-600 hover:bg-primary-500 hover:text-white'}`}
      >
        <FiHeart size={13} className={wished ? 'fill-current' : ''} />
      </button>

      {/* Image — 70% of the fixed card height; body gets the other 30%.
          The image is the visual hero; everything else is intentionally
          quiet so the photo dominates. */}
      <Link
        to={`/product/${product._id}`}
        className="block basis-[70%] shrink-0 overflow-hidden bg-gradient-to-br from-gray-50 to-white p-2 sm:p-3 relative"
      >
        <img
          src={resolveImage(product.image || product.images?.[0])}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-contain group-hover:scale-110 transition duration-500"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/400?text=Toy'; }}
        />
        {/* Out of stock overlay */}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-white/85 flex items-center justify-center">
            <span className="bg-gray-900 text-white text-xs font-extrabold px-3 py-1 rounded-full">OUT OF STOCK</span>
          </div>
        )}
      </Link>

      {/* Body — locked to 30% of card height. Tight typography, single
          button row, so everything fits regardless of viewport. */}
      <div className="basis-[30%] shrink-0 overflow-hidden px-2 py-1.5 sm:px-2.5 sm:py-2 flex flex-col gap-0.5">
        {/* Title — primary line, capped at 2 lines */}
        <Link to={`/product/${product._id}`}>
          <h3 className="font-medium text-[10px] sm:text-[11px] text-gray-800 line-clamp-2 hover:text-primary-500 leading-tight">
            {product.name}
          </h3>
        </Link>

        {/* Price + rating on one row to save vertical space */}
        <div className="flex items-center justify-between gap-1.5">
          <div className="flex items-baseline gap-1 min-w-0">
            <span className="text-[12px] sm:text-sm font-bold text-gray-900">₹{final.toFixed(0)}</span>
            {product.discount > 0 && (
              <>
                <span className="text-[9px] text-gray-400 line-through">₹{product.price.toFixed(0)}</span>
                <span className="text-[8px] sm:text-[9px] text-emerald-600 font-bold whitespace-nowrap">{product.discount}% off</span>
              </>
            )}
          </div>
          {stars > 0 && (
            <span className="bg-emerald-600 text-white text-[8px] font-bold px-1 py-0 rounded inline-flex items-center gap-0.5 flex-shrink-0">
              {stars.toFixed(1)}<FiStar className="fill-current" size={7} />
            </span>
          )}
        </div>

        {/* Spacer pushes the button to the bottom */}
        <div className="flex-1" />

        {/* Single Add to Cart — same on all sizes inside the fixed 30% body */}
        <button
          disabled={product.stock === 0}
          onClick={() => addToCart(product)}
          className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-[10px] sm:text-[11px] font-bold py-1 sm:py-1.5 rounded flex items-center justify-center gap-1 transition active:scale-95"
        >
          <FiShoppingCart size={10} />
          {product.stock === 0 ? 'Sold Out' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
