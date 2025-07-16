import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import '../AskQuestion.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { postQuestion } from '../api/questionAPI';

const tagOptions = [
  { value: 'react', label: 'React' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'css', label: 'CSS' },
  { value: 'node', label: 'Node.js' },
];

const AskQuestion = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert('Title and description cannot be empty');
      return;
    }

    const payload = {
      title: title.trim(),
      description: description.trim(),
      tags: selectedTags.map((tag) => tag.value),
      author: userId,
    };

    try {
      setLoading(true);
      await postQuestion(payload);
      navigate('/');
    } catch (err) {
      console.error('❌ Error submitting question:', err);
      alert('Error submitting question. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ask-question">
      <h2>Ask a Question</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          placeholder="Enter your question title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          placeholder="Describe your question in detail..."
          rows="6"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label htmlFor="tags">Tags</label>
        <Select
          id="tags"
          options={tagOptions}
          isMulti
          onChange={setSelectedTags}
          placeholder="Select relevant tags"
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Question'}
        </button>
      </form>
    </div>
  );
};

export default AskQuestion;

