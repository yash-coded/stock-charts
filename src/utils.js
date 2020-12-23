export function getData(symbol) {
  const key = process.env.REACT_APP_KEY;
  const priceData = fetch(
    `https://fmpcloud.io/api/v3/historical-price-full/${symbol}?apikey=${key}`
  ).then((response) => response.json());
  return priceData;
}

// export function getTickers(ticker) {
//   const tickers = fetch(
//     `https://fmpcloud.io/api/v3/search?query=${ticker}&limit=10&exchange=NASDAQ&apikey=f801dd797dcc0668a4005338ac1f13b8`
//   ).then((response) => response.json());
//   return tickers;
// }
