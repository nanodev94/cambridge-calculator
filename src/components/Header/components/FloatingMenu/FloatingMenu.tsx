import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import {
  addStudent,
  removeStudent,
  clearStudents,
  selectSelectedLevel,
  selectSelectedStudent,
} from '../../../../redux/slices/dataSlice'
import Button from './components/Button'

import { Icon } from 'react-icons-kit'
import { userPlus } from 'react-icons-kit/fa/userPlus'
import { userTimes } from 'react-icons-kit/fa/userTimes'
import { trash } from 'react-icons-kit/fa/trash'
import styles from './styles.module.css'

const { container } = styles

const FloatingMenu: React.FC = () => {
  const dispatch = useAppDispatch()
  const selectedLevel = useAppSelector(selectSelectedLevel)
  const selectedStudent = useAppSelector((state) => selectSelectedStudent(state, selectedLevel))

  const addNewStudent = () => {
    dispatch(addStudent({ level: selectedLevel }))
  }

  const deleteStudent = () => {
    dispatch(removeStudent({ level: selectedLevel, row: selectedStudent }))
  }

  const deleteAllStudents = () => {
    dispatch(clearStudents({ level: selectedLevel }))
  }

  return (
    <div className={container}>
      <Button
        icon={<Icon size={24} icon={userPlus} />}
        color={'rgb(0,255,0)'}
        onClick={addNewStudent}
      />
      <Button
        icon={<Icon size={24} icon={userTimes} />}
        color={'rgb(255,0,0)'}
        onClick={deleteStudent}
      />
      <Button
        icon={<Icon size={24} icon={trash} />}
        color={'rgb(210,105,30)'}
        onClick={deleteAllStudents}
      />
    </div>
  )
}

export default FloatingMenu
