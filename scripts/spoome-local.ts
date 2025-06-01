import axios from "axios";

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

const main = async () => {
  const longUrl =
    "https://javascript.plainenglish.io/generate-short-urls-on-aws-lambda-using-free-api-spoo-me-8dc21849d963";
  const shortUrl = await generateShortUrl(longUrl);
  console.log(shortUrl);
};

main();
