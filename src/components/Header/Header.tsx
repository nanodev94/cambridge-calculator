import FloatingMenu from './components/FloatingMenu'
import styles from './styles.module.css'

const { container, title } = styles

const Header: React.FC = () => {
  return (
    <header className={container}>
      <span className={title}>Cambridge Calculator</span>
      <FloatingMenu />
    </header>
  )
}

export default Header
