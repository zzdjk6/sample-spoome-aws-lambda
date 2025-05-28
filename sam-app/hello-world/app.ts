import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import axios from "axios";

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const longUrl = "https://medium.com/@zzdjk6/generate-short-url-on-aws-lambda-using-free-api-spoo-me-8dc21849d963";
    const shortUrl = await generateShortUrl(longUrl);
    return {
      statusCode: 200,
      body: JSON.stringify({ shortUrl }),
    };
  } catch (err: any) {
    console.log("request config: ", err?.response?.config);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "some error happened",
      }),
    };
  }
};

const generateShortUrl = async (longUrl: string) => {
  const response = await axios.post(
    "https://spoo.me/",
    { url: longUrl },
    {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    }
  );
  const shortUrl = response.data.short_url;
  return shortUrl;
};
