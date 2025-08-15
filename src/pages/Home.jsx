import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";
import { addToCart, removeFromCart } from "../redux/cartSlice";
import { addToWishlist, removeFromWishlist } from "../redux/wishlistSlice";
import { Link } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const handleCartToggle = (product) => {
    const inCart = cartItems.some((item) => item.id === product.id);
    inCart
      ? dispatch(removeFromCart(product.id))
      : dispatch(addToCart(product));
  };

  const handleWishlistToggle = (product) => {
    const inWishlist = wishlistItems.some((item) => item.id === product.id);
    inWishlist
      ? dispatch(removeFromWishlist(product.id))
      : dispatch(addToWishlist(product));
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Flair Store</h1>
        <div className="flex gap-6">
          <Link
            to="/cart"
            className="font-semibold text-gray-700 hover:text-blue-600 transition-colors"
          >
            Cart ({cartItems.length})
          </Link>
          <Link
            to="/wishlist"
            className="font-semibold text-gray-700 hover:text-pink-600 transition-colors"
          >
            Wishlist ({wishlistItems.length})
          </Link>
        </div>
      </div>

      {/* Loading / Error */}
      {status === "loading" && <p className="text-gray-600">Loading...</p>}
      {status === "failed" && <p className="text-red-500">{error}</p>}

      {/* Products Grid */}
      {status === "succeeded" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((product) => {
            const inCart = cartItems.some((item) => item.id === product.id);
            const inWishlist = wishlistItems.some(
              (item) => item.id === product.id
            );

            return (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col text-center hover:shadow-md transition-shadow"
              >
                <Link to={`/product/${product.id}`} className="flex-1 flex flex-col">
                  <div className="h-40 flex items-center justify-center mb-4">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="max-h-40 object-contain"
                    />
                  </div>
                  <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2">
                    {product.title}
                  </h3>
                </Link>

                <p className="font-bold text-lg text-gray-900 mb-4">
                  ${product.price}
                </p>

                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => handleCartToggle(product)}
                    className={`px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors ${
                      inCart
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    {inCart ? "Remove from Cart" : "Add to Cart"}
                  </button>
                  <button
                    onClick={() => handleWishlistToggle(product)}
                    className={`px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors ${
                      inWishlist
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-pink-500 hover:bg-pink-600"
                    }`}
                  >
                    {inWishlist ? "Remove" : "Wishlist"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
