import { useState, useEffect } from "react";
import DisplayCategories from "./DisplayCategories";
import DisplayItemNames from "./DisplayItemNames";
import api from "../Axios";
import Swal from 'sweetalert2';

export default function AddCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemCategoryId, setItemCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [flag, setFlag] = useState(true);

  let handleCategorySubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify({name: categoryName}))
    try {
      api
        .post(
          "/category",
          JSON.stringify({
            name: categoryName,
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
              text: 'Category added successfully',
            })
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  let handleItemSubmit = async (e) => {
    e.preventDefault();
    try {
      api
        .post(
          "/item",
          JSON.stringify({
            name: itemName,
            categoryid: itemCategoryId,
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
              text: 'Item name added successfully',
            })
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    api.get("/category").then((res) => {
      console.log(res.status);
      console.log(res.data);
      setCategories(res.data);
      setItemCategoryId(res.data[0].id);
    });
  }, [flag]);

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-5">
            <h1 className="text-2xl font-semibold text-gray-900">
              Add Category
            </h1>
          </div>
          <div className="mt-0 sm:mt-2 lg:mt-8 px-4 sm:px-6 lg:px-8">
            <div className="mt-5 mx-auto md:mt-0 md:col-span-2">
              <form onSubmit={handleCategorySubmit}>
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
                          Category
                        </label>
                        <input
                          type="text"
                          name="category_name"
                          id="category_name"
                          value={categoryName}
                          required
                          onChange={(e) => setCategoryName(e.target.value)}
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
          <DisplayCategories flag={flag} />
        </div>
        {/* <div>
          <div className="hidden sm:block" aria-hidden="true">
            <div>
              <div className="border-r border-gray-200 h-full sm:border-t border-gray-200" />
            </div>
          </div>
          </div> */}
        <div className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-5">
            <h1 className="text-2xl font-semibold text-gray-900">
              Add Item name
            </h1>
          </div>
          <div className="mt-0 sm:mt-2 lg:mt-8 px-4 sm:px-6 lg:px-8">
            <div className="mt-5 mx-auto md:mt-0 md:col-span-2">
              <form onSubmit={handleItemSubmit}>
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
                        </div>
     */}
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="category"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Item name
                        </label>
                        <input
                          type="text"
                          name="item-name"
                          id="item-name"
                          value={itemName}
                          required
                          onChange={(e) => setItemName(e.target.value)}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="item-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Category
                        </label>
                        <select
                          id="item-category"
                          name="item-category"
                          value={itemCategoryId}
                          onChange={(e) => setItemCategoryId(e.target.value)}
                          required
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option disabled>--Select a category--</option>
                          {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.name}
                            </option>
                          ))}
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
          <DisplayItemNames flag={flag} />
        </div>
        {/* <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-gray-200" />
            </div>
          </div> */}
      </div>
    </>
  );
}
