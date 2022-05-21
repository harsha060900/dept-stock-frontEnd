import MaterialTable from "material-table";
import { useEffect, useState } from "react";
// import axios from "axios";
import api from "../Axios";

function DisplayStaffs({ flag }) {
  const [staffs, setStaffs] = useState([]);
  const [datatable, setDatatable] = useState({
    columns: [
      {
        title: "STAFF ID",
        field: "id",
      },
      {
        title: "Name",
        field: "name",
      },
      {
        title: "DESIGNATION",
        field: "role",
      },
    ],
    rows: [{}],
  });

  useEffect(() => {
    api.get("/staff").then((res) => {
      console.log(res.status);
      console.log(res.data);
      setStaffs(res.data);
      setDatatable({
        ...datatable,
        rows: res.data.map((da) => ({
          id: da.regid,
          name: da.name,
          role: da.designation,
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
                {/* <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-300">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Staff ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Designation
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {staffs.map((staff, index) => (
                            <tr key={staff.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.regid}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.designation}</td>
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

export default DisplayStaffs;
