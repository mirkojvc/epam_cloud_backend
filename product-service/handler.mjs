import { getProductList, getProductById } from "./ProductService.mjs";

export const getProductListHandler = async (event) => {
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": process.env.frontendURL,
    },
    body: JSON.stringify(getProductList()),
  };
};

export const getProductByIdHandler = async (event) => {
  const productId = event.pathParameters.productId;
  const product = getProductById(productId);
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

export const hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v1.0! Your function executed successfully!",
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
