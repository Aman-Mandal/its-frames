import { CHAIN_CONFIG2 } from './constants';

export const requestEthereumChain = async (method, params) => {
  return await window.ethereum.request({ method, params });
};

export const switchNetworkHandler = async (networkId, setLoading) => {
  setLoading(true);
  if (typeof window !== 'undefined') {
    if (window.ethereum.net_version !== networkId) {
      try {
        await requestEthereumChain('wallet_switchEthereumChain', [
          { chainId: networkId },
        ]);
        setLoading(false);
      } catch (err) {
        if (err.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: networkId,
                chainName: CHAIN_CONFIG2[networkId]?.name,
                rpcUrls: CHAIN_CONFIG2[networkId]?.rpcUrl,
                nativeCurrency: CHAIN_CONFIG2[networkId]?.nativeCurrency,
              },
            ],
          });
          setLoading(false);
        } else {
          setLoading(false);
        }
      }
    }
  }
};
