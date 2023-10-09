import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import { clearStudents, selectSelectedLevel } from '../../../../redux/slices/dataSlice'
import Button from '../../../Button'

import { Icon } from 'react-icons-kit'
import { ic_picture_as_pdf as pdfIcon } from 'react-icons-kit/md/ic_picture_as_pdf'
import { trash } from 'react-icons-kit/fa/trash'
import styles from './styles.module.css'

const { container } = styles

const FloatingMenu: React.FC = () => {
  const dispatch = useAppDispatch()
  const selectedLevel = useAppSelector(selectSelectedLevel)

  const exportToPdf = () => {
    // TODO: export PDF
    console.log('Exporting to PDF...')
  }

  const deleteAllStudents = () => {
    dispatch(clearStudents({ level: selectedLevel }))
  }

  return (
    <div className={container}>
      <Button
        icon={<Icon size={30} icon={pdfIcon} />}
        color={'rgb(255,0,0)'}
        onClick={exportToPdf}
        size='large'
      />
      <Button
        icon={<Icon size={24} icon={trash} />}
        color={'rgb(210,105,30)'}
        onClick={deleteAllStudents}
        size='large'
      />
    </div>
  )
}

export default FloatingMenu
