import React from "react";
import './BookCategory.css'

import img1 from '../../../Assets/BookCategories/img (1).jpg'
import img2 from '../../../Assets/BookCategories/img (2).jpg'
import img3 from '../../../Assets/BookCategories/img (3).jpg'
import img4 from '../../../Assets/BookCategories/img (4).jpg'

const BookCategory = ({books}) => {
  const {img, name} = books
  console.log(books)
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
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCategory;
