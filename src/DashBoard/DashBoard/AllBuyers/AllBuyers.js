import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loader from "../../../Pages/Shared/Loader/Loader";

const AllBuyers = () => {
  const { data: buyers = [], isLoading } = useQuery({
    queryKey: ["buyers"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/buyers");
      const data = await res.json();
      return data;
    },
  });

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
              <td>Blue</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllBuyers;