import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
  addStudent,
  removeStudent,
  clearStudents,
  selectSelectedTable,
  selectSelectedStudent,
} from '../../redux/slices/dataSlice'
import styles from './styles.module.css'

import { Icon } from 'react-icons-kit'
import { userPlus } from 'react-icons-kit/fa/userPlus'
import { userTimes } from 'react-icons-kit/fa/userTimes'
import { trash } from 'react-icons-kit/fa/trash'
import Button from './components/Button'

const { container } = styles

const FloatingMenu: React.FC = () => {
  const dispatch = useAppDispatch()
  const table = useAppSelector(selectSelectedTable)
  const selectedStudent = useAppSelector((state) => selectSelectedStudent(state, table))

  const addNewStudent = () => {
    dispatch(addStudent({ table }))
  }

  const deleteStudent = () => {
    dispatch(removeStudent({ table, row: selectedStudent }))
  }

  const deleteAllStudents = () => {
    dispatch(clearStudents({ table }))
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
