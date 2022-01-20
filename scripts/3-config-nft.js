import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const bundleDrop = sdk.getBundleDropModule(
    "0x7c561F2688879FCA19874D7219a84Eaf925d55b2"
);

(async () => {
    try {
        await bundleDrop.createBatch([
            {
                name: "Fed Image",
                description: "Funny fed image",
                image: readFileSync("scripts/assets/fed.jpg"),
            },
        ]);
        console.log("✅ Successfully created a new NFT in the drop!");
    } catch (error) {
        console.error("failed to create the new NFT", error);
    }
}) ()