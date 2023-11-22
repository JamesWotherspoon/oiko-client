import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { chartDataSlice, transactionSlice } from '../utils/slices';
import { Bar } from 'react-chartjs-2';
import { format, getDaysInMonth, startOfMonth, endOfMonth, parseISO } from 'date-fns';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { getMonthFromIndex, isEmptyObject } from '../utils/helpers';
import { addMonths } from 'date-fns';
import { IconButton } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const options = {
  responsive: true,
  width: 800,
  height: 700,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
      ticks: {
        callback: (value) => `£${value}`,
      },
    },
  },
};

const MonthlyChart = ({ moneyPotId = null }) => {
  const dispatch = useDispatch();
  const chartName = moneyPotId ? `moneyPot-${moneyPotId}` : 'allMoneyPots';
  const data = useSelector((state) => state.chartData.data[chartName]);
  const date = new Date();
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);

  const changeSelectedMonth = (month, year, adjustment) => {
    const selectedMonthDateFormat = new Date(year, month, 1);
    const newMonthDate = addMonths(selectedMonthDateFormat, adjustment);
    const newMonth = newMonthDate.getMonth();
    const newYear = newMonthDate.getFullYear();
    setMonth(newMonth);
    setYear(newYear);
  };

  useEffect(() => {
    const params = {
      moneyPotId: moneyPotId,
      month: month,
      year: year,
    };
    dispatch(chartDataSlice.fetchResources(params));
  }, [month, year, moneyPotId, dispatch]);

  return (
    <div className='chart-container'>
      <div className="chart-header">
        <IconButton onClick={() => changeSelectedMonth(month, year, -1)}>
          <NavigateBeforeIcon />
        </IconButton>
        <p>{getMonthFromIndex(month)}</p>
        <IconButton onClick={() => changeSelectedMonth(month, year, 1)}>
          <NavigateNextIcon />
        </IconButton>
      </div>
      {data && !isEmptyObject(data) && <Bar options={options} data={data} />}
    </div>
  );
};

export default MonthlyChart;
