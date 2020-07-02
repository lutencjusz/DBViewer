import React from "react";
import useSWR from "swr";
import API from "../../data/fetch";
import "handsontable/dist/handsontable.full.css";
import Handsontable from "handsontable";
import { Fragment } from "react";

class MyTable extends React.Component {
  constructor(props) {
    super(props);
    const key = "non-commercial-and-evaluation";
    this.tObj = [];
    this.obj = new Map();
    this.actualTable = 'dictionary'
    this.state = {
      settings: {
        data: props.data,
        licenseKey: key,
        colHeaders: true,
        rowHeaders: false,
        // width: "1000",
        height: "400",
        dropdownMenu: true,
        filters: true,
        exportFile: true,
        columnSorting: true,
        selectionMode: "single",
        outsideClickDeselects: false,
        stretchH: "all",
        bindRowsWithHeaders: true,
        manualColumnMove: true,
        activeHeaderClassName: "ht__active_highlight",
        renderAllRows: true,
        renderAllColumns: true,
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

  joinHeaderArray = (headers, data) => {
    for (let j = 0; j < data.length; j++) {
      this.obj={};
      for (let i = 0; i < headers.length; i++) {
        this.obj[headers[i]] = data[j][i];
      }
      this.tObj.push(this.obj);
    }
    return this.tObj;
  };

  saveData = async() => {
    this.tObj = [];
    this.obj = {};
    const res = JSON.stringify({
      data: this.joinHeaderArray(this.hot.getColHeader(), this.hot.getData()),
    });
    const data = await API.table.saveData(this.actualTable, res);
    console.log({data})
  };

  addRowAfter = () => {
    const ro = this.hot.getSelected();
    this.hot.alter("insert_row", ro[0][0] + 1);
  };

  changeTable = async (newTable) => {
    const tables = ["dictionary", "categories", "candidates"];
    const tabCol = [];
    tabCol[tables[0]] = [
      { data: "id", renderer: "numeric" },
      { data: "description", renderer: "html", width: "100px" },
      { data: "name", renderer: "html" },
      { data: "categoryId", renderer: "html" },
    ];
    tabCol[tables[1]] = [
      { data: "descYes", renderer: "html", width: "100px" },
      { data: "remember", renderer: "html", width: "100px" },
      { data: "id", renderer: "numeric" },
      { data: "descNo", renderer: "html", width: "100px" },
      { data: "image", renderer: "html", width: "100px" },
      { data: "name", renderer: "html", width: "100px" },
    ];
    tabCol[tables[2]] = [
      { data: "modifiedCategory", renderer: "numeric" },
      { data: "customOption", renderer: "html", width: "100px" },
      { data: "description", renderer: "numeric" },
      { data: "id", renderer: "html", width: "100px" },
      { data: "name", renderer: "html", width: "100px" },
    ];
    console.log({ newTable });
    if (tables.includes(newTable)) {
      const data = await API.table.getData(newTable);
      console.log({ data });
      if (data) {
        console.log(Object.keys(data[0]));
        this.hot.updateSettings({
          colHeaders: Object.keys(data[0]),
          data: Object.values(data),
          columns: tabCol[newTable],
        });
        this.hot.render();
        this.actualTable = newTable;
      }
    }
  };

  render() {
    return (
      <Fragment>
        <button
          className="btn btn-primary text-dark animate-up-2 mr-2 mb-2"
          type="button"
          onClick={(e) => this.handleExport(e)}
        >
          Export
        </button>
        <button
          onClick={(e) => this.updateValueInTable(1, 2, "sdsdsd")}
          className="btn btn-primary text-secondary animate-up-2 mr-2 mb-2"
          type="button"
        >
          Update data
        </button>
        <button
          onClick={() => this.saveData()}
          className="btn btn-primary text-info animate-up-2 mr-2 mb-2"
          type="button"
        >
          Save data
        </button>
        <button
          onClick={() => this.addRowAfter()}
          className="btn btn-primary text-success animate-up-2 mr-2 mb-2"
          type="button"
        >
          Add data
        </button>

        <select
          onChange={(e) => this.changeTable(e.target.value)}
          className="custom-select btn-primary my-4 mr-sm-2"
          id="1"
        >
          <option value="dictionary">dictionary</option>
          <option value="categories">categories</option>
          <option value="candidates">candidates</option>
        </select>
        <div className="card bg-primary shadow-inset border-light p-3">
          <div className="card bg-primary shadow-soft border-light px-5 py-4 text-center">
            <div id="hot-table"></div>
          </div>
        </div>
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
