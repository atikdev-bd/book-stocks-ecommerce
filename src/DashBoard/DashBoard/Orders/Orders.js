import { useQuery } from "@tanstack/react-query";
import React from "react";

const Orders = () => {
  const {data : orders = []}= useQuery({
    queryKey : ['orders'],
    queryFn : async ()=>{
        const res = await fetch('http://localhost:5000/orders')
        const data = await res.json()
         return data
    }
  })
  return (
    <>
    <h1 className="text-2xl font-semibold ml-4 mt-10 mb-2">My Orders</h1>
    <div className="overflow-x-auto">
    <table className="table table-zebra w-full">
      <thead>
        <tr>
          <th></th>
          <th>Book</th>
          <th>Price</th>
          <th>Favorite Color</th>
        </tr>
      </thead>
      <tbody>
          {
              orders.map((order , index) =><tr
              key={index}
              >
              <th>{index + 1}</th>
              <td>{order.bookName}</td>
              <td>{order.price}</td>
              <td>Blue</td>
            </tr> )
          }
        
      </tbody>
    </table>
  </div></>
  );
};

export default Orders;
