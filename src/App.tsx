import { useCallback, useEffect, useState } from "react";
import AppStyle from "./App.module.css";
import ToDo, { CardComponent } from "./components/todo/todo";

interface TODODataProps {
  id: string;
  name: string;
}
function App() {
  const [formData, setFormData] = useState<TODODataProps[]>([]);
  const [editedValue, setEditedValue] = useState<string>("");
  const [editId, setEditId] = useState<string | null>(null);

  //TO catch todo data
  const handleToDoData = useCallback(
    (data: string) => {
      if (editId) {
        setFormData((prevData) =>
          prevData.map((item) =>
            item.id === editId ? { ...item, name: data } : item
          )
        );
        setEditId(null);
      } else {
        setFormData((prevData) => [
          ...prevData,
          { id: new Date().toISOString(), name: data },
        ]);
      }
      setEditedValue("");
    },
    [editId]
  );
  // To handle delete data
  const handleDelete = useCallback((id: string) => {
    setFormData((prevData) => prevData.filter((item) => item.id !== id));
  }, []);

  const editHandler = useCallback(
    (id: string) => {
      const item = formData.find((item) => item.id === id);
      if (item) {
        setEditedValue(item.name);
        setEditId(id);
      }
    },
    [formData]
  );
  return (
    <main className={AppStyle["app-container"]}>
      <section className={AppStyle["app-container-item"]}>
        {/* HEADING */}
        <h4>Interview question solution</h4>
        <div className={AppStyle["app-container-section"]}>
          {/* SECTION_1 */}
          <section className={AppStyle["section-item"]}>
            <ToDo
              ToDoDatahandler={handleToDoData}
              editValue={editedValue}
              setEditedValue={setEditedValue}
            />
          </section>
          {/* SECTION_2 */}
          <div className={AppStyle["divider"]}></div>
          {/* SECTION_3 */}
          <section className={AppStyle["section-item"]}>
            {formData.map((element) => (
              <CardComponent
                key={element.id}
                name={element.name}
                id={element.id}
                onDelete={handleDelete}
                onEdit={editHandler}
              />
            ))}
          </section>
        </div>
      </section>
    </main>
  );
}

export default App;
