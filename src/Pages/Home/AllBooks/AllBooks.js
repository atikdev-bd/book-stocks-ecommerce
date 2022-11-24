import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AllBook from "./AllBook";

const AllBooks = () => {
  const { id } = useParams();
  //   const [books, setBooks] = useState([]);
  const [categoryBook, setCategoryBook] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/category")
      .then((res) => res.json())
      .then((data) => {
        const filterData = data?.filter((b) => b.categoryId === id);
        setCategoryBook(filterData);
      });
  }, [id]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mx-8">
      {categoryBook?.map((book) => (
        <AllBook key={book._id} book={book}></AllBook>
      ))}
    </div>
  );
};

export default AllBooks;
