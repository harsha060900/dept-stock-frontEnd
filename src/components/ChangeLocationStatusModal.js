import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import api from "../Axios";
import Swal from "sweetalert2";

export default function ChangeLocationStatusModal(props) {
  const [modalData, setModalData] = useState([]);
  const [locations, setLocations] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [staffid, setStaffId] = useState("");
  const [locId, setLocId] = useState("");
  const url = "/item/status/" + modalData.id;

  function handleSubmit(e) {
    e.preventDefault();
    try {
      api
        .put(
          url,
          JSON.stringify({
            status: modalData.status,
            locationid: locId === "" ? null : locId,
            staffid: staffid === "" ? null : staffid,
          }),
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              icon: "success",
              text: "Updated successfully",
            });
          }
        })
        .catch(err=>{
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.response.data.error,
          });
        })
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response.data.error,
      });
    }
    props.onUpdate(!props.flag);
    props.onCloseDetails(false);
  }

  useEffect(() => {
    setModalData(props.data);
    if (props.data.Location != null) setLocId(props.data.Location.id);
    else setLocId("");
    api.get("/location").then((res) => {
      setLocations(res.data);
    });
    if (props.data.Staff != null) setStaffId(props.data.Staff.id);
    else setStaffId("");
    api.get("/staff").then((res) => {
      setStaffs(res.data);
    });
  }, [props.data]);

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
            <div className="inline-block align-center bg-white rounded-lg px-4 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <h1 className="text-xl text-center mb-4">
                Change Status/Location Details
              </h1>
              <h1 className="text-xl text-center font-bold mb-4">
                {props.modalName}
              </h1>
              {/* {modalData==[]?null:
            (<h1 className='text-xl text-center font-bold mb-4'>
                DOM/{modalData.createdAt.substring(0,4)}/
                {modalData.createdAt.substring(5,7)}/
                {modalData.createdAt.substring(8,10)}/
                {modalData.Itementry.Ledger.consumetype==="nonconsumable"?"NC":"C"}/VOL
                {modalData.Itementry.Ledger.volumeno}/
                {modalData.Itementry.Ledger.sno}/
                {modalData.itemno}/
                {modalData.Itementry.quantity}
            </h1>)
            } */}
              <form
                className="space-y-8 divide-y divide-gray-200"
                onSubmit={handleSubmit}
              >
                <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                  <div className="pt-2 space-y-6 sm:pt-4 sm:space-y-5">
                    <div className="space-y-6 sm:space-y-5">
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
                        <label
                          htmlFor="status"
                          className="block text-lg font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Status
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <select
                            name="status"
                            id="status"
                            required
                            value={modalData.status}
                            onChange={(e) => {
                              setModalData({
                                ...modalData,
                                status: e.target.value,
                              });
                            }}
                            className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm px-2 h-10 border-2 border-gray-300 rounded-md"
                          >
                            <option value="assigned">Assigned</option>
                            <option value="notassigned">Not Assigned</option>
                            <option value="condemned">Condemned</option>
                            <option value="missing">Missing</option>
                            <option value="spare">Spare</option>
                            <option value="transferred">Transferred</option>
                          </select>
                        </div>
                      </div>

                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label
                          htmlFor="location"
                          className="block text-lg font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Location
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <select
                            name="location"
                            id="location"
                            value={locId}
                            onChange={(e) => {
                              setLocId(e.target.value);
                            }}
                            className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-md px-2 h-10 border-2 border-gray-300 rounded-md"
                          >
                            <option disabled>---Select a location---</option>
                            <option value="">No Location</option>
                            {locations.map((loc, index) => (
                              <option key={loc.id} value={loc.id}>
                                {loc.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label
                          htmlFor="staff"
                          className="block text-lg font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Staff
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <select
                            name="staff"
                            id="staff"
                            value={staffid}
                            onChange={(e) => {
                              setStaffId(e.target.value);
                            }}
                            className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-md px-2 h-10 border-2 border-gray-300 rounded-md"
                          >
                            <option disabled>---Select a location---</option>
                            <option value="">No Staff</option>
                            {staffs.map((staff, index) => (
                              <option key={staff.id} value={staff.id}>
                                {staff.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                            Role
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <select
                            id="role"
                            name="role"
                            autoComplete="role"
                            required
                            value={user.role}
                            onChange={(e) => {
                                setUser({...user, "role": e.target.value});
                            }}
                            className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-md px-2 h-10 border-2 border-gray-300 rounded-md"
                            >
                            <option>Trainee</option>
                            <option>Admin</option>
                            </select>
                        </div>
                        </div> */}
                    </div>
                  </div>
                </div>
                <div className="pt-4">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => {
                        setModalData(props.data);
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
