const hre = require("hardhat");

async function main() {
  const contractAddress = "0x2490FEFE64104e2a95c8a722031Ce5aD8Cd2fbCb";
  const newBaseURI = "ipfs://QmZmQA5URqtjo3xrYKsjoc8UMRTqdgbJybXku6zikHUBQi/";

  console.log("📝 Updating Base URI...");
  console.log("Contract:", contractAddress);
  console.log("New Base URI:", newBaseURI);

  const SovereignAI = await hre.ethers.getContractFactory("SovereignAI");
  const contract = SovereignAI.attach(contractAddress);

  const tx = await contract.setBaseURI(newBaseURI);
  console.log("⏳ Transaction sent:", tx.hash);

  await tx.wait();
  console.log("✅ Base URI updated!");
  console.log("🔗 Transaction:", `https://basescan.org/tx/${tx.hash}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
