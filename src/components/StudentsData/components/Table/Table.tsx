import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import {
  updateStudent,
  selectTableStudents,
  type StudentMarkKeys,
  selectSelectedStudent,
  setSelectedStudent,
  selectSelectedLevel,
} from '../../../../redux/slices/dataSlice'
import { CAMBRIDGE_POINTS, SUBJECTS } from '../../../../constants'
import styles from './styles.module.css'

const { container, field, fieldError, rowSelected } = styles

const Table: React.FC = () => {
  const dispatch = useAppDispatch()
  const selectedLevel = useAppSelector(selectSelectedLevel)
  const data = useAppSelector((state) => selectTableStudents(state, selectedLevel))
  const selectedStudent = useAppSelector((state) => selectSelectedStudent(state, selectedLevel))

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    row: number,
    key: StudentMarkKeys,
  ) => {
    const newVal =
      key === 'name' ? event.target.value : event.target.value ? parseInt(event.target.value) : ''
    const newData = {
      ...data[row],
      [key]: newVal,
    }
    dispatch(updateStudent({ level: selectedLevel, row, data: newData }))
  }

  return (
    <table className={container}>
      <thead>
        <tr>
          {['Student', 'Reading', 'UseOfEn', 'Writing', 'Listening', 'Speaking'].map(
            (title, col) => {
              if (['A2', 'B1'].includes(selectedLevel) && col === 2) {
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
            key={`${rowData.name}-name-${row}`}
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
                  dispatch(setSelectedStudent({ level: selectedLevel, row }))
                }}
              />
            </td>

            {SUBJECTS.map((subject) => {
              const success = rowData[subject] >= CAMBRIDGE_POINTS[selectedLevel].minPoints[subject]

              if (['A2', 'B1'].includes(selectedLevel) && subject === 'useOfEnglish') return null

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
                      dispatch(setSelectedStudent({ level: selectedLevel, row }))
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
