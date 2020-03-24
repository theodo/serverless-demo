import { APIGatewayProxyEvent } from "aws-lambda";

interface RequestContext {
  authorizer: {
    claims: {
      "cognito:username": string;
    };
  };
}

export interface APIEvent extends Omit<APIGatewayProxyEvent, "requestContext"> {
  body: string;
  requestContext: RequestContext;
  pathParameters: {
    id: string;
  };
  queryStringParameters: {
    fileName: string;
  };
}

interface HttpResponse {
  statusCode: number;
  headers: {
    [key: string]: string;
  };
  body: string;
}

interface ResponseBody {
  status?: boolean;
  error?: string;
  [key: string]: any;
}

function buildResponse(statusCode: number, body: ResponseBody): HttpResponse {
  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "^https?://localhost(:[0-9]+)?$",
      "Access-Control-Allow-Credentials": "true"
    },
    body: JSON.stringify(body)
  };
}

export function success(body: ResponseBody): HttpResponse {
  return buildResponse(200, body);
}

export function failure(body: ResponseBody): HttpResponse {
  return buildResponse(500, body);
}
