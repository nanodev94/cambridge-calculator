import { createPortal } from 'react-dom'
import Button from '../../Button'
import Icon from 'react-icons-kit'
import { ic_close_twotone as closeIcon } from 'react-icons-kit/md/ic_close_twotone'
import styles from './styles.module.css'
import { useAppDispatch } from '../../../redux/hooks'
import { setStudentDetailsModalOpened } from '../../../redux/slices/dataSlice'

type ModalWrapperProps = {
  children: React.ReactNode
  title: string
}

const { background, container, header, content } = styles

const ModalWrapper: React.FC<ModalWrapperProps> = ({ children, title }) => {
  const modalRoot = document.getElementById('modal')
  const dispatch = useAppDispatch()

  const handleCloseModal = () => {
    dispatch(setStudentDetailsModalOpened({ opened: false, row: 0 }))
  }

  return (
    <>
      {modalRoot &&
        createPortal(
          <div className={background}>
            <div className={container}>
              <div className={header}>
                <span>{title}</span>
                <Button
                  icon={<Icon size={15} icon={closeIcon} />}
                  color={'transparent'}
                  onClick={handleCloseModal}
                  size='small'
                />
              </div>
              <div className={content}>{children}</div>
            </div>
          </div>,
          modalRoot,
        )}
    </>
  )
}

export default ModalWrapper
