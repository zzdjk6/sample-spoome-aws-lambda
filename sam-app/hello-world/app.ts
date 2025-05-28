import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
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
        const longUrl = event.queryStringParameters?.url;
        if (!longUrl) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'url is required' }),
            };
        }
        const shortUrl = await generateShortUrl(longUrl);
        return {
            statusCode: 200,
            body: JSON.stringify({ shortUrl }),
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'some error happened',
            }),
        };
    }
};

const generateShortUrl = async (longUrl: string) => {
    const url = "https://spoo.me/";
    const payload = {
        url: longUrl,
    };
    const config = {
        headers: {
            "content-type": "application/x-www-form-urlencoded",
            Accept: "application/json",
        },
    };

    const response = await axios.post(url, payload, config);
    const shortUrl = response.data.short_url;
    return shortUrl;
}