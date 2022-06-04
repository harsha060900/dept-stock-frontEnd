import { useState, useEffect } from "react";
import api from "../Axios";
import {Assigned, NotAssigned, Condemned, Missing, Spare, Transferred}  from './StatusBadges'

export default function StaffHistoryTracker() {

    const [staffHistory, setStaffHistory] = useState([]);
    const [staffid, setStaffId] = useState("");
    const [staffs, setStaffs] = useState([]);
    const [url, setUrl] = useState("");
    const [flag, setFlag] = useState(false);
    const [datatable, setDatatable] = useState({});
    const columns = [
        { title: "ITEM ID", field: "itemid" },
        {
          title: "ITEM NAME",
          field: "iname",
        },
        {
          title: "CATEGORY",
          field: "cate",
        },
        {
          title: "LOCATION",
          field: "loc",
        },
        {
          title: "STATUS",
          field: "status",
        },
        {
          title: "UPDATED AT",
          field: "upAt",
        },
      ];

    function getStatusBadgeInTable(value) {
        switch(value) {
            case "assigned":
                return(<Assigned />)

            case "notassigned":
                return(<NotAssigned />)

            case "condemned":
                return(<Condemned />)

            case "missing":
                return(<Missing />)

            case "spare":
                return(<Spare />)

            case "transferred":
                return(<Transferred />)

            default:
                return(<></>)
        }
    }

    useEffect(()=>{
        api.get("/staff")
        .then((res)=> {
            console.log(res.status)
            console.log(res.data)
            setStaffs(res.data)
        });
        if(url!=="") {
            api.get(url)
        .then((res)=> {
            console.log(res.status)
            console.log(res.data)
            setStaffHistory(res.data)
            setDatatable({
                rows: res.data.map((da) => ({
                  itid: da.Staff.regid,
                  iname: da.Staff.name,
                //   cate:
                  loc: da.Location.name,
                  status: getStatusBadgeInTable(da.paststatus),
                  quantity: da.quantity,
                  totalprice: da.totalprice,
                  upAt: da.updatedAt,
                })),
              });
        });
        }
    },[flag, url])

    return(
        <>
        <div className="flow-root max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5">
            <div className="float-left">
                <h1 className="text-2xl font-semibold text-gray-900">Staff History</h1>
            </div>
            <div className="float-right">
                <div className="my-8 sm:my-0 flex flex-row">
                    <div className="px-2 py-1 sm:px-4 py-1">
                        <h1 className="text-md sm:text-xl">Select Staff: &nbsp;
                            {/* {getStatusBadge()} */}
                        </h1>
                    </div>
                    <div>
                        <div className="sm:grid sm:grid-cols-6 sm:gap-4 sm:items-start">
                        {/* <label htmlFor="staff" className="block text-lg font-medium text-gray-700 sm:mt-px sm:pt-2">
                            Staff
                        </label> */}
                        <div className="mt-1 sm:mt-0 sm:col-span-6 w-80">
                            <select
                            name="staff"
                            id="staff"
                            value={staffid}
                            onChange={(e) => {
                                setStaffId(e.target.value)
                                setUrl("/history/staff/"+e.target.value)
                                setFlag(!flag)
                            }
                            }
                            className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-md px-2 h-10 border-2 border-gray-300 rounded-md"
                            >
                                <option value="" disabled>---Select a staff---</option>
                                {/* <option value="">No Staff</option> */}
                                {
                                    staffs.map((staff, index) => (
                                        <option key={staff.id} value={staff.id}>{staff.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {
            staffid===""?<></>:
            staffHistory[0]===undefined?
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
               <h5 className="text-center">No history found for this staff</h5>
            </div>
            :
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <h5 className="text-md font-bold">Name: &nbsp;<span className="text-md font-normal">{staffHistory[0].Staff.name}</span></h5>
                        </div>
                        <div>
                            <h5 className="text-md font-bold">Staff ID: &nbsp;<span className="text-md font-normal">{staffHistory[0].Staff.regid}</span></h5>
                        </div>
                        <div>
                            <h5 className="text-md font-bold">Designation: &nbsp;<span className="text-md font-normal">{staffHistory[0].Staff.designation}</span></h5>
                        </div>
                    </div>
                </div>
        }
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    {/* <MaterialTable
                  columns={columns}
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
                /> */}
                        <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Item ID
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Item Name
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Category
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Location
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Status
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Updated at
                            </th>
                            </tr>
                        </thead>
                        <tbody>
                            {staffHistory.map((staffhis, index) => (
                            <tr key={staffhis.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">DOM/{staffhis.Itemstatus.Itementry.Ledger.consumetype==="nonconsumable"?"NC":"C"}/VOL
                                            {staffhis.Itemstatus.Itementry.Ledger.volumeno}/PG
                                            {staffhis.Itemstatus.Itementry.Ledger.pageno}/SNo
                                            {staffhis.Itemstatus.Itementry.Ledger.sno}/
                                            {staffhis.Itemstatus.Itementry.createdAt.substring(0,4)}/
                                            {staffhis.Itemstatus.itemno}/
                                            {staffhis.Itemstatus.Itementry.quantity}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{staffhis.Itemstatus.Itementry.Item.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staffhis.Itemstatus.Itementry.Item.Category.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staffhis.Location===null?"---":staffhis.Location.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getStatusBadgeInTable(staffhis.paststatus)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staffhis.updatedAt.substring(0,10)}</td>
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
    )
}