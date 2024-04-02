import logo from './logo.svg';
import './App.css';
import { useWeb3React } from '@web3-react/core';
import { injected } from './component/connectors';
import Web3 from 'web3';
import React, { useState } from "react";



function App() {
  const { activate, account, deactivate, active, chainId} = useWeb3React()
  const [ethBalance, setEthBalance] = useState([]);
  
  const connectWallet = async  () => {
    try {
      await activate(injected)
      window.web3 = new Web3(window.ethereum);
      const accounts =await window.ethereum.request({method: 'eth_requestAccounts'});
      let weiBalance = await window.web3.eth.getBalance(accounts[0]);
      let ethBalance = window.web3.utils.fromWei(weiBalance, "ether");
      setEthBalance(ethBalance)
    } 
    catch (e) 
    {
     
      console.log(e)

    }
  }
  const disconnectWallet = async () => {
    try {
      await deactivate()
    } 
    catch (error) {
    }
  }
  return (
    <div className="App">
      {active ? 'Connected' : "Not Connected"}

      <br />
      {active ?
        <button className="disconnectwallet " onClick={disconnectWallet}>Disconnect Wallet</button>

        :
        <button className="connectwallet" onClick={connectWallet}>Connect Wallet</button>


      }
      <br />
      <br />
      <br />
      {active &&
        <>
        <p className='text-[20px] text-red-900'>Wallet Address : <span className='account'>{account}</span></p>
          
          <br />
          <p className='text-[20px] text-blue-900'>Chain Id : <span className='chainid'>{chainId}</span></p>
          <br/>
         
          <p className='text-[20px] text-red-900'>Balance : <span className='balance'>{ethBalance}</span></p>

        </>
      }

    </div>
  );
}

export default App;
