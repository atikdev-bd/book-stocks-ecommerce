import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loader from "../../../Pages/Shared/Loader/Loader";

const AllSellers = () => {
  const {
    data: sellers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["sellers"],
    queryFn: async () => {
      const res = await fetch(
        "https://assignment-12-server-side-atikdev-bd.vercel.app/sellers"
      );
      const data = await res.json();
      return data;
    },
  });

  const handleDelete = (id) => {
    fetch(
      `https://assignment-12-server-side-atikdev-bd.vercel.app/seller/${id}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        refetch();
      });
  };

  const handleVerify = (id) => {
    fetch(
      `https://assignment-12-server-side-atikdev-bd.vercel.app/verify/${id}`
    )
      .then((res) => res.json())
      .then((data) => {});
  };

  if (isLoading) {
    return <Loader></Loader>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Account</th>
            <th>Account status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sellers.map((seller, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>{seller?.name}</td>
              <td>{seller?.email}</td>
              <td>{seller?.role}</td>
              <td>
                {!seller?.verified ? (
                  <button
                    onClick={() => handleVerify(seller._id)}
                    className="btn btn-xs btn-primary"
                  >
                    Verify
                  </button>
                ) : (
                  <button
                    disabled
                    className="btn btn-xs bg-green-500 text-white "
                  >
                    verified
                  </button>
                )}
              </td>
              <td>
                <button
                  onClick={() => handleDelete(seller._id)}
                  className="btn btn-xs btn-warning"
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

export default AllSellers;
