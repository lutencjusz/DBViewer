export const getData = async (table = 'dictionary') => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL_AMZ}/DEV/api/v1/table?name="${table}"`
  );
  return await response.json();
};

export const saveData = async (table = 'dictionary', data) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL_AMZ}/DEV/api/v1/table?name="${table}"`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    }
  );
  return await response.json();
};
