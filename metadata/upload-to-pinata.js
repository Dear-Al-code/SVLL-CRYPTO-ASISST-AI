import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PINATA_JWT = process.env.PINATA_JWT || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkYmYwMTY2NS1iZDAzLTRmNTMtOWM0OS00NzczMGExZmU4M2EiLCJlbWFpbCI6ImFydGVtaW5kc3R1ZGlvQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI3MWNmMjdjZDQyMThhMDExM2JkYSIsInNjb3BlZEtleVNlY3JldCI6IjQxNDQzNTFjNjExOGIyYTEyNDg3YjU4NzA0NjI0YWMyMjQxOWU3Zjg2YjZkNjE4M2I3OGZhN2I1YTZmMjA0YmUiLCJleHAiOjE3OTA5NDg4NDR9.nnTzD-5IFYnCK5EaE9EVHi5r_4fWeRzajpmHocggTzc';

/**
 * Sube un archivo JSON individual a Pinata
 */
async function uploadJSON(jsonData, filename) {
  const url = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';

  const data = JSON.stringify({
    pinataContent: jsonData,
    pinataMetadata: {
      name: filename,
    },
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${PINATA_JWT}`,
      },
      body: data,
    });

    const result = await response.json();

    if (response.ok) {
      return result.IpfsHash;
    } else {
      console.error(`❌ Error uploading ${filename}:`, result);
      return null;
    }
  } catch (error) {
    console.error(`❌ Upload error for ${filename}:`, error);
    return null;
  }
}

/**
 * Crea un folder virtual en IPFS subiendo cada archivo
 */
async function uploadFolder() {
  const metadataDir = path.join(__dirname, 'json');

  if (!fs.existsSync(metadataDir)) {
    console.error(`❌ Directorio ${metadataDir} no existe`);
    console.log('Ejecuta primero: npm run generate');
    process.exit(1);
  }

  const files = fs.readdirSync(metadataDir).filter(f => f.endsWith('.json')).sort((a, b) => {
    const numA = parseInt(a.replace('.json', ''));
    const numB = parseInt(b.replace('.json', ''));
    return numA - numB;
  });

  console.log(`📦 Subiendo ${files.length} archivos a IPFS via Pinata...`);

  // Crear objeto con todos los archivos
  const folderData = {};

  for (const file of files) {
    const filePath = path.join(metadataDir, file);
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    folderData[file] = content;

    if (files.indexOf(file) % 10 === 0) {
      console.log(`📄 Preparando ${files.indexOf(file) + 1}/${files.length}`);
    }
  }

  // Subir folder completo como JSON
  console.log('\n📤 Subiendo folder completo...');

  const url = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';

  const data = JSON.stringify({
    pinataContent: folderData,
    pinataMetadata: {
      name: 'Sovereign AI Metadata Collection',
    },
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${PINATA_JWT}`,
      },
      body: data,
    });

    const result = await response.json();

    if (response.ok) {
      console.log('\n✅ Upload exitoso!');
      console.log('📌 CID:', result.IpfsHash);
      console.log('🔗 IPFS URL:', `https://ipfs.io/ipfs/${result.IpfsHash}`);
      console.log('🔗 Gateway:', `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`);

      console.log('\n📝 Próximos pasos:');
      console.log(`1. Copia el CID: ${result.IpfsHash}`);
      console.log(`2. Usa este Base URI en el contrato: ipfs://${result.IpfsHash}/`);
      console.log(`3. Los NFTs accederán a: ipfs://${result.IpfsHash}/1.json, ipfs://${result.IpfsHash}/2.json, etc.`);

      return result;
    } else {
      console.error('❌ Error:', result);
      return null;
    }
  } catch (error) {
    console.error('❌ Upload error:', error);
    return null;
  }
}

uploadFolder();
