import { ChangeEvent, useState } from "react";
import "./styles.css";

// ------------------ Styles as constants ------------------
const styles = {
  container: {
    maxWidth: "350px",
    margin: "50px auto",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px",
    backgroundColor: "#f9f9f9",
    fontFamily: "Arial, sans-serif",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "bold",
    color: "#333",
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  button: {
    padding: "10px 15px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "black",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background-color 0.2s ease",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
};

export default function App() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const handlePassword = (event:ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div style={styles.container}>
      <label htmlFor="password" style={styles.label}>
        Enter Password
      </label>

      <div style={styles.inputContainer}>
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={handlePassword}
          placeholder="Enter your password"
          style={styles.input}
        />
        <button onClick={handleShowPassword} style={styles.button}>
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
}
