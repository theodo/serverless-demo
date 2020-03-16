import { success, APIEvent, failure } from "../libs/response";
import { APIGatewayProxyResult } from "aws-lambda";
import * as S3 from "aws-sdk/clients/s3";
const s3 = new S3({ signatureVersion: "v4" });

export const main = async (event: APIEvent): Promise<APIGatewayProxyResult> => {
  if (!event.queryStringParameters || !event.queryStringParameters.fileName) {
    return failure({ error: "fileName must be defined in queryParams" });
  }
  if (!process.env.bucketName) {
    throw new Error("env.bucketName must be defined");
  }

  const params = {
    Bucket: process.env.bucketName,
    Key: event.queryStringParameters.fileName
  };

  return success({ url: await s3.getSignedUrlPromise("putObject", params) });
};
