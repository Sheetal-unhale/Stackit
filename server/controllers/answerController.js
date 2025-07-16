import { db } from '../config/firebase.js'

export const addAnswer = async (req, res) => {
  try {
    const { questionId, content, user } = req.body

    const newAnswer = {
      questionId,
      content,
      user,
      createdAt: new Date().toISOString()
    }

    const docRef = await db.collection('answers').add(newAnswer)
    res.status(201).json({ id: docRef.id, ...newAnswer })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getAnswersByQuestionId = async (req, res) => {
  try {
    const { questionId } = req.params

    const snapshot = await db.collection('answers')
      .where('questionId', '==', questionId)
      .orderBy('createdAt', 'asc')
      .get()

    const answers = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    res.status(200).json(answers)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
