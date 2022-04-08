import { rest } from "msw";
import { setupServer } from "msw/node";
import { renderHook, act } from "@testing-library/react-hooks";
import useProduct from "../../hooks/useProduct";

const server = setupServer(
  rest.post("http://localhost:8000/api/cart/3", (req, res, ctx) => {
    return res(ctx.json({ error: "too many" }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Load product", async () => {
  const { result } = renderHook(() =>
    useProduct({
      id: 3,
      name: "Summer Smith",
      price: "20",
      quantity: 5,
      image: "https://rickandmortyapi.com/api/character/avatar/3.jpeg",
    })
  );
  const { loading, addProduct } = result.current;
  await act(async () => {
    await addProduct();
  });
  const { message } = result.current;
});
