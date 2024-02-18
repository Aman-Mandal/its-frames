const { NEYNAR_API_KEY } = require('../constants');

async function validateFrameRequest(data) {
  if (!data) throw new Error('No data provided !');
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      api_key: NEYNAR_API_KEY,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      cast_reaction_context: true,
      follow_context: true,
      message_bytes_in_hex: data,
    }),
  };

  return await fetch(
    'https://api.neynar.com/v2/farcaster/frame/validate',
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));
}

module.exports = {
  validateFrameRequest,
};
