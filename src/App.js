import logo from './logo.svg';
import './App.css';
import { useWeb3React } from '@web3-react/core';
import { injected } from './component/connectors';

function App() {
  const { activate, account, deactivate, active, chainId } = useWeb3React()
  const connectWallet = async () => {
    try {
      await activate(injected)
    } catch (error) {

    }
  }
  const disconnectWallet = async () => {
    try {
      await deactivate()
    } catch (error) {

    }
  }
  return (
    <div className="App">
      {active ? 'Connected' : "Not Connected"}

      <br />
      {active ?
        <button className="disconnectwallet" onClick={disconnectWallet}>Disconnect Wallet</button>

        :
        <button className="connectwallet" onClick={connectWallet}>Connect Wallet</button>


      }
      <br />
      <br />
      <br />
      {active &&
        <>
        <p>Wallet Address : <span className='account'>{account}</span></p>
          
          <br />
          <p>Chain Id : <span className='chainid'>{chainId}</span></p>

        </>
      }




    </div>
  );
}

export default App;
