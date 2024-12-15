import { useState, useMemo, useCallback, ChangeEvent } from "react";

//API Response
const apiResponse: { [key: string]: string[] } = {
  bihar: ["siwan", "patna", "nalanda"],
  up: ["Allahabad", "Gorakhpur", "Deoria"],
  karnataka: ["Bengaluru", "Bagalkot", "Davanagere"],
};
export default function DependentDropdown() {
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");

  //handler for dropdown
  const handleDependentDropdown = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = event.target;
      switch (name) {
        case "state":
          setState(value);
          break;
        case "district":
          setDistrict(value);
          break;
        default:
          console.log("Nothing tos set");
          break;
      }
    },
    []
  );
  // Memoized district list based on selected state
  const districtList = useMemo(() => {
    return state ? apiResponse[state] || [] : [];
  }, [state]);

  return (
    <div className="App">
      <h1>Dependept Dropdown</h1>
      {/* First Dropdown */}
      <label htmlFor="stateName">Select state</label>
      <select name="state" value={state} onChange={handleDependentDropdown}>
        <option>Select state</option>
        {Object.keys(apiResponse).map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      {/* Second dropdown */}
      <label htmlFor="districtName">Select district</label>
      <select
        name="district"
        value={district}
        onChange={handleDependentDropdown}
      >
        <option>Select district</option>
        {districtList &&
          districtList.map((item: any) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
      </select>
    </div>
  );
}
