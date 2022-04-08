import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './components/Home'
import { act } from 'react-dom/test-utils';
import ReactDOM from "react-dom"

let container: any;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});
test('renders home page', () => {
  act(()=> {
    ReactDOM.render(<Home setRoute={() => {}}/>, container);
  })

  const label = container.querySelector("#goToCart");

  expect(label.textContent).toBe("Aller sur panier");
});
