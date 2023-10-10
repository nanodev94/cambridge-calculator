import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
  addStudent,
  selectSelectedLevel,
  selectTables,
  setSelectedLevel,
} from '../../redux/slices/dataSlice'
import { type Level } from '../../types'
import Button from '../Button'
import StudentDetailsModal from '../Modals/StudentDetailsModal'
import Table from './components/Table'
import Icon from 'react-icons-kit'
import { ic_add as addIcon } from 'react-icons-kit/md/ic_add'
import styles from './styles.module.css'

const { container, tabsContainer, tab, tabSelected, tabContent } = styles

const StudentsData: React.FC = () => {
  const dispatch = useAppDispatch()
  const tables = useAppSelector(selectTables)
  const selectedLevel = useAppSelector(selectSelectedLevel)

  const addNewStudent = () => {
    dispatch(addStudent({ level: selectedLevel }))
  }

  const changeLevel = (level: Level) => {
    dispatch(setSelectedLevel({ level }))
  }

  return (
    <div className={container}>
      <div className={tabsContainer}>
        {Object.keys(tables).map((level) => {
          const isSelected = selectedLevel === level
          return (
            <span
              key={level}
              className={`${tab} ${isSelected ? tabSelected : ''}`}
              onClick={() => {
                changeLevel(level as Level)
              }}
            >
              {level}
            </span>
          )
        })}
      </div>
      <div className={tabContent}>
        <Table />
        <StudentDetailsModal />
        <Button
          icon={<Icon size={25} icon={addIcon} />}
          color={'rgb(0,255,0)'}
          onClick={addNewStudent}
          size='medium'
        />
      </div>
    </div>
  )
}

export default StudentsData
