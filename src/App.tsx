import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import {
  selectTableStudents,
  selectTables,
  selectSelectedStudent,
  selectSelectedTable,
  setSelectedTable,
} from './redux/slices/dataSlice'
import FloatingMenu from './components/FloatingMenu'
import Table from './components/Table'
import Scale from './components/Scale'
import styles from './App.module.css'
import type { Level } from './types'

const {
  container,
  header,
  content,
  dataSection,
  tabsContainer,
  tab,
  tabSelected,
  tabContent,
  infoSection,
  studentResult,
  studentScale,
} = styles

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const tables = useAppSelector(selectTables)
  const selectedTable = useAppSelector(selectSelectedTable)
  const data = useAppSelector((state) => selectTableStudents(state, selectedTable))
  const selectedStudent = useAppSelector((state) => selectSelectedStudent(state, selectedTable))

  useEffect(() => {
    localStorage.setItem('selectedTable', JSON.stringify(selectedTable))
  }, [selectedTable])

  useEffect(() => {
    localStorage.setItem('tables', JSON.stringify(tables))
  }, [data, selectedStudent])

  const changeTable = (table: Level) => {
    dispatch(setSelectedTable({ table }))
  }

  return (
    <div className={container}>
      <header className={header}>
        <span>Cambridge Calculator</span>
        <FloatingMenu />
      </header>
      <div className={content}>
        <div className={dataSection}>
          <div className={tabsContainer}>
            {Object.keys(tables).map((table) => {
              const isSelected = selectedTable === table
              return (
                <span
                  key={table}
                  className={`${tab} ${isSelected ? tabSelected : ''}`}
                  onClick={() => {
                    changeTable(table as Level)
                  }}
                >
                  {table}
                </span>
              )
            })}
          </div>
          <div className={tabContent}>
            <Table />
          </div>
        </div>
        <div className={infoSection}>
          <div className={studentResult}>Result: 0</div>
          <div className={studentScale}>
            <Scale />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
