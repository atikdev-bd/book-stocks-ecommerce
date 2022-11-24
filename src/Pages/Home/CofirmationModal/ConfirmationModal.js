import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../Context/AuthProvider/AuthProvider";

const ConfirmationModal = ({ setBookInfo, bookInfo }) => {
  const { user } = useContext(AuthContext);

  console.log(bookInfo);
  //  const {name, price ,} = bookInfo
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const buyerName = form.buyerName.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const price = form.price.value;
    const order = {
      BuyerName: buyerName,
      bookName: name,
      price: price,
      email: email,
      phone: phone,
    };
    console.log(order)
    setBookInfo(null);
    fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.acknowledged) {
          setBookInfo(null);
          toast.success("successfully");
        }
      });
  };

  return (
    <div>
      {/* The button to open modal */}

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="bg-gray-600 border  rounded">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-4 px-8  py-4"
          >
            <input
              type="text"
              name="name"
              disabled
              value={bookInfo?.name}
              className="input  border-none rounded-md w-full"
            />
            <input
              type="text"
              name="price"
              disabled
              value={bookInfo?.resalePrice}
              className="input  border-none rounded-md w-full"
            />
            <input
              defaultValue={user?.displayName}
              disabled
              type="text"
              name="buyerName"
              placeholder="Full Name"
              className="input input-bordered w-full"
            />

            <input
              defaultValue={user?.email}
              disabled
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              className="input input-bordered w-full"
            />

            <input
              type="submit"
              value="Submit"
              className="btn btn-accent w-full"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
