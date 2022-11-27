import React from "react";
import AdvertiseSection from "../AdvertiseSection/AdvertiseSection";
import Banner from "../Banner/Banner";
import BookCategories from "../BookCategories/BookCategories";




const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <BookCategories></BookCategories>
      <AdvertiseSection></AdvertiseSection>
    </div>
  );
};

export default Home;
