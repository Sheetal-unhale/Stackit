import express from 'express'
import { addAnswer, getAnswersByQuestionId } from '../controllers/answerController.js'

const router = express.Router()

router.post('/add', addAnswer)
router.get('/:questionId', getAnswersByQuestionId)

export default router
