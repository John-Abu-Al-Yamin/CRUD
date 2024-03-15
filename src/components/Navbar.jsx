import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/Auth";

const Navbar = () => {
  const { user, LogoutUser } = useAuth();

  const [create, setCreate] = useState(false);
  const apiUrl = "https://back-end-crud.onrender.com";

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

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on component mount or update
  }, []); 

  return (
    <nav className="bg-white text-black flex flex-row-reverse justify-between items-center px-3 py-2">
      

      <div className="flex justify-center flex-row-reverse">
        <Link className="font-medium text-md hover:text-teal-500" to={"/"}>
          الصفحه الرئيسيه
        </Link>
        {user && (
          <>
            <Link
              to={"/product"}
              className="mr-2 font-medium text-md hover:text-teal-500"
            >
              المنتجات
            </Link>
            {create && ( // Assuming user object has an isAdmin property
              <Link
                to={"/create"}
                className="mr-2 font-medium text-md hover:text-teal-500"
              >
              انشاء منتج
              </Link>
            )}
          </>
        )}
      </div>

      {!user ? (
        <div className="flex items-center">
          <Link
            to={"/login"}
            className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-3 rounded"
          >
            Login
          </Link>
          <Link
            className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-3 rounded"
            to={"/register"}
          >
            Register
          </Link>
        </div>
      ) : (
        <button
          onClick={LogoutUser}
          className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-2 rounded"
        >
          تسجيل خروج
        </button>
      )}
    </nav>
  );
};

export default Navbar;
