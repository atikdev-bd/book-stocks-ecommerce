import React from "react";
import './BookCategory.css'

import img1 from '../../../Assets/BookCategories/img (1).jpg'
import img2 from '../../../Assets/BookCategories/img (2).jpg'
import img3 from '../../../Assets/BookCategories/img (3).jpg'
import img4 from '../../../Assets/BookCategories/img (4).jpg'
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
