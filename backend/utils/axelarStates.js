const { SERVER_URL, S3_URL } = require('../constants');

const ZERO_PAGE = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <meta property="og:title" content="ITS Token!" />
    <meta
      property="og:image"
      content="https://i.imgur.com/xDdBoI3.png"
    />
    <meta property="fc:frame" content="vNext" />
    <meta
      property="fc:frame:image"
      content="https://i.imgur.com/xDdBoI3.png"
    />
    <meta property="fc:frame:button:1" content="Get Started" />
    <meta
      name="fc:frame:post_url"
      content="${SERVER_URL}/start"
    />
  </head>
</html>`;

const FIRST_PAGE = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <meta property="og:title" content="ITS Token!" />
        <meta
          property="og:image"
          content="https://i.imgur.com/IE8aD5x.png"
        />
        <meta
        property="fc:frame:input:text"
        content="Enter token address"
        />
        <meta property="fc:frame" content="vNext" />
        <meta
          property="fc:frame:image"
          content="https://i.imgur.com/IE8aD5x.png"
        />
        <meta property="fc:frame:button:1" content="Next" />
        <meta
          name="fc:frame:post_url"
          content="${SERVER_URL}/tokenAddress"
        />
      </head>
    </html>
    `;

const SECOND_PAGE = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <meta property="og:title" content="Select primary chain" />
        <meta
          property="og:image"
          content="https://i.imgur.com/BZcu6MY.png"
        />
        <meta property="fc:frame" content="vNext" />
        <meta
          property="fc:frame:image"
          content="https://i.imgur.com/BZcu6MY.png"
        />
        <meta property="fc:frame:button:1" content="Polygon" />
        <meta property="fc:frame:button:1:action" content="post" />

        <meta property="fc:frame:button:2" content="Base" />
        <meta property="fc:frame:button:2:action" content="post" />

        <meta property="fc:frame:button:3" content="Ethereum" />
        <meta property="fc:frame:button:3:action" content="post" />


        <meta property="fc:frame:button:4" content="BNB" />
        <meta property="fc:frame:button:4:action" content="post" />
        <meta
        name="fc:frame:post_url"
        content="${SERVER_URL}/primaryChains"
      />

      </head>
    </html>
    `;

const THIRD_PAGE = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <meta property="og:title" content="Amount of token to send" />
        <meta
          property="og:image"
          content="https://i.imgur.com/6EVlATu.png"
        />
        <meta
        property="fc:frame:input:text"
        content="Enter amount to send"
        />
        <meta property="fc:frame" content="vNext" />
        <meta
          property="fc:frame:image"
          content="https://i.imgur.com/6EVlATu.png"
        />
        <meta property="fc:frame:button:1" content="Next" />
        <meta
          name="fc:frame:post_url"
          content="${SERVER_URL}/amount"
        />
      </head>
    </html>
    `;

const FOURTH_PAGE = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <meta property="og:title" content="Select destination chain" />
        <meta
          property="og:image"
          content="https://i.imgur.com/0CfJZWO.png"
        />
        <meta property="fc:frame" content="vNext" />
        <meta
          property="fc:frame:image"
          content="https://i.imgur.com/0CfJZWO.png"
        />
        <meta property="fc:frame:button:1" content="Polygon" />
        <meta property="fc:frame:button:1:action" content="post" />

        <meta property="fc:frame:button:2" content="Base" />
        <meta property="fc:frame:button:2:action" content="post" />

        <meta property="fc:frame:button:3" content="Ethereum" />
        <meta property="fc:frame:button:3:action" content="post" />

        <meta property="fc:frame:button:4" content="BNB" />
        <meta property="fc:frame:button:4:action" content="post" />

        <meta
        name="fc:frame:post_url"
        content="${SERVER_URL}/secondaryChain"
      </head>
    </html>
    `;

const FIFTH_PAGE = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <meta property="og:title" content="Destination user address" />
        <meta
          property="og:image"
          content="https://i.imgur.com/2MttqoG.png"
        />
        <meta
        property="fc:frame:input:text"
        content="Enter reciever address"
        />
        <meta property="fc:frame" content="vNext" />
        <meta
          property="fc:frame:image"
          content="https://i.imgur.com/2MttqoG.png"
        />
        <meta property="fc:frame:button:1" content="Next" />
        <meta
          name="fc:frame:post_url"
          content="${SERVER_URL}/reciever"
        />
      </head>
    </html>
    `;

const SUCCESS = ({
  tokenAddress,
  receiverAddress,
  amount,
  primaryChain,
  secondaryChain,
}) => {
  return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width" />
          <meta property="og:title" content="Success !" />
          <meta
            property="og:image"
            content="${S3_URL}/v2/success.png"
          />
          <meta property="fc:frame" content="vNext" />
          <meta
            property="fc:frame:image"
            content="${S3_URL}/v2/success.png"
          />
          <meta
            property="fc:frame:button:1"
            content="Confirm Transcation"
          />
         <meta property="fc:frame:button:1:action" content="link" />
         <meta property="fc:frame:button:1:target" content="https://its-frames.vercel.app?token=${tokenAddress}&amount=${amount}&primary=${primaryChain}&secondary=${secondaryChain}&receiver=${receiverAddress}" />
        </head>
      </html>
`;
};

const TRY_AGAIN_LATER = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width" />
          <meta property="og:title" content="Try again later !" />
          <meta
            property="og:image"
            content="${S3_URL}/v2/try_again.png"
          />
          <meta property="fc:frame" content="vNext" />
          <meta
            property="fc:frame:image"
            content="${S3_URL}/v2/try_again.png"
          />         
        </head>
      </html>`;

const RESPONSE_TYPE = {
  FIRST_PAGE,
  SECOND_PAGE,
  THIRD_PAGE,
  FOURTH_PAGE,
  FIFTH_PAGE,
  SUCCESS,
  TRY_AGAIN_LATER,
  ZERO_PAGE,
};

module.exports = { RESPONSE_TYPE };
