import React, { useState } from "react";
import styles from "./EnglishWordInput.module.css";

interface EnglishWordInputProps {
  onSendWord: (word: string) => Promise<void>;
}

const EnglishWordInput: React.FC<EnglishWordInputProps> = ({ onSendWord }) => {
  const [word, setWord] = useState("");
  const [error, setError] = useState("");

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

  const handleSubmit = async () => {
    try {
      const isValid = await checkWordValidity(word);
      if (!isValid) {
        setError("Invalid word");
        return;
      }
      await onSendWord(word);
      setWord("");
    } catch (error) {
      console.error("Error handling word submission:", error);
    }
  };

  return (
    <div className={styles.container}>
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
