import { useState } from "react";
import api from "../Axios";
import Swal from "sweetalert2";
import DisplayUsers from "./DisplayUsers";

export default function AddStaff() {
  //const [location, setLocation] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("assigner");
  const [flag, setFlag] = useState(true);

  let handleUserSubmit = async (e) => {
    e.preventDefault();
    try {
      api
        .post(
          "/user",
          JSON.stringify({
            name: userName,
            email: email,
            role: role,
          }),
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          console.log(res.status);
          if (res.status === 200) {
            setFlag(!flag);
            Swal.fire({
              icon: 'success',
              text: 'User added successfully',
            })
          }
        })
        .catch (err=> {
          console.log("err", err.response);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Error",
          })
        })
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-5">
            <h1 className="text-2xl font-semibold text-gray-900">Add User</h1>
          </div>
          <div className="mt-0 sm:mt-2 lg:mt-8 px-4 sm:px-6 lg:px-8">
            <div className="mt-5 mx-auto md:mt-0 md:col-span-2">
              <form
              onSubmit={handleUserSubmit}
              >
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      {/* <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="serial-no" className="block text-sm font-medium text-gray-700">
                                    Serial number
                                    </label>
                                    <input
                                    type="text"
                                    name="serial-no"
                                    id="serial-no"
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div> */}

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="userName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          name="userName"
                          id="userName"
                          value={userName}
                          required
                          onChange={(e) => setUserName(e.target.value)}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email
                        </label>
                        <input
                          type="text"
                          name="email"
                          id="email"
                          value={email}
                          required
                          onChange={(e) => setEmail(e.target.value)}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="role"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Role
                        </label>
                        <select
                          type="text"
                          name="role"
                          id="role"
                          value={role}
                          required
                          onChange={(e) => setRole(e.target.value)}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        >
                            <option value="assigner">Assigner</option>
                            <option value="superintendent">Superintendent</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
            {/* </div> */}
          </div>
        </div>
        <div className="flex-1 mt-10 md:mt-24 lg:mt-24">
          <DisplayUsers flag={flag} />
        </div>
      </div>
    </>
  );
}