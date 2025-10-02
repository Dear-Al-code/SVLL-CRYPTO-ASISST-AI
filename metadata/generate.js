import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MAX_SUPPLY = 100;

// Base metadata template
const baseMetadata = {
  name: "Sovereign AI",
  description: "Tu agente IA personal corriendo 24/7. Self-sovereign. Privacy-first. Exit guaranteed.",
  external_url: "https://coinbase-token.xyz",
  attributes: [
    {
      trait_type: "Type",
      value: "AI Agent"
    },
    {
      trait_type: "Status",
      value: "Active"
    },
    {
      trait_type: "Uptime",
      value: "24/7"
    },
    {
      trait_type: "Privacy",
      value: "Zero-Knowledge"
    },
    {
      trait_type: "Sovereignty",
      value: "Self-Owned"
    }
  ]
};

// Genera metadata para cada token
function generateMetadata() {
  const metadataDir = path.join(__dirname, 'json');

  // Crea directorio si no existe
  if (!fs.existsSync(metadataDir)) {
    fs.mkdirSync(metadataDir, { recursive: true });
  }

  console.log(`Generando metadata para ${MAX_SUPPLY} tokens...`);

  for (let i = 1; i <= MAX_SUPPLY; i++) {
    const metadata = {
      ...baseMetadata,
      name: `${baseMetadata.name} #${i}`,
      // Por ahora usamos placeholder para imagen
      // Después de subir imágenes a IPFS, actualiza esto
      image: `ipfs://PLACEHOLDER/${i}.png`,
      attributes: [
        ...baseMetadata.attributes,
        {
          trait_type: "Agent ID",
          value: i
        },
        {
          trait_type: "Generation",
          value: "Genesis"
        }
      ]
    };

    const filename = `${i}.json`;
    const filepath = path.join(metadataDir, filename);

    fs.writeFileSync(filepath, JSON.stringify(metadata, null, 2));

    if (i % 10 === 0) {
      console.log(`✓ Generated ${i}/${MAX_SUPPLY}`);
    }
  }

  console.log(`\n✅ Metadata generada para ${MAX_SUPPLY} tokens`);
  console.log(`📁 Archivos en: ${metadataDir}`);
  console.log(`\n📝 Próximos pasos:`);
  console.log(`1. Genera imágenes (o usa placeholders)`);
  console.log(`2. Sube imágenes a IPFS/Pinata`);
  console.log(`3. Actualiza el campo "image" en cada JSON con el CID`);
  console.log(`4. Sube todos los JSONs a IPFS/Pinata`);
  console.log(`5. Usa el CID del folder en el contrato`);
}

generateMetadata();
