import React from "react";
import useSWR from "swr";
import API from "../../data/fetch";
import "handsontable/dist/handsontable.full.css";
import Handsontable from "handsontable";
import { Fragment } from "react";
import Button from "../../components";

class MyTable extends React.Component {
  constructor(props) {
    super(props);
    const key = "non-commercial-and-evaluation";
    this.state = {
      settings: {
        data: props.data,
        licenseKey: key,
        colHeaders: ["ID", "Nazwa", "ID Category"],
        rowHeaders: true,
        width: "75%",
        height: "300",
        dropdownMenu: true,
        filters: true,
        columns: [
          { data: "id", type: "numeric", with: 40 },
          { data: "name", type: "text" },
          { data: "categoryId", type: "numeric" },
        ],
        multiColumnSorting: { indicator: true },
        exportFile: true,
        fixedColumnsLeft: 1,
        columnSorting: true,
        selectionMode: 'single',
      },
    };
  }

  componentDidMount() {
    this.container = document.getElementById("hot-table");
    this.hot = new Handsontable(this.container, this.state.settings);
  }

  handleExport = () => {
    const exportPlugin = this.hot.getPlugin("exportFile");
    exportPlugin.downloadFile("csv", {
      filename: "MyFile",
      columnDelimiter: ";",
    });
  };

  updateValueInTable = (row, col, value) => {
    this.hot.setDataAtCell(row, col, value);
  };

  saveData = () => {
    const res = JSON.stringify({ data: this.hot.getData() });
    console.log({ res });
  };

  addRowAfter = () => {
    const ro = this.hot.getSelectedLast();
    const r = this.hot.countRows();
    console.log({ ro, r });
    this.hot.alter("insert_row", r)
  };

  render() {
    return (
      <Fragment>
        <button
          onClick={(e) => this.handleExport(e)}
          className="btn size-medium bg-blue text-white shadow hover-moveup"
        >
          Export to a .csv file
        </button>
        <button
          onClick={(e) => this.updateValueInTable(1, 2, "sdsdsd")}
          className="btn size-medium bg-green text-white shadow hover-moveup"
        >
          Update data
        </button>
        <button
          onClick={() => this.saveData()}
          className="btn size-medium bg-red text-white shadow hover-moveup"
        >
          Save data
        </button>
        <button
          onClick={() => this.addRowAfter()}
          className="btn size-medium bg-green text-white shadow hover-moveup"
        >
          Add data
        </button>
        <div id="hot-table"></div>
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
