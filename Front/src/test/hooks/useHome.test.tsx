import { rest } from "msw";
import { setupServer } from "msw/node";
import { renderHook, act } from "@testing-library/react-hooks";
import useHome from "../../hooks/useHome";

const server = setupServer(
  rest.get("http://localhost:8000/api/products", (req, res, ctx) => {
    return res(
      ctx.json({
        products: [
          {
            id: 1,
            name: "Rick Sanchez",
            price: "15",
            quantity: 70,
            image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
          },
          {
            id: 2,
            name: "Morty Smith",
            price: "20",
            quantity: 0,
            image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
          },
          {
            id: 3,
            name: "Summer Smith",
            price: "20",
            quantity: 5,
            image: "https://rickandmortyapi.com/api/character/avatar/3.jpeg",
          },
          {
            id: 4,
            name: "Beth Smith",
            price: "8",
            quantity: 20,
            image: "https://rickandmortyapi.com/api/character/avatar/4.jpeg",
          },
          {
            id: 5,
            name: "Jerry Smith",
            price: "8",
            quantity: 30,
            image: "https://rickandmortyapi.com/api/character/avatar/5.jpeg",
          },
        ],
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("load Home", async () => {
  const { result } = renderHook(() => useHome());
  const { loading, loadProducts } = result.current;
  expect(loading).toEqual(true);
  await act(async () => {
    await loadProducts();
  });
  const { products } = result.current;
  //console.log(products);
});
