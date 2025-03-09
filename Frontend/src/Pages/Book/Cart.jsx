import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { getImgUrl } from "../../utils/getImgUrl";
import { clearCart, removeFromCart } from "../../redux/features/Cart/cartSlice";
import { FaQuestionCircle } from "react-icons/fa";
const offer = [
  { code: "ABXG72PLQK", value: 10 },
  { code: "YZRM81XCNQ", value: 25 },
  { code: "WLFD20GTMP", value: 50 },
  { code: "KJHT56QRNY", value: 15 },
  { code: "ZVXC73BDLU", value: 40 },
  { code: "MNPQ65XTRF", value: 5 },
  { code: "GHJK78LMNO", value: 30 },
  { code: "ASDF90WERZ", value: 12 },
  { code: "POIU45YVBN", value: 45 },
  { code: "LKJH12GQWE", value: 20 },
];
const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItem);
  const dispatch = useDispatch();
  const [quant,Setquant] = useState(0);
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [totalPrice, discountedTotal] = useState(0);
  const [usedCoupon, setUsedCoupon] = useState(false);
  const QntInc = (e) => {
    console.log(e)
    if (e.key === "ArrowUp"){
        Setquant((prev)=>prev+1);
    }
  }
  const QntDesc = (e) => {
    if (e.key === "ArrowDown") {
        Setquant((prev) => Math.max(prev - 1, 1));
      }
  }
  const Price = cartItems
    .reduce((acc, item) => acc + item.newPrice, 0)
    .toFixed(2);
  useEffect(() => {
    const Price = cartItems
      .reduce((acc, item) => acc + item.newPrice, 0)
      .toFixed(2);
    discountedTotal(Price);
  }, [Price,quant]);
  const checkCoupon = () => {
    const foundCoupon = offer.find((i) => i.code === coupon);
    if (foundCoupon) {
      if (!usedCoupon) {
        const newPrice = (totalPrice - foundCoupon.value).toFixed(2);
        setAppliedDiscount(foundCoupon.value);
        if (newPrice < 0) {
          discountedTotal(0.0);
        } else {
          discountedTotal(newPrice*quant);
          setUsedCoupon(true);
        }
      } else {
        alert(" Coupon Code already used!");
      }
    }
  };
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };
  return (
    <div className="flex justify-center items-center">
      <div className="flex mt-12 h-full flex-col overflow-hidden bg-white shadow-xl w-2/3">
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          <div className="flex items-start justify-between">
            <div className="text-lg font-medium text-gray-900">
              Shopping cart
            </div>
            <div className="ml-3 flex h-7 items-center ">
              <button
                type="button"
                onClick={handleClearCart}
                className="relative -m-2 py-1 px-2 bg-red-500 text-white rounded-md hover:bg-secondary transition-all duration-200  "
              >
                <span className="">Clear Cart</span>
              </button>
            </div>
          </div>

          <div className="mt-8">
            <div className="flow-root">
              {cartItems.length > 0 ? (
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {cartItems.map((product) => (
                    <li key={product?._id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          alt=""
                          src={`${getImgUrl(product?.coverImage)}`}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex flex-wrap justify-between text-base font-medium text-gray-900">
                            <h3>
                              <Link to="/">{product?.title}</Link>
                            </h3>
                            <p className="sm:ml-4">${product?.newPrice}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500 capitalize">
                            <strong>Category: </strong>
                            {product?.category}
                          </p>
                        </div>
                        <div className="flex flex-1 flex-wrap items-end justify-between space-y-2 text-sm">
                          <p className="text-gray-500">
                            <strong>Qty:</strong>  <input type="number" min={1} defaultValue={1} className="w-10 bg-[#EAEAEA] text-center" onKeyUp={(e)=>QntInc(e)}onKeyDown={(e)=>QntDesc(e)}/> 
                          </p>
                          <div className="flex">
                            <button
                              onClick={() => handleRemoveFromCart(product)}
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No product found!</p>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="mb-4 flex flex-col gap-2 w-full">
            <div className="flex items-center gap-1">
              <FaQuestionCircle />
              <h3 className="font-semibold font-primary">Have a coupon?</h3>
            </div>
            <div className="w-full md:w-1/2">
              <input
                type="text"
                placeholder="Enter coupon code"
                className="border border-gray-300 py-[3px] px-4 rounded-l-lg w-2/3 "
                onChange={(e) => setCoupon(e.target.value)}
              />
              <button
                className="px-2 bg-blue-500 text-white hover:bg-blue-700 py-[4px] rounded-r-md w-1/3"
                onClick={checkCoupon}
              >
                Check
              </button>
            </div>
            {
                appliedDiscount > 0 ? (
                    <p>Congratulations! You saved ${appliedDiscount}</p>
                ) : (
                    coupon.length > 0 && !offer.some((item) => item.code === coupon) ? (
                        <p className="text-red-500">Invalid Coupon Code!</p>
                    ) : null
                )
            }
          </div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>${totalPrice}</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            <Link
              to="/checkout"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </Link>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <Link to="/home">
              or
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500 ml-1"
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
