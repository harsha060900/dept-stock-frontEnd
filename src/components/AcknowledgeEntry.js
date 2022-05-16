import { useState, useEffect } from "react";
import api from "../Axios";
import Swal from "sweetalert2";

export default function AcknowledgeEntry() {

    const [nonConsumableEntries, setNonConsumableEntries] = useState([]);
    const [flag, setFlag] = useState(false);

    function handleAccept(values) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Start assigning!'
          }).then((result) => {
            if (result.isConfirmed) {
                try {
                    api
                    .post(
                        "/item/status/accept",
                        JSON.stringify({
                            status: "notassigned",
                            itementryid: values.id,
                            quantity: values.Itementry.quantity
                        }),
                        {
                        headers: { "Content-Type": "application/json" },
                        }
                    )
                    .then((res) => {
                        console.log(res.status);
                        if (res.status === 200) {
                            setFlag(!flag);
                            Swal.fire(
                                'Assigned!',
                                'All items have been successfully Assigned.',
                                'success'
                            )
                        }
                      })
                      .catch (err=> {
                        console.log("err", err.response);
                        Swal.fire({
                          icon: 'error',
                          title: 'Oops...',
                          text: err.response.data.errors[0].message,
                        })
                      })
                }
                catch (err) {
                    console.log(err);
                }
            }
          })
    }
 
    function handleDecline(values) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Decline!'
          }).then((result) => {
            if (result.isConfirmed) {
                try {
                    api
                    .put(
                        "/item/status/decline",
                        JSON.stringify({
                            itementryid: values.id
                        }),
                        {
                        headers: { "Content-Type": "application/json" },
                        }
                    )
                    .then((res) => {
                        console.log(res.status);
                        if (res.status === 200) {
                            setFlag(!flag);
                            Swal.fire(
                                'Declined!',
                                'Declined successfully.',
                                'success'
                            )
                        }
                      });
                }
                catch (err) {
                    console.log(err);
                }
            }
          })
    }

    useEffect(()=>{
        api.get("/entry/nonconsumable")
      .then((res)=> {
        console.log(res.status)
        console.log(res.data)
        setNonConsumableEntries(res.data)
      });
    },[flag])

    console.log(flag)

    return(
        <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-5">
                <h1 className="text-2xl font-semibold text-gray-900">Acknowledge Entry</h1>
            </div>
            {nonConsumableEntries.length===0
            ?
            <h1 className="text-center text-xl">No entries to be acknowledged</h1>
            :
            <>
            {nonConsumableEntries.map((nce)=> (
                <div key={nce.id} className="flex justify-center my-5">
                    <div className="flex flex-col md:flex-row block p-6 rounded-lg shadow-lg bg-white w-full mx-6 sm:mx-10 lg:mx-16">
                        <div className="xs:w-12/12 md:w-11/12">
                            <h1 className="text-gray-900 text-xl leading-tight font-medium mb-2 text-center">{nce.Itementry.Item.name}</h1>
                            {/* <p className="text-gray-700 text-base mb-4">
                            Some quick example text to build on the card title and make up the bulk of the card's
                            content.
                            </p> */}
                            <div className="flex justify-center">
                                <div className="w-3/4 flex flex-col md:flex-row justify-between">
                                    <div className="my-3 md:my-2">
                                        <h3 className="text-md font-mono font-bold my-2 text-center">Category</h3>
                                        <h3 className="text-md text-center">{nce.Itementry.Item.Category.name}</h3>
                                    </div>
                                    <div className="my-3">
                                        <h3 className="text-md font-mono font-bold my-2 text-center">Quantity</h3>
                                        <h3 className="text-md text-center">{nce.Itementry.quantity}</h3>
                                    </div>
                                    <div className="my-3">
                                        <h3 className="text-md font-mono font-bold my-2 text-center">Total Price</h3>
                                        <h3 className="text-md text-center">{nce.Itementry.totalprice}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="xs:w-12/12 md:w-1/12 flex justify-between md:flex-col xs:flex-row">
                            <button 
                                type="button" 
                                onClick={()=>{handleAccept(nce)}}
                                className="w-5/12 md:w-full inline-block my-1 py-2.5 bg-green-600 text-white text-center font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out"
                                >
                                    Accept
                            </button>
                            <button 
                                type="button" 
                                onClick={()=>{handleDecline(nce)}}
                                className="w-5/12 md:w-full inline-block my-1 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                                >
                                    Decline
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            </>
}
        </>
    )
}