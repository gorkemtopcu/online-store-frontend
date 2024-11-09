import BestSellers from "features/customer/home/components/best_sellers";
import Hero from "features/customer/home/components/hero";
import LatestCollections from "features/customer/home/components/latest_collections";
import React from "react";

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollections />
      <BestSellers />
    </div>
  );
};

export default Home;
