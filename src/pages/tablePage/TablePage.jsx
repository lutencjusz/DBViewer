import React from "react";
import useSWR from "swr";
import API from "../../data/fetch";
import "handsontable/dist/handsontable.full.css";
import Handsontable from "handsontable";
import { Fragment } from "react";
import { NeuButton, NeuDiv, NeuTextInput } from "neumorphism-react";

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
        width: "1000",
        height: "500",
        dropdownMenu: true,
        filters: true,
        exportFile: true,
        columnSorting: true,
        selectionMode: "single",
        outsideClickDeselects: false,
        stretchH: "all",
        bindRowsWithHeaders: true,
        manualColumnMove: true,
        activeHeaderClassName: 'ht__active_highlight',
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
    const tables = ['dictionary', 'categories']
    const tabCol = [];
    tabCol[tables[0]] = [
      {data: "id", renderer: "numeric"},
      {data: "description", renderer: "html", width:"100px"},
      {data: "name",  renderer: "html"},
      {data: "categoryId", renderer: "html"},
    ]
    tabCol[tables[1]] = [
      {data: "descYes", renderer: "html", width:"100px"},
      {data: "remember", renderer: "html", width:"100px"},
      {data: "id",  renderer: "numeric"},
      {data: "descNo", renderer: "html", width:"100px"},
      {data: "image", renderer: 'html', width:"100px"},
      {data: "name", renderer: "html", width:"100px"},
    ]
    console.log({newTable})
    if (tables.includes(newTable)) {
      const data = await API.table.getData(newTable);
      console.log({data})
      if (data) {
        console.log(Object.keys(data[0]))
        this.hot.updateSettings({
          colHeaders: Object.keys(data[0]),
          data: Object.values(data),
          columns: tabCol[newTable]
        })
        this.hot.render()
        // this.hot.loadData(data);
      }
    }
  };


  render() {
    return (
      <Fragment>
        <NeuButton
          onClick={(e) => this.handleExport(e)}
          color="#c5c5c5"
          distance={3}
          style={{ width: "100px", margin: "10px", fontSize: "12px" }}
        >
          Export
        </NeuButton>
        <NeuButton
          onClick={(e) => this.updateValueInTable(1, 2, "sdsdsd")}
          color="#c5c5c5"
          distance={3}
          style={{ width: "100px", margin: "10px", fontSize: "12px" }}
        >
          Update data
        </NeuButton>
        <NeuButton
          onClick={() => this.saveData()}
          color="#c5c5c5"
          distance={3}
          style={{ width: "100px", margin: "10px", fontSize: "12px" }}
        >
          Save data
        </NeuButton>
        <NeuButton
          onClick={() => this.addRowAfter()}
          color="#c5c5c5"
          distance={3}
          style={{ width: "100px", margin: "10px", fontSize: "12px" }}
        >
          Add data
        </NeuButton>
        <NeuTextInput
          placeholder="Type some text"
          color="#c5c5c5"
          width="100px"
          height="40px"
          distance={2}
          onChange={(newValue) => this.changeTable(newValue)}
          fontSize={12}
          fontColor="#000000"
          style={{ width: "200px", margin: "10px" }}
        />
        <NeuDiv
          color="#c5c5c5"
          radius={10}
          revert
          style={{ width: "1000px", marginLeft: "10px", padding: "10px" }}
        >
          <div id="hot-table"></div>
        </NeuDiv>
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
