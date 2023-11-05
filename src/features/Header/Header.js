import React from 'react';
import { StyledHeader } from './/StyledHeader';

const Header = () => {

  return (
    <>
      <StyledHeader>
        <div className="brand-container">
            <img alt="oiko logo" />
            <h1>oiko</h1>
        </div>
        <nav>
            <div className='auth-container'>
                <a href="#">Log In</a>
                <a href="#">Create an account</a>
            </div>
        </nav>
      </StyledHeader>
    </>
  );
};

export default Header;
