import React, { useEffect, useState, useRef } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, InputLabel, MenuItem } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import OptionsSelect from '../sharedComponents/OptionsSelect';
import EmptyDataInfo from '../sharedComponents/EmptyDataInfo';
import { useNavigate, useLocation } from 'react-router-dom';
import { selectMoneyPot } from '../utils/slices';
import { IconButton } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import DynamicList from '../sharedComponents/DynamicList';
import { display } from '@mui/system';
import MoneyPot from '../sharedComponents/Moneypot';

const MoneyPotsListing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const moneyPots = useSelector((state) => state.moneyPot.items);
  const moneyPotContRef = useRef(null);
  const [startIndex, setStartIndex] = useState(0);
  const [itemsInView, setItemsInView] = useState(3);
  const [transactionDistance, setTransitionDistance] = useState(210);

  const handleItemSelect = (itemData) => {
    dispatch(selectMoneyPot(itemData));
    if (location.pathname !== '/accounts') {
      navigate('/accounts');
    }
  };

  useEffect(() => {
    const updateItemsInView = () => {
      setStartIndex(0);
      const viewportWidth = window.innerWidth;
      if (viewportWidth < 730) {
        setItemsInView(1);
        setTransitionDistance(300);
      } else if (viewportWidth < 1290 && viewportWidth > 1100) {
        setItemsInView(2);
        setTransitionDistance(210);
      } else {
        setItemsInView(3);
        setTransitionDistance(210);
      }
    };
    updateItemsInView();
    window.addEventListener('resize', updateItemsInView);
    return () => {
      window.removeEventListener('resize', updateItemsInView);
    };
  }, []);

  return (
    <>
      {moneyPots.length === 0 ? (
        <EmptyDataInfo label="accounts" />
      ) : (
        <div className="money-pot-listing">
          {startIndex !== 0 && (
            <IconButton className="previous-arrow-btn arrow-btn" onClick={() => setStartIndex((prev) => prev - 1)}>
              <NavigateBeforeIcon />
            </IconButton>
          )}
          <div className="outer-money-pots-cont" ref={moneyPotContRef}>
            <div
              className={`dyanimic-money-pots-cont`}
              ref={moneyPotContRef}
              style={{ left: -(startIndex * transactionDistance) }}
            >
              {moneyPots.map((moneyPot) => {
                return <MoneyPot moneyPot={moneyPot} handleClick={handleItemSelect} key={moneyPot.id}/>;
              })}
            </div>
          </div>
          {itemsInView + startIndex < moneyPots.length && (
            <IconButton className="next-arrow-btn arrow-btn" onClick={() => setStartIndex((prev) => prev + 1)}>
              <NavigateNextIcon />
            </IconButton>
          )}
        </div>
      )}
    </>
  );
};

export default MoneyPotsListing;
