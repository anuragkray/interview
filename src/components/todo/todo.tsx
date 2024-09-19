import { ChangeEvent, FormEvent, useState } from "react";
import ToDoStyle from "./todo.module.css";

interface UserInputProps {
  labelName: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
//Input component: We can also create in another file
const UserInput = ({ labelName, value, onChange }: UserInputProps) => {
  return (
    <div className={ToDoStyle["custom-input"]}>
      <label htmlFor="username">{labelName}</label>
      <input name="user-name" value={value} onChange={onChange} />
    </div>
  );
};
//Main TODO Component
interface ToDoProps {
  ToDoDatahandler: (data: string) => void;
  editValue: string;
  setEditedValue: (value: string) => void;
}
const ToDo = (props: ToDoProps) => {
  const [userInput, setUserInput] = useState<string>("");

  const handleUserInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    props.setEditedValue(value);
  };

  const handSubmit = (event: FormEvent) => {
    event.preventDefault();
    props.ToDoDatahandler(props.editValue);
    props.setEditedValue("");
  };
  console.log("editevalue", props.editValue);
  return (
    <form className={ToDoStyle["todo-form"]} onSubmit={handSubmit}>
      <UserInput
        labelName="Enter Name"
        value={props.editValue}
        onChange={handleUserInput}
      />
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

// Custom card component
interface CardComponentProps {
  id: string;
  name: string;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}
export const CardComponent = ({
  id,
  name,
  onDelete,
  onEdit,
}: CardComponentProps) => {
  const handleDelete = (id: string) => {
    onDelete(id);
  };
  const handleEdit = (id: string) => {
    onEdit(id);
  };
  return (
    <div className={ToDoStyle["custom-card"]}>
      <h3>{name}</h3>
      <button onClick={() => handleDelete(id)}>Delete</button>
      <button onClick={() => handleEdit(id)}>Edit</button>
    </div>
  );
};
export default ToDo;
