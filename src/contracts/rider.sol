// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

interface IERC20Token {
  function transfer(address, uint256) external returns (bool);
  function approve(address, uint256) external returns (bool);
  function transferFrom(address, address, uint256) external returns (bool);
  function totalSupply() external view returns (uint256);
  function balanceOf(address) external view returns (uint256);
  function allowance(address, address) external view returns (uint256);

  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract Rider {

    uint internal carsLength = 0;
    address internal cUsdTokenAddress = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;



    // this struct contains all the properties of the car listing
    struct Car {
        address payable owner;
        string brand;
        string image;
        string description;
        string location;
        uint price;
        uint totalAvailable;
        uint sold;
    }
    
    mapping (uint => Car) internal cars;



     // to add a new car to the list   
    function addCar(
        string memory _brand,
        string memory _image,
        string memory _description, 
        string memory _location, 
        uint _price,
        uint _totalAvailable

    ) public {
        uint _sold = 0;
        cars[carsLength] = Car(
            payable(msg.sender),
            _brand,
            _image,
            _description,
            _location,
            _price,
            _totalAvailable,
            _sold
        );
        carsLength++; // increasing the length of the car list after every addition 
    }


     // removing a car listing from the list of cars
     function deleteCarListing(uint _index) external{
        require(msg.sender == cars[_index].owner, "Unable to perform transaction because you are not the owner");
        delete cars[_index];
    }
      
      // additing more cars to a car listing when a new inventory is available
    function addAvailablecar(uint _index, uint _ammount) external{
        require(msg.sender == cars[_index].owner, "Unable to perform transaction because you are not the owner");
        cars[_index].totalAvailable = cars[_index].totalAvailable + _ammount;
    }
     // changing the price of a car listing and only the owner of the listing can do that
    function editPrice(uint _index, uint _price) public {
        require(msg.sender == cars[_index].owner, "Unable to perform transaction because you are not the owner");
        cars[_index].price = _price;
    }

    // getting the car listings
    function getCars(uint _index) public view returns (
        address payable,
        string memory, 
        string memory, 
        string memory, 
        string memory, 
        uint, 
        uint,
        uint
    ) {
        Car memory c = cars[_index];
        return (
            c.owner,
            c.brand, 
            c.image, 
            c.description, 
            c.location, 
            c.price,
            c.totalAvailable,
            c.sold
        );
    }
     // buying a car from a car listing and increasing the sold value by 1 and decreasing the total available cars by 1 also
    function buyCar(uint _index) public payable  {
        require(cars[_index].totalAvailable > 0, "Out of item");
        require(
          IERC20Token(cUsdTokenAddress).transferFrom(
            msg.sender,
            cars[_index].owner,
            cars[_index].price
          ),
          "Transfer failed."
        );

        cars[_index].sold ++;
        cars[_index].totalAvailable --;
    }
    
    // getting the length of cars in the list
    function getCarsLength() public view returns (uint) {
        return (carsLength);
    }
}