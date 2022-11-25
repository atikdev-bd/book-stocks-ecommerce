import React from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// import toast from "react-hot-toast";
// import { Navigate } from "react-router-dom";

const AddProducts = () => {
  const imgHostKey = process.env.REACT_APP_imbb_key;

  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const bookInfo = (data) => {
    const photo = data.photo[0];
   

    const formData = new FormData();
    formData.append("image", photo);
    const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`;
   
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          const img = imgData.data.url;
         
          const book = {
            sellerName: data.name,
            name: data.book,
            resalePrice: ` $${data.price}`,
            categoryId: data.categoryId,
            location: data.location,
            isAdvertise : false,
            img: img,
          };
      
          fetch("http://localhost:5000/books", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(book),
          })
            .then((res) => res.json())
            .then((result) => {
             
              toast.success("Book added successfully");
              navigate("/dashboard/products");
            });
        }
      });
  };

  return (
    <div>
      <h1 className="text-5xl font-bold mb-4 ">Add Your Book</h1>
      <div className="ml-12">
        <div className="">
          <div className="card w-full max-w-sm shadow-2xl bg-base-300">
            <form onSubmit={handleSubmit(bookInfo)} className="card-body">
              <div className="form-control">
                <input
                  {...register("name")}
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <input
                  {...register("book")}
                  type="text"
                  name="book"
                  placeholder="Enter your book name"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <input
                  {...register("price")}
                  type="number"
                  name="price"
                  placeholder="Enter your book price"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <input
                  {...register("location")}
                  type="text"
                  name="location"
                  placeholder="Write your location"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Category</span>
                </label>
                <select {...register("categoryId")}>
                  <option value="Literatures">Literatures</option>
                  <option value="Pomes">Pomes</option>
                  <option value="Religious">Religious</option>
                  <option value="Thrillers">Thrillers</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo</span>
                </label>
                <input
                  {...register("photo")}
                  type="file"
                  placeholder=""
                  name="photo"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-accent">Add</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toaster></Toaster>
    </div>
  );
};

export default AddProducts;
