import { useState } from "react";
import api from "../Axios";
import Swal from 'sweetalert2';
import DisplayLocations from "./DisplayLocations";

export default function AddLocation() {

    const [location, setLocation] = useState("");
    const [flag, setFlag] = useState(true);

    let handleLocationSubmit = async (e) => {
        e.preventDefault();
        console.log(JSON.stringify({name: location}))
        try {
          api
            .post(
              "/location",
              JSON.stringify({
                name: location,
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
                  text: 'Location added successfully',
                })
              }
            });
        } catch (err) {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.error,
          })
        }
      };

    return(
        <>
          <div className="flex flex-col md:flex-row">
            <div className="flex-1">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-5">
                    <h1 className="text-2xl font-semibold text-gray-900">Add Location</h1>
                </div>
                <div className="mt-0 sm:mt-2 lg:mt-8 px-4 sm:px-6 lg:px-8">
                    <div className="mt-5 mx-auto md:mt-0 md:col-span-2">
                    <form onSubmit={handleLocationSubmit}>
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
                                htmlFor="category_name"
                                className="block text-sm font-medium text-gray-700"
                                >
                                Location
                                </label>
                                <input
                                type="text"
                                name="category_name"
                                id="category_name"
                                value={location}
                                required
                                onChange={(e) => setLocation(e.target.value)}
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
                <DisplayLocations flag={flag} />
            </div>
          </div>
        </>
    )
}


