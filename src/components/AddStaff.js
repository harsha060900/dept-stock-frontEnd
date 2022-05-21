import { useState } from "react";
import api from "../Axios";
import Swal from "sweetalert2";
import DisplayStaffs from "./DisplayStaffs";

export default function AddStaff() {
  //const [location, setLocation] = useState("");
  const [staffid, setStaffid] = useState("");
  const [staffname, setStaffname] = useState("");
  const [designation, setDesignation] = useState("");
  const [flag, setFlag] = useState(true);

  let handleStaffSubmit = async (e) => {
    e.preventDefault();
    try {
      api
        .post(
          "/staff",
          JSON.stringify({
            regid: staffid,
            name: staffname,
            designation: designation,
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
              text: 'Staff added successfully',
            })
          }
        })
        .catch (err=> {
          console.log("err", err.response);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.errors[0].message=="regid must be unique"?"Staff Id must be unique":err.response.data.errors[0].message,
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
            <h1 className="text-2xl font-semibold text-gray-900">Add Staff</h1>
          </div>
          <div className="mt-0 sm:mt-2 lg:mt-8 px-4 sm:px-6 lg:px-8">
            <div className="mt-5 mx-auto md:mt-0 md:col-span-2">
              <form
              onSubmit={handleStaffSubmit}
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
                          htmlFor="staff_id"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Staff ID
                        </label>
                        <input
                          type="text"
                          name="staff_id"
                          id="staff_id"
                          value={staffid}
                          required
                          onChange={(e) => setStaffid(e.target.value)}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="staff_name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Staff Name
                        </label>
                        <input
                          type="text"
                          name="staff_name"
                          id="staff_name"
                          value={staffname}
                          required
                          onChange={(e) => setStaffname(e.target.value)}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="staff_designation"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Designation
                        </label>
                        <input
                          type="text"
                          name="staff_designation"
                          id="staff_designation"
                          value={designation}
                          required
                          onChange={(e) => setDesignation(e.target.value)}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
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
          <DisplayStaffs flag={flag} />
        </div>
      </div>
    </>
  );
}