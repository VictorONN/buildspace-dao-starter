import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";
import { readFile, readFileSync } from "fs";

const app = sdk.getAppModule("0xd3cFb0A2c2B0AbaBb3FC3557fd5eE10DbeE0916a");

(async () => {
    try {
        const bundleDropModule = await app.deployBundleDropModule({
            //the collection's name e.g. cryptopunks
            name: "AchieversDAO",
            //A description of the collection
            description: "A DAO for high achievers",
            // The image for the collection that will show up on Opensea
            image: readFileSync("scripts/assets/FHI-7YbXwAczQwl.jpg"),
            //we need to pass in the address of the person who will be receiving the proceeds from the sale of nfts in the module.
            // We're planning on not charging people for the drop, so we are going to pass in the 0x0 address
            // you can set this to your own wallet address if you want to charge for the drop
            primarySaleRecipientAddress: ethers.constants.AddressZero,
        });

        console.log(
            "✅ Successfully deployed bundleDrop module, address:",
            bundleDropModule.address,
        );

        console.log(
            "✅ bundleDrop metadata:",
            await bundleDropModule.getMetadata(),
        );
    } catch (error) {
        console.log("failed to deploy bundleDrop module", error);   
    }
}) ()
