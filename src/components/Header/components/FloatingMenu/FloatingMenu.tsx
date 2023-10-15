import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import {
  clearStudents,
  selectSelectedLevel,
  selectTableStudents,
} from '../../../../redux/slices/dataSlice'
import Button from '../../../Button'
import PdfDocument from '../../../PdfDocument'
import { PDFDownloadLink } from '@react-pdf/renderer'

import { Icon } from 'react-icons-kit'
import { ic_picture_as_pdf as pdfIcon } from 'react-icons-kit/md/ic_picture_as_pdf'
import { trash } from 'react-icons-kit/fa/trash'
import styles from './styles.module.css'

const { container } = styles

const FloatingMenu: React.FC = () => {
  const dispatch = useAppDispatch()
  const selectedLevel = useAppSelector(selectSelectedLevel)
  const data = useAppSelector((state) => selectTableStudents(state, selectedLevel))

  const deleteAllStudents = () => {
    dispatch(clearStudents({ level: selectedLevel }))
  }

  return (
    <div className={container}>
      <PDFDownloadLink
        document={<PdfDocument selectedLevel={selectedLevel} data={data} />}
        fileName={`marks_${selectedLevel}_${new Date().getTime()}.pdf`}
      >
        {({ loading }) =>
          loading ? (
            <Button
              icon={<Icon size={30} icon={pdfIcon} />}
              color={'rgb(100,100,100)'}
              size='large'
            />
          ) : (
            <Button icon={<Icon size={30} icon={pdfIcon} />} color={'rgb(255,0,0)'} size='large' />
          )
        }
      </PDFDownloadLink>
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
