import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthProvider/AuthProvider";
import Loader from "../../../Pages/Shared/Loader/Loader";

const Orders = () => {
  const { user } = useContext(AuthContext);

  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await fetch(
        `https://assignment-12-server-side-atikdev-bd.vercel.app/orders?email=${user.email}`
      );
      const data = await res.json();
      return data;
    },
  });

  const handleDelete = (id) => {
    fetch(
      `https://assignment-12-server-side-atikdev-bd.vercel.app/orders/${id}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        refetch();
        toast.success('Delete successfully')
      });
  };

  if (isLoading) {
    return <Loader></Loader>;
  }
  return (
    <>
      {orders?.length ? (
        <>
          <h1 className="text-2xl font-semibold ml-4 mt-2 my-2">My Orders</h1>
          <div className="overflow-x-auto my-8">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th></th>
                  <th>Book</th>
                  <th>Price</th>
                  <th>Payment</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{order.bookName}</td>
                    <td>{order.price}</td>
                    <td>
                      {!order.sold ? (
                        <Link to={`/dashboard/payment/${order._id}`}>
                          {" "}
                          <button className="btn btn-xs btn-primary">
                            Pay
                          </button>
                        </Link>
                      ) : (
                        <button className="btn btn-xs btn-success">paid</button>
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(order._id)}
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
        </>
      ) : (
        <>
          {" "}
          <div className="flex justify-center items-center">
            <p className="text-slate-900 text-2xl font-semibold">
              You have no orders:
            </p>
            <button className="btn text-emerald-500 btn-active btn-link">
              <Link to="/">Order Here</Link>
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Orders;
