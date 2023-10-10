/* eslint-disable no-param-reassign */
import { type RootState } from '../store'
import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type SubjectPart, type Level, type Subject } from '../../types'

export type StudentMarkKeys = 'name' | Subject
export type SubjectsWithFinal = Subject | 'final'

type StudentMarks = {
  name: string
  reading: Partial<Record<SubjectPart, number>> & { total: number }
  useOfEnglish: Partial<Record<SubjectPart, number>> & { total: number }
  writing: Partial<Record<SubjectPart, number>> & { total: number }
  listening: Partial<Record<SubjectPart, number>> & { total: number }
  speaking: Partial<Record<SubjectPart, number>> & { total: number }
}

type DataState = {
  tables: Record<
    Level,
    {
      students: StudentMarks[]
      selectedStudent: number
    }
  >
  selectedLevel: Level
  studentDetailsModal: {
    opened: boolean
    studentPos: number
  }
}

const EMPTY_STUDENT: StudentMarks = {
  name: '',
  reading: {
    total: 0,
  },
  useOfEnglish: {
    total: 0,
  },
  writing: {
    total: 0,
  },
  listening: {
    total: 0,
  },
  speaking: {
    total: 0,
  },
}

const initialState: DataState = {
  tables: localStorage.getItem('tables')
    ? JSON.parse(localStorage.getItem('tables') as string)
    : {
        A2: {
          students: [EMPTY_STUDENT],
          selectedStudent: 0,
        },
        B1: {
          students: [
            {
              name: 'Marcos',
              reading: {
                total: 28,
              },
              useOfEnglish: {
                total: 0,
              },
              writing: {
                total: 38,
              },
              listening: {
                total: 24,
              },
              speaking: {
                total: 29,
              },
            },
            {
              name: 'María',
              reading: {
                total: 24,
              },
              useOfEnglish: {
                total: 0,
              },
              writing: {
                total: 27,
              },
              listening: {
                total: 15,
              },
              speaking: {
                total: 20,
              },
            },
            {
              name: 'Isaac',
              reading: {
                total: 18,
              },
              useOfEnglish: {
                total: 0,
              },
              writing: {
                total: 27,
              },
              listening: {
                total: 15,
              },
              speaking: {
                total: 20,
              },
            },
            {
              name: 'Hugo',
              reading: {
                total: 26,
              },
              useOfEnglish: {
                total: 0,
              },
              writing: {
                total: 37,
              },
              listening: {
                total: 15,
              },
              speaking: {
                total: 27,
              },
            },
            {
              name: 'Ramón',
              reading: {
                total: 24,
              },
              useOfEnglish: {
                total: 0,
              },
              writing: {
                total: 32,
              },
              listening: {
                total: 22,
              },
              speaking: {
                total: 27,
              },
            },
            {
              name: 'Nerea',
              reading: {
                total: 9,
              },
              useOfEnglish: {
                total: 0,
              },
              writing: {
                total: 10,
              },
              listening: {
                total: 7,
              },
              speaking: {
                total: 7,
              },
            },
            {
              name: 'Nazaret',
              reading: {
                total: 16,
              },
              useOfEnglish: {
                total: 0,
              },
              writing: {
                total: 27,
              },
              listening: {
                total: 12,
              },
              speaking: {
                total: 23,
              },
            },
          ],
          selectedStudent: 0,
        },
        B2: {
          students: [EMPTY_STUDENT],
          selectedStudent: 0,
        },
        C1: {
          students: [EMPTY_STUDENT],
          selectedStudent: 0,
        },
        C2: {
          students: [EMPTY_STUDENT],
          selectedStudent: 0,
        },
      },
  selectedLevel: localStorage.getItem('selectedLevel')
    ? JSON.parse(localStorage.getItem('selectedLevel') as string)
    : 'B1',
  studentDetailsModal: {
    opened: false,
    studentPos: 0,
  },
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
    setSelectedStudent: (state, action: PayloadAction<{ level: Level; row: number }>) => {
      const { level, row } = action.payload
      state.tables[level].selectedStudent = row
    },
    setStudentDetailsModalOpened: (
      state,
      action: PayloadAction<{ opened: boolean; row: number }>,
    ) => {
      const { opened, row } = action.payload
      state.studentDetailsModal = {
        opened,
        studentPos: row,
      }
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
  setSelectedStudent,
  setStudentDetailsModalOpened,
} = dataSlice.actions

export const selectTables = (state: RootState) => state.tables

export const selectTable = (state: RootState, level: Level) => state.tables[level]

export const selectTableStudents = (state: RootState, level: Level) => state.tables[level].students

export const selectTableStudentMarks = (state: RootState, level: Level, row: number) =>
  state.tables[level].students[row]

export const selectTableStudentMark = (state: RootState, level: Level, row: number, val: Subject) =>
  state.tables[level].students[row][val]

export const selectSelectedLevel = (state: RootState) => state.selectedLevel

export const selectSelectedStudent = (state: RootState, level: Level) =>
  state.tables[level].selectedStudent

export const selectStudentDetailsModal = (state: RootState) => state.studentDetailsModal
