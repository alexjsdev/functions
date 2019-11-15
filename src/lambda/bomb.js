import querystring from "querystring"

/**
 * /emojibomb :opera: 500 times
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
  // const [stringToRepeat, numberOfRepeats = 10, timesKeyword] = slashCommandText.split(' ')
  // console.log(`TCL: exports.handler -> stringToRepeat`, stringToRepeat)
  // console.log(`TCL: exports.handler -> numberOfRepeats`, numberOfRepeats)
  // console.log(`TCL: exports.handler -> timesKeyword`, timesKeyword)

  let stringToRepeat = slashCommandText
  let numberOfRepeats = 10

  // if the command includes the "times" keyword
  if (slashCommandText.includes('times')) {
    // update the values based on the multiply like "/emojibomb :react: :gatsby: times 500"
    [stringToRepeat, numberOfRepeats] = slashCommandText.split('times')
  }

  let text = ''
  for (let index = 0; index < numberOfRepeats; index++) {
    text += stringToRepeat
  }

  const payload = {
    text,
    response_type: 'in_channel',
  }
  // console.log(`TCL: exports.handler -> payload`, payload)

  return {
    statusCode: 200,
    headers: {
      "content-type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(payload)
  }
}
