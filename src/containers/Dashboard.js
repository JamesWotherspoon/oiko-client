import Overview from './Overview';
import Categories from './Categories';
import ItemCard from '../sharedComponents/ItemCard';
import Transactions from './Transactions';
import ScheduledActions from './ScheduledActions';
import MoneyPots from './MoneyPots';
import TransactionsListing from '../components/TransactionListing';
import MoneyPotsListing from '../components/MoneyPotsListing';
import ScheduledActionsListing from '../components/ScheduledActionsListing';
import CategoryListing from '../components/CategoryListing';

const Dashboard = () => {
  return (
    <main id="home">
      <div className="misc-panel-cont">
        <ItemCard className="overview-panel" title="Overview">
          <Overview />
        </ItemCard>
        <ItemCard className="scheduled-action-listing" title="Scheduled Action" link={"/scheduled-actions"}>
          <ScheduledActionsListing />
        </ItemCard>
        <ItemCard className="category-listing" title="Category" link={"/categories"}>
          <CategoryListing />
        </ItemCard>
        <ItemCard className="money-pot-listing" title="Accounts" link={"/accounts"}>
          <MoneyPotsListing />
        </ItemCard>
      </div>
      <ItemCard className="transaction-listing" title="Transactions" link={"/transactions"}>
        <TransactionsListing />
      </ItemCard>
    </main>
  );
};

export default Dashboard;
