import { useState, useEffect } from "react";
import api from "../Axios";
import ViewLedgerDetailsModal from "./ViewLedgerDetailsModal";

export default function ViewAssets() {

    const [assets, setAssets] = useState([]);
    const [show, setShow] = useState(false);
    const [ledgerData, setLedgerData] = useState([]);
    // const assets = [
    //     { serialNo: 'DOM-2020-1/3', category: 'Furniture', itemName: 'Table', quantity: '3', price: '10000' },
    //     { serialNo: 'DOM-2019-2/8', category: 'IT', itemName: 'Dell Laptop', quantity: '5', price: '52000' },
    //     { serialNo: 'DOM-2021-17/20', category: 'Electronics', itemName: 'Tube Light', quantity: '40', price: '100' },
    //     // More people...
    //   ]
    useEffect(()=>{
        api.get("/item/entry")
      .then((res)=> {
        console.log(res.status)
        console.log(res.data["datas"])
        setAssets(res.data["datas"])
      });
    },[])

    return(
        <>
        <ViewLedgerDetailsModal show={show} onCloseDetails={setShow} data={ledgerData} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5">
            <h1 className="text-2xl font-semibold text-gray-900">View Assets</h1>
        </div>
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
                            Item Name
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Brand
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
                            Quantity
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Total Price
                        </th>
                        <th
                            scope="col"
                            className="pl-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Last Updated
                        </th>
                        <th
                            scope="col"
                            className="pr-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Ledger Details
                        </th>
                        {/* <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Edit</span>
                        </th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {assets.map((asset, index) => (
                        <tr key={asset.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{asset.Item.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asset.brand}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asset.Item.Category.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asset.quantity}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asset.totalprice}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asset.updatedAt.substring(0,10)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                            <button 
                                onClick={()=>{
                                    setShow(true)
                                    setLedgerData(asset)
                                }}
                                className="text-indigo-600 hover:text-indigo-900"
                                >
                                View
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
    )
}