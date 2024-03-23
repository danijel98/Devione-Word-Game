import React, { useState } from "react";
import styles from "./EnglishWordInput.module.css";
import { Bounce, ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";

interface EnglishWordInputProps {
  onSendWord: (word: string) => Promise<void>;
}

const validationSchema = Yup.object().shape({
  word: Yup.string()
    .required("Word is required")
    .min(2, "Word must be at least 2 characters long")
    .matches(/^\S+$/, "Word must not contain spaces"),
});

const EnglishWordInput: React.FC<EnglishWordInputProps> = ({ onSendWord }) => {
  const [word, setWord] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      await validationSchema.validate({ word });
      const isValid = await checkWordValidity(word);
      if (!isValid) {
        toast.error("Invalid word", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setError("");
        return;
      }
      await onSendWord(word);
      setWord("");
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setError(error.message);
      } else {
        console.error("Error handling word submission:", error);
        toast.error("An error occurred while submitting the word", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  };

  const checkWordValidity = async (word: string): Promise<boolean> => {
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      return response.ok;
    } catch (error) {
      console.error("Error checking word validity:", error);
      return false;
    }
  };

  return (
    <div className={styles.container}>
       <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Enter a word"
          className={styles.inputField}
        />
        <button onClick={handleSubmit} className={styles.submitButton}>
          <p className={styles.txtSubmitButton}>Submit Word</p>
        </button>
      </div>
      <div>{error && <p className={styles.error}>{error}</p>}</div>
    </div>
  );
};

export default EnglishWordInput;
