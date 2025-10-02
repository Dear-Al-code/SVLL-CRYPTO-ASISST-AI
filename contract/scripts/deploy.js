const hre = require("hardhat");

async function main() {
  console.log("🚀 Deploying SovereignAI contract to", hre.network.name);

  // Base URI - cámbialo después de subir metadata a IPFS
  const baseURI = process.env.BASE_URI || "ipfs://PLACEHOLDER/";

  console.log("📦 Base URI:", baseURI);

  // Deploy
  const SovereignAI = await hre.ethers.getContractFactory("SovereignAI");
  const contract = await SovereignAI.deploy(baseURI);

  await contract.waitForDeployment();

  const address = await contract.getAddress();

  console.log("✅ SovereignAI deployed to:", address);
  console.log("🔗 View on BaseScan:");

  if (hre.network.name === "base-mainnet") {
    console.log(`   https://basescan.org/address/${address}`);
  } else if (hre.network.name === "base-sepolia") {
    console.log(`   https://sepolia.basescan.org/address/${address}`);
  }

  console.log("\n📝 Save this info:");
  console.log({
    network: hre.network.name,
    contract: address,
    maxSupply: 100,
    mintPrice: "0.008 ETH",
    baseURI: baseURI,
  });

  console.log("\n⏳ Waiting 30 seconds before verification...");
  await new Promise((resolve) => setTimeout(resolve, 30000));

  // Verify
  if (process.env.BASESCAN_API_KEY) {
    console.log("🔍 Verifying contract on BaseScan...");
    try {
      await hre.run("verify:verify", {
        address: address,
        constructorArguments: [baseURI],
      });
      console.log("✅ Contract verified!");
    } catch (error) {
      console.log("⚠️ Verification error:", error.message);
    }
  } else {
    console.log("⚠️ No BASESCAN_API_KEY found, skipping verification");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
