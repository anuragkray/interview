import {
  ChangeEvent,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from "react";

//Custom Hook
export const useDebounce = (value: string, time: number) => {
  const [state, setState] = useState<string>("");
  useEffect(() => {
    const interval = setInterval(() => {
      setState(value);
    }, time);
    return () => clearInterval(interval);
  }, [value]);
  return state;
};

//custom search component
interface CusSearchProps {
  labelName: string;
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}
const CustomSearchComponent = ({
  labelName,
  onChange,
  value,
  name,
}: CusSearchProps) => {
  const deferValue = useDeferredValue(value);
  return (
    <>
      <label htmlFor="searchData">{labelName}</label>
      <input name={name} type="search" value={deferValue} onChange={onChange} />
    </>
  );
};

//Main search components
const Searching = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchList, setSearchList] = useState<string[]>([]);
  const deferedSearch = useDebounce(searchInput, 1000);
  //Fetching SearchList from API
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("src/json/sorting.json");
        const data = await response.json();
        const searchList = data.map((element: any) => element.steam);
        setSearchList(searchList);
      } catch (error) {
        throw new Error(error as string);
      }
    })();
  }, []);

  const handleSearchData = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { value } = event.target;
    setSearchInput(value);
  };

  //Searching logic
  const searchListForRender = useMemo(() => {
    const searchData = searchList.filter((element) =>
      element.toLowerCase().includes(deferedSearch.toLowerCase())
    );
    return deferedSearch
      ? searchData.length > 0
        ? searchData
        : ["No data found"]
      : searchList;
  }, [deferedSearch, searchList]);

  return (
    <div>
      <CustomSearchComponent
        labelName="Search Skill"
        name="searchSkill"
        value={searchInput}
        onChange={handleSearchData}
      />
      {searchListForRender.map((element) => (
        <div key={element} style={{ border: "1px dashed pink" }}>
          <h3>{element}</h3>
        </div>
      ))}
    </div>
  );
};
export default Searching;
