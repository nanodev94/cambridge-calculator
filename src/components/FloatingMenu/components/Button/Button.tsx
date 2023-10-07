import styles from './styles.module.css'

interface ButtonProps {
  icon: React.ReactNode
  color: string
  onClick: () => void
}

const { container } = styles

const Button: React.FC<ButtonProps> = ({ icon, color, onClick }) => {
  return (
    <button className={container} style={{ backgroundColor: color }} onClick={onClick}>
      {icon}
    </button>
  )
}

export default Button
