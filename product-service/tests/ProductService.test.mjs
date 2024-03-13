import { getProductList, getProductById } from "../ProductService.mjs";

const products = [
  {
    description: "Short Product Description1",
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
    price: 24,
    title: "ProductOne",
  },
  {
    description: "Short Product Description7",
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80a1",
    price: 15,
    title: "ProductTitle",
  },
  {
    description: "Short Product Description2",
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80a3",
    price: 23,
    title: "Product",
  },
  {
    description: "Short Product Description4",
    id: "7567ec4b-b10c-48c5-9345-fc73348a80a1",
    price: 15,
    title: "ProductTest",
  },
  {
    description: "Short Product Descriptio1",
    id: "7567ec4b-b10c-48c5-9445-fc73c48a80a2",
    price: 23,
    title: "Product2",
  },
  {
    description: "Short Product Description7",
    id: "7567ec4b-b10c-45c5-9345-fc73c48a80a1",
    price: 15,
    title: "ProductName",
  },
];

describe("getProductList", () => {
  xit("should return the list of products", async () => {
    const productList = await getProductList();
    console.log(productList);
    expect(productList).toEqual(products);
  });
});

describe("getProductById", () => {
  xit("should return the product with the specified ID", async () => {
    const productId = "7567ec4b-b10c-48c5-9345-fc73c48a80aa";
    const product = await getProductById(productId);
    console.log(product);
    expect(product).toEqual(products.find((p) => p.id === productId));
  });

  xit("should return undefined if product with specified ID is not found", async () => {
    const productId = "non-existent-id";
    const product = await getProductById(productId);
    console.log(product);
    expect(product).toBeUndefined();
  });
});
