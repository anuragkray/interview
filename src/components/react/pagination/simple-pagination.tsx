import { useState } from "react";
import "./styles.css";

const data = Array.from({ length: 13 }, (_, value) => ({
  id: value + 1,
  name: `Item-${value + 1}`,
}));

// Styling for button container
const buttonDiv = {
  display: "flex",
  justifyContent: "center",
  gap: "15px",
  marginTop: "10px",
};

// Styling for list items (small boxes)
const listItemStyle: React.CSSProperties = {
  background: "yellow",
  margin: "8px auto",
  width: "120px",
  padding: "10px 0",
  borderRadius: "8px",
  boxShadow: "0 2px 6px",
  fontWeight: "bold",
  textAlign: "center",
};

export function SimplePagination() {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="App">
      <h1>Paginated Item Boxes</h1>
      {/*List Rendering*/}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {currentData.map((item) => (
          <li key={item.id} style={listItemStyle}>
            {item.name}
          </li>
        ))}
      </ul>
        {/* Next & Back Button */}
      <div style={buttonDiv}>
        <button onClick={handleBack} disabled={currentPage === 0}>
          Prev
        </button>
        <button onClick={handleNext} disabled={currentPage === totalPages - 1}>
          Next
        </button>
      </div>
        {/* Total Number Dynamic Update */}
      <p style={{ color: "red" }}>
        Page {currentPage + 1} of {totalPages}
      </p>
    </div>
  );
}
