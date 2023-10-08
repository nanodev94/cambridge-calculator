/* eslint-disable no-unused-vars */
export type Level = 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
export type Subject = 'reading' | 'useOfEnglish' | 'writing' | 'listening' | 'speaking'
export type SubjectParts = 'part1' | 'part2' | 'part3' | 'part4' | 'part5' | 'part6' | 'final'

export type CambridgePoints = Record<
  Level,
  {
    minPoints: Record<Subject, number>
    maxPoints: Record<Subject, number>
  }
>

export type CambridgeScores = Record<Level, Record<number, number>>
