import { useCallback, useState } from "react";
import AppStyle from "./App.module.css";
import ToDo, { CardComponent } from "./components/react/todo/todo";
import Searching from "./components/react/searching/searching";
import CountDown from "./components/react/countdown/CountDown";
import Timer from "./components/react/timer/Timer";
import Sort from "./components/react/sorting/Sorting";
import Pagination from "./components/react/pagination/pagination";
import DependentDropdown from "./components/react/depDropdown/DepDropdown";
import UseCallbackExample from "./hooks/use-callback";

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
  const deleteHandler = useCallback((id: string) => {
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
    <div className={AppStyle["main__container"]}>
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
              {/* SEARCHING COMPONENT */}
              <Searching />
              {/* Count Down Timer */}
              <CountDown />
              <Sort />
            </section>
            {/* SECTION_2 */}
            <div className={AppStyle["divider"]}></div>
            {/* SECTION_3 */}
            <section className={AppStyle["section-item"]}>
              {formData.map((element) => (
                <CardComponent
                  key={element.id}
                  id={element.id}
                  name={element.name}
                  onDelete={deleteHandler}
                  onEdit={editHandler}
                />
              ))}
              <Timer />
            </section>
          </div>
          <div>
            <Pagination />
            <DependentDropdown />
          </div>
        </section>
        <section>
          {/* Use Callback explanation */}
          <UseCallbackExample />
        </section>
      </main>
    </div>
  );
}

export default App;
