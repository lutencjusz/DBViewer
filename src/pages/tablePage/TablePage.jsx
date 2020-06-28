import React from "react";
import useSWR from "swr";
import API from "../../data/fetch";
import "handsontable/dist/handsontable.full.css";
import { HotTable } from "@handsontable/react";
import Handsontable from "handsontable";
import { Fragment } from "react";

const handleExport = (event) => {
  console.log({ event });
};

class MyTable extends React.Component {
  constructor(props) {
    super(props);
    const key = "non-commercial-and-evaluation";
    this.state = {
      settings: {
        data: props.data,
        licenseKey: key ,
        colHeaders: ["ID", "Nazwa", "ID Category"],
        rowHeaders: true,
        width: "1000",
        height: "300",
        dropdownMenu: true,
        filters: true,
        columns: [
          { data: "id", type: "numeric", with: 40 },
          { data: "name", type: "text" },
          { data: "categoryId", type: "text" },
        ],
        multiColumnSorting: { indicator: true },
        exportFile: true,
        fixedColumnsLeft: 1,
      },
    };
  }
  render() {
    return (
      <Fragment>
        <HotTable id="hot-table" settings={this.state.settings} />
        <button
          id="export-csv"
          onClick={(e) => handleExport(e)}
          className="btn size-medium bg-blue text-white shadow hover-moveup"
        >
          Export to a .csv file
        </button>
      </Fragment>
    );
  }
}

const TablePage = () => {
  const { data: table } = useSWR("dictionary", API.table.getData);
  const excelTable = table ? Object.values(table) : [];

  return table ? (
    <Fragment>
      <MyTable data={excelTable} />
    </Fragment>
  ) : null;
};

export default TablePage;
