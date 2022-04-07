import { useEffect, useState } from "react";
import axios from "axios";

function DisplayCategories({flag}) {

    const [categories, setCategories] = useState([]);
    
    useEffect(()=>{
        axios.get("http://localhost:5000/category")
      .then((res)=> {
        console.log(res.status)
        console.log(res.data)
        setCategories(res.data)
      });
    },[flag])

    return(
        <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
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
                        </table>
                    </div>
                    </div>
                </div>
            </div>
            </div>
        </>
    );
}

export default DisplayCategories;