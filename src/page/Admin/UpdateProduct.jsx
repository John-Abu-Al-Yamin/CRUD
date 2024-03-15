import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateProduct = () => {
  const [lodding, setLodding] = useState(true);
    const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const { id } = useParams();

  const apiUrl = "https://back-end-crud.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = {
      title,
      description,
      price,
    };

    const res = await fetch(`${apiUrl}/api/product/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(product),
    });
    const data = await res.json();
    if (data.success) {
      setTitle(data.data);
      setDescription(data.description);
      setPrice(data.data.price);
   
      toast.success("Product Created");
      navigate("/product");
    }
    if (!data.success) {
      toast.error(data.error);
    }
  };
  


  return (
    <div className="bg-gray-50 pb-14">
      <h2 className="text-center pt-11 pb-16 font-bold text-xl">
        تعديل منتج 
      </h2>
      <form
        onSubmit={handleSubmit}
        className="mx-auto my-auto  mt-8 max-w-md space-y-4 mb-20"
      >
        <input
          className="w-full rounded-lg font-bold p-4 pe-12 text-lg shadow-md bg-gray-200 "
          type="text"
          name="title"
          placeholder="العنوان"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="w-full rounded-lg font-bold p-4 pe-12 text-lg shadow-md bg-gray-200 "
          type="text"
          name="description"
          placeholder="الوصف"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          className="w-full rounded-lg font-bold p-4 pe-12 text-lg shadow-md bg-gray-200 "
          type="number"
          name="price"
          placeholder="السعر "
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button
          type="submit"
          className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
        >
        تعديل منتج 
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
