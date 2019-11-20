import querystring from "querystring"

/**
 * /getRem 25
 */

exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" }
  }

  // When the method is POST, the name will no longer be in the event’s
  // queryStringParameters – it’ll be in the event body encoded as a query string
  const params = querystring.parse(event.body)
  const slashCommandText = params.text

  let pixelVal = slashCommandText
  let numberToDivideBy = 16


  if (slashCommandText.includes('base')) {
    [pixelVal, numberToDivideBy] = slashCommandText.split('base')
  }

  const payload = {
    text: `${pixelVal/numberToDivideBy}rem`,
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
