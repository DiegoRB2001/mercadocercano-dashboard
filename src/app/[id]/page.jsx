"use client";

import MainLayout from "@/components/MainLayout";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const MarketPage = ({ params: { id } }) => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/signin");
    },
  });
  const [market, setMarket] = useState({});
  useEffect(() => {
    fetch(`/api/markets/${id}`).then((response) => {
      response.json().then((data) => {
        setMarket(data);
      });
    });
  }, []);

  return (
    <MainLayout>
      <div>{JSON.stringify(market)}</div>
    </MainLayout>
  );
};

export default MarketPage;
