import { StyledPageBox, StyledContentBox } from './LoggedInLayoutStyles';
import SideNav from '../sideNav/SideNav';

const LoggedInLayout = ({ children }) => (
  <StyledPageBox>
    <SideNav />
    <StyledContentBox>
      {children}
    </StyledContentBox>
  </StyledPageBox>
);

export default LoggedInLayout;
