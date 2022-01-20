import { useEffect, useMemo, useState } from "react";

//import thirdweb
import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from "@3rdweb/sdk";

//we instantiate the sdk on Rinkeby
const sdk = new ThirdwebSDK("rinkeby");

//we can grab a reference to our ERC-1155 contract
const bundleDropModule = sdk.getBundleDropModule(
  "0x7c561F2688879FCA19874D7219a84Eaf925d55b2"
);

const App = () => {

  const { connectWallet, address, error, provider } = useWeb3();
  console.log("👋 Address:", address)

  // The signer is required to sign transactions on the blockchain.
  // Without it we can only read data, not write.
  const signer = provider ? provider.getSigner() : undefined;

  //state variable for us to know if our user has our NFT
  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
  // isClaiming lets us easily keep a loading state while the NFT is minting.
  const [isClaiming, setIsClaiming] = useState(false);

  // Another useEffect!
  useEffect(() => {
    // We pass the signer to the sdk, which enables us to interact with
    // our deployed contract!
    sdk.setProviderOrSigner(signer);
  }, [signer]);

  useEffect(() => {
    //if they don't have a connected wallet, exit
    if (!address) {
      return;
    }  
    //check if the user has the NFT by using bundleDropModule.balanceOf
    return bundleDropModule
      .balanceOf(address, "0")
      . then((balance) => {
        //if balance is greater than 0, then they have our NFT
        if (balance.gt(0)) {
          setHasClaimedNFT(true);
          console.log("🌟 this user has a membership NFT!")
        } else {
          setHasClaimedNFT(false);
          console.log("😭 this user doesn't have a membership NFT.")
        }
      })
        .catch((error) => {
          setHasClaimedNFT(false);
          console.error("failed to nft balance", error);
        });
      }, [address]);

  // This is the case where the user hasn't connected their wallet
  // to your webapp. Let them call connectWallet 
  if(!address) {
    return(
      <div className="landing">
        <h1>Welcome to AchieversDAO</h1>
        <button onClick={() => connectWallet("injected")} className="btn-hero">
          Connect your wallet!
        </button>
      </div>
    );
  }

  const mintNft = () => {
    setIsClaiming(true);
    // Call bundleDropModule.claim("0", 1) to mint nft to user's wallet.
    bundleDropModule
    .claim("0", 1)
    .then(() => {
      // Set claim state.
      setHasClaimedNFT(true);
      // Show user their fancy new NFT!
      console.log(
        `🌊 Successfully Minted! Check it our on OpenSea: https://testnets.opensea.io/assets/${bundleDropModule.address}/0`
      );
    })
    .catch((err) => {
      console.error("failed to claim", err);
    })
    .finally(() => {
      // Stop loading state.
      setIsClaiming(false);
    });
  }

  // render mint nft screen
  return (
    <div className="mint-nft">
      <h1>Mint your free 🍪DAO Membership NFT</h1>
      <button
        disabled={isClaiming}
        onClick={() => mintNft()}
      >
        {isClaiming ? "Minting..." : "Mint your nft (FREE)"}
      </button>
    </div>
  );

};

// if (!address) {
//   return (
//     <div className="landing">
//       <h1>Welcome to AchieversDAO</h1>
//       <button onClick={() => connectWallet("injected")} className="btn-hero">
//         Connect your wallet
//       </button>
//     </div>
//   );
// }


// if(hasClaimedNFT) {
//   return (
//     <div className="member-page">
//       <h1>🍪DAO Member Page</h1>
//       <p>Congratulations on being a member</p>
//     </div>
//   )
// }


//   // This is the case where we have the user's address
//   // which means they've connected their wallet to our site
  
//   return (
//     <div className="landing">
//      <h1>👀 wallet connected, now what!</h1>
//     </div>
//   );
// };

export default App;
