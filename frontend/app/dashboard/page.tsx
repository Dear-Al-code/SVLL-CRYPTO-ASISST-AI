'use client';

import { usePrivy } from '@privy-io/react-auth';
import { usePublicClient } from 'wagmi';
import { useEffect, useState } from 'react';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/lib/config';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const { authenticated, user, logout } = usePrivy();
  const publicClient = usePublicClient();
  const router = useRouter();

  const [tokens, setTokens] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authenticated) {
      router.push('/');
      return;
    }

    const fetchTokens = async () => {
      if (!publicClient || !user?.wallet?.address || !CONTRACT_ADDRESS) return;

      try {
        const userTokens = await publicClient.readContract({
          address: CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          functionName: 'tokensOfOwner',
          args: [user.wallet.address as `0x${string}`],
        });

        setTokens(userTokens as number[]);
      } catch (error) {
        console.error('Error fetching tokens:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
  }, [authenticated, user, publicClient, router]);

  if (!authenticated) {
    return null;
  }

  return (
    <main className="min-h-screen bg-sovereign-black text-sovereign-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold">
            <span className="text-sovereign-red glow-red">SOVEREIGN</span> DASHBOARD
          </h1>
          <button
            onClick={logout}
            className="px-6 py-2 border border-sovereign-red/50 hover:border-sovereign-red transition-all"
          >
            Logout
          </button>
        </div>

        {/* User info */}
        <div className="mb-12 border border-sovereign-red/30 p-6">
          <div className="text-sm text-sovereign-white/60 mb-2">Connected Wallet</div>
          <div className="font-mono text-sovereign-red">{user?.wallet?.address}</div>
        </div>

        {/* Tokens */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Tus Agentes IA</h2>

          {loading ? (
            <div className="text-sovereign-white/60">Loading...</div>
          ) : tokens.length === 0 ? (
            <div className="border border-sovereign-red/30 p-12 text-center">
              <p className="text-xl text-sovereign-white/60 mb-6">
                No tienes agentes aún.
              </p>
              <a
                href="/"
                className="inline-block px-8 py-3 bg-sovereign-red text-sovereign-black font-bold hover:bg-sovereign-black hover:text-sovereign-red border-2 border-sovereign-red transition-all"
              >
                MINT AHORA
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tokens.map((tokenId) => (
                <div
                  key={tokenId}
                  className="border border-sovereign-red/30 p-6 hover:border-sovereign-red transition-all"
                >
                  <div className="text-sovereign-red text-xl font-bold mb-4">
                    Agent #{tokenId}
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-sovereign-white/60">Status:</span>
                      <span className="text-green-500">● Online</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-sovereign-white/60">Uptime:</span>
                      <span>24/7</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-sovereign-white/60">Tasks:</span>
                      <span>{Math.floor(Math.random() * 1000)}</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-sovereign-red/20">
                    <button className="w-full px-4 py-2 bg-sovereign-red/10 border border-sovereign-red/50 hover:bg-sovereign-red hover:text-sovereign-black transition-all text-sm font-bold">
                      ACCEDER
                    </button>
                  </div>

                  <div className="mt-4 text-xs text-sovereign-white/40 text-center">
                    Dashboard completo próximamente
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Coming soon */}
        <div className="mt-12 border border-sovereign-red/30 p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Próximamente</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
            <div className="flex items-start gap-3">
              <span className="text-sovereign-red">▸</span>
              <span className="text-sovereign-white/60">Chat directo con tu agente</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-sovereign-red">▸</span>
              <span className="text-sovereign-white/60">Task automation</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-sovereign-red">▸</span>
              <span className="text-sovereign-white/60">Custom training</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-sovereign-red">▸</span>
              <span className="text-sovereign-white/60">Data export</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
