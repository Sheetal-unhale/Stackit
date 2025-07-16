import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import '../QuestionDetail.css'

const QuestionDetail = () => {
  const { id } = useParams()
  const [question, setQuestion] = useState(null)
  const [answers, setAnswers] = useState([])
  const [newAnswer, setNewAnswer] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/questions/${id}`)
        setQuestion(res.data)
        setAnswers(res.data.answers || [])
        setLoading(false)
      } catch (err) {
        console.error('Error fetching question:', err)
        setLoading(false)
      }
    }

    fetchQuestion()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!newAnswer.trim()) return

    try {
      const res = await axios.post(`http://localhost:5000/api/questions/${id}/answers`, {
        content: newAnswer,
        author: 'Guest' // Replace with logged-in user id if available
      })
      setAnswers(prev => [...prev, res.data])
      setNewAnswer('')
    } catch (err) {
      console.error('Error posting answer:', err)
    }
  }

  if (loading) return <p className="loading-text">Loading question...</p>
  if (!question) return <p className="error-text">Question not found.</p>

  return (
    <div className="question-detail">
      <div className="question-box">
        <h2>{question.title}</h2>
        <p className="tags">Tags: {question.tags?.join(', ') || 'No tags'}</p>
        <div className="desc">{question.description}</div>
      </div>

      <div className="answers">
        <h3>{answers.length} Answer{answers.length !== 1 ? 's' : ''}</h3>
        {answers.map((ans, index) => (
          <div key={index} className="answer-card">
            <div className="vote-buttons">
              <button className="vote">👍</button>
              <button className="vote">👎</button>
            </div>
            <div className="answer-content">{ans.content}</div>
          </div>
        ))}
      </div>

      <form className="answer-form" onSubmit={handleSubmit}>
        <h3>Submit Your Answer</h3>
        <textarea
          rows="4"
          placeholder="Write your answer here..."
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          required
        />
        <button type="submit">Post Answer</button>
      </form>
    </div>
  )
}

export default QuestionDetail


