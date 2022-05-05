import { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import api from "../Axios";
export default function ItemsEntry() {
  const [brandName, setbrandName] = useState("");
  const [itemID, setItemID] = useState("");
  const [quantityNo, setQuantityNo] = useState("");
  const [priceNo, setPriceNo] = useState("");
  const [volumeNo, setVolumeNo] = useState("");
  const [pageNo, setPageNo] = useState("");
  const [serialNo, setSerialNo] = useState("");
  const [types, setTypes] = useState("consumable");
  const [itemlist, setItemList] = useState([]);

  let handleSubmit = async (e) => {
    e.preventDefault();
    if(quantityNo==='0') {
      Swal.fire({
        icon: 'error',
        text: 'Quantity cannot be zero',
      })
    }
    else {
      try {
        api
          .post(
            "/item/entry",
            JSON.stringify({
              brand: brandName,
              quantity: quantityNo,
              totalprice: priceNo,
              itemid: itemID,
              volumeno: volumeNo,
              pageno: pageNo,
              sno: serialNo,
              consumetype: types,
            }),
            {
              headers: { "Content-Type": "application/json" },
            }
          )
          .then((res) => {
            console.log(res.status);
            if (res.status === 200) {
              Swal.fire({
                icon: 'success',
                text: 'Items added successfully',
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
    }
  };

  useEffect(() => {
    api.get("/item").then((res) => {
      console.log(res.status);
      console.log(res.data);
      setItemList(res.data);
      setItemID(res.data[0].id);
    });
  }, []);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-5">
        <h1 className="text-2xl font-semibold text-gray-900">Items Entry</h1>
      </div>
      <div className="mt-0 sm:mt-2 lg:mt-8 px-4 sm:px-6 lg:px-14">
        <div className="mt-5 mx-auto md:mt-0 md:col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="brand-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Brand name
                    </label>
                    <input
                      type="text"
                      name="brand-name"
                      id="brand-name"
                      value={brandName}
                      // required
                      onChange={(e) => setbrandName(e.target.value)}
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="item-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Item name
                    </label>
                    <select
                      id="item-name"
                      name="item-name"
                      value={itemID}
                      required
                      onChange={(e) => setItemID(e.target.value)}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option disabled>--Select an item--</option>
                      {itemlist.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="quantity"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Quantity
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      id="quantity"
                      value={quantityNo}
                      required
                      onChange={(e) => setQuantityNo(e.target.value)}
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Price
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        ₹
                      </span>
                      <input
                        type="text"
                        name="price"
                        id="price"
                        value={priceNo}
                        required
                        onChange={(e) => setPriceNo(e.target.value)}
                        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                      />
                    </div>
                  </div>

                  <div
                    style={{ paddingTop: "9%" }}
                    className="col-span-6 sm:col-span-3"
                  >
                    <label
                      htmlFor="quantity"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Volume number
                    </label>
                    <input
                      type="number"
                      name="volume number"
                      id="volume number"
                      value={volumeNo}
                      required
                      onChange={(e) => setVolumeNo(e.target.value)}
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div
                    style={{ paddingTop: "9%" }}
                    className="col-span-6 sm:col-span-3"
                  >
                    <label
                      htmlFor="quantity"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Page number
                    </label>
                    <input
                      type="number"
                      name="page"
                      id="page"
                      value={pageNo}
                      required
                      onChange={(e) => setPageNo(e.target.value)}
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="quantity"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Serial number
                    </label>
                    <input
                      type="number"
                      name="serial"
                      id="serial"
                      value={serialNo}
                      required
                      onChange={(e) => setSerialNo(e.target.value)}
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="type"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Type
                    </label>
                    <select
                      name="type"
                      id="type"
                      value={types}
                      required
                      onChange={(e) => setTypes(e.target.value)}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option disabled>--Select a category--</option>
                      <option value="consumable">Consumables</option>
                      <option value="nonconsumable">Non-consumables</option>
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
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
    </>
  );
}
