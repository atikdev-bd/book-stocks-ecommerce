import React from "react";
import { Link } from "react-router-dom";

const Advertise = ({ Advertise }) => {
  console.log(Advertise);
  const { name, resalePrice, categoryId, img } = Advertise;
  return (
    <div>
      <div className="card w-96 bg-base-300 shadow-xl">
        <figure className="px-4 pt-4">
          <img src={img} alt="Shoes" className="rounded-xl w-full h-80" />
        </figure>
        <div className="card-body">
          <h1>Book Name : {name}</h1>
          <p> Category : {categoryId}</p>
          <p> Book Price :{resalePrice}</p>
        </div>

        <button className="btn btn-active rounded-none btn-secondary hover:bg-teal-600">
          {" "}
          <Link to={`category/${categoryId}`}> Buy here</Link>
        </button>
      </div>
    </div>
  );
};

export default Advertise;
