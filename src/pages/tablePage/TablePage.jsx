import React from "react";
import useSWR from "swr";
import API from "../../data/fetch";
import "handsontable/dist/handsontable.full.css";
import { HotTable } from "@handsontable/react";

const key = "non-commercial-and-evaluation";

const TablePage = () => {
  const { data: table } = useSWR("dictionary", API.table.getData);
  const excelTable = table ? Object.values(table) : [];
  console.log({ excelTable });

  //   return table
  //     ? table.map((table) => (
  //         <div key={table.id}>
  //           {table.id}
  //           {table.name}
  //         </div>
  //       ))
  //     : null;

  return table ? (
    <div id="hot-app">
      <HotTable
        key={key}
        data={excelTable}
        colHeaders={["Pierwsza kolumna", "Druga kolumna", "Trzecia kolumna"]}
        rowHeaders={true}
        width="600"
        height="300"
        dropdownMenu={true}
      />
    </div>
  ) : null;
};

export default TablePage;
