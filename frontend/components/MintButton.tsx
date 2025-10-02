'use client';

import { usePrivy, useWallets } from '@privy-io/react-auth';
import { useState, useEffect } from 'react';
import { parseEther } from 'viem';
import { useWalletClient, usePublicClient } from 'wagmi';
import { CONTRACT_ADDRESS, CONTRACT_ABI, MINT_PRICE, MAX_SUPPLY } from '@/lib/config';

export function MintButton() {
  const { login, authenticated } = usePrivy();
  const { wallets } = useWallets();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();

  const [isMinting, setIsMinting] = useState(false);
  const [totalMinted, setTotalMinted] = useState<number | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);

  // Fetch total supply
  useEffect(() => {
    const fetchSupply = async () => {
      if (!publicClient || !CONTRACT_ADDRESS) return;

      try {
        const supply = await publicClient.readContract({
          address: CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          functionName: 'totalSupply',
        });
        setTotalMinted(Number(supply));
      } catch (error) {
        console.error('Error fetching supply:', error);
      }
    };

    fetchSupply();
    const interval = setInterval(fetchSupply, 10000); // Update every 10s
    return () => clearInterval(interval);
  }, [publicClient]);

  const handleMint = async () => {
    if (!authenticated) {
      login();
      return;
    }

    if (!walletClient || !wallets[0]) {
      alert('Por favor conecta tu wallet');
      return;
    }

    setIsMinting(true);
    setTxHash(null);

    try {
      const hash = await walletClient.writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'mint',
        value: parseEther(MINT_PRICE),
      });

      setTxHash(hash);

      // Wait for transaction
      if (publicClient) {
        await publicClient.waitForTransactionReceipt({ hash });
        alert('🔥 Mint exitoso! Tu agente IA estará listo en 24hrs');

        // Refresh supply
        const supply = await publicClient.readContract({
          address: CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          functionName: 'totalSupply',
        });
        setTotalMinted(Number(supply));
      }
    } catch (error: any) {
      console.error('Mint error:', error);
      alert('Error en el mint: ' + (error.message || 'Unknown error'));
    } finally {
      setIsMinting(false);
    }
  };

  const soldOut = totalMinted !== null && totalMinted >= MAX_SUPPLY;

  return (
    <div className="flex flex-col items-center gap-6">
      {totalMinted !== null && (
        <div className="text-center">
          <div className="text-sovereign-red text-6xl font-bold glow-red">
            {totalMinted} / {MAX_SUPPLY}
          </div>
          <div className="text-sovereign-white/60 mt-2">MINTED</div>
        </div>
      )}

      <button
        onClick={handleMint}
        disabled={isMinting || soldOut}
        className={`
          px-12 py-4 text-xl font-bold uppercase
          bg-sovereign-red text-sovereign-black
          border-2 border-sovereign-red
          transition-all duration-300
          ${isMinting || soldOut
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-sovereign-black hover:text-sovereign-red hover:border-glow cursor-pointer'
          }
        `}
      >
        {soldOut ? 'SOLD OUT' : isMinting ? 'MINTING...' : authenticated ? `MINT (${MINT_PRICE} ETH)` : 'CONNECT WALLET'}
      </button>

      {txHash && (
        <a
          href={`https://basescan.org/tx/${txHash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sovereign-red hover:underline text-sm"
        >
          View transaction →
        </a>
      )}
    </div>
  );
}
