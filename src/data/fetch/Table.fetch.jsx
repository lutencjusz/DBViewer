export const getData = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL_AMZ}/DEV/api/v1/table?name="dictionary"`
  );
  return await response.json();
};
