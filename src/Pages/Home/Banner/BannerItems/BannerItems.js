import React from "react";
import img from "../../../../Assets/img/kourosh-qaffari-RrhhzitYizg-unsplash.jpg";
import './BannerItems.css'

const BannerItems = () => {
  return (
    <div className="top-banner rounded-md">
      <div className="hero min-h-screen bg-stone-50">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img className="rounded h-[500px] md:h-[650px] lg:h-[700px] w-full border p-4 border-gray-800 bg-slate-500" src={img} alt="" />

          <div>
            <h1 className="text-5xl font-bold">Education is the backbone of the nation !</h1>
            <p className="py-6 text-xl font-bold">
            Knowledge There is no alternative to reading our books to gain immense knowledge for every human being. so why join then hold on to books. Books are our friends.
            </p>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerItems;
