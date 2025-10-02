const hre = require('hardhat');

async function main() {
  // Generar wallet aleatoria
  const wallet = hre.ethers.Wallet.createRandom();

  console.log('\n🔐 NUEVA WALLET GENERADA\n');
  console.log('═══════════════════════════════════════════════════════');
  console.log('\n📍 Address:', wallet.address);
  console.log('\n🔑 Private Key:', wallet.privateKey);
  console.log('\n🗝️  Mnemonic (12 palabras):');
  console.log('   ', wallet.mnemonic.phrase);
  console.log('\n═══════════════════════════════════════════════════════');
  console.log('\n⚠️  IMPORTANTE:');
  console.log('   • GUARDA ESTO EN UN LUGAR SEGURO');
  console.log('   • ESTA WALLET ES TUYA Y SOLO TUYA');
  console.log('   • NUNCA COMPARTAS LA PRIVATE KEY CON NADIE');
  console.log('\n💰 Próximo paso:');
  console.log('   • Envía ~$30 USD en ETH a:', wallet.address);
  console.log('   • Debe ser en BASE MAINNET (no Ethereum mainnet)');
  console.log('   • Usa Coinbase o bridge desde: https://bridge.base.org');
  console.log('\n');
}

main().catch(console.error);
