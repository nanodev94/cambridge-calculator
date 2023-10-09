import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import {
  updateStudent,
  selectTableStudents,
  selectSelectedStudent,
  setSelectedStudent,
  selectSelectedLevel,
  removeStudent,
} from '../../../../redux/slices/dataSlice'
import { CAMBRIDGE_POINTS, SUBJECTS } from '../../../../constants'
import { type Subject } from '../../../../types'
import Button from '../../../Button'
import Icon from 'react-icons-kit'
import { ic_remove_twotone as removeIcon } from 'react-icons-kit/md/ic_remove_twotone'
import styles from './styles.module.css'

const { container, field, fieldError, rowSelected, actionButtonsCol } = styles

const Table: React.FC = () => {
  const dispatch = useAppDispatch()
  const selectedLevel = useAppSelector(selectSelectedLevel)
  const data = useAppSelector((state) => selectTableStudents(state, selectedLevel))
  const selectedStudent = useAppSelector((state) => selectSelectedStudent(state, selectedLevel))

  const handleDeleteStudent = (row: number) => {
    dispatch(removeStudent({ level: selectedLevel, row }))
  }

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>, row: number) => {
    const newData = {
      ...data[row],
      name: event.target.value,
    }
    dispatch(updateStudent({ level: selectedLevel, row, data: newData }))
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, row: number, key: Subject) => {
    const newVal = event.target.value ? parseInt(event.target.value) : ''
    const newData = {
      ...data[row],
      [key]: {
        ...data[row][key],
        total: newVal,
      },
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
                  handleChangeName(e, row)
                }}
                onFocus={() => {
                  dispatch(setSelectedStudent({ level: selectedLevel, row }))
                }}
              />
            </td>

            {SUBJECTS.map((subject) => {
              if (['A2', 'B1'].includes(selectedLevel) && subject === 'useOfEnglish') return null

              const success =
                rowData[subject].total >= CAMBRIDGE_POINTS[selectedLevel].minPoints[subject]

              return (
                <td key={`${rowData.name}-${subject}`}>
                  <input
                    className={`${field} ${success ? '' : fieldError}`}
                    type='number'
                    value={rowData[subject].total}
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
            <td className={actionButtonsCol}>
              <Button
                icon={<Icon size={15} icon={removeIcon} />}
                color={'rgb(255,0,0)'}
                onClick={() => {
                  handleDeleteStudent(row)
                }}
                size='small'
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
