import Scale from './components/Scale'
import styles from './styles.module.css'

const { container, studentResult, studentScaleContainer } = styles

const StudentsScore: React.FC = () => {
  return (
    <div className={container}>
      <div className={studentResult}>Result: 0</div>
      <div className={studentScaleContainer}>
        <Scale />
      </div>
    </div>
  )
}

export default StudentsScore
