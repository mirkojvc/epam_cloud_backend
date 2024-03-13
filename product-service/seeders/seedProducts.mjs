import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { products, stock } from "../data.mjs";
import { marshall } from "@aws-sdk/util-dynamodb";

const dynamoDBClient = new DynamoDBClient({ region: "eu-west-1" });

async function insertDynamo(table_name, items) {
  try {
    for (const item of items) {
      const params = {
        TableName: table_name,
        Item: marshall(item),
      };
      await dynamoDBClient.send(new PutItemCommand(params));
    }
  } catch (error) {
    console.error(error);
  }
}

insertDynamo("Products", products);
insertDynamo("Stock", stock);
