// import { config } from "dotenv";
import "./App.css";
import React from "react";
import { useState, useEffect } from "react";
import Chart from "./Chart";
import { TypeChooser } from "react-stockcharts/lib/helper";
import { getData } from "./utils";

function App() {
  const [price, setData] = useState(null);
  const [symbol, setSymbol] = useState("msft");

  useEffect(() => {
    getData(symbol).then((data) => {
      const newData = data.historical;
      newData.reverse();
      for (let i = 0; i < newData.length; i++) {
        newData[i].date = new Date(`${newData[i].date} 00:00:00`);
      }
      setData(newData);
      console.log(newData);
    });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    getData(symbol).then((data) => {
      const newData = data.historical;
      newData.reverse();
      for (let i = 0; i < newData.length; i++) {
        newData[i].date = new Date(`${newData[i].date} 00:00:00`);
      }
      setData(newData);
      console.log(newData);
    });
  };
  return (
    <div className="bg-gray-900">
      <div
        className=" bg-gray-900 sticky top-0 flex items-center w-screen "
        // style={{
        //   width: window.innerWidth,
        // }}
      >
        <p className="text-white lg:text-base text-xs ml-4  hidden md:block">
          Search a listed company by it's Symbol
        </p>
        <p className="text-white  w-1/2   ml-2  md:hidden">Search a Symbol</p>
        <form onSubmit={handleSubmit}>
          <input
            value={symbol.toUpperCase()}
            onChange={(e) => setSymbol(e.target.value)}
            placeholder="Enter a Symbol"
            className="bg-gray-700 lg:p-2 p-1 lg:ml-8 w-1/3  outline-none border-gray-500 text-gray-300 my-2 rounded-md "
          />
          <button
            type="submit"
            className="border border-gray-700 text-white lg:py-2 lg:px-4 p-1  rounded-md lg:ml-8 ml-4 hover:bg-gray-700 outline-none"
          >
            Search
          </button>
        </form>
        <p className="text-white ml-auto text-xs mr-2 hidden md:block">
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
