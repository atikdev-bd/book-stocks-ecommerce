import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../../Context/AuthProvider/AuthProvider";
import Loader from "../../../Pages/Shared/Loader/Loader";

const MyProducts = () => {
  const { user } = useContext(AuthContext);
  const name = user?.displayName;

  const {
    data: books,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const res = await fetch(
        `https://assignment-12-server-side-atikdev-bd.vercel.app/books?name=${name}`
      );
      const data = res.json();

      return data;
    },
  });

  const handleDelete = (id) => {
    fetch(
      `https://assignment-12-server-side-atikdev-bd.vercel.app/books/${id}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        refetch();
      });
  };

  const handleAdvertise = (id) => {
    fetch(
      `https://assignment-12-server-side-atikdev-bd.vercel.app/books/${id}`,
      {
        method: "PUT",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        refetch();
      });
  };

  if (isLoading) {
    return <Loader></Loader>;
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
            <th>Sale status</th>
            <th>Advertise</th>
            <th>Action</th>
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
              <td>
                {!book?.sold ? (
                  <button className="btn btn-sm btn-accent">Available</button>
                ) : (
                  <button disabled className="btn btn-sm btn-accent">
                    Stock out
                  </button>
                )}
              </td>
              <td>
                {!book?.isAdvertise ? (
                  <button
                    onClick={() => handleAdvertise(book?._id)}
                    className="btn btn-sm btn-accent"
                  >
                    Advertise
                  </button>
                ) : book?.sold ? (
                  <button disabled className="btn btn-xs btn-primary">
                    Sold
                  </button>
                ) : (
                  <button disabled className="btn btn-xs btn-primary">
                    Advertise run
                  </button>
                )}
              </td>
              <td>
                <button
                  onClick={() => handleDelete(book?._id)}
                  className="btn btn-sm btn-warning"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyProducts;
