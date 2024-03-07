import { getProductList } from "../ProductService.mjs";
import { getProductListHandler } from "../getProductsHandler.mjs";

jest.mock("../ProductService.mjs", () => ({
  getProductList: jest.fn(),
}));

describe("getProductListHandler", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a list of products with statusCode 200", async () => {
    const event = {};
    const productList = [
      {
        id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
        title: "ProductOne",
        price: 24,
        description: "Short Product Description1",
      },
      {
        id: "7567ec4b-b10c-48c5-9345-fc73c48a80a1",
        title: "ProductTitle",
        price: 15,
        description: "Short Product Description7",
      },
    ];
    getProductList.mockResolvedValue(productList);

    const result = await getProductListHandler(event);

    expect(getProductList).toHaveBeenCalled();
    expect(result).toEqual({
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": process.env.frontendURL,
      },
      body: JSON.stringify(productList),
    });
  });

  it("should return an empty list with statusCode 200 when getProductList returns undefined", async () => {
    const event = {};
    getProductList.mockResolvedValue([]);

    const result = await getProductListHandler(event);

    expect(getProductList).toHaveBeenCalled();
    expect(result).toEqual({
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": process.env.frontendURL,
      },
      body: JSON.stringify([]),
    });
  });
});
