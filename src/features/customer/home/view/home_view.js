import React from "react";
import BestSellers from "features/customer/home/view/components/best_sellers";
import Hero from "features/customer/home/view/components/hero";
import LatestCollections from "features/customer/home/view/components/latest_collections";
import Policies from "./components/policies";
import HomeFooter from "components/footers/home_footer";

const HomeView = () => {
  return (
    <div>
      <Hero />
      <LatestCollections />
      <BestSellers />
      <Policies />
      <HomeFooter />
    </div>
  );
};

export default HomeView;
