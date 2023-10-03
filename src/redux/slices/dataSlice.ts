/* eslint-disable no-param-reassign */
import type { RootState } from '@src/redux/store'
import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

type StudentMarkKeys = 'name' | 'reading' | 'useOfEnglish' | 'writing' | 'listening' | 'speaking'
interface StudentMarks {
  name: string
  reading: number
  useOfEnglish: number
  writing: number
  listening: number
  speaking: number
}

type LevelKeys = 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
interface Levels {
  A2: {
    students: StudentMarks[]
  }
  B1: {
    students: StudentMarks[]
  }
  B2: {
    students: StudentMarks[]
  }
  C1: {
    students: StudentMarks[]
  }
  C2: {
    students: StudentMarks[]
  }
}

interface DataState {
  tables: Levels
}

const EMPTY_STUDENT = {
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
        },
        B2: {
          students: [EMPTY_STUDENT],
        },
        C1: {
          students: [EMPTY_STUDENT],
        },
        C2: {
          students: [EMPTY_STUDENT],
        },
      },
}

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    reset: () => initialState,
    addStudent: (state, action: PayloadAction<{ table: LevelKeys }>) => {
      const { table } = action.payload
      state.tables[table].students.push(EMPTY_STUDENT)
    },
    removeStudent: (state, action: PayloadAction<{ table: LevelKeys; row: number }>) => {
      const { table, row } = action.payload
      const students = [...state.tables[table].students]
      students.splice(row, 1)
      if (students.length === 0) {
        students.push(EMPTY_STUDENT)
      }
      state.tables[table].students = students
    },
    updateStudent: (
      state,
      action: PayloadAction<{ table: LevelKeys; row: number; data: StudentMarks }>,
    ) => {
      const { table, row, data } = action.payload
      state.tables[table].students[row] = data
    },
    clearStudents: (state, action: PayloadAction<{ table: LevelKeys }>) => {
      const { table } = action.payload
      state.tables[table].students = [EMPTY_STUDENT]
    },
  },
})

export const { addStudent, clearStudents, removeStudent, reset, updateStudent } = dataSlice.actions

export const selectTables = (state: RootState) => state.tables

export const selectTable = (state: RootState, table: LevelKeys) => state.tables[table]

export const selectTableStudents = (state: RootState, table: LevelKeys) =>
  state.tables[table].students

export const selectTableStudentMarks = (state: RootState, table: LevelKeys, row: number) =>
  state.tables[table].students[row]

export const selectTableStudentMark = (
  state: RootState,
  table: LevelKeys,
  row: number,
  val: StudentMarkKeys,
) => state.tables[table].students[row][val]
