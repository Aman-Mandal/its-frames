const { RESPONSE_TYPE } = require('../utils/axelarStates');
const { getAddressForFid } = require('frames.js');
const { validateFrameRequest } = require('../utils/utils');

const router = require('express').Router();

const dataObj = {};

router.get('/health', async (req, res) => {
  try {
    res.status(200).send({ status: 'active' });
  } catch (error) {
    res.status(400).send({ status: 'Bad request' });
  }
});

router.post('/', async (req, res) => {
  res
    .status(200)
    .setHeader('Content-Type', 'text/html')
    .send(RESPONSE_TYPE.ZERO_PAGE);
});

router.get('/start', async (req, res) => {
  res
    .status(200)
    .setHeader('Content-Type', 'text/html')
    .send(RESPONSE_TYPE.FIRST_PAGE);
});

router.post('/tokenAddress', async (req, res) => {
  try {
    const status = await validateFrameRequest(
      req.body.trustedData?.messageBytes
    );

    if (!status?.valid) {
      console.error(status);
      throw new Error('Invalid frame request');
    }

    dataObj.tokenAddress = req.body.untrustedData.inputText;

    res
      .status(200)
      .setHeader('Content-Type', 'text/html')
      .send(RESPONSE_TYPE.SECOND_PAGE);
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .setHeader('Content-Type', 'text/html')
      .send(RESPONSE_TYPE.TRY_AGAIN_LATER);
  }
});

router.post('/primaryChains', async (req, res) => {
  try {
    const status = await validateFrameRequest(
      req.body.trustedData?.messageBytes
    );

    if (!status?.valid) {
      console.error(status);
      throw new Error('Invalid frame request');
    }

    dataObj.primaryChain =
      req.body.untrustedData.buttonIndex === 1
        ? 'Polygon'
        : req.body.untrustedData.buttonIndex === 2
        ? 'base'
        : req.body.untrustedData.buttonIndex === 3
        ? 'Ethereum'
        : req.body.untrustedData.buttonIndex === 4
        ? 'binance'
        : null;

    res
      .status(200)
      .setHeader('Content-Type', 'text/html')
      .send(RESPONSE_TYPE.THIRD_PAGE);
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .setHeader('Content-Type', 'text/html')
      .send(RESPONSE_TYPE.TRY_AGAIN_LATER);
  }
});

router.post('/amount', async (req, res) => {
  try {
    const status = await validateFrameRequest(
      req.body.trustedData?.messageBytes
    );

    if (!status?.valid) {
      console.error(status);
      throw new Error('Invalid frame request');
    }

    dataObj.amount = req.body.untrustedData.inputText;

    res
      .status(200)
      .setHeader('Content-Type', 'text/html')
      .send(RESPONSE_TYPE.FOURTH_PAGE);
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .setHeader('Content-Type', 'text/html')
      .send(RESPONSE_TYPE.TRY_AGAIN_LATER);
  }
});

router.post('/secondaryChain', async (req, res) => {
  try {
    const status = await validateFrameRequest(
      req.body.trustedData?.messageBytes
    );

    if (!status?.valid) {
      console.error(status);
      throw new Error('Invalid frame request');
    }

    dataObj.secondaryChain =
      req.body.untrustedData.buttonIndex === 1
        ? 'Polygon'
        : req.body.untrustedData.buttonIndex === 2
        ? 'base'
        : req.body.untrustedData.buttonIndex === 3
        ? 'Ethereum'
        : req.body.untrustedData.buttonIndex === 4
        ? 'binance'
        : null;

    res
      .status(200)
      .setHeader('Content-Type', 'text/html')
      .send(RESPONSE_TYPE.FIFTH_PAGE);
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .setHeader('Content-Type', 'text/html')
      .send(RESPONSE_TYPE.TRY_AGAIN_LATER);
  }
});

router.post('/reciever', async (req, res) => {
  try {
    const status = await validateFrameRequest(
      req.body.trustedData?.messageBytes
    );

    if (!status?.valid) {
      console.error(status);
      throw new Error('Invalid frame request');
    }

    dataObj.recieverAddress = req.body.untrustedData.inputText;
    const SUCCESS = RESPONSE_TYPE.SUCCESS({
      amount: dataObj.amount,
      primaryChain: dataObj.primaryChain,
      receiverAddress: req.body.untrustedData.inputText,
      secondaryChain: dataObj.secondaryChain,
      tokenAddress: dataObj.tokenAddress,
    });

    res.status(200).setHeader('Content-Type', 'text/html').send(SUCCESS);
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .setHeader('Content-Type', 'text/html')
      .send(RESPONSE_TYPE.TRY_AGAIN_LATER);
  }
});


router.get('/confirm', async (req, res) => {
  res.json(dataObj);
});

module.exports = router;
