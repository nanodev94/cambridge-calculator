import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectSelectedLevel, selectTables, setSelectedLevel } from '../../redux/slices/dataSlice'
import { type Level } from '../../types'
import Table from './components/Table'
import styles from './styles.module.css'

const { container, tabsContainer, tab, tabSelected, tabContent } = styles

const StudentsData: React.FC = () => {
  const dispatch = useAppDispatch()
  const tables = useAppSelector(selectTables)
  const selectedLevel = useAppSelector(selectSelectedLevel)

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
      </div>
    </div>
  )
}

export default StudentsData
