import { useState, useEffect } from "react";
import api from "../Axios";
import {Assigned, NotAssigned, Condemned, Missing, Spare, Transferred}  from './StatusBadges'

export default function ItemHistoryTracker() {

    const [itemHistory, setItemHistory] = useState([]);
    const [itemid, setItemId] = useState("");
    const [items, setItems] = useState([]);
    const [url, setUrl] = useState("");
    const [flag, setFlag] = useState(false);

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
        api.get("/item/status/all")
        .then((res)=> {
            console.log(res.status)
            console.log(res.data)
            setItems(res.data)
        });
        if(url!=="") {
            api.get(url)
            .then((res)=> {
                console.log(res.status)
                console.log(res.data)
                setItemHistory(res.data)
            });
        }
    },[flag, url])

    return(
        <>
        <div className="flow-root max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5">
            <div className="float-left">
                <h1 className="text-2xl font-semibold text-gray-900">Item History</h1>
            </div>
            <div className="float-right">
                <div className="my-8 sm:my-0 flex flex-row">
                    <div className="px-2 py-1 sm:px-4 py-1">
                        <h1 className="text-md sm:text-xl">Select Item: &nbsp;
                            {/* {getStatusBadge()} */}
                        </h1>
                    </div>
                    <div>
                        <div className="sm:grid sm:grid-cols-6 sm:gap-4 sm:items-start">
                        {/* <label htmlFor="item" className="block text-lg font-medium text-gray-700 sm:mt-px sm:pt-2">
                            Item
                        </label> */}
                        <div className="mt-1 sm:mt-0 sm:col-span-6 w-80">
                            <select
                            name="item"
                            id="item"
                            value={itemid}
                            onChange={(e) => {
                                setItemId(e.target.value)
                                setUrl("/history/item/"+e.target.value)
                                setFlag(!flag)
                            }
                            }
                            className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-md px-2 h-10 border-2 border-gray-300 rounded-md"
                            >
                                <option value="" disabled>---Select an item---</option>
                                {/* <option value="">No Item</option> */}
                                {
                                    items.map((item, index) => (
                                        <option key={item.id} value={item.id}>
                                            DOM/{item.Itementry.Ledger.consumetype==="nonconsumable"?"NC":"C"}/VOL
                                            {item.Itementry.Ledger.volumeno}/PG
                                            {item.Itementry.Ledger.pageno}/SNo
                                            {item.Itementry.Ledger.sno}/
                                            {item.Itementry.createdAt.substring(0,4)}/
                                            {item.itemno}/
                                            {item.Itementry.quantity}
                                        </option>
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
            itemid===""?<></>:
            itemHistory[0]===undefined?
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
               <h5 className="text-center">No history found for this item</h5>
            </div>
            :
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <h5 className="text-md font-bold">Item name: &nbsp;<span className="text-md font-normal">{itemHistory[0].Itemstatus.Itementry.Item.name}</span></h5>
                        </div>
                        <div>
                            <h5 className="text-md font-bold">Category: &nbsp;<span className="text-md font-normal">{itemHistory[0].Itemstatus.Itementry.Item.Category.name}</span></h5>
                        </div>
                        <div>
                            <h5 className="text-md font-bold">Volume no: &nbsp;<span className="text-md font-normal">{itemHistory[0].Itemstatus.Itementry.Ledger.volumeno}</span></h5>
                        </div>
                        <div>
                            <h5 className="text-md font-bold">Page no: &nbsp;<span className="text-md font-normal">{itemHistory[0].Itemstatus.Itementry.Ledger.pageno}</span></h5>
                        </div>
                        <div>
                            <h5 className="text-md font-bold">S no: &nbsp;<span className="text-md font-normal">{itemHistory[0].Itemstatus.Itementry.Ledger.sno}</span></h5>
                        </div>
                        <div>
                            <h5 className="text-md font-bold">Type: &nbsp;<span className="text-md font-normal">{itemHistory[0].Itemstatus.Itementry.Ledger.consumetype}</span></h5>
                        </div>
                    </div>
                </div>
        }
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
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
                            Staff Name
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
                        {itemHistory.map((itemhis, index) => (
                        <tr key={itemhis.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{itemhis.Staff===null?"---":itemhis.Staff.regid}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{itemhis.Staff===null?"---":itemhis.Staff.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{itemhis.Location===null?"---":itemhis.Location.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getStatusBadgeInTable(itemhis.paststatus)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{itemhis.updatedAt.substring(0,10)}</td>
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