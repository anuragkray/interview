import { useEffect, useMemo, useState } from "react";
import "./styles.css";

// Define interface for data items
interface DataItem {
  id: number;
  name: string;
}

// Debouncing logic
const useDebounce = (value:string, delayTime:number) => {
  const [debounceValue, setDebounceValue] = useState("");

  useEffect(() => {
    const delayHandler = setTimeout(() => {
      setDebounceValue(value);
    }, delayTime);

    return () => clearTimeout(delayHandler);
  }, [value, delayTime]);

  return debounceValue;
};

// ------------------ Styles as constants ------------------
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    backgroundColor: "#f5f5f5",
    textAlign: "center" as const,
  },
  heading: {
    marginBottom: "15px",
    color: "#333",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
    textAlign: "left" as const,
  },
  input: {
    width: "100%",
    padding: "8px 10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  listItem: {
    backgroundColor: "#ffd700",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "6px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    fontWeight: "bold",
  },
  noData: {
    color: "red",
    fontStyle: "italic",
  },
};

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<DataItem[]>([]);
  const debounceSearch = useDebounce(searchTerm, 800);

  // API Fetching
  useEffect(() => {
    setData([
      { id: 1, name: "anurag" },
      { id: 2, name: "kp" },
      { id: 3, name: "praful" },
      { id: 4, name: "mrinal" },
      { id: 5, name: "amit" },
    ]);
  }, []);

  // Handle search
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Filter the data based on debounceSearch
  const debounceDataFiltered = useMemo(() => {
    return data.filter((item: DataItem) =>
      item.name.toLowerCase().includes(debounceSearch.toLowerCase())
    );
  }, [debounceSearch, data]);

  return (
    <div style={styles.container}>
      <h5 style={styles.heading}>Delay Value: {debounceSearch}</h5>

      <label htmlFor="search" style={styles.label}>
        Enter name...
      </label>
      <input
        id="search"
        type="search"
        value={searchTerm}
        onChange={handleSearch}
        style={styles.input}
        placeholder="Type to search..."
      />

      <ul style={styles.list}>
        {debounceDataFiltered.length > 0 ? (
          debounceDataFiltered.map((item) => (
            <li key={item.id} style={styles.listItem}>
              {item.name}
            </li>
          ))
        ) : (
          <span style={styles.noData}>No Data Found...</span>
        )}
      </ul>
    </div>
  );
}
