

export default function ItemsEntry() {
    return (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-5">
            <h1 className="text-2xl font-semibold text-gray-900">Items Entry</h1>
          </div>
          <div className="mt-0 sm:mt-2 lg:mt-8 px-4 sm:px-6 lg:px-14">
              <div className="mt-5 mx-auto md:mt-0 md:col-span-2">
                <form action="#" method="POST">
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
                          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                            Category
                          </label>
                          <select
                            id="category"
                            name="category"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            <option disabled>--Select a category--</option>
                            <option>Furniture</option>
                            <option>Electronics</option>
                            <option>IT</option>
                          </select>
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="brand-name" className="block text-sm font-medium text-gray-700">
                            Brand name
                          </label>
                          <input
                            type="text"
                            name="brand-name"
                            id="brand-name"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-4">
                          <label htmlFor="item-name" className="block text-sm font-medium text-gray-700">
                            Item name
                          </label>
                          <select
                            id="item-name"
                            name="item-name"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            <option disabled>--Select an item--</option>
                            <option>HP desktop</option>
                            <option>Chair</option>
                            <option>Voltas AC</option>
                          </select>
                        </div>
    
                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                            Quantity
                          </label>
                          <input
                            type="number"
                            name="quantity"
                            id="quantity"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
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
                              className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            {/* </div> */}
          </div>
    
          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-gray-200" />
            </div>
          </div>
        </>
      )
}