import ModalWrapper from '../ModalWrapper'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import {
  selectSelectedLevel,
  selectStudentDetailsModal,
  selectTableStudentMarks,
  updateStudent,
} from '../../../redux/slices/dataSlice'
import { type Subject, type SubjectPart } from '../../../types'
import { SUBJECTS_ALL, SUBJECT_PARTS, SUBJECT_PARTS_ALL } from '../../../constants'
import styles from './styles.module.css'

const { container, field } = styles

const StudentDetailsModal: React.FC = () => {
  const dispatch = useAppDispatch()
  const { opened, studentPos } = useAppSelector(selectStudentDetailsModal)
  const selectedLevel = useAppSelector(selectSelectedLevel)
  const marks = useAppSelector((state) => selectTableStudentMarks(state, selectedLevel, studentPos))

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    subject: Subject,
    part: SubjectPart,
    maxPoints: number,
  ) => {
    let newVal = event.target.value ? parseInt(event.target.value) : 0
    if (newVal > maxPoints) {
      newVal = maxPoints
    }

    const newData = {
      ...marks,
      [subject]: {
        ...marks[subject],
        [part]: newVal,
      },
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { total: _a, ...subjectValues } = newData[subject]

    newData[subject].total = Object.values(subjectValues).reduce(
      (partialSum, a) => partialSum + a,
      0,
    )

    dispatch(updateStudent({ level: selectedLevel, row: studentPos, data: newData }))
  }

  if (!opened) return null

  return (
    <ModalWrapper title={`Student Details: ${marks.name}`}>
      <table className={container}>
        <thead>
          <tr>
            {['Part Name', 'Reading', 'UseOfEn', 'Writing', 'Listening', 'Speaking'].map(
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
          {SUBJECT_PARTS_ALL.map((partName) => {
            if (
              !Object.values(SUBJECT_PARTS[selectedLevel])
                .flat(1)
                .some(({ name }) => name === partName)
            )
              return null

            return (
              <tr key={`${partName}-name`}>
                <td>
                  <span>{partName}</span>
                </td>
                {SUBJECTS_ALL.map((subject) => {
                  if (['A2', 'B1'].includes(selectedLevel) && subject === 'useOfEnglish')
                    return null

                  const partData = SUBJECT_PARTS[selectedLevel][subject].find(
                    (part) => part.name === partName,
                  )

                  if (!partData) return <td key={`${partName}-${subject}`}></td>

                  return (
                    <td key={`${partName}-${subject}`}>
                      <input
                        className={field}
                        type='number'
                        max={partData.maxPoints}
                        value={marks[subject][partName] ?? 0}
                        onChange={(e) => {
                          handleChange(e, subject, partName, partData.maxPoints)
                        }}
                      />
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </ModalWrapper>
  )
}

export default StudentDetailsModal
