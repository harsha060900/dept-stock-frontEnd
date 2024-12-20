import { useState } from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import annaUnivLogo from "../images/anna_university_logo.svg";
import { clearValuesOnLogout, getItemFromLocalStorage } from "../SecureLS";
import ChangeLocationStatusModal from "./ChangeLocationStatusModal";
import ChangePasswordModal from "./ChangePasswordModal";
import profile from "../assets/profile.png"

const superintendentNavigation = [
  { name: "View Assets", href: "/ViewAssets", current: true },
  { name: "Items Entry", href: "/ItemsEntry", current: false },
  { name: "Add Category", href: "/AddCategory", current: false },
  // { name: "Dashboard", href: "/Dashboard", current: false },
];

const hodNavigation = [
  { name: "Dashboard", href: "/Dashboard", current: false },
  { name: "View Assets", href: "/ViewAssets", current: true },
  { name: "Staff History", href: "/StaffHistoryTracker", current: false },
  { name: "Item History", href: "/ItemHistoryTracker", current: false },
  { name: "Add Staff", href: "/AddStaff", current: false },
  { name: "Add User", href: "/AddUser", current: false },
  // { name: 'Items Entry', href: '/ItemsEntry', current: false },
  // { name: 'Add Category', href: '/AddCategory', current: false },
];

const assignerNavigation = [
  { name: "View Assets", href: "/ViewAssets", current: true },
  { name: "Acknowledge Entry", href: "/AcknowledgeEntry", current: false },
  { name: "Status Tracker", href: "/StatusTracker", current: false },
  { name: "Add Location", href: "/AddLocation", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [current, setCurrent] = useState(window.location.pathname);
  const [show, setShow] = useState(false);
  const role = getItemFromLocalStorage("Role");
  const name = getItemFromLocalStorage("Name");
  // console.log(window.location.pathname);

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {/* <ChangeLocationStatusModal
        show={show}
      /> */}
      {({ open }) => (
        <>
          <ChangePasswordModal show={show} onCloseDetails={setShow} />
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-2">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    // className="block lg:hidden h-8 w-auto"
                    className="block h-8 w-auto mr-3"
                    src={annaUnivLogo}
                    alt="Anna university logo"
                  />
                  {/* <img
                    className="hidden lg:block h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                    alt="Workflow"
                  /> */}
                  <h1 className="hidden lg:block text-white font-mono text-xl mr-10">
                    Department Asset Management
                  </h1>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {/* {superintendentNavigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.href === current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))} */}
                    {(function () {
                      switch (role) {
                        case "superintendent":
                          return (
                            <>
                              {superintendentNavigation.map((item) => (
                                <a
                                  key={item.name}
                                  href={item.href}
                                  className={classNames(
                                    item.href === current
                                      ? "bg-gray-900 text-white"
                                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                    "px-3 py-2 rounded-md text-sm font-medium"
                                  )}
                                  aria-current={
                                    item.current ? "page" : undefined
                                  }
                                >
                                  {item.name}
                                </a>
                              ))}
                            </>
                          );
                        case "HOD":
                          return (
                            <>
                              {hodNavigation.map((item) => (
                                <a
                                  key={item.name}
                                  href={item.href}
                                  className={classNames(
                                    item.href === current
                                      ? "bg-gray-900 text-white"
                                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                    "px-3 py-2 rounded-md text-sm font-medium"
                                  )}
                                  aria-current={
                                    item.current ? "page" : undefined
                                  }
                                >
                                  {item.name}
                                </a>
                              ))}
                            </>
                          );
                        case "assigner":
                          return (
                            <>
                              {assignerNavigation.map((item) => (
                                <a
                                  key={item.name}
                                  href={item.href}
                                  className={classNames(
                                    item.href === current
                                      ? "bg-gray-900 text-white"
                                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                    "px-3 py-2 rounded-md text-sm font-medium"
                                  )}
                                  aria-current={
                                    item.current ? "page" : undefined
                                  }
                                >
                                  {item.name}
                                </a>
                              ))}
                            </>
                          );
                        default:
                          break;
                      }
                    })()}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 z-10" >
                {/* <button
                  type="button"
                  className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button> */}

                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={profile}
                        alt=""
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
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            // href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            <h1 className="text-lg text-center font-bold">
                              {name}
                            </h1>
                          </div>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700 text-center"
                            )}
                          >
                            {role === "HOD"
                              ? "HOD"
                              : role === "superintendent"
                              ? "Superintendent"
                              : "Assigner"}
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            onClick={() => setShow(true)}
                            className={classNames(
                              active ? "bg-blue-100" : "",
                              "block px-4 py-2 text-sm text-blue-700 text-center"
                            )}
                          >
                            Change Password
                          </div>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={() => clearValuesOnLogout()}
                            href="/"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700 text-center"
                            )}
                          >
                            <span className="text-md text-center text-red-500">
                              Sign out
                            </span>
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.href === current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))} */}
              {(function () {
                switch (role) {
                  case "superintendent":
                    return (
                      <>
                        {superintendentNavigation.map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className={classNames(
                              item.href === current
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "block px-3 py-2 rounded-md text-base font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </>
                    );
                  case "HOD":
                    return (
                      <>
                        {hodNavigation.map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className={classNames(
                              item.href === current
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "block px-3 py-2 rounded-md text-base font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </>
                    );
                  case "assigner":
                    return (
                      <>
                        {assignerNavigation.map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className={classNames(
                              item.href === current
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "block px-3 py-2 rounded-md text-base font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </>
                    );
                  default:
                    break;
                }
              })()}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
