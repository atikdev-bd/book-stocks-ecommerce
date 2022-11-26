import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../../Pages/Shared/Loader/Loader";

const AllBuyers = () => {
  const {
    data: buyers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["buyers"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/buyers");
      const data = await res.json();
      return data;
    },
  });

  const handleDelete = (id) => {

    fetch(`http://localhost:5000/buyers/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged === true){
            toast.success('delete successfully')
        }
         refetch();
       
      });
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {buyers.map((buyer, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>{buyer?.name}</td>
              <td>{buyer?.email}</td>
              <td>{buyer?.role}</td>
              <td>
                <button
                  onClick={() => handleDelete(buyer._id)}
                  className="btn btn-xs btn-warning"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Toaster></Toaster>
    </div>
  );
};

export default AllBuyers;
