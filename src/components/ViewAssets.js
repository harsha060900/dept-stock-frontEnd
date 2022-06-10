import { useState, useEffect, useRef, MutableRefObject } from "react";
import api from "../Axios";
import ViewLedgerDetailsModal from "./ViewLedgerDetailsModal";
// import { checkArray } from "../utils/arrayCheck";
import annaUnivLogo from "../images/logo.jpeg";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import MaterialTable from "material-table";

import jsPDF from "jspdf";
import "jspdf-autotable";

const format = "YYYY/MM/DD";

export default function ViewAssets() {
  // const tableRef = useRef();

  // console.log('tabRef', tableRef.current?.dataManager?.data);
  // const [assets, setAssets] = useState([]);
  const [show, setShow] = useState(false);
  const [ledgerData, setLedgerData] = useState([]);
  const [dates, setDates] = useState([]);
  const [render, setRender] = useState(false);

  const columns = [
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
      title: "Created At",
      field: "createdAt",
    },
    {
      title: "Ledger Details",
      field: "ledger",
      filtering: false,
    },
  ];

  const columns1 = [
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
      title: "Created At",
      field: "createdAt",
    },
  ];

  const [datatable, setDatatable] = useState({});

  // const assets = [
  //     { serialNo: 'DOM-2020-1/3', category: 'Furniture', itemName: 'Table', quantity: '3', price: '10000' },
  //     { serialNo: 'DOM-2019-2/8', category: 'IT', itemName: 'Dell Laptop', quantity: '5', price: '52000' },
  //     { serialNo: 'DOM-2021-17/20', category: 'Electronics', itemName: 'Tube Light', quantity: '40', price: '100' },
  //     // More people...
  //   ]

  // function saveFilters(tableRef) {
  //   return function handler() {
  //     const columns = tableRef?.current?.state.columns.map((column) =>
  //       console.log('column:', column)
  //         (
  //           {
  //             field: column.field,
  //             filterValue: column.tableData.filterValue
  //           }));
  //     // console.log(JSON.stringify(columns, null, 2));
  //   };
  // }

  useEffect(() => {
    api.get("/item/entry").then((res) => {
      console.log(res.status);
      console.log(res.data);
      setDatatable({
        rows: res.data.map((da) => ({
          iname: da.Item.name,
          cname: da.Item.Category.name,
          brand: da.brand === null ? "---" : da.brand,
          quantity: da.quantity,
          totalprice: da.totalprice,
          createdAt: da.createdAt.substring(0, 10),
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
        // setDatatable({...datatable.columns})
        setDatatable({
          ...datatable,
          rows: res.data.map((info) => ({
            iname: info.Item.name,
            cname: info.Item.Category.name,
            brand: info.brand === null ? "---" : info.brand,
            quantity: info.quantity,
            totalprice: info.totalprice,
            createdAt: info.createdAt.substring(0, 10),
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

    doc.autoTable({
      columns: columns1.map(item => ({
        ...item, header: item.title, dataKey: item.field
      })),
      body: datatable.rows,
      margin: { top: 61},
      styles: {
        overflow: 'linebreak',
        fontSize: 12,
        valign: 'middle'
      },
    })
    
    const pageCount = doc.internal.getNumberOfPages();
    doc.setFont("courier", "bold");
    doc.setFontSize(20)
    for (var i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.addImage(annaUnivLogo, 'JPEG', 91.5, 12, 25, 25);
      doc.text("DEPARTMENT OF MATHEMATICS", 53, 47);
    }
    doc.setFont("courier", "bold");
    doc.setFontSize(15)
    for (i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.text("List of Item Entries", 74, 55);
    }
    doc.setFont('helvetica', 'italic')
    doc.setFontSize(12)
    for (i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.text(String(i), doc.internal.pageSize.width / 2, 289, {
        align: 'center'
      })
    }
    doc.autoPrint();
    doc.save("Department Of Matematics");
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
                {/* <button onClick={saveFilters(tableRef)}>Filters</button> */}
                <MaterialTable
                  // tableRef={tableRef}
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
                  columns={columns}
                  data={datatable.rows}
                  options={{
                    showTitle: false,
                    filtering: true,
                  }}
                  actions={[
                    {
                      icon: () => <div className="bg-gray-50 text-right">
                        <button
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
                        >
                          Download
                        </button>
                      </div>,
                      onClick: () => downloadPdf(),
                      isFreeAction: true
                    }
                  ]}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}