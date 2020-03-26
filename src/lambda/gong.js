import querystring from "querystring"

/**
 * /gong Rapid Finance
 */

exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" }
  }

  // When the method is POST, the name will no longer be in the event’s
  // queryStringParameters – it’ll be in the event body encoded as a query string
  const params = querystring.parse(event.body)
  const companyName = params.text

  const responseText = !companyName ? `https://media.giphy.com/media/igWCdpGAawZwc5f0Ax/giphy.gif` :
  `${companyName} \n\n https://media.giphy.com/media/igWCdpGAawZwc5f0Ax/giphy.gif`

  const payload = {
    text: responseText,
    response_type: 'in_channel',
  }

  return {
    statusCode: 200,
    headers: {
      "content-type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(payload)
  }
}
