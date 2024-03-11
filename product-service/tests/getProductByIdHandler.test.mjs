import { getProductById } from "../ProductService.mjs";
import { getProductByIdHandler } from "../getProductByIdHandler.mjs";

jest.mock("../ProductService.mjs", () => ({
  getProductById: jest.fn(),
  getProductList: jest.fn(),
}));

describe("getProductByIdHandler", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return product with statusCode 200 when product exists", async () => {
    const event = {
      pathParameters: { productId: "7567ec4b-b10c-48c5-9345-fc73c48a80aa" },
    };
    const product = {
      id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
      title: "ProductOne",
      price: 24,
      description: "Short Product Description1",
    };
    getProductById.mockResolvedValue(product);

    const result = await getProductByIdHandler(event);

    expect(getProductById).toHaveBeenCalledWith(
      "7567ec4b-b10c-48c5-9345-fc73c48a80aa"
    );
    expect(result).toEqual({
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": process.env.frontendURL,
      },
      body: JSON.stringify(product),
    });
  });

  it("should return statusCode 404 when product does not exist", async () => {
    const event = {
      pathParameters: { productId: "non-existent-id" },
    };
    getProductById.mockResolvedValue(undefined);

    const result = await getProductByIdHandler(event);

    expect(getProductById).toHaveBeenCalledWith("non-existent-id");
    expect(result).toEqual({
      statusCode: 404,
      headers: {
        "Access-Control-Allow-Origin": process.env.frontendURL,
      },
      body: JSON.stringify({ message: "Product not found" }),
    });
  });
});
