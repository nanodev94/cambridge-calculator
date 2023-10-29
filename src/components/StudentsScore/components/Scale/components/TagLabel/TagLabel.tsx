import type { Subject } from '../../../../../../types'
import styles from './styles.module.css'

interface TagLabelProps {
  subject: Subject
  mark: number
}

const { container, tagReading, tagUseOfEnglish, tagWriting, tagListening, tagSpeaking } = styles

const TAG_TYPE: Record<Subject, string> = {
  reading: tagReading,
  useOfEnglish: tagUseOfEnglish,
  writing: tagWriting,
  listening: tagListening,
  speaking: tagSpeaking,
}

const TagLabel: React.FC<TagLabelProps> = ({ subject, mark }) => {
  const scaleMarkOrigin = document.getElementById('scale-mark-80')
  const scaleMark = document.getElementById(`scale-mark-${mark}`)
  const heightScaleMarkOrigin = scaleMarkOrigin?.getBoundingClientRect().y ?? 0
  const heightScaleMark = scaleMark?.getBoundingClientRect().y ?? 0
  const height = heightScaleMarkOrigin - heightScaleMark + 12

  return (
    <div className={`${container} ${TAG_TYPE[subject]}`} style={{ height: Math.max(height, 0) }}>
      <div />
      <span>
        {subject} {mark}
      </span>
    </div>
  )
}

export default TagLabel
