import { useEffect } from 'react';
import './App.css';
import { useState } from 'react';
// import contract from './contracts/NFTCollectible.json';

// const contractAddress = "0x355638a4eCcb777794257f22f50c289d4189F245";
// const abi = contract.abi;

function App() {

  const checkWalletIsConnected = async() => {
    const { ethereum } = window;
    if(!ethereum) {
      console.log("Make sure Metamask is installed!");
      return;
    } else {
      console.log("Metamask is exist.");
    }

    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

    if(accounts.length != 0) {
      const account = accounts[0];
      console.log("Found an authorized account: ", account);
      setCurrentAccount(account);
    } else {
      console.log("No authorized account found.");
    }
  }

  const connectWalletHandler = async() => {
    const { ethereum } = window;
    if(!ethereum) {
      console.log("Make sure Metamask is installed!");
    }

    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      console.log("Account exist:", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err);
    }
  }

  const mintNftHandler = () => { }

  const connectWalletButton = () => {
    return (
      <button onClick={connectWalletHandler} className='cta-button connect-wallet-button'>
        Connect Wallet
      </button>
    )
  }

  const mintNftButton = () => {
    return (
      <button onClick={mintNftHandler} className='cta-button mint-nft-button'>
        {currentAccount}
      </button>
    )
  }

  useEffect(() => {
    checkWalletIsConnected();
  }, [])

  const[currentAccount, setCurrentAccount] = useState(null);

  return (
    <div className='main-app'>
      <h1>Scrappy Squirrels Tutorial</h1>
      <div>
        {currentAccount ? mintNftButton() : connectWalletButton()}
      </div>
    </div>
  )
}

export default App;