// import { config } from "dotenv";
import "./App.css";
import React from "react";
import { useState, useEffect } from "react";
import Chart from "./Chart";
import { TypeChooser } from "react-stockcharts/lib/helper";
import { getData } from "./utils";

function App() {
  const [price, setData] = useState(null);
  const [symbol, setSymbol] = useState("aapl");

  useEffect(() => {
    getData(symbol).then((data) => {
      const newData = data.historical;
      newData.reverse();
      setData(newData);
      console.log(newData);
    });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    getData(symbol).then((data) => {
      const newData = data.historical;
      newData.reverse();
      setData(newData);
      console.log(newData);
    });
  };
  return (
    <div>
      <div
        className=" bg-gray-900 sticky top-0 flex items-center w-screen"
        // style={{
        //   width: window.innerWidth,
        // }}
      >
        <p className="text-white lg:text-base text-xs ml-4 flex-wrap">
          Search a Stock by Symbol
        </p>
        <form onSubmit={handleSubmit}>
          <input
            value={symbol.toUpperCase()}
            onChange={(e) => setSymbol(e.target.value)}
            placeholder="Enter a Symbol"
            className="bg-gray-700 p-2 ml-8 outline-none border-gray-500 text-gray-300 my-2 rounded-md "
          />
          <button
            type="submit"
            className="border border-gray-700 text-white py-2 px-4 rounded-md ml-8 hover:bg-gray-700 outline-none"
          >
            Search
          </button>
        </form>
        <p className="text-white ml-auto text-xs mr-2">
          *Stock Data is only available in Daily Timeframe as of now
        </p>
      </div>
      <div className="App" style={{}}>
        {price ? <Chart data={price} /> : <div>Loading..</div>}
      </div>
    </div>
  );
}

export default App;
