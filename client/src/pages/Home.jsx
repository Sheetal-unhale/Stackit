import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPaginatedQuestions } from '../api/questionAPI';
import './Home.css';

const ITEMS_PER_PAGE = 5;

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await getPaginatedQuestions(currentPage, ITEMS_PER_PAGE);
        setQuestions(res.data); 
        setTotalQuestions(res.total);
        setTotalPages(Math.ceil(res.total / ITEMS_PER_PAGE));
      } catch (err) {
        console.error('Failed to fetch questions:', err);
        setQuestions([]);
        setTotalPages(1);
      }
    };
    fetchQuestions();
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="home-wrapper">
      <div className="home-content">
        <h1>Welcome to StackIt</h1>
        <p>A minimal Q&A forum to ask and answer your coding doubts.</p>
        <button onClick={() => navigate('/ask')}>Ask a Question</button>

        {questions.length > 0 ? (
          <ul className="question-list">
            {questions.map((q) => (
              <li
                key={q.id}
                className="question-card"
                onClick={() => navigate(`/question/${q.id}`)}
              >
                <h3>{q.title}</h3>
                <p>{q.description.slice(0, 100)}...</p>
                <small>Tags: {q.tags.join(', ')}</small>
              </li>
            ))}
          </ul>
        ) : (
          <p>No questions available.</p>
        )}

        {/* Pagination */}
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {'<'}
          </button>
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {'>'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;


