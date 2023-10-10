/* eslint-disable no-unused-vars */
export type Level = 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
export type Subject = 'reading' | 'useOfEnglish' | 'writing' | 'listening' | 'speaking'
export type SubjectPart =
  | 'part1'
  | 'part2'
  | 'part3'
  | 'part4'
  | 'part5'
  | 'part6'
  | 'part7'
  | 'part8'
  | 'grammarVocabulary'
  | 'lexis'
  | 'discourse'
  | 'pronunciation'
  | 'interaction'
  | 'global'
  | 'total'

export type CambridgePoints = Record<
  Level,
  {
    minPoints: Record<Subject, number>
    maxPoints: Record<Subject, number>
  }
>

export type CambridgeScores = Record<Level, Record<number, number>>

export type SubjectParts = Record<
  Level,
  Record<Subject, { name: SubjectPart; maxPoints: number }[]>
>
