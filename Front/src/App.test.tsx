import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "./components/Home";
import Product from "./components/Product";
import Cart from "./components/Cart";
import { act } from "react-dom/test-utils";
import ReactDOM from "react-dom";

let container: any;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});
test("renders home page", () => {
  act(() => {
    ReactDOM.render(<Home setRoute={() => {}} />, container);
  });

  const label = container.querySelector("#goToCart");

  expect(label.textContent).toBe("Aller sur panier");
});

test("renders product page", () => {
  act(() => {
    ReactDOM.render(
      <Product
        setRoute={() => {}}
        data={{
          id: 3,
          name: "Summer Smith",
          price: "20",
          quantity: 5,
          image: "https://rickandmortyapi.com/api/character/avatar/3.jpeg",
        }}
      />,
      container
    );
  });

  const label = container.querySelector("#back");

  expect(label.textContent).toBe("Retour");
});

test("renders cart page", () => {
  act(() => {
    ReactDOM.render(
      <Cart
        setRoute={() => {}}
      />,
      container
    );
  });

  const label = container.querySelector("#back");

  expect(label.textContent).toBe("Retour");
});