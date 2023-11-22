import Overview from './Overview';
import Categories from './Categories';
import ItemCard from '../sharedComponents/ItemCard';
import TransactionsListing from '../components/TransactionsListing';
import MoneyPotsListing from '../components/MoneyPotsListing';
import ScheduledActionsListing from '../components/ScheduledActionsListing';
import CategoryListing from '../components/CategoryListing';

const Dashboard = () => {
  const accountSubtitle =
    "Effortlessly manage your accounts. Whether it's adding new ones or editing existing ones, Explore account options";
  const transactionSubtitle =
    'Effortlessly add, edit, and categorize transactions for a real-time overview of your financial journey.';
  const categoriesSubtitle =
    "Customize and organize your expenses with precision using Oiko's Categories feature. Effortlessly categorize transactions to gain a deeper understanding of your spending habits and financial patterns.";
  const scheduledActionSubtile =
    "Stay ahead of your finances by scheduling recurring transactions effortlessly. From regular incomes to planned expenses, Oiko's Scheduled Actions feature ensures a smooth and automated financial experience tailored to your needs.";
  return (
    <main id="home">
      <div className="top-section">
        <div className="top-section-main">
          <Overview />
          <ItemCard className="account-panel" title="Accounts" subtitle={accountSubtitle}>
            <MoneyPotsListing />
          </ItemCard>
        </div>
        <ItemCard
          link={'/transactions'}
          className={'transaction-card'}
          subtitle={transactionSubtitle}
        >
          <TransactionsListing />
        </ItemCard>
      </div>
      <div className="bottom-home-section">
      <ItemCard className="category-panel" title="Category" link={'/categories'} subtitle={categoriesSubtitle}>
          <CategoryListing />
        </ItemCard>
        <div className='seperation-line'></div>
        <ItemCard
          className="scheduled-action-panel"
          title="Scheduled Action"
          link={'/scheduled-actions'}
          subtitle={scheduledActionSubtile}
        >
          <ScheduledActionsListing />
        </ItemCard>

      </div>
    </main>
  );
};

export default Dashboard;
