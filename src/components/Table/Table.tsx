import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
  updateStudent,
  selectTableStudents,
  type StudentMarkKeys,
  selectSelectedStudent,
  setSelectedStudent,
  selectSelectedTable,
} from '../../redux/slices/dataSlice'
import { CAMBRIDGE_POINTS, SUBJECTS } from '../../constants'
import styles from './styles.module.css'

const { container, field, fieldError, rowSelected } = styles

const Table: React.FC = () => {
  const dispatch = useAppDispatch()
  const table = useAppSelector(selectSelectedTable)
  const data = useAppSelector((state) => selectTableStudents(state, table))
  const selectedStudent = useAppSelector((state) => selectSelectedStudent(state, table))

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    row: number,
    key: StudentMarkKeys,
  ) => {
    const newVal = key === 'name' ? event.target.value : parseInt(event.target.value)
    const newData = {
      ...data[row],
      [key]: newVal,
    }
    dispatch(updateStudent({ table, row, data: newData }))
  }

  return (
    <table className={container}>
      <thead>
        <tr>
          {['Student', 'Reading', 'UseOfEn', 'Writing', 'Listening', 'Speaking'].map(
            (title, col) => {
              // Ocultar columna useOfEnglish en categorías A2 y B1
              if (['A2', 'B1'].includes(table) && col === 2) {
                return undefined
              }
              return <th key={col}>{title}</th>
            },
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((rowData, row) => (
          <tr
            key={`${rowData.name}-name`}
            className={row === selectedStudent ? rowSelected : undefined}
          >
            <td>
              <input
                className={field}
                type='text'
                value={rowData.name}
                onChange={(e) => {
                  handleChange(e, row, 'name')
                }}
                onFocus={() => {
                  dispatch(setSelectedStudent({ table, row }))
                }}
              />
            </td>

            {SUBJECTS.map((subject) => {
              const success = rowData[subject] >= CAMBRIDGE_POINTS[table].minPoints[subject]

              if (['A2', 'B1'].includes(table) && subject === 'useOfEnglish') return null

              return (
                <td key={`${rowData.name}-${subject}`}>
                  <input
                    className={`${field} ${success ? '' : fieldError}`}
                    type='number'
                    value={rowData[subject]}
                    onChange={(e) => {
                      handleChange(e, row, subject)
                    }}
                    onFocus={() => {
                      dispatch(setSelectedStudent({ table, row }))
                    }}
                  />
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
