import { createProduct } from "./ProductService.mjs";

export const createProductHandler = async (event) => {
  try {
    console.log("createProductHandler event: ", event);
    const product = event.body;
    if (!isValidProduct(product)) {
      return {
        statusCode: 400,
        //   headers: {
        //     "Access-Control-Allow-Origin": process.env.frontendURL,
        //   },
        body: JSON.stringify({ message: "Invalid product data" }),
      };
    }
    await createProduct(product);
    return {
      statusCode: 201,
      //   headers: {
      //     "Access-Control-Allow-Origin": process.env.frontendURL,
      //   },
      body: JSON.stringify(product),
    };
  } catch (error) {
    return {
      statusCode: 500,
      //   headers: {
      //     "Access-Control-Allow-Origin": process.env.frontendURL,
      //   },
      body: JSON.stringify({ message: "Could not create product" }),
    };
  }
};

// Function to validate product data
const isValidProduct = (product) => {
  // Perform validation checks here
  // For example, check if required fields are present
  if (!product.title || !product.price || !product.description) {
    return false;
  }
  return true;
};
