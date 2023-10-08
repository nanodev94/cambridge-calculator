/* eslint-disable no-param-reassign */
import { type RootState } from '../store'
import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type Level, type Subject } from '../../types'

export type StudentMarkKeys = 'name' | Subject
export type SubjectsWithFinal = Subject | 'final'

type StudentMarks = {
  name: string
  reading: number
  useOfEnglish: number
  writing: number
  listening: number
  speaking: number
}

type DataState = {
  tables: Record<
    Level,
    {
      students: StudentMarks[]
      selectedStudent: number
      selectedSubject: SubjectsWithFinal
    }
  >
  selectedLevel: Level
}

const EMPTY_STUDENT: StudentMarks = {
  name: '',
  reading: 0,
  useOfEnglish: 0,
  writing: 0,
  listening: 0,
  speaking: 0,
}

const initialState: DataState = {
  tables: localStorage.getItem('tables')
    ? JSON.parse(localStorage.getItem('tables') as string)
    : {
        A2: {
          students: [EMPTY_STUDENT],
          selectedStudent: 0,
          selectedSubject: 'final',
        },
        B1: {
          students: [
            {
              name: 'Marcos',
              reading: 28,
              useOfEnglish: 0,
              writing: 38,
              listening: 24,
              speaking: 29,
            },
            {
              name: 'María',
              reading: 24,
              useOfEnglish: 0,
              writing: 27,
              listening: 15,
              speaking: 20,
            },
            {
              name: 'Isaac',
              reading: 18,
              useOfEnglish: 0,
              writing: 27,
              listening: 15,
              speaking: 20,
            },
            {
              name: 'Hugo',
              reading: 26,
              useOfEnglish: 0,
              writing: 37,
              listening: 15,
              speaking: 27,
            },
            {
              name: 'Ramón',
              reading: 24,
              useOfEnglish: 0,
              writing: 32,
              listening: 22,
              speaking: 27,
            },
            {
              name: 'Nerea',
              reading: 9,
              useOfEnglish: 0,
              writing: 10,
              listening: 7,
              speaking: 7,
            },
            {
              name: 'Nazaret',
              reading: 16,
              useOfEnglish: 0,
              writing: 27,
              listening: 12,
              speaking: 23,
            },
          ],
          selectedStudent: 0,
          selectedSubject: 'final',
        },
        B2: {
          students: [EMPTY_STUDENT],
          selectedStudent: 0,
          selectedSubject: 'final',
        },
        C1: {
          students: [EMPTY_STUDENT],
          selectedStudent: 0,
          selectedSubject: 'final',
        },
        C2: {
          students: [EMPTY_STUDENT],
          selectedStudent: 0,
          selectedSubject: 'final',
        },
      },
  selectedLevel: localStorage.getItem('selectedLevel')
    ? JSON.parse(localStorage.getItem('selectedLevel') as string)
    : 'B1',
}

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    reset: () => initialState,
    addStudent: (state, action: PayloadAction<{ level: Level }>) => {
      const { level } = action.payload
      state.tables[level].students.push(EMPTY_STUDENT)
    },
    removeStudent: (state, action: PayloadAction<{ level: Level; row: number }>) => {
      const { level, row } = action.payload
      const students = [...state.tables[level].students]
      students.splice(row, 1)
      if (students.length === 0) {
        students.push(EMPTY_STUDENT)
      }
      state.tables[level].students = students

      if (state.tables[level].selectedStudent >= students.length) {
        state.tables[level].selectedStudent = students.length - 1
      }
    },
    updateStudent: (
      state,
      action: PayloadAction<{ level: Level; row: number; data: StudentMarks }>,
    ) => {
      const { level, row, data } = action.payload
      state.tables[level].students[row] = data
    },
    clearStudents: (state, action: PayloadAction<{ level: Level }>) => {
      const { level } = action.payload
      state.tables[level].students = [EMPTY_STUDENT]
      state.tables[level].selectedStudent = 0
    },
    setSelectedLevel: (state, action: PayloadAction<{ level: Level }>) => {
      const { level } = action.payload
      state.selectedLevel = level
    },
    setSelectedSubject: (
      state,
      action: PayloadAction<{ level: Level; subject: SubjectsWithFinal }>,
    ) => {
      const { level, subject } = action.payload
      state.tables[level].selectedSubject = subject
    },
    setSelectedStudent: (state, action: PayloadAction<{ level: Level; row: number }>) => {
      const { level, row } = action.payload
      state.tables[level].selectedStudent = row
    },
  },
})

export const {
  addStudent,
  clearStudents,
  removeStudent,
  reset,
  updateStudent,
  setSelectedLevel,
  setSelectedSubject,
  setSelectedStudent,
} = dataSlice.actions

export const selectTables = (state: RootState) => state.tables

export const selectTable = (state: RootState, level: Level) => state.tables[level]

export const selectTableStudents = (state: RootState, level: Level) => state.tables[level].students

export const selectTableStudentMarks = (state: RootState, level: Level, row: number) =>
  state.tables[level].students[row]

export const selectTableStudentMark = (
  state: RootState,
  level: Level,
  row: number,
  val: StudentMarkKeys,
) => state.tables[level].students[row][val]

export const selectSelectedLevel = (state: RootState) => state.selectedLevel

export const selectSelectedSubject = (state: RootState, level: Level) =>
  state.tables[level].selectedSubject

export const selectSelectedStudent = (state: RootState, level: Level) =>
  state.tables[level].selectedStudent
