import data from "./data.json";

export const fetchData = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
