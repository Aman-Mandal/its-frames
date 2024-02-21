import { BLOCK_CONFIRMATIONS, BLOCK_TIMEOUT, RPC_URL } from './constants';
import { createPublicClient, createWalletClient, custom, http } from 'viem';
import { base, bsc, mainnet, polygon } from 'viem/chains';

const CHAIN_CONFIG = {
  137: polygon,
  8453: base,
  56: bsc,
  1: mainnet,
};

const getPublicClient = (chainId, rpcUrl) => {
  const client = createPublicClient({
    chain: CHAIN_CONFIG[chainId],
    transport: http(rpcUrl ?? window?.ethereum),
  });

  return client;
};

const getWalletClient = (chainId) => {
  let walletClient;
  if (typeof window !== 'undefined') {
    walletClient = createWalletClient({
      chain: CHAIN_CONFIG[chainId],
      transport: custom(window.ethereum),
    });
  }

  return walletClient;
};

export const writeContractFunction = async ({
  address,
  abi,
  functionName,
  args,
  account,
  chainId,
  rpcUrl,
  value
}) => {
  try {
    const publicClient = getPublicClient(chainId, rpcUrl);
    const walletClient = getWalletClient(chainId);

    const { request } = await publicClient.simulateContract({
      address,
      abi,
      functionName,
      args,
      account,
      value
    });

    const txHash = await walletClient.writeContract(request);
    const txReciept = await publicClient.waitForTransactionReceipt({
      hash: txHash,
      confirmations: BLOCK_CONFIRMATIONS,
      timeout: BLOCK_TIMEOUT,
    });

    return txReciept;
  } catch (error) {
    throw error;
  }
};

export const readContractFunction = async ({
  address,
  abi,
  functionName,
  args,
  account,
  chainId,
  rpcUrl,
}) => {
  const publicClient = getPublicClient(chainId, rpcUrl);

  const data = await publicClient.readContract({
    address,
    abi,
    functionName,
    args,
    account,
  });

  return data;
};
