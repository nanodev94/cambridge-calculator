import { useEffect } from 'react'
import { useAppSelector } from './redux/hooks'
import {
  selectTableStudents,
  selectTables,
  selectSelectedStudent,
  selectSelectedTable,
} from './redux/slices/dataSlice'
import Header from './components/Header'
import StudentsData from './components/StudentsData'
import StudentsScore from './components/StudentsScore'
import styles from './App.module.css'

const { container, content } = styles

const App: React.FC = () => {
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

  // TODO: revisado Header completo. Falta StudentsData y StudentsScore
  return (
    <div className={container}>
      <Header />
      <div className={content}>
        <StudentsData />
        <StudentsScore />
      </div>
    </div>
  )
}

export default App
