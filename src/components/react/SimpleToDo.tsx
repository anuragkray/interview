import { useState } from "react";
import "./styles.css";

const nameList = [
  { id: "1", name: "Anurag" },
  { id: "2", name: "Vinit" },
];

export default function App() {
  const [list, setList] = useState(nameList);
  const [enterName, setEnterName] = useState("");
  const [editID, setEditID] = useState<string | null>(null);

  // Handle name input
  const handleName = (event: any) => {
    setEnterName(event.target.value);
  };

  // Handle submit button
  const handleSubmit = () => {
    if (!enterName.trim()) return; // Prevent empty submissions

    if (editID) {
      // Update the existing item
      setList((prev) =>
        prev.map((item) =>
          item.id === editID ? { ...item, name: enterName } : item
        )
      );
      setEditID(null); // Reset editing state
    } else {
      // Add a new item
      setList((prev) => [
        ...prev,
        { id: Date.now().toString(), name: enterName },
      ]);
    }

    setEnterName(""); // Clear input field
  };

  // Handle delete button
  const handleDelete = (buttonId: string) => {
    setList((prev) => prev.filter((item) => item.id !== buttonId));
  };

  // Handle edit button
  const handleEdit = (id: string) => {
    const itemToEdit = list.find((item) => item.id === id);
    if (itemToEdit) {
      setEnterName(itemToEdit.name); // Pre-fill input field with the name
      setEditID(id); // Set the ID of the item being edited
    }
  };

  return (
    <div className="App">
      <label htmlFor="name">Enter</label>
      <input
        name="name"
        type="text"
        value={enterName}
        onChange={handleName}
        placeholder="Enter a name"
      />
      <button onClick={handleSubmit}>{editID ? "Save" : "Submit"}</button>
      <ul>
        {list.map((item) => (
          <div key={item.id}>
            <li>{item.name}</li>
            <button onClick={() => handleEdit(item.id)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </div>
        ))}
      </ul>
    </div>
  );
}
