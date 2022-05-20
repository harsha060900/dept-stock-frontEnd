import MaterialTable from "material-table";
import { useEffect, useState } from "react";
// import axios from "axios";
import api from "../Axios";
import { checkArray } from "../utils/arrayCheck";
// import { MDBDataTableV5 } from "mdbreact";

function DisplayCategories({ flag }) {
  const [categories, setCategories] = useState([]);
  const [datatable, setDatatable] = useState({
    columns: [
      {
        title: "CATEGORY",
        field: "cname",
      },
    ],
    rows: [{}],
  });

  useEffect(() => {
    api.get("/category").then((res) => {
      console.log(res.status);
      console.log(res.data);
      setCategories(res.data);
      setDatatable({
        ...datatable,
        rows: res.data.map((da) => ({
          cname: da.name,
        })),
      });
    });
  }, [flag]);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <MaterialTable
                  title="Basic Filtering Preview"
                  columns={datatable.columns}
                  data={datatable.rows}
                  options={{
                    showTitle:false,
                    headerStyle: {
                      backgroundColor: "#c6c9d6",
                      color: "#6b7280",
                      fontWeight:"500px",
                   },
                    // filtering: true,
                  }}
                />
                {/* {checkArray(datatable.rows) ? (
                  <MDBDataTableV5
                    className="custo"
                    hover
                    entriesOptions={[5, 10, 15]}
                    entries={5}
                    pagesAmount={4}
                    data={datatable}
                    searchBottom={false}
                    searchTop
                    barReverse={true}
                    // fullPagination
                  />
                ) : (
                  <div>
                    <h1>No data Found</h1>
                  </div>
                )} */}
                {/* <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-300">
                            <tr>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Category
                            </th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((cat, index) => (
                            <tr key={cat.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cat.name}</td>
                            </tr>
                            ))}
                        </tbody>
                        </table> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DisplayCategories;
