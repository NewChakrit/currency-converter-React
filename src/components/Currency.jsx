import React from "react";
import "./Currency.css";

const Currency = ({
  currencyChoices,
  selectCurrency,
  changeCurrency,
  amount,
  onChangeAmount,
}) => {
  return (
    <div className="currency">
      <select value={selectCurrency} onChange={changeCurrency}>
        {currencyChoices.map((item, index) => {
          return (
            <option key={index} value={item}>
              {item}
            </option>
          );
        })}
      </select>

      <input type="number" onChange={onChangeAmount} value={amount} />
    </div>
  );
};

export default Currency;
