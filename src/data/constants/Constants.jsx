export const tables = ["dictionary", "categories", "candidates"];

export const tabCol = [];
tabCol[tables[0]] = [
  { data: "id", renderer: "numeric" },
  { data: "description", renderer: "html", width: "100px" },
  { data: "name", renderer: "html" },
  { data: "categoryId", renderer: "numeric" },
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
  { data: "modifiedCategory", renderer: "html" },
  { data: "customOption", renderer: "html", width: "100px" },
  { data: "description", renderer: "html" },
  { data: "id", renderer: "numeric", width: "100px" },
  { data: "name", renderer: "html", width: "100px" },
];