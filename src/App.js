import { useState, useEffect, useCallback } from "react";

import Header from './components/Header';
import Addcars from './components/Addcar';

import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";
import BigNumber from "bignumber.js";


import rider from "./contracts/rider.abi.json";
import IERC from "./contracts/IERC.abi.json";
import { ListCars } from "./components/ListCars";




function App() {
  const ERC20_DECIMALS = 18;

  const contractAddress = "0xfBC66befe2D836D59c0299d8edd22A5e949c390E";
  const cUSDContractAddress = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";
  const [contract, setcontract] = useState(null);
  const [address, setAddress] = useState(null);
  const [kit, setKit] = useState(null);
  const [cUSDBalance, setcUSDBalance] = useState(0);
  const [carss, setCars] = useState([]);


  const connectToWallet = async () => {
    if (window.celo) {
      try {
        await window.celo.enable();
        const web3 = new Web3(window.celo);
        let kit = newKitFromWeb3(web3);

        const accounts = await kit.web3.eth.getAccounts();
        const user_address = accounts[0];

        kit.defaultAccount = user_address;

        await setAddress(user_address);
        await setKit(kit);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Error Occurred");
    }
  };

  const getBalance = useCallback(async () => {
    try {
      const balance = await kit.getTotalBalance(address);
      const USDBalance = balance.cUSD.shiftedBy(-ERC20_DECIMALS).toFixed(2);

      const contract = new kit.web3.eth.Contract(rider, contractAddress);
      setcontract(contract);
      setcUSDBalance(USDBalance);
    } catch (error) {
      console.log(error);
    }
  }, [address, kit]);


  


  const getCars = useCallback(async () => {
    const carsLength = await contract.methods.getCarsLength().call();
    const carss = [];

    for (let index = 0; index < carsLength; index++) {
      let _cars = new Promise(async (resolve, reject) => {
      let car = await contract.methods.getCars(index).call();

        resolve({
          index: index,
          owner: car[0],
          brand: car[1],
          image: car[2],
          description: car[3],
          location: car[4],
          price: car[5],
          totalAvailable: car[6], 
          sold: car[7]    
        });
      });
      carss.push(_cars);
    }

    const _cars = await Promise.all(carss);
    setCars(_cars);
  }, [contract]);


  const addCar = async (
    _brand,
    _image,
    _description,
    _location,
    price,
    _totalAvailable,
  ) => {
    
    const _price = new BigNumber(price).shiftedBy(ERC20_DECIMALS).toString();
    try {
      await contract.methods
        .addCar(_brand, _image, _description, _location, _price, _totalAvailable)
        .send({ from: address });
      getCars();
    } catch (error) {
      console.log(error);
    }
  };


  const buyCar = async (_index) => {
    const cUSDContract = new kit.web3.eth.Contract(IERC, cUSDContractAddress);
  
    try {
      await cUSDContract.methods
        .approve(contractAddress, carss[_index].price)
        .send({ from: address });
      await contract.methods.buyCar(_index).send({ from: address });
      getBalance();
      getCars();
     
    } catch (error) {
      console.log(error);
    }};

 

  useEffect(() => {
    connectToWallet();
  }, []);

  useEffect(() => {
    if (kit && address) {
      getBalance();
    }
  }, [kit, address, getBalance]);

  useEffect(() => {
    if (contract) {
      getCars();
    }
  }, [contract, getCars]);
  
  return (
    <div>
    <Header cUSDBalance={cUSDBalance} />
    <ListCars carss={carss} buyCar={buyCar}/>
  <Addcars addCar={addCar} />
 
  
    </div>
  );
}


export default App;
