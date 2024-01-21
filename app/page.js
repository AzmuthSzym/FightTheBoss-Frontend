"use client";

import styles from './page.module.css'
import {useState} from "react";
//import { ethers } from "ethers";
const ethers = require("ethers");

//Connect to metamask
//execute a function

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [signer, setSigner] = useState();

  async function connect()
  {
    if(typeof window.ethereum !== "undefined")
    {
      try{
        await ethereum.request({method: "eth_requestAccounts" });
        setIsConnected(true);
      }
      catch(e)
      {
        console.log(e);
      }
      const accounts = await ethereum.request({ method: "eth_accounts" });
      console.log(accounts);
    }
    else
    {
      setIsConnected(false);
    }
  }

  async function execute()
  {
    if (typeof window.ethereum !== "undefined")
    {
      const bossAddress = "0x35933cCf6ba86612CE9e763576129F866E4768cd";
      const bossAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[],"name":"GameWon","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"decreaseHealth","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"gameWon","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"health","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}];

      const  provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(bossAddress, bossAbi, signer);
      try {
        const healthVal = await contract.health();
        console.log("Boss Health", healthVal);
      }
      catch(error)
      {
        console.log(error)
      }
    }
    else
    {
      document.getElementById("executeButton").innerHTML = "Please install MetaMask";
    }
  }

  return (
    <div className={styles.main}>
      Hello Frogs
      {isConnected ? (
        <>
          Connected! 
          <button onClick={() => execute()}>Execute</button>
        </>
        ) : (
        <button onClick={() => connect()}>Connect</button>
      )}
    </div>
    
  );
}
