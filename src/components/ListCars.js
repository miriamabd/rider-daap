import React from 'react'
import BigNumber from "bignumber.js";


export const ListCars = ( props ) => {
  const ERC20_DECIMALS = 18;

    return <div className='car-container'>
  {props.carss.map((car) =>(
    <div className='col-3' key={car.index}>  
    <div class="card">
    <img className="card-img-top" src={car.image}  />
    <div class="card-body ">
      <h5 class="card-title">{car.brand}</h5>
      <h6 class="card-subtitle">{car.location}</h6>
      <p class="card-text">{car.description}</p>
      <h5 class="card-title">price: {car.price / 1000000000000000000} cUSD</h5>


     
      <a href="#" onClick={()=> props.buyCar(car.index)} class="btn btn-primary">Buy Car</a>
      <a href="#" class="btn btn-outline">{car.totalAvailable} Available</a>
      <a href="#" class="btn btn-primary">{car.sold} Cars sold</a>
    </div>
  </div>
  </div>
  ))};
  </div> 
  };
  

  

