const MoneyPot = ({ moneyPot, handleClick }) => {
  return (
    <div className={`money-pot-cont`} key={moneyPot.id}>
      <div className="secondary-circle" onClick={() => handleClick(moneyPot)}>
        <p className="pot-name">{moneyPot.name}</p>
        <h4 className="pot-balance">
          {moneyPot.balanceType === 'negative' && '-'} £{moneyPot.balance}
        </h4>
      </div>
    </div>
  );
};

export default MoneyPot;
