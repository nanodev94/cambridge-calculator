import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectSelectedTable, selectTables, setSelectedTable } from '../../redux/slices/dataSlice'
import { type Level } from '../../types'
import Table from './components/Table'
import styles from './styles.module.css'

const { container, tabsContainer, tab, tabSelected, tabContent } = styles

const StudentsData: React.FC = () => {
  const dispatch = useAppDispatch()
  const tables = useAppSelector(selectTables)
  const selectedTable = useAppSelector(selectSelectedTable)

  const changeTable = (table: Level) => {
    dispatch(setSelectedTable({ table }))
  }

  return (
    <div className={container}>
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
  )
}

export default StudentsData
