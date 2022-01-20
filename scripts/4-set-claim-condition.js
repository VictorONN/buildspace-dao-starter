import sdk from "./1-initialize-sdk.js";

const bundleDrop = sdk.getBundleDropModule(
    "0x7c561F2688879FCA19874D7219a84Eaf925d55b2"
);

(async () => {
    try {
        const claimConditionFactory = bundleDrop.getClaimConditionFactory();
        //specify conditions
        claimConditionFactory.newClaimPhase({
            startTime: new Date(),
            maxQuantity: 50_000,
            maxQuantityPerTransaction: 1
        })

        await bundleDrop.setClaimCondition(0, claimConditionFactory);
        console.log("✅ Sucessfully set claim condition on bundle drop:", bundleDrop.address);
    } catch (error) {
        console.error("Failed to set claim condition", error);
    } 
}) ()