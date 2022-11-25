import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../../Context/AuthProvider/AuthProvider";
import Loader from "../../../Pages/Shared/Loader/Loader";

const MyProducts = () => {
  const { user } = useContext(AuthContext);
  const name = user?.displayName;
  console.log(name);

  const { data: books , isLoading } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/books?name=${name}`);
      const data = res.json();
      console.log(data);
      return data;
    },
  });

  if(isLoading){
    return <Loader></Loader>
  }

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>Books Photo</th>
            <th>Books</th>
            <th>Price</th>
            <th>Seller Name</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>
                <div className="avatar">
                  <div className="w-20 rounded-xl">
                    <img src={book.img} alt="" />
                  </div>
                </div>
              </td>
              <td>{book.name}</td>
              <td>{book.resalePrice}</td>
              <td>{book.sellerName}</td>
              <td>{book.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyProducts;
