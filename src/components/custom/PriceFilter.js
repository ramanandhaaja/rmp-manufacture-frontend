// PriceFilter.js
import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { formatCurrency } from 'components/ui/utils/formatCurrency';

const PriceFilter = ({
  onFilterChange,
  priceRange,
  maxPrice = 100000000
}) => {

  //   const handleSliderChange = (range) => {
  //     onFilterChange(range);
  //   };


  return (
    <div className='flex flex-col gap-1 flex-1 pr-3'>
      <Slider
        range
        min={0}
        trackStyle={{ backgroundColor: '#037DC3', height: '8px' }}
        handleStyle={{ borderColor: '#037DC3', backgroundColor: 'white', height: '16px', width: '16px' }}
        max={maxPrice}
        defaultValue={[0, maxPrice]}
        value={priceRange}
        onChange={(range) => onFilterChange(range)}
      />
      <p className='text-main-100 text-xs mt-3 flex justify-between'>
        <div>
          IDR {formatCurrency(priceRange[0])}
        </div>
        <div>
          IDR {formatCurrency(priceRange[1])}
        </div>
      </p>
    </div>
  );
};

export default PriceFilter;
