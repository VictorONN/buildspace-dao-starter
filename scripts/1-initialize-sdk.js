import { ThirdwebSDK } from "@3rdweb/sdk";
import ethers from "ethers";

//importing and configuring our env file that we use to securely store our environment variables
import dotenv from "dotenv";
import { ThirdwebWeb3Provider } from "@3rdweb/hooks";
dotenv.config();

// some quick checks to make sure our dotenv is working
if (!process.env.PRIVATE_KEY || process.env.PRIVATE_KEY == ""){
    console.log("🛑 Private key not found.")
}

if(!process.env.ALCHEMY_API_URL || process.env.ALCHEMY_API_URL == "") {
    console.log("🛑 Alchemy API URL not found.")
}

if(!process.env.WALLET_ADDRESS || process.env.WALLET_ADDRESS == "") {
    console.log("🛑 Wallet Address not found.")
}

const sdk = new ThirdwebSDK(
    new ethers.Wallet(
        process.env.PRIVATE_KEY,
        ethers.getDefaultProvider(process.env.ALCHEMY_API_URL),
    ),
);

(async () => {
    try {
        const apps = await sdk.getApps();
        console.log("Your app address is:", apps[0].address);
    } catch (err) {
        console.error("Failed to get apps from the sdk", err);
        process.exit(1); 
    }
})() 

// We are exporting the initialized thirdweb SDK so that we can use it in our other scripts
export default sdk;

// 0xd3cFb0A2c2B0AbaBb3FC3557fd5eE10DbeE0916a
