"use client";

import { useEffect, useState } from "react";

const MarketPage = ({ params: { id } }) => {
  const [market, setMarket] = useState({});
  useEffect(() => {
    fetch(`/api/markets/${id}`).then((response) => {
      response.json().then((data) => {
        setMarket(data);
      });
    });
  }, []);

  return <div>{JSON.stringify(market)}</div>;
};

export default MarketPage;
