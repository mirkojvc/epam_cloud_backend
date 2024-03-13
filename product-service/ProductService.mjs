import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { randomUUID } from "crypto";

const dynamoDbClient = new DynamoDBClient({ region: "eu-west-1" });

export async function createProduct(product) {
  try {
    const productId = randomUUID();
    const params = {
      TableName: process.env.PRODUCTS_TABLE,
      Item: marshall({ productId, ...product }),
    };
    await dynamoDbClient.send(new PutItemCommand(params));
  } catch (error) {
    // console.error(error);
    throw new Error("Could not create product");
  }
}

export async function getProductList() {
  try {
    const params = {
      TableName: process.env.PRODUCTS_TABLE,
    };
    const products = await dynamoDbClient.send(new ScanCommand(params));

    const stockParams = {
      TableName: process.env.STOCK_TABLE,
    };

    const stock_data = await dynamoDbClient.send(new ScanCommand(stockParams));
    const stock_map = {};
    stock_data.Items = stock_data.Items.map((item) => unmarshall(item));
    stock_data.Items.forEach((item) => {
      stock_map[item.productId] = item.count;
    });
    products.Items = products.Items.map((item) => unmarshall(item));
    products.Items.forEach((item) => {
      item.count = stock_map[item.id];
    });
    return products.Items;
  } catch (error) {
    // console.error(error);
    throw new Error("Could not retrieve products");
  }
}

export async function getProductById(productId) {
  try {
    const params = {
      TableName: process.env.PRODUCTS_TABLE,
      Key: marshall({
        productId,
      }),
    };
    const product = await dynamoDbClient.send(new GetItemCommand(params));

    return unmarshall(product.Item); // Unmarshal DynamoDB item
  } catch (error) {
    // console.error(error);
    throw new Error("Could not retrieve product");
  }
}
