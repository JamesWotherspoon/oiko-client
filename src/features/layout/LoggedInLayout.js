import { StyledBox } from './LoggedInLayoutStyles'
import SideNav from '../sideNav/SideNav';

const LoggedInLayout = ({ children }) => (
  <StyledBox>
    <SideNav />
    {children}
  </StyledBox>
);

export default LoggedInLayout;
