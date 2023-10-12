import styles from './styles.module.css'

interface ButtonProps {
  icon: React.ReactNode
  color: string
  onClick?: () => void
  size?: 'small' | 'medium' | 'large'
}

const { container, small, medium, large } = styles

const BUTTON_SIZES = {
  small,
  medium,
  large,
}

const Button: React.FC<ButtonProps> = ({ icon, color, onClick, size = 'medium' }) => {
  return (
    <button
      className={`${container} ${BUTTON_SIZES[size]}`}
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      {icon}
    </button>
  )
}

export default Button
