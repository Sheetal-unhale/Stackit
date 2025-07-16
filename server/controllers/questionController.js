import { db } from '../config/firebase.js'

export const getAllQuestions = async (req, res) => {
  try {
    const snapshot = await db.collection('questions').orderBy('createdAt', 'desc').get();
    const questions = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addQuestion = async (req, res) => {
  try {
    const { title, description, tags, user } = req.body;
    const newQuestion = {
      title,
      description,
      tags,
      user,
      createdAt: new Date().toISOString()
    };
    const docRef = await db.collection('questions').add(newQuestion);
    res.status(201).json({ id: docRef.id, ...newQuestion });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

