import GroceriesSvg from '@mui/icons-material/LocalGroceryStore';
import ClothesSvg from '@mui/icons-material/ShoppingBag';
import DiningSvg from '@mui/icons-material/Restaurant';
import DrinksSvg from '@mui/icons-material/LocalBar';
import PetsSvg from '@mui/icons-material/Pets';
import HolidaysSvg from '@mui/icons-material/Flight';
import CommuteSvg from '@mui/icons-material/DirectionsCar';
import DefaultSvg from '@mui/icons-material/Category';
import RentSvg from '@mui/icons-material/HouseSiding';
import BillsSvg from '@mui/icons-material/Water';
import EntertainmentSvg from '@mui/icons-material/Theaters';
import HealthSvg from '@mui/icons-material/LocalHospital';
import GiftsSvg from '@mui/icons-material/CardGiftcard';

export function sanitizePayload(payload, keysToRemove, { removeEmptyString = true, removeNull = true } = {}) {
  return Object.entries(payload).reduce((acc, [key, value]) => {
    if (keysToRemove.includes(key) && ((removeEmptyString && value === '') || (removeNull && value === null))) {
      return acc;
    }
    acc[key] = value;
    return acc;
  }, {});
}

export const validateHelper = (schemaValidate, data) => {
  const valid = schemaValidate(data);
  let errors = {};

  if (!valid) {
    console.log(schemaValidate.errors);
    errors = schemaValidate.errors.reduce((accumulator, error) => {
      let key = error.instancePath.slice(1);
      if (!key) {
        key = error.params.missingProperty || 'unknown';
      }
      accumulator[key] = error.message;
      return accumulator;
    }, {});
  }
  return { valid, errors };
};

export const generateUniqueKey = () => {
  return Math.random().toString(36).substring(1, 9);
};

export const categoryIconColorMapping = (iconIdentifier, color) => {
  const svgComponents = {
    groceries: <GroceriesSvg />,
    clothes: <ClothesSvg />,
    dining: <DiningSvg />,
    drinks: <DrinksSvg />,
    pets: <PetsSvg />,
    holidays: <HolidaysSvg />,
    commute: <CommuteSvg />,
    rent: <RentSvg />,
    bills: <BillsSvg />,
    default: <DefaultSvg />,
    miscellaneous: <DefaultSvg />,
    gifts: <GiftsSvg />,
    entertainment: <EntertainmentSvg />,
    health: <HealthSvg />
  };

  const svgComponent = svgComponents[iconIdentifier] || svgComponents.default;

  return (
    <div className={`category-icon`} style={{ backgroundColor: color }}>
      {svgComponent}
    </div>
  );
};

export const getMonthFromIndex = (monthIndex) => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return monthNames[monthIndex];
};

export const isEmptyObject = (obj) => {
  if(!obj) return false
  return Object.keys(obj).length === 0;
};
