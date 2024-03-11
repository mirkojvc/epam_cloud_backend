import { getProductList } from "./ProductService.mjs";

export const getProductListHandler = async (event) => {
  console.log("getProductListHandler event: ", event);
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": process.env.frontendURL,
    },
    body: JSON.stringify(await getProductList()),
  };
};
