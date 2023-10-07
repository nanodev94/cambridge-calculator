import type { Subject } from '../../../../../../types'
import styles from './styles.module.css'

interface TagLabelProps {
  subject: Subject
  mark: number
}

const { container, tagReading, tagUseOfEnglish, tagWriting, tagListening, tagSpeaking } = styles

const TAG_COLOR: Record<Subject, string> = {
  reading: tagReading,
  useOfEnglish: tagUseOfEnglish,
  writing: tagWriting,
  listening: tagListening,
  speaking: tagSpeaking,
}

const TagLabel: React.FC<TagLabelProps> = ({ subject, mark }) => {
  const height = (mark - 80) * 0.683

  return (
    <div
      className={`${container} ${TAG_COLOR[subject]}`}
      style={{ height: `${Math.max(height, 0)}%` }}
    >
      <div />
      <span>{subject}</span>
    </div>
  )
}

export default TagLabel
