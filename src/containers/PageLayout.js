import { HorizontalFlexBox, VerticalFlexBox } from '../styles/SharedStyles';
import Footer from '../components/Footer';
import TopBar from '../components/TopBar';
import TransactionsCard from '../features/Transaction/Transactions';
import Overview from '../features/Overview/Overview';
import MoneyPotDisplay from '../features/moneyPot/MoneyPots';
import Categories from '../features/Categories/Categories';
import ItemCard from '../sharedComponents/ItemCard';
import ScheduledAction from '../features/ScheduledAction/ScheduledAction';
import AddTransaction from '../features/Transaction/AddTransaction';
import { useState } from 'react';
import Nav from '../components/Nav';
import AddCategory from '../features/Categories/AddCategory';
import AddMoneyPot from '../features/moneyPot/AddMoneyPot';
import AddScheduledAction from '../features/ScheduledAction/AddScheduledAction';
import Transactions from './Transactions';

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
          <ItemCard className="category-panel" title="Categories" modalContent={<AddCategory />}>
            <Categories />
          </ItemCard>
          <ItemCard className="account-panel" title="Account" modalContent={<AddMoneyPot />}>
            <MoneyPotDisplay />
          </ItemCard>
        </div>
        <Transactions />
      </main>
      <footer></footer>
    </div>
  );
};

export default PageLayout;
