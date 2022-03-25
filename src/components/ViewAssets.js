import { useState } from "react"


export default function ViewAssets() {



    const users = [
        { firstName: 'Jane Cooper', lastName: 'Regional Paradigm Technician', role: 'Admin', email: 'jane.cooper@example.com' },
        { firstName: 'Cody Fisher', lastName: 'Product Directives Officer', role: 'Owner', email: 'cody.fisher@example.com' },
        // More people...
      ]
      

    return(
        <>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5">
            <h1 className="text-2xl font-semibold text-gray-900">View Users</h1>
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
                            First Name
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Last Name
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Email
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Role
                        </th>
                        {/* <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Edit</span>
                        </th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                        <tr key={user.email} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.firstName}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lastName}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                            {/* <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button 
                                onClick={()=>{
                                    setShow(true)
                                    setEditData(user)
                                }}
                                className="text-indigo-600 hover:text-indigo-900"
                                >
                                Edit
                            </button>
                            </td> */}
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