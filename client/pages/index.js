'use client';

import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';
import { useAccount, useNetwork } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import {
  readContractFunction,
  writeContractFunction,
} from '@/utils/viemConfig';
import { ABI, CHAINS } from '@/utils/constants';
import { parseUnits } from 'viem';


const Home = () => {
  const [fetchedData, setFetchedData] = useState({});
  const [decimals, setDecimals] = useState(0);

  const { address } = useAccount();
  const { chain } = useNetwork();
  const { open } = useWeb3Modal();

  const connectWalletHandler = async () => {
    await open();
  };

  const fetchData = async () => {
    const res = await fetch('http://localhost:8080/confirm');
    const data = await res.json();

    console.log('DATA', data);
    setFetchedData(data);
  };

  const fetchDecimals = async () => {
    try {
      const decimal = await readContractFunction({
        abi: ABI,
        account: address,
        // address: fetchedData.tokenAddress,
        address: '0x4eb9fa479Ade63317e95f605e26d1369E6225031',
        args: [],
        chainId: chain,
        functionName: 'decimals',
      });

      setDecimals(decimal);
    } catch (error) {
      console.log(error);
    }
  };

  const interchainTransferHandler = async () => {
    try {
      const res = await writeContractFunction({
        abi: ABI,
        account: address,
        // address: fetchedData.tokenAddress,
        address: '0x4eb9fa479Ade63317e95f605e26d1369E6225031',
        args: [
          fetchedData.secondaryChain,
          fetchedData.recieverAddress,
          Number(parseUnits(fetchedData.amount, decimals)),
          '0x',
        ],
        chainId: CHAINS[fetchedData.primaryChain],
        functionName: 'interchainTransfer',
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchDecimals();
  }, []);

  return (
    <div>
      <button onClick={connectWalletHandler}>
        {address ? 'Connected' : 'Connect'}
      </button>
      <p>{address ? address : ''}</p>

      <button onClick={interchainTransferHandler}>Transfer</button>
    </div>
  );
};

export default Home;
