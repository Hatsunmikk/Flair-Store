import { screen, fireEvent } from "@testing-library/react";
import ProductCard from "../ProductCard";
import { renderWithProviders } from "../../test-utils";

const product = {
  id: 1,
  title: "Test Product",
  image: "https://via.placeholder.com/150",
  price: 99.99,
};

test("renders product and triggers handlers", () => {
  const handleCartAction = jest.fn();
  const handleWishlistAction = jest.fn();

  renderWithProviders(
    <ProductCard
      product={product}
      idx={0}
      inCart={false}
      inWishlist={false}
      handleCartAction={handleCartAction}
      handleWishlistAction={handleWishlistAction}
    />
  );

  expect(screen.getByText(/test product/i)).toBeInTheDocument();
  expect(screen.getByText(/\$99\.99/)).toBeInTheDocument();

  // Cart button works
  fireEvent.click(screen.getByRole("button", { name: /add to cart/i }));
  expect(handleCartAction).toHaveBeenCalledWith(product);

  // Wishlist button works
  fireEvent.click(screen.getByRole("button", { name: /add to wishlist/i }));
  expect(handleWishlistAction).toHaveBeenCalledWith(product);
});
