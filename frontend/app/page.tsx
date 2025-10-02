import { MintButton } from "@/components/MintButton";

export default function Home() {
  return (
    <main className="min-h-screen bg-sovereign-black text-sovereign-white">
      {/* Hero */}
      <section className="container mx-auto px-4 py-20 min-h-screen flex flex-col justify-center items-center">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Logo/Title */}
          <h1 className="text-7xl md:text-9xl font-bold tracking-tighter">
            <span className="text-sovereign-red glow-red">SOVEREIGN</span>
            <br />
            <span className="text-sovereign-white">AI</span>
          </h1>

          {/* Tagline */}
          <p className="text-2xl md:text-3xl text-sovereign-white/80 font-light max-w-2xl mx-auto">
            Tu agente IA personal. 24/7. Sin intermediarios. Tú eres el dueño.
          </p>

          {/* Mint */}
          <div className="pt-8">
            <MintButton />
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 text-left">
            <div className="border border-sovereign-red/30 p-6 hover:border-sovereign-red transition-all">
              <div className="text-sovereign-red text-4xl mb-4">01</div>
              <h3 className="text-xl font-bold mb-2">Self-Sovereign</h3>
              <p className="text-sovereign-white/60">
                Tu agente corre en infraestructura descentralizada. Tú tienes las llaves.
              </p>
            </div>

            <div className="border border-sovereign-red/30 p-6 hover:border-sovereign-red transition-all">
              <div className="text-sovereign-red text-4xl mb-4">02</div>
              <h3 className="text-xl font-bold mb-2">Privacy by Design</h3>
              <p className="text-sovereign-white/60">
                Tus datos nunca salen de tu control. Zero-knowledge. Local-first.
              </p>
            </div>

            <div className="border border-sovereign-red/30 p-6 hover:border-sovereign-red transition-all">
              <div className="text-sovereign-red text-4xl mb-4">03</div>
              <h3 className="text-xl font-bold mb-2">Exit Guaranteed</h3>
              <p className="text-sovereign-white/60">
                Exporta todo cuando quieras. No lock-in. Libertad total.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="border-t border-sovereign-red/30 py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-5xl font-bold mb-12 text-center">
            ¿Qué obtienes?
          </h2>

          <div className="space-y-6 text-lg">
            <div className="flex items-start gap-4">
              <span className="text-sovereign-red text-2xl">▸</span>
              <p>
                <strong className="text-sovereign-red">1 Agente IA personal</strong> corriendo 24/7 en infraestructura privada
              </p>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-sovereign-red text-2xl">▸</span>
              <p>
                <strong className="text-sovereign-red">Acceso exclusivo</strong> a comunidad de early adopters en Farcaster
              </p>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-sovereign-red text-2xl">▸</span>
              <p>
                <strong className="text-sovereign-red">Dashboard privado</strong> para controlar tu agente
              </p>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-sovereign-red text-2xl">▸</span>
              <p>
                <strong className="text-sovereign-red">Alpha diaria</strong> sobre crypto, Base, y oportunidades
              </p>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-sovereign-red text-2xl">▸</span>
              <p>
                <strong className="text-sovereign-red">Soberanía total</strong> sobre tus datos y tu IA
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-sovereign-red/30 py-12">
        <div className="container mx-auto px-4 text-center text-sovereign-white/40">
          <p>Built on Base. Powered by sovereignty.</p>
          <p className="mt-2 text-sm">100 NFTs. No roadmap. No promises. Just utility.</p>
        </div>
      </footer>
    </main>
  );
}
