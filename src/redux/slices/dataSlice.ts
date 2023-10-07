/* eslint-disable no-param-reassign */
import type { RootState } from '../store'
import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import type { Level, Subject } from '../../types'

export type StudentMarkKeys = 'name' | Subject

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
    }
  >
  selectedTable: Level
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
  selectedTable: localStorage.getItem('selectedTable')
    ? JSON.parse(localStorage.getItem('selectedTable') as string)
    : 'B1',
}

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    reset: () => initialState,
    addStudent: (state, action: PayloadAction<{ table: Level }>) => {
      const { table } = action.payload
      state.tables[table].students.push(EMPTY_STUDENT)
    },
    removeStudent: (state, action: PayloadAction<{ table: Level; row: number }>) => {
      const { table, row } = action.payload
      const students = [...state.tables[table].students]
      students.splice(row, 1)
      if (students.length === 0) {
        students.push(EMPTY_STUDENT)
      }
      state.tables[table].students = students

      if (state.tables[table].selectedStudent >= students.length) {
        state.tables[table].selectedStudent = students.length - 1
      }
    },
    updateStudent: (
      state,
      action: PayloadAction<{ table: Level; row: number; data: StudentMarks }>,
    ) => {
      const { table, row, data } = action.payload
      state.tables[table].students[row] = data
    },
    clearStudents: (state, action: PayloadAction<{ table: Level }>) => {
      const { table } = action.payload
      state.tables[table].students = [EMPTY_STUDENT]
    },
    setSelectedTable: (state, action: PayloadAction<{ table: Level }>) => {
      const { table } = action.payload
      state.selectedTable = table
    },
    setSelectedStudent: (state, action: PayloadAction<{ table: Level; row: number }>) => {
      const { table, row } = action.payload
      state.tables[table].selectedStudent = row
    },
  },
})

export const {
  addStudent,
  clearStudents,
  removeStudent,
  reset,
  updateStudent,
  setSelectedTable,
  setSelectedStudent,
} = dataSlice.actions

export const selectTables = (state: RootState) => state.tables

export const selectTable = (state: RootState, table: Level) => state.tables[table]

export const selectTableStudents = (state: RootState, table: Level) => state.tables[table].students

export const selectTableStudentMarks = (state: RootState, table: Level, row: number) =>
  state.tables[table].students[row]

export const selectTableStudentMark = (
  state: RootState,
  table: Level,
  row: number,
  val: StudentMarkKeys,
) => state.tables[table].students[row][val]

export const selectSelectedTable = (state: RootState) => state.selectedTable

export const selectSelectedStudent = (state: RootState, table: Level) =>
  state.tables[table].selectedStudent
