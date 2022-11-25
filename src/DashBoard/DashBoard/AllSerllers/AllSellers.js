import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loader from "../../../Pages/Shared/Loader/Loader";

const AllSellers = () => {
  const { data: sellers = [], isLoading } = useQuery({
    queryKey: ["sellers"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/sellers");
      const data = await res.json();
      return data;
    },
  });

  if(isLoading){
    return <Loader></Loader>
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
          {sellers.map((seller, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>{seller?.name}</td>
              <td>{seller?.email}</td>
              <td>{seller?.role}</td>
              <td>Blue</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllSellers;
