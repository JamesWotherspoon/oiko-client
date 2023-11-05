import { MainLayoutStyle, StyledContentContainer } from './MainStyles';
import { HorizontalFlexBox } from '../../styles/SharedStyles';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import TransactionsCard from '../Transaction/Transactions';
import Overview from '../Overview/Overview';
import MoneyPotDisplay from '../moneyPot/MoneyPotDisplay';
import Categories from '../Categories/Categories';
import ItemCard from '../../sharedComponents/ItemCard';
import ScheduledAction from '../ScheduledAction/ScheduledAction';

const MainLayout = () => (
  <MainLayoutStyle>
    <Header />
    <StyledContentContainer>
      <HorizontalFlexBox>
        <ItemCard title="Overview" minWidth="30%">
          <Overview />
        </ItemCard>
        <ItemCard title="Upcoming Transactions" minWidth="30%" includeAddButton>
          <ScheduledAction />
        </ItemCard>
        <ItemCard title="categories" minWidth="30%" includeAddButton>
          <Categories />
        </ItemCard>
        <ItemCard title="Money Pot X" minWidth="40%">
          <MoneyPotDisplay />
        </ItemCard>
        <ItemCard title="Money Pot X" minWidth="40%">
          <MoneyPotDisplay />
        </ItemCard>
      </HorizontalFlexBox>
      <ItemCard title="Transactions" minWidth="30%" includeAddButton>
        <TransactionsCard />
      </ItemCard>
    </StyledContentContainer>
    <Footer />
  </MainLayoutStyle>
);

export default MainLayout;
