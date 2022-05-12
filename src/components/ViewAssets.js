import { useState, useEffect } from "react";
import api from "../Axios";
import ViewLedgerDetailsModal from "./ViewLedgerDetailsModal";
import { MDBDataTableV5 } from "mdbreact";
import { checkArray } from "../utils/arrayCheck";

export default function ViewAssets() {
  const [assets, setAssets] = useState([]);
  const [show, setShow] = useState(false);
  const [ledgerData, setLedgerData] = useState([]);

  const [datatable, setDatatable] = useState({
    columns: [
      {
        label: "Item Name",
        field: "iname",
        width: 150,
        attributes: {
          "aria-controls": "DataTable",
          "aria-label": "Name",
        },
      },
      {
        label: "Brand",
        field: "brand",
        width: 270,
      },
      {
        label: "Category",
        field: "cname",
        width: 200,
      },
      {
        label: "Quantity",
        field: "quantity",
        sort: "asc",
        width: 100,
      },
      {
        label: "Total Price",
        field: "totalprice",
        sort: "disabled",
        width: 150,
      },
      {
        label: "Last Updated",
        field: "updatedAt",
        sort: "disabled",
        width: 100,
      },
      {
        label: "Ledger Details",
        field: "ledger",
        sort: "disabled",
        width: 100,
      },
    ],
    rows: [{}],
  });
  // const assets = [
  //     { serialNo: 'DOM-2020-1/3', category: 'Furniture', itemName: 'Table', quantity: '3', price: '10000' },
  //     { serialNo: 'DOM-2019-2/8', category: 'IT', itemName: 'Dell Laptop', quantity: '5', price: '52000' },
  //     { serialNo: 'DOM-2021-17/20', category: 'Electronics', itemName: 'Tube Light', quantity: '40', price: '100' },
  //     // More people...
  //   ]
  // const checkArray = (arr) => {
  //   console.log(typeof arr);
  //   if (typeof arr == "object") {
  //     return [];
  //   } else {
  //     return arr;
  //   }
  // };
  useEffect(() => {
    api.get("/item/entry").then((res) => {
      console.log(res.status);
      console.log(res.data["datas"]);
      setDatatable({
        ...datatable,
        rows: res.data["datas"].map((da) => ({
          iname: da.Item.name,
          brand: da.brand,
          cname: da.Item.Category.name,
          brand: da.brand,
          quantity: da.quantity,
          totalprice: da.totalprice,
          updatedAt: da.updatedAt,
          ledger: (
            <button
              className="text-indigo-600 hover:text-indigo-900"
              onClick={() => {
                setLedgerData(da);
                setShow(!show);
              }}
            >
              View
            </button>
          ),
        })),
      });
    });
  }, []);

  console.log("assets", datatable);

  return (
    <>
      <ViewLedgerDetailsModal
        show={show}
        onCloseDetails={setShow}
        data={ledgerData}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5">
        <h1 className="text-2xl font-semibold text-gray-900">View Assets</h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                {checkArray(datatable.rows) ? (
                  <MDBDataTableV5
                    className="custo"
                    hover
                    entriesOptions={[5, 10, 15]}
                    entries={5}
                    pagesAmount={4}
                    data={datatable}
                    searchBottom={false}
                    searchTop
                    fullPagination
                  />
                ) : (
                  <div>
                    <h1>No data Found</h1>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
