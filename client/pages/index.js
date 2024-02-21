'use client';

import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';
import { useAccount, useNetwork } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import {
  readContractFunction,
  writeContractFunction,
} from '@/utils/viemConfig';
import { ABI, CHAINS, CHAIN_CONFIG } from '@/utils/constants';
import { parseEther, parseUnits } from 'viem';
import Modal from '@/components/Modal';
import { formatEther } from 'ethers';

const Home = () => {
  const [fetchedData, setFetchedData] = useState({});
  const [decimals, setDecimals] = useState(0);
  const [loading, setLoading] = useState(false);

  const { address } = useAccount();
  const { chain } = useNetwork();
  const { open } = useWeb3Modal();

  const connectWalletHandler = async () => {
    setLoading(true);
    await open();
    setLoading(false);
  };

  const fetchData = async () => {
    const res = await fetch('https://its-frames.onrender.com/confirm');
    const data = await res.json();

    setFetchedData(data);
  };

  const fetchDecimals = async () => {
    try {
      const decimal = await readContractFunction({
        abi: ABI,
        account: address,
        address: fetchedData.tokenAddress,
        args: [],
        chainId: chain.id,
        functionName: 'decimals',
        rpcUrl: CHAIN_CONFIG[fetchedData?.primaryChain].rpcUrl,
      });

      setDecimals(decimal);
    } catch (error) {
      console.log(error);
    }
  };

  const interchainTransferHandler = async () => {
    try {
      setLoading(true);
      const res = await writeContractFunction({
        abi: ABI,
        account: address,
        address: fetchedData?.tokenAddress,
        args: [
          fetchedData.secondaryChain,
          fetchedData.recieverAddress,
          Number(parseUnits(fetchedData.amount, decimals)),
          '0x',
        ],
        chainId: CHAINS[fetchedData.primaryChain],
        functionName: 'interchainTransfer',
        rpcUrl: CHAIN_CONFIG[fetchedData?.primaryChain]?.rpcUrl,
        value: parseEther(CHAIN_CONFIG[fetchedData?.primaryChain]?.value),
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchDecimals();
  }, [fetchedData?.primaryChain, address]);

  return (
    <main className='flex flex-col items-center min-h-screen pt-32 bg-[url("/bg.png")] font-Avenir '>
      <div className='flex mb-5 gap-2 w-[550px]'>
        <p
          className={
            'bg-purple-700  text-white   py-1 px-6 text-sm rounded-md cursor-pointer'
          }>
          Interchain Token Service
        </p>
      </div>

      <Modal
        loading={loading}
        fetchedData={fetchedData}
        decimal={decimals}
        transferHandler={interchainTransferHandler}
        connectWalletHandler={connectWalletHandler}
        setLoading={setLoading}
      />
    </main>
  );
};

export default Home;
