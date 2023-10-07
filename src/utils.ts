import { CAMBRIDGE_POINTS, CAMBRIDGE_SCORES } from './constants'
import type { Level } from './types'

export function getPercentages(
  table: Level,
  reading: number,
  useOfEnglish: number,
  writing: number,
  listening: number,
  speaking: number,
) {
  let readingScore = 0
  let useOfEnglishScore = 0
  let writingScore = 0
  let listeningScore = 0
  let speakingScore = 0

  if (table in CAMBRIDGE_POINTS) {
    readingScore = (reading / CAMBRIDGE_POINTS[table].maxPoints.reading) * 100
    useOfEnglishScore = (useOfEnglish / CAMBRIDGE_POINTS[table].maxPoints.useOfEnglish) * 100
    writingScore = (writing / CAMBRIDGE_POINTS[table].maxPoints.writing) * 100
    listeningScore = (listening / CAMBRIDGE_POINTS[table].maxPoints.listening) * 100
    speakingScore = (speaking / CAMBRIDGE_POINTS[table].maxPoints.speaking) * 100
  }

  return {
    reading: readingScore,
    useOfEnglish: useOfEnglishScore,
    writing: writingScore,
    listening: listeningScore,
    speaking: speakingScore,
  }
}

export function getCambridgeMark(table: Level, percentage: number) {
  let cambridgeMark = 0

  const percentageInt = Math.trunc(percentage)
  if (percentageInt in CAMBRIDGE_SCORES[table]) {
    cambridgeMark = CAMBRIDGE_SCORES[table][percentageInt]
  }

  return cambridgeMark
}
