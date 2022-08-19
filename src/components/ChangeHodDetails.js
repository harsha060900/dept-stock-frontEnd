import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import api from "../Axios";
import Swal from "sweetalert2";
import { getItemFromLocalStorage } from "../SecureLS";

export default function ChangeHodDetails(props) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");


    const id = getItemFromLocalStorage("ID");


  function handleSubmit(e) {
    e.preventDefault();
    try{
      api.
        put(`/user/${id}`,
        JSON.stringify({
            email: email,
            name: name,
          }),
          {
            headers: { "Content-Type": "application/json" },
          }    
        )
        .then((res) => {
          console.log("kjsdlkfjlkjsdfkjsdf")
          console.log(res.status);
          if (res.status === 200) {
            props.onUpdate(!props.flag2)
            Swal.fire({
              icon: 'success',
              text: 'HOD Details updated successfully',
            })
            setEmail("")
            setName("")
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
    }
    catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    
  }, []);

  return (
    <Transition.Root show={props.show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={props.onCloseDetails}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-center bg-white rounded-lg px-4 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full sm:p-6">
              <h1 className="text-xl text-center mb-4">
                Change HOD Details
              </h1>
              
              <form
                className="space-y-8 divide-y divide-gray-200"
                onSubmit={handleSubmit}
              >
                <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                  <div className="pt-2 space-y-6 sm:pt-4 sm:space-y-5">
                    <div className="space-y-6 sm:space-y-5">
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
                        <label
                          htmlFor="name"
                          className="block text-lg font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Name
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            required
                            value={name}
                            onChange={(e) => {
                              setName(e.target.value)
                            }}
                            className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm px-2 h-10 border-2 border-gray-300 rounded-md"
                          />
                        </div>
                      </div>

                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label
                          htmlFor="email"
                          className="block text-lg font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Email
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <input
                            type="text"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                            className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-md px-2 h-10 border-2 border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-4">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => {
                        props.onCloseDetails(false);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
