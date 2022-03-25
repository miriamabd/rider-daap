import React from 'react'


const Header = (props) => {

    return (
      <header className="header">
          <h1 className="brand-name">Rider</h1>
          <nav>
            <span> <li><a className="balance"><span>{props.cUSDBalance}</span>cUSD</a></li>
            </span>
            </nav>
         
    </header>
    
    );
  };
  
  export default Header;