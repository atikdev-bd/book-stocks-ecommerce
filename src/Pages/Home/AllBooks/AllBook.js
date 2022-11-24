import React from "react";


const AllBook = ({ book , setBookInfo}) => {
  const { name, img, resalePrice, originalPrice, useTime, sellerName,location } = book;
  return (
    <div>
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure>
          <img className=" w-80 lg:w-60 h-80" src={img} alt="Album" />
        </figure>
        <div className="card-body bg-zinc-200">
          <h2 className="card-title">{name}</h2>
          <div>
            <p className="m-0 p-0">Original Price : {originalPrice}</p>
            <p className="m-0 p-0">Resale Price : {resalePrice}</p>
            <p>Use Time : {useTime}</p>
          </div>

          <div>
          <span>Seller Name : {sellerName}</span>
          <p>Location : {location}</p>
          </div>

          <div className="card-actions justify-end">
            <label onClick={()=>setBookInfo(book)} htmlFor="my-modal"  className="btn btn-primary">Buy now</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBook;
