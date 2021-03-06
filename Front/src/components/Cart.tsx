import React from "react";
import useCart from "../hooks/useCart";

const Cart = ({ setRoute }: { setRoute: (data: any) => void }) => {
  const { loading, products, message, loadCart, removeToCart } = useCart();
  return (
    <div>
      {loading && <div>Loading....</div>}
      {message && <p>{message}</p>}
      <div id="back" onClick={() => setRoute({ route: "home" })}>Retour</div>
      <div>
        {products.map((product) => {
          return (
            <React.Fragment key={product.id}>
              <div>
                <img src={product.image} alt="" />
                <p id="cartFigurine">Figurine de {product.name}</p>
                <p id="cartQuantity">Quantitée {product.quantity}</p>
              </div>
              <button onClick={() => removeToCart(product)}>
                Supprimer du panier
              </button>
              <hr />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Cart;
