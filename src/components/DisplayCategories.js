import MaterialTable from "material-table";
import { useEffect, useState } from "react";
// import axios from "axios";
import api from "../Axios";
import { checkArray } from "../utils/arrayCheck";
import Swal from "sweetalert2";
// import { MDBDataTableV5 } from "mdbreact";

function DisplayCategories({ flag }) {
  const [categories, setCategories] = useState([]);
  const [render, setrender] = useState(false);

  const [datatable, setDatatable] = useState({
    columns: [
      {
        title: "CATEGORY",
        field: "cname",
      },
      {
        title: "ACTION",
        field: "action",
      },
    ],
    rows: [{}],
  });

  const handleDel=(i)=>{
    console.log(i);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete!'
    }).then((result) => {
      if (result.isConfirmed) {
          try {
              api
              .delete(
                  `/category/${i}`,
                 
              )
              .then((res) => {
                  console.log(res.status);
                  if (res.status === 200) {
                    setrender(!render);
                      Swal.fire(
                          'Deleted!',
                          'Deleted successfully.',
                          'success'
                      )
                  }
                })
                .catch(err=>{
                  console.log(err.response);
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: err.response.data.message,
                  });
                })
          }
          catch (err) {
              console.log(err);
          }
      }
    })
  }

  useEffect(() => {
    api.get("/category").then((res) => {
      console.log(res.status);
      console.log(res.data);
      setCategories(res.data);
      setDatatable({
        ...datatable,
        rows: res.data.map((da, i) => ({
          cname: da.name,
          action: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-500 hover:text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              onClick={()=>{handleDel(da.id)}}
              style={{cursor:'pointer'}}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          ),
        })),
      });
    });
  }, [flag, render]);

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
                    showTitle: false,
                    headerStyle: {
                      backgroundColor: "#c6c9d6",
                      color: "#6b7280",
                      fontWeight: "500px",
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
