import { useState, useEffect } from "react";
import api from "../Axios";
import ViewLedgerDetailsModal from "./ViewLedgerDetailsModal";
import { checkArray } from "../utils/arrayCheck";

import DatePicker, { DateObject } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import MaterialTable from "material-table";

import jsPDF from "jspdf";
import "jspdf-autotable";

const format = "YYYY/MM/DD";

export default function ViewAssets() {
  const [assets, setAssets] = useState([]);
  const [show, setShow] = useState(false);
  const [ledgerData, setLedgerData] = useState([]);
  const [dates, setDates] = useState([]);
  const [render, setRender] = useState(false);

  const [datatable, setDatatable] = useState({
    columns: [
      { title: "Item Name", field: "iname" },
      {
        title: "Brand",
        field: "brand",
      },
      {
        title: "Category",
        field: "cname",
      },
      {
        title: "Quantity",
        field: "quantity",
        sort: "asc",
      },
      {
        title: "Total Price",
        field: "totalprice",
      },
      {
        title: "Last Updated",
        field: "updatedAt",
      },
      {
        title: "Ledger Details",
        field: "ledger",
        filtering: false,
        export: false
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
          cname: da.Item.Category.name,
          brand: da.brand === null ? "---" : da.brand,
          quantity: da.quantity,
          totalprice: da.totalprice,
          updatedAt: da.updatedAt.substring(0, 10),
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
    console.log("executing");
  }, [render]);

  const setLoad = (dateObjects) => {
    // if dates[0].format()
    setDates(dateObjects.map((dat) => dat.format()));
    // console.log(dateObjects.map((dat) => dat.format()));
    // setRender(!render)
    if (dateObjects.length == 0) {
      console.log("null in filter date");
      setRender(!render);
    }
  };

  const fliterByDate = () => {
    api
      .get(`http://localhost:5000/entry/year?from=${dates[0]}&to=${dates[1]}`)
      .then((res) => {
        console.log("filter:", res);
        setDatatable({
          ...datatable,
          rows: res.data.map((info) => ({
            iname: info.Item.name,
            cname: info.Item.Category.name,
            brand: info.brand === null ? "---" : info.brand,
            quantity: info.quantity,
            totalprice: info.totalprice,
            updatedAt: info.updatedAt.substring(0, 10),
            ledger: (
              <button
                className="text-indigo-600 hover:text-indigo-900"
                onClick={() => {
                  setLedgerData(info);
                  setShow(!show);
                }}
              >
                View
              </button>
            ),
          })),
        });
      })
      .catch((err) => {
        console.log("filter:", err);
      });
  };

  // console.log(
  //   "assets",
  //   dates.map((dat) => dat.format())
  // );
  console.log("dates:", dates);

  const downloadPdf = () => {
    const doc = new jsPDF();

    doc.setFont("courier", "bold");
    doc.text("DEPARTMENT OF MATHEMATICS", 63, 25);
    doc.text("Anna University", 79, 34);

    doc.autoTable({
      columns: datatable.columns
        .map((col) => ({ ...col, datakey: col.field }))
        .filter(),
      body: datatable.rows,
    });

    doc.save("Assets.pdf");
  };

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
      {/* --------------------- FILTER ----------------------------- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden sm:rounded-lg text-center">
                <DatePicker
                  value={dates}
                  onChange={
                    (dateObjects) => {
                      // setDates
                      setLoad(dateObjects);
                    }
                    // setRender(!render)
                  }
                  range
                  sort
                  format={format}
                  calendarPosition="bottom-center"
                  plugins={[<DatePanel />]}
                  className="date-picker"
                />
                {/* <div className="px-4 py-3 sm:px-6"> */}
                <button
                  type="submit"
                  className="btn-filter inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={fliterByDate}
                >
                  Filter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
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
                    fullPagination
                  />
                ) : (
                  <div>
                    <h1>No data Found</h1>
                  </div>
                )} */}
                <MaterialTable
                  icons={{
                    Filter: () => (
                      <span
                        className="material-icons MuiIcon-root MuiIcon-fontSizeSmall"
                        aria-hidden="true"
                        title="Search"
                      >
                        search
                      </span>
                    ),
                  }}
                  title="Department Of Mathematics"
                  columns={datatable.columns}
                  data={datatable.rows}
                  options={{
                    showTitle: false,
                    filtering: true,
                    exportButton: {
                      csv:false,
                      pdf:true
                    },
                  }}
                />
                {/* {checkArray(datatable.rows) ? (
                  <MaterialTable
                  columns={[
                    { title: 'Adı', field: 'name' },
                    { title: 'Soyadı', field: 'surname' },
                    { title: 'Doğum Yılı', field: 'birthYear', type: 'numeric' },
                    { title: 'Doğum Yeri', field: 'birthCity', lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' } }
                  ]}
                  data={[{ name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 }]}
                  title="Demo Title"
                />
                ) : (
                  <div>
                    <h1>No data Found</h1>
                  </div>
                )} */}

                {/* <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    onClick={downloadPdf}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Download as PDF
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
