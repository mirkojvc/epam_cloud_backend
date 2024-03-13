// import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
// import { importProductsFile } from "../import-service.mjs";
// import AWSMock from "aws-sdk-mock";

// describe("importProductsFile Lambda Function", () => {
//   beforeEach(() => {
//     AWSMock.setSDKInstance();
//   });

//   afterEach(() => {
//     AWSMock.restore();
//   });

//   it("should return signed URL when valid file name is provided", async () => {
//     const event = {
//       queryStringParameters: { name: "example.csv" },
//     };

//     const expectedUrl = "https://signed-url.example.com";

//     AWSMock.mock("S3Client", "send", (command, callback) => {
//       expect(command).toBeInstanceOf(GetObjectCommand);
//       expect(command.input).toEqual({
//         Bucket: process.env.BUCKET_NAME,
//         Key: "uploaded/example.csv",
//         Expires: 3600,
//         ContentType: "text/csv",
//         ACL: "private",
//       });
//       return Promise.resolve({});
//     });
//     AWSMock.mock("getSignedUrl", (_, command, callback) => {
//       expect(command).toBeInstanceOf(GetObjectCommand);
//       return Promise.resolve(expectedUrl);
//     });

//     const response = await importProductsFile(event);

//     expect(response.statusCode).toBe(200);
//     expect(JSON.parse(response.body)).toEqual({ url: expectedUrl });
//   });

//   it("should return 400 when file name is not provided", async () => {
//     const event = {
//       queryStringParameters: {},
//     };

//     const response = await importProductsFile(event);

//     expect(response.statusCode).toBe(400);
//     expect(JSON.parse(response.body)).toEqual({
//       message: "File name is required",
//     });
//   });

//   it("should return 500 when error occurs during URL generation", async () => {
//     const event = {
//       queryStringParameters: { name: "example.csv" },
//     };

//     // Mocking getSignedUrl function
//     AWSMock.mock("getSignedUrl", (_, command, callback) => {
//       throw new Error("Error generating signed URL");
//     });

//     const response = await importProductsFile(event);

//     expect(response.statusCode).toBe(500);
//     expect(JSON.parse(response.body)).toEqual({
//       message: "Could not generate signed URL",
//     });
//   });
// });
