import express from 'express'
import { db } from '../config/firebase.js'

const router = express.Router()

//  Create a new question
router.post('/', async (req, res) => {
  try {
    const { title, description, tags } = req.body

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required.' })
    }

    const newQuestion = {
      title,
      description,
      tags: tags || [],
      answers: [],
      createdAt: new Date()
    }

    const newDoc = await db.collection('questions').add(newQuestion)
    res.status(201).json({ id: newDoc.id, ...newQuestion })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

//  Paginated GET: All questions
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 5
    const offset = (page - 1) * limit

    const allSnapshot = await db.collection('questions').orderBy('createdAt', 'desc').get()
    const total = allSnapshot.size

    const paginatedData = allSnapshot.docs
      .slice(offset, offset + limit)
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

    res.json({ data: paginatedData, total })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get question by ID
router.get('/:id', async (req, res) => {
  try {
    const doc = await db.collection('questions').doc(req.params.id).get()

    if (!doc.exists) {
      return res.status(404).json({ message: 'Question not found' })
    }

    res.json({ id: doc.id, ...doc.data() })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

//  Add answer to question by ID
router.post('/:id/answers', async (req, res) => {
  try {
    const { content } = req.body

    if (!content) {
      return res.status(400).json({ message: 'Answer content is required.' })
    }

    const questionRef = db.collection('questions').doc(req.params.id)
    const doc = await questionRef.get()

    if (!doc.exists) {
      return res.status(404).json({ message: 'Question not found' })
    }

    const existingAnswers = doc.data().answers || []
    const newAnswer = {
      content,
      votes: 0,
      createdAt: new Date()
    }

    await questionRef.update({
      answers: [...existingAnswers, newAnswer]
    })

    res.status(201).json(newAnswer)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
