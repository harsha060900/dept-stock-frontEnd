import { useEffect, useState } from "react";
import api from "../Axios";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import {
  Assigned,
  NotAssigned,
  Condemned,
  Missing,
  Spare,
  Transferred,
} from "./StatusBadges";
import ChangeLocationStatusModal from "./ChangeLocationStatusModal";

export default function StatusTracker() {
  const [itemStatuses, setItemStatuses] = useState([]);
  const [query, setQuery] = useState("/item/status?itemstatus=notassigned");
  const [status, setStatus] = useState("Not Assigned");
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [modalName, setModalName] = useState("");
  const [flag, setFlag] = useState(false);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  function getStatusBadge() {
    switch (status) {
      case "Assigned":
        return <Assigned />;

      case "Not Assigned":
        return <NotAssigned />;

      case "Condemned":
        return <Condemned />;

      case "Missing":
        return <Missing />;

      case "Spare":
        return <Spare />;

      case "Transferred":
        return <Transferred />;

      default:
        return <></>;
    }
  }

  function getStatusBadgeInTable(value) {
    switch (value) {
      case "assigned":
        return <Assigned />;

      case "notassigned":
        return <NotAssigned />;

      case "condemned":
        return <Condemned />;

      case "missing":
        return <Missing />;

      case "spare":
        return <Spare />;

      case "transferred":
        return <Transferred />;

      default:
        return <></>;
    }
  }

  useEffect(() => {
    api.get(query).then((res) => {
      setItemStatuses(res.data);
    });
  }, [query, status, flag]);

  return (
    <>
      <ChangeLocationStatusModal
        show={show}
        onCloseDetails={setShow}
        data={modalData}
        onEdited={setModalData}
        modalName={modalName}
        flag={flag}
        onUpdate={setFlag}
      />
      <div className="flow-root max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5">
        <div className="float-left">
          <h1 className="text-2xl font-semibold text-gray-900">
            Status Tracker
          </h1>
        </div>
        <div className="float-right">
          <div className="my-8 sm:my-0 flex flex-row">
            <div className="px-2 py-1 sm:px-4 py-1">
              <h1 className="text-md sm:text-xl">
                Current Status: &nbsp;
                {getStatusBadge()}
              </h1>
            </div>
            <div>
              <Menu as="div" className="inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                    Change Status
                    <ChevronDownIcon
                      className="-mr-1 ml-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            // href="item/status?itemstatus=assigned"
                            onClick={() => {
                              setQuery("/item/status?itemstatus=assigned");
                              setStatus("Assigned");
                            }}
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Assigned
                          </div>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            onClick={() => {
                              setQuery("/item/status?itemstatus=notassigned");
                              setStatus("Not Assigned");
                            }}
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Not Assigned
                          </div>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            onClick={() => {
                              setQuery("/item/status?itemstatus=condemned");
                              setStatus("Condemned");
                            }}
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Condemned
                          </div>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            onClick={() => {
                              setQuery("/item/status?itemstatus=missing");
                              setStatus("Missing");
                            }}
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Missing
                          </div>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            onClick={() => {
                              setQuery("/item/status?itemstatus=spare");
                              setStatus("Spare");
                            }}
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Spare
                          </div>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            onClick={() => {
                              setQuery("/item/status?itemstatus=transferred");
                              setStatus("Transferred");
                            }}
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Transferred
                          </div>
                        )}
                      </Menu.Item>
                      {/* <form method="POST" action="#">
                                        <Menu.Item>
                                            {({ active }) => (
                                            <button
                                                type="submit"
                                                className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block w-full text-left px-4 py-2 text-sm'
                                                )}
                                            >
                                                Sign out
                                            </button>
                                            )}
                                        </Menu.Item>
                                        </form> */}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="table-fixed min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="w-3/12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        ID
                      </th>
                      <th
                        scope="col"
                        className="w-3/12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Item Name
                      </th>
                      <th
                        scope="col"
                        className="w-2/12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Category
                      </th>
                      <th
                        scope="col"
                        className="w-2/12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Location
                      </th>
                      <th
                        scope="col"
                        className="w-1/12 px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="w-1/12 px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Change Location/Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemStatuses.map((item, index) => (
                      <tr
                        key={item.id}
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          DOM/
                          {item.Itementry.Ledger.consumetype === "nonconsumable"
                            ? "NC"
                            : "C"}
                          /VOL
                          {item.Itementry.Ledger.volumeno}/PG
                          {item.Itementry.Ledger.pageno}/SNo
                          {item.Itementry.Ledger.sno}/
                          {item.createdAt.substring(0, 4)}/{item.itemno}/
                          {item.Itementry.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.Itementry.Item.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.Itementry.Item.Category.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.Location === null ? "---" : item.Location.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {getStatusBadgeInTable(item.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                          <button
                            onClick={() => {
                              setShow(true);
                              setModalData(item);
                              let temp =
                                item.Itementry.Ledger.consumetype ===
                                "nonconsumable"
                                  ? "NC"
                                  : "C";
                              setModalName(
                                "DOM/" +
                                  temp +
                                  "/VOL" +
                                  item.Itementry.Ledger.volumeno +
                                  "/PG" +
                                  item.Itementry.Ledger.pageno +
                                  "/SNo" +
                                  item.Itementry.Ledger.sno +
                                  "/" +
                                  item.createdAt.substring(0, 4) +
                                  "/" +
                                  item.itemno +
                                  "/" +
                                  item.Itementry.quantity
                              );
                            }}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Change
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
