import { ethers } from "hardhat";
import { Contract } from "ethers";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await ethers.provider.getBalance(deployer.address)).toString());

  const CertiChain = await ethers.getContractFactory("CertiChain");
  const certiChain = await CertiChain.deploy(deployer.address);

  await certiChain.waitForDeployment();

  const address = await certiChain.getAddress();
  console.log("CertiChain deployed to:", address);

  if (process.env.ETHERSCAN_API_KEY || process.env.POLYGONSCAN_API_KEY) {
    console.log("Waiting for block confirmations...");
    await certiChain.deploymentTransaction()?.wait(6);

    console.log("Verifying contract on Etherscan...");
    try {
      await (certiChain as any).run("verify:verify", {
        address: address,
        constructorArguments: [deployer.address],
      });
    } catch (error) {
      console.log("Verification failed:", error);
    }
  }

  console.log("\nContract deployment complete!");
  console.log("Contract address:", address);
  console.log("Deployer address:", deployer.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

