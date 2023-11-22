import React, { useRef, useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

const DynamicList = ({ itemList }) => {
  const firstItemRef = useRef(null);
  const [itemWidth, setItemWidth] = useState(0);
  const [numDisplayItems, setNumDisplayItems] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);

  useEffect(() => {
    if (firstItemRef.current) {
        console.log(firstItemRef.current.clientWidth)
      const { clientWidth } = firstItemRef.current;

      setItemWidth(clientWidth);
      setNumDisplayItems(Math.floor(firstItemRef.current.parentElement.clientWidth / clientWidth));
    }
  }, [firstItemRef, setItemWidth, setNumDisplayItems]);


  return (
    <div className="">
      {displayIndex > 0 && (
        <IconButton onClick={() => setDisplayIndex((prev) => prev - 1)} className='previous-arrow-btn arrow-btn'>
          <NavigateBeforeIcon />
        </IconButton>
      )}
      <div className='items-container' style={{ width: numDisplayItems * itemWidth }}>
        {itemList.map((item, index) => (
          <div key={index} className='item' ref={index === 0 ? firstItemRef : null}>
            {item}
          </div>
        ))}
      </div>
      {displayIndex + numDisplayItems < itemList.length && (
        <IconButton onClick={() => setDisplayIndex((prev) => prev + 1)} className='next-arrow-btn arrow-btn'>
          <NavigateNextIcon />
        </IconButton>
      )}
    </div>
  );
};

export default DynamicList;
