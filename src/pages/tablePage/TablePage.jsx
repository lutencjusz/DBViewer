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
    this.state = {
      settings: {
        data: props.data,
        licenseKey: key,
        colHeaders: true,
        rowHeaders: true,
        // width: "1000",
        height: "700",
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

  saveData = () => {
    const res = JSON.stringify({ data: this.hot.getData() });
    console.log({ res });
  };

  addRowAfter = () => {
    const ro = this.hot.getSelected();
    this.hot.alter("insert_row", ro[0][0] + 1);
  };

  changeTable = async (newTable) => {
    const tables = ["dictionary", "categories"];
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
        // this.hot.loadData(data);
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
          onChange={(e) => console.log(e)}
          className="custom-select btn-primary my-4 mr-sm-2"
          id="1"
        >
          <option value="directory">directory</option>
          <option value="categories">categories</option>
        </select>
        <div
          className='card bg-primary shadow-soft border-light px-5 py-4 text-center'
        >
          <div id="hot-table"></div>
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
