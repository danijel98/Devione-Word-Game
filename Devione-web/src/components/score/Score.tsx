import React, { useState, useEffect } from "react";
import styles from "./Score.module.css";
import { Score as ScoreModel } from "../../model/Score";
import EnglishWordInput from "./wordInput/EnglishWordInput";
import { checkWord, filter } from "../../redux/actions/scoreAction";
import stylesPagination from "../../pagination/Pagination.module.css";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ReactPaginate from "react-paginate";
import { Bounce, ToastContainer, toast } from "react-toastify";

interface Result {
  palindrome: boolean;
  almostPalindrome: boolean;
  word: string;
  uniqueLetters: number;
}

interface ScoreProps {
  search: string;
}

const Score: React.FC<ScoreProps> = (props) => {
  const { search } = props;
  const [scores, setScores] = useState<ScoreModel[]>([]);
  const [result, setResult] = useState<Result>({
    palindrome: false,
    almostPalindrome: false,
    word: "",
    uniqueLetters: 0,
  });
  const [page, setPage] = useState<number>(0);
  const [numberOfElements, setNumberOfElements] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [message, setMessage] = useState<string>("");


  useEffect(() => {
    if (page >= 0 || page <= totalPages - 1) {
      getScores();
    }
  }, [page]);

  useEffect(() => {
    if (page === 0) {
      getScores();
    } else {
      setPage(0);
    }
  }, [search]);

  const getScores = async () => {
    await filter(search, page, 10).then((response: any) => {
      if (!response.error) {
        setScores([...response.data]);
        setNumberOfElements(Number(response.headers["x-total-count"]));
        setTotalPages(Number(response.headers["x-total-page"]));
      }
    });
  };

  const handleCheckWord = async (word: string) => {
    try {
      const response = await checkWord(word);
      if (!response.error) {
        console.log("r " ,response);
        const updatedResult = {
          ...response,
          palindrome: response.palindrome === 'true' ? true : false,
          almostPalindrome: response.almostPalindrome === 'true' ? true : false,
          word: response.word,
          uniqueLetters: Number(response.uniqueLetters),
        };
        console.log("updated: ",updatedResult)
        setResult(updatedResult);
        const message = createMessage(updatedResult);
        setMessage(message);
        toast.success(message, {
          position: "bottom-center",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        getScores();
      }
    } catch (error:any) {
      console.error("Error checking word:", error.response.data);
      toast.error(error.response.data, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };
  

  const createMessage = (result: Result): string => {
    console.log("Result", result);
    if (result.palindrome) {
      return `The word "${
        result.word
      }" has been successfully added. Unique letters: ${
        Number(result.uniqueLetters) + 3
      } (palindrome)`;
    } else if (result.almostPalindrome) {
      return `The word "${
        result.word
      }" has been successfully added. Unique letters: ${
        Number(result.uniqueLetters) + 2
      } (almost palindrome)`;
    } else {
      return `The word "${
        result.word
      }" has been successfully added. Unique letters: ${Number(
        result.uniqueLetters
      )}`;
    }
  };

  const handlePageChange = (e: any) => {
    setPage(e.selected);
  };

  return (
    <div className={styles.scoreContainer}>
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
      <EnglishWordInput onSendWord={handleCheckWord} />
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Word</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => (
            <tr key={score.id}>
              <td>{index + 1}</td>
              <td>{score.word}</td>
              <td>{score.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={stylesPagination.paginationContainer}>
        <ReactPaginate
          forcePage={page}
          containerClassName={stylesPagination.pagination}
          pageClassName={stylesPagination.page}
          pageLinkClassName={stylesPagination.pageLink}
          activeLinkClassName={stylesPagination.pageLinkActive}
          activeClassName={stylesPagination.activePage}
          previousLinkClassName={
            page <= 0
              ? stylesPagination.previousNextPageDisabled
              : stylesPagination.previousNextPage
          }
          nextLinkClassName={
            page >= totalPages - 1
              ? stylesPagination.previousNextPageDisabled
              : stylesPagination.previousNextPage
          }
          breakLabel="..."
          nextLabel={
            totalPages === 0 ? null : (
              <KeyboardArrowRightIcon
                style={{ width: "1.1em", height: "1.1em", color: "white" }}
              />
            )
          }
          onPageChange={handlePageChange}
          marginPagesDisplayed={1}
          pageRangeDisplayed={4}
          pageCount={totalPages}
          previousLabel={
            totalPages === 0 ? null : (
              <KeyboardArrowLeftIcon
                style={{ width: "1.1em", height: "1.1em", color: "white" }}
              />
            )
          }
        />
      </div>
    </div>
  );
};

export default Score;
