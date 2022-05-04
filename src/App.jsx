import { useEffect, useState } from "react";
import "./App.css";
import Currency from "./components/Currency";
import money from "./img/money.png";

function App() {
  const [currencyChoices, setCurrencyChoices] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("THB");
  const [toCurrency, setToCurrency] = useState("USD");

  const [amount, setAmount] = useState(1);
  const [exchangeRate, setExchangeRate] = useState(0);

  useEffect(() => {
    const apiUrl = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setCurrencyChoices([...Object.keys(data.rates)]);
        setExchangeRate(data.rates[toCurrency]);
      });
  }, [fromCurrency, toCurrency]);

  const [checkFromCurrency, setCheckFromCurrency] = useState(true);

  let fromAmount, toAmount;

  if (checkFromCurrency) {
    fromAmount = amount;
    toAmount = (amount * exchangeRate).toFixed(2);
  } else {
    toAmount = amount;
    fromAmount = (amount / exchangeRate).toFixed(2);
  }

  const amountFromCurrency = (e) => {
    setAmount(e.target.value);
    setCheckFromCurrency(true);
  };

  const amountToCurrency = (e) => {
    setAmount(e.target.value);
    setCheckFromCurrency(false);
  };

  return (
    <div className="App">
      <img src={money} alt="logo" className="money-img" />
      <h1>Currency Converter (API)</h1>
      <div className="container">
        <Currency
          currencyChoices={currencyChoices}
          selectCurrency={fromCurrency}
          changeCurrency={(e) => setFromCurrency(e.target.value)}
          amount={fromAmount}
          onChangeAmount={amountFromCurrency}
        />
        <div className="equal"> = </div>
        <Currency
          currencyChoices={currencyChoices}
          selectCurrency={toCurrency}
          changeCurrency={(e) => setToCurrency(e.target.value)}
          amount={toAmount}
          onChangeAmount={amountToCurrency}
        />
      </div>
    </div>
  );
}

export default App;
