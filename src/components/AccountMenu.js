import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';
import { sessionSlice } from '../utils/slices';
import { useClickOutside, useReduxResetStates } from '../utils/hooks';

const AccountMenu = () => {
  const reduxResetStates = useReduxResetStates()
  const isAuthenticated = useSelector((state) => state.session.isAuthenticated);
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef();

  useClickOutside(menuRef, () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  });

  const handleDeleteSession = () => {
    dispatch(sessionSlice.deleteResource());
    reduxResetStates()
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      {isAuthenticated ? (
        <div ref={menuRef} className={`account-container ${isMenuOpen ? 'open' : null}`}>
          <MenuIcon onClick={toggleMenu} id="menu-icon" />
          <div className="account-actions">
            <div onClick={handleDeleteSession}>Sign out</div>
          </div>
        </div>
      ) : (
        <div className="btn-cont">
          <button type="button">Log in</button>
          <button type="button" className="btn-outline">
            Sign up
          </button>
        </div>
      )}
    </div>
  );
};
export default AccountMenu;
