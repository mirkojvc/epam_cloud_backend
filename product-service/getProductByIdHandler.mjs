import { getProductById } from "./ProductService.mjs";

export const getProductByIdHandler = async (event) => {
  console.log("getProductByIdHandler event: ", event);
  const productId = event.pathParameters.productId;
  const product = await getProductById(productId);
  if (product) {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": process.env.frontendURL,
      },
      body: JSON.stringify(product),
    };
  } else {
    return {
      statusCode: 404,
      headers: {
        "Access-Control-Allow-Origin": process.env.frontendURL,
      },
      body: JSON.stringify({ message: "Product not found" }),
    };
  }
};
