import React from 'react'

import { useState } from "react";

export const Addcars = (props) => {


 const [brand, setBrand] = useState('');
 const [image, setImage] = useState('');
 const [description, setDescription] = useState('');
 const [location, setLocation] = useState('');
 const [price, setPrice] = useState('');
 const [totalAvailable, setTotalAvailable] = useState('');

 const submitHandler = (e) => {
  e.preventDefault();

  if(!brand || !image || !description || !location || !price || !totalAvailable) {
    alert('Please complete all fields')
    return
  }
  props.addCar(brand, image, description, location, price, totalAvailable);

  setBrand('')
  setImage('')
  setDescription('')
  setLocation('')
  setPrice(0)
  setTotalAvailable(0)
};




    return (
<>
<div className='mb-2'>
<form onSubmit={submitHandler} >
  <div class="form-group">
    <input type="text"
           className="form-control"
           value={brand}
           onChange={(e) => setBrand(e.target.value)}
           placeholder="Brand name" />
  </div>
  <div class="form-group">
    <input type="text" 
           className="form-control"
           value={image}
           onChange={(e) => setImage(e.target.value)}
           placeholder="Image link" />
  </div>
  <div class="form-group">
    <input type="text" 
           className="form-control"
           value={description}
           onChange={(e) => setDescription(e.target.value)}
           placeholder="Description" />
  </div>

  <div class="form-group">
    <input type="text" 
           className="form-control"
           value={location}
           onChange={(e) => setLocation(e.target.value)}
           placeholder="Locationn" />
  </div>
  <div class="form-group">
    <input type="text" 
           className="form-control"
           value={price}
           onChange={(e) => setPrice(e.target.value)}
           placeholder="Price" />
  </div>

  <div class="form-group">
    <input type="text" 
           className="form-control"
           value={totalAvailable}
           onChange={(e) => setTotalAvailable(e.target.value)}
           placeholder="Available cars" />
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
</div>
  </>      
           
    )
}
export default Addcars;