import { useEffect } from 'react'
import { useAppSelector } from './redux/hooks'
import {
  selectTableStudents,
  selectTables,
  selectSelectedStudent,
  selectSelectedLevel,
} from './redux/slices/dataSlice'
import Header from './components/Header'
import StudentsData from './components/StudentsData'
import StudentsScore from './components/StudentsScore'
import styles from './App.module.css'

const { container, content } = styles

const App: React.FC = () => {
  const tables = useAppSelector(selectTables)
  const selectedLevel = useAppSelector(selectSelectedLevel)
  const data = useAppSelector((state) => selectTableStudents(state, selectedLevel))
  const selectedStudent = useAppSelector((state) => selectSelectedStudent(state, selectedLevel))

  useEffect(() => {
    localStorage.setItem('selectedLevel', JSON.stringify(selectedLevel))
  }, [selectedLevel])

  useEffect(() => {
    localStorage.setItem('tables', JSON.stringify(tables))
  }, [data, selectedStudent])

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
