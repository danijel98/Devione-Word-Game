import React, { useState, useEffect } from "react";
import styles from "./Score.module.css";
import { Score as ScoreModel } from "../../model/Score";
import EnglishWordInput from "./wordInput/EnglishWordInput";
import { checkWord, filter } from "../../redux/actions/scoreAction";
import stylesPagination from "../../pagination/Pagination.module.css";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ReactPaginate from "react-paginate";

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
    checkWord(word)
      .then((response: any) => {
        setResult({
          palindrome: response.palindrome,
          almostPalindrome: response.almostPalindrome,
          word: response.word,
          uniqueLetters: response.uniqueLetters
      });
        getScores();
      })
      .catch((error: any) => {
        console.error("Error checking word:", error);
      });
  };

  const handlePageChange = (e: any) => {
    setPage(e.selected);
  };

  return (
    <div className={styles.scoreContainer}>
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
          {scores.map((score,index) => (
            <tr key={score.id}>
              <td>{index+1}</td>
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
