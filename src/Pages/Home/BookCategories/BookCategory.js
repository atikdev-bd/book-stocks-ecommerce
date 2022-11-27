import React from "react";
import './BookCategory.css'

import { Link } from "react-router-dom";

const BookCategory = ({books}) => {
  const {img, name,id} = books
  return (
    <div>
      <div className="card category-card bg-base-100 shadow-xl image-full">
        <figure>
          <img  src={img} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-2xl font-semibold">{name}</h2>
          <p></p>
          <div className="card-actions justify-end">
         <Link to={`category/${id}`}> <button className="btn glass btn-sm">Click and buy</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCategory;
