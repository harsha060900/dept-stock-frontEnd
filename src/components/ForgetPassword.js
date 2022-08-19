import React from "react";
import Swal from "sweetalert2";
import { useState } from "react";
import annaUnivLogo from "../images/anna_university_logo.svg";
import dept from "../images/clg_dept.jpeg";
import api from "../Axios";
import { getItemFromLocalStorage, setItemOnLocalStorage } from "../SecureLS";

const ForgetPassword = () => {
  const [data, setData] = useState({
    email: "",
  });

  function forget(e) {
    e.preventDefault();
    api
      .post("/user/forgotpassword", data)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Mail Sent",
          text: "Check your mail for new password",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Back to Login Page!",
          // footer: '<a href="">Why do I have this issue?</a>'
        }).then((result) => {
          if (result.isConfirmed) {
            try {
              window.location.href = "/";
            } catch (err) {
              console.log(err);
            }
          }
        });
        console.log(res);

        // if(localStorage.getItem("AuthId") !== "undefined"){
        //     if(getItemFromLocalStorage("AuthId") !== "undefined"){
        //     window.location.href="/ViewAssets"
        // }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.error,
          // footer: '<a href="">Why do I have this issue?</a>'
        });
      });
  }
  return (
    <div className="w-full flex flex-wrap">
      <div className="w-full md:w-1/2 flex flex-col">
        <div className="flex justify-center md:justify-center pt-12 md:-mb-24">
          {/* <a href="#" className="bg-black text-white font-bold text-xl p-4">Logo</a> */}
          <img
            // className="block lg:hidden h-8 w-auto"
            className="block ws-auto mr-3"
            src={annaUnivLogo}
            alt="Anna university logo"
            width={100}
            height={100}
          />
        </div>

        <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
          <p className="text-center text-3xl">DEPARTMENT OF MATHEMATICS</p>
          <form className="flex flex-col pt-3 md:pt-8" onSubmit={forget}>
            <div className="flex flex-col pt-4">
              <label htmlFor="email" className="text-lg">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={(e) => setData({ [e.target.name]: e.target.value })}
                id="email"
                placeholder="your@email.com"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <input
              type="submit"
              value="Submit"
              className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
              // disabled
            />
          </form>
          {/* <div className="text-center pt-12 pb-12">
                    <p>Don't have an account? <a href="register.html" className="underline font-semibold">Register here.</a></p>
                </div> */}
        </div>
      </div>

      <div className="w-1/2 shadow-2xl">
        <img
          className="object-cover h-screen hidden md:block"
          alt="Anna university"
          src={dept}
          height={200}
          width={800}
        />
      </div>
    </div>
  );
};
export default ForgetPassword;
