import { useState, useEffect, useMemo } from "react";

const Sort = () => {
  const [data, setData] = useState([]);
  const [sortingButton, setSortingButton] = useState("asc");

  //fetching the data
  useEffect(() => {
    (async () => {
      try {
        const apiResponse = await fetch("https://dummyjson.com/todos?limit=10");
        const response = await apiResponse.json();
        setData(response.todos);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  //Handle button
  const buttonHandler = () => {
    setSortingButton((prevData) => (prevData === "asc" ? "dsc" : "asc"));
  };

  //sorting list
  const sortingList = useMemo(() => {
    return [...data].sort((a, b) => {
      if (sortingButton === "asc") {
        return a.todo.toLowerCase().localeCompare(b.todo.toLowerCase());
      } else {
        return b.todo.toLowerCase().localeCompare(a.todo.toLowerCase());
      }
    });
  }, [sortingButton, data]);

  return (
    <>
      <h4>Sorting</h4>
      <button onClick={buttonHandler}>
        {sortingButton === "asc" ? "Sort in ASC" : "Sort in DSC"}
      </button>
      {sortingList.map((item) => (
        <p key={item.id}>{item.todo}</p>
      ))}
    </>
  );
};
export default Sort;
