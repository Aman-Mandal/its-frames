import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { BiSolidCopy } from 'react-icons/bi';
import { useAccount, useNetwork } from 'wagmi';
import Loader from './Loader';
import { readContractFunction } from '@/utils/viemConfig';
import { ABI, CHAIN_CONFIG } from '@/utils/constants';
import { switchNetworkHandler } from '@/utils/helper';
import { parseUnits } from 'viem';
import { useRouter } from 'next/router';

const Modal = ({
  fetchedData,
  decimal,
  transferHandler,
  connectWalletHandler,
  loading,
  setLoading,
}) => {
  const { address } = useAccount();
  const { chain } = useNetwork();

  const [tokenName, setTokenName] = useState('');
  const [isEnoughBalance, setIsEnoughBalance] = useState(false);

  const router = useRouter();

  const { token, amount, primary, secondary, receiver } = router.query;

  const fetchTokenName = async () => {
    try {
      const name = await readContractFunction({
        abi: ABI,
        account: address,
        address: token,
        args: [],
        chainId: chain,
        functionName: 'symbol',
        rpcUrl: CHAIN_CONFIG[primary]?.rpcUrl,
      });

      setTokenName(name);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBalance = async () => {
    try {
      const balance = await readContractFunction({
        abi: ABI,
        account: address,
        args: [address],
        chainId: chain.id,
        functionName: 'balanceOf',
        rpcUrl: CHAIN_CONFIG[primary]?.rpcUrl,
        address: token,
      });

      const isEnough = balance > parseUnits(amount, decimal);
      setIsEnoughBalance(isEnough);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (primary && token) {
      fetchTokenName();
      fetchBalance();
    }
  }, [address, primary, chain, token]);

  return (
    <div>
      <div className='bg-[#161616] p-2 w-[550px] rounded-xl text-white text-sm'>
        <div className='bg-[#000000] py-8 px-6 rounded-xl'>
          <div className='flex justify-between items-center'>
            <input
              disabled
              placeholder='0.0'
              autoFocus
              className='text-3xl  bg-inherit focus:outline-none outline-none cursor-not-allowed'
              type='number'
              value={amount}
            />

            <div>
              <p className='py-3 px-3 text-black font-semibold bg-purple-300 text-center rounded-lg mb-3'>
                {tokenName}
              </p>
            </div>
          </div>
        </div>

        <div className='bg-[#000000] py-8 px-6 rounded-xl mt-2'>
          <p className='text-gray-400 mb-1'>Reciever</p>

          <div className='flex justify-between items-center'>
            <p className='font-semibold cursor-not-allowed'>{receiver}</p>
            <BiSolidCopy
              className='cursor-pointer'
              size={20}
            />
          </div>
        </div>

        <div className='flex justify-between items-center gap-2 font-Avenir'>
          <div className='bg-[#000000] py-8 px-6 rounded-xl mt-2 w-full'>
            <div className='flex items-center gap-3 bg-[#111111] py-4 px-4 rounded-md cursor-not-allowed'>
              <Image
                src={CHAIN_CONFIG[primary]?.img}
                height={30}
                width={30}
                alt='primary chain'
                className='rounded-[50px]'
              />
              <p className=' text-gray-300 '>{CHAIN_CONFIG[primary]?.name}</p>
            </div>
          </div>

          <FaLongArrowAltRight
            className='text-purple-300'
            size={40}
          />

          <div className='bg-[#000000] py-8 px-6 rounded-xl mt-2 w-full'>
            <div className='flex items-center gap-3 bg-[#111111] py-4 px-4 rounded-md cursor-not-allowed'>
              <Image
                src={CHAIN_CONFIG[secondary]?.img}
                height={30}
                width={30}
                alt='primary chain'
                className='rounded-[50px]'
              />
              <p className=' text-gray-300 '>{CHAIN_CONFIG[secondary]?.name}</p>
            </div>
          </div>
        </div>

        {address && chain.id !== CHAIN_CONFIG[primary]?.chainId ? (
          <button
            onClick={() => {
              switchNetworkHandler(
                CHAIN_CONFIG[primary]?.networkId,
                setLoading
              );
            }}
            type='button'
            className='bg-purple-800 w-full mt-3 text-white py-3 font-semibold text-base hover:bg-purple-700 tracking-wider   rounded-2xl '>
            {loading ? (
              <Loader inComp={true} />
            ) : (
              `Switch to ${CHAIN_CONFIG[primary]?.name} `
            )}
          </button>
        ) : address ? (
          <button
            disabled={!isEnoughBalance}
            onClick={transferHandler}
            type='button'
            className='bg-purple-800 w-full mt-3 text-white py-3 font-semibold text-base hover:bg-purple-700 tracking-wider   rounded-2xl '>
            {loading ? (
              <Loader inComp={true} />
            ) : !isEnoughBalance ? (
              `Insufficient ${tokenName} balance`
            ) : (
              'Transfer'
            )}
          </button>
        ) : (
          <button
            onClick={connectWalletHandler}
            type='button'
            className='bg-purple-800 w-full mt-3 text-white py-3 font-semibold text-base hover:bg-purple-700 tracking-wider   rounded-2xl '>
            {loading ? <Loader inComp={true} /> : 'Connect Wallet'}
          </button>
        )}
      </div>
      {/* {!isSuccessfull && (
        <SuccessModal
          onClose={() => {
            setIsSuccessfull(false);
          }}
        />
      )}{' '} */}
    </div>
  );
};

export default Modal;
