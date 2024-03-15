// Products.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/Auth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import img from "../image/imag.jpg";

const Products = () => {
  const apiUrl = "https://back-end-crud.onrender.com";

  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [create, setCreate] = useState(false);
  const handleDeletProduct = async (id) => {
    const res = await fetch(`${apiUrl}/api/product/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await res.json();

    if (data.success) {
      getAllProducts();
      toast.success("product Deleted");
    }
  };

  // getAllUser
  useEffect(() => {
    const getAllUser = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();

        if (res.ok && data.success) {
          setCreate(true);
        } else {
          setCreate(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getAllUser();
  }, []);

  // getAllProducts
  const getAllProducts = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/product`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setProducts(data.data);
      } else {
        // Handle error response
        console.error("Error fetching products:", data.error);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on component mount or update
  }, []);

  return (
    <>
      <div className=" bg-gray-100 flex justify-center items-center flex-wrap pb-14">
        {products.map((product) => (
          <div
            key={product?._id}
            className=" main-container flex justify-center py-6 lg:w-1/3 md:w-1/2 sm:w-full"
          >
            <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
              <img
                className="w-full"
                src={img}
                alt="https://via.placeholder.com/350x150"
              />
              <div className="px-6 py-3">
                <div className="font-bold text-xl mb-2">{product.title}</div>
                <p className="text-gray-800 text-base ">
                  {product.description}
                </p>
              </div>
              <div className="px-6 py-4">
                <h1 className="mb-3 inline-block bg-gray-200 rounded-full px-4 py-1 text-xl font-bold text-gray-700 mr-2">
                  السعر {product.price} جنيه
                </h1>
                <button className="mb-2 inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700">
                تاريخ الاضافه {new Date(product.createdAt).toDateString() }   
                </button>
              </div>
              <div className="mb-6 flex justify-around items-center">
                {create && (
                  <>
                    <Link
                      to={`/product/update/${product._id}`}
                      className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700"
                    >
                      تعديل
                    </Link>
                    <button
                      onClick={() => handleDeletProduct(product._id)}
                      className="inline-block rounded-lg bg-red-500 px-5 py-3 text-sm font-medium text-white hover:bg-red-700"
                    >
                      حذف
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Products;
