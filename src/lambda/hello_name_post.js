import querystring from "querystring";

exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  // When the method is POST, the name will no longer be in the event’s
  // queryStringParameters – it’ll be in the event body encoded as a query string
  const params = querystring.parse(event.body);
  const name = params.text || "error";

  const payload = {
    text: `${name} ${name} ${name} ${name} ${name} ${name} ${name} ${name} ${name} ${name} ${name}`,
    response_type: 'in_channel',
  }

  return {
    statusCode: 200,
    body: JSON.stringify(payload)
  };
};
