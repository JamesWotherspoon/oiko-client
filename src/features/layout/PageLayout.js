import { HorizontalFlexBox, VerticalFlexBox } from '../../styles/SharedStyles';
import Footer from '../Footer/Footer';
import TopBar from '../Header/TopBar';
import TransactionsCard from '../Transaction/Transactions';
import Overview from '../Overview/Overview';
import MoneyPotDisplay from '../moneyPot/MoneyPots';
import Categories from '../Categories/Categories';
import ItemCard from '../../sharedComponents/ItemCard';
import ScheduledAction from '../ScheduledAction/ScheduledAction';
import AddTransaction from '../Transaction/AddTransaction';
import { useState } from 'react';
import Nav from '../Header/Nav';
import AddCategory from '../Categories/AddCategory';
import AddMoneyPot from '../moneyPot/AddMoneyPot';
import AddScheduledAction from '../ScheduledAction/AddScheduledAction';

const PageLayout = () => {
  return (
    <div id="page">
      <header>
        <TopBar />
        <Nav />
      </header>
      <main id="home">
        <div className="misc-panel-cont">
          <ItemCard className="overview-panel" title="Overview">
            <Overview />
          </ItemCard>
          <ItemCard className="scheduled-panel" title="Upcoming Transactions" modalContent={<AddScheduledAction />}>
            <ScheduledAction />
          </ItemCard>
          <ItemCard className="category-panel" title="categories" modalContent={<AddCategory />}>
            <Categories />
          </ItemCard>
          <ItemCard className="account-panel" title="Account" modalContent={<AddMoneyPot />}>
            <MoneyPotDisplay />
          </ItemCard>
        </div>
        <ItemCard className="transaction-panel" title="Transactions" modalContent={<AddTransaction />}>
          <TransactionsCard />
        </ItemCard>
      </main>
      <footer></footer>
    </div>
  );
};

export default PageLayout;
