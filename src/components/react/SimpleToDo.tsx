import { useState } from "react";
import "./styles.css";

// --- Styles Object ---
const styles = {
  app: {
    fontFamily: "sans-serif",
    maxWidth: "400px",
    margin: "50px auto",
    textAlign: "center" as const,
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    color: "#333",
    marginBottom: "20px",
  },
  label: {
    display: "block",
    fontWeight: "bold",
    marginBottom: "8px",
  },
  inputContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    width: "60%",
    border: "2px solid #ccc",
    borderRadius: "6px",
    fontSize: "14px",
    outline: "none",
    transition: "0.3s",
  },
  button: {
    padding: "10px 16px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
    fontSize: "14px",
    transition: "0.3s",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
  list: {
    listStyle: "none",
    padding: 0,
    marginTop: "10px",
  },
  listItem: {
    border: "2px solid #ccc",
    borderRadius: "8px",
    padding: "10px",
    marginBottom: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  itemButtons: {
    display: "flex",
    gap: "6px",
  },
  editButton: {
    backgroundColor: "#ffc107",
    border: "none",
    borderRadius: "6px",
    color: "#000",
    padding: "6px 10px",
    cursor: "pointer",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    border: "none",
    borderRadius: "6px",
    color: "#fff",
    padding: "6px 10px",
    cursor: "pointer",
  },
};

// --- Component ---
const initialData = Array.from({ length: 2 }, (_, index) => ({
  id: index + 1,
  name: `Friend ${index + 1}`,
}));

export default function SimpleToDo() {
  const [data, setData] = useState(initialData);
  const [inputValue, setInputValue] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    setData((prev) => prev.filter((item) => item.id !== id));
    if (editId === id) {
      setEditId(null);
      setInputValue("");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(event.target.value);

  const handleAdd = () => {
    if (!inputValue.trim()) return;

    setData((prev) => [
      ...prev,
      { id: prev.length + 1, name: inputValue.trim() },
    ]);

    setInputValue("");
  };

  const handleEdit = (id: number) => {
    const itemToEdit = data.find((item) => item.id === id);

    if (itemToEdit) {
      setEditId(id);
      setInputValue(itemToEdit.name);
    }
  };

  const handleUpdate = () => {
    if (!inputValue.trim()) return;
    setData((prev) =>
      prev.map((item) =>
        item.id === editId ? { ...item, name: inputValue.trim() } : item
      )
    );
    setInputValue("");
    setEditId(null);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      editId ? handleUpdate() : handleAdd();
    }
  };

  return (
    <div style={styles.app}>
      <h1 style={styles.heading}>User Manager</h1>

      <label htmlFor="name" style={styles.label}>
        Enter name:
      </label>
      <div style={styles.inputContainer}>
        <input
          type="text"
          id="name"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type name..."
          style={styles.input}
        />
        <button
          onClick={!editId ? handleAdd : handleUpdate}
          style={{
            ...styles.button,
            backgroundColor: editId ? "#28a745" : styles.button.backgroundColor,
          }}
        >
          {editId ? "Update" : "Add"}
        </button>
      </div>

      <ul style={styles.list}>
        {data.map((item) => (
          <li key={item.id} style={styles.listItem}>
            {item.name}
            <div style={styles.itemButtons}>
              <button
                style={styles.editButton}
                onClick={() => handleEdit(item.id)}
              >
                Edit
              </button>
              <button
                style={styles.deleteButton}
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
