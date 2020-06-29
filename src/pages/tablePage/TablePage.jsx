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
        colHeaders: ["ID", "Nazwa", "ID Category"],
        rowHeaders: true,
        width: "600",
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
        columnSorting: true,
        selectionMode: "single",
        outsideClickDeselects: false,
        stretchH: "all",
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
          onChange={(newValue) => console.log("newValue : ", newValue)}
          fontSize={12}
          fontColor="#000000"
          style={{ width: "200px", margin: "10px" }}
        />
        <NeuDiv
          color="#c5c5c5"
          radius={10}
          revert
          style={{ width: "600px", marginLeft: "10px", padding: "10px" }}
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
