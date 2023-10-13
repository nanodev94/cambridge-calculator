import { useEffect, useState } from 'react'
import { useAppSelector } from '../../../../redux/hooks'
import {
  selectSelectedStudent,
  selectSelectedLevel,
  selectTableStudents,
} from '../../../../redux/slices/dataSlice'
import TagLabel from './components/TagLabel'
import styles from './styles.module.css'
import { getCambridgeMark, getPercentages } from '../../../../utils'

const {
  container,
  scaleContainer,
  categoriesContainer,
  category,
  categoryInitial,
  categoryBasic,
  categoryIndependent,
  categoryProficient,
  categorySelected,
  levelsContainer,
  levelsHorizontalLine,
  level,
  levelA0,
  levelA1,
  levelA2,
  levelB1,
  levelB2,
  levelC1,
  levelC2,
  levelSelected,
  marksContainer,
  mark,
  markMedium,
  markLarge,
  labelsContainer,
  finalLabel,
} = styles

const Scale: React.FC = () => {
  const selectedLevel = useAppSelector(selectSelectedLevel)
  const data = useAppSelector((state) => selectTableStudents(state, selectedLevel))
  const selectedStudent = useAppSelector((state) => selectSelectedStudent(state, selectedLevel))

  const [readingMark, setReadingMark] = useState(-1)
  const [useOfEnglishMark, setUseOfEnglishMark] = useState(-1)
  const [writingMark, setWritingMark] = useState(-1)
  const [listeningMark, setListeningMark] = useState(-1)
  const [speakingMark, setSpeakingMark] = useState(-1)
  const [finalMark, setFinalMark] = useState(-1)

  useEffect(() => {
    const { reading, useOfEnglish, writing, listening, speaking } = getPercentages(
      selectedLevel,
      data[selectedStudent].reading.total,
      data[selectedStudent].useOfEnglish.total,
      data[selectedStudent].writing.total,
      data[selectedStudent].listening.total,
      data[selectedStudent].speaking.total,
    )

    setReadingMark(getCambridgeMark(selectedLevel, reading))
    setUseOfEnglishMark(getCambridgeMark(selectedLevel, useOfEnglish))
    setWritingMark(getCambridgeMark(selectedLevel, writing))
    setListeningMark(getCambridgeMark(selectedLevel, listening))
    setSpeakingMark(getCambridgeMark(selectedLevel, speaking))

    if (['A2', 'B1'].includes(selectedLevel)) {
      setFinalMark(getCambridgeMark(selectedLevel, (reading + writing + listening + speaking) / 4))
    } else {
      setFinalMark(
        getCambridgeMark(
          selectedLevel,
          (reading + useOfEnglish + writing + listening + speaking) / 5,
        ),
      )
    }
  }, [selectedStudent, data, selectedLevel])

  const scaleMarkOrigin = document.getElementById('scale-mark-80')
  const scaleMark = document.getElementById(`scale-mark-${finalMark}`)
  const heightScaleMarkOrigin = scaleMarkOrigin?.getBoundingClientRect().y ?? 0
  const heightScaleMark = scaleMark?.getBoundingClientRect().y ?? 0
  const bottom = heightScaleMarkOrigin - heightScaleMark + 1

  return (
    <div className={container}>
      <div className={scaleContainer}>
        <div className={categoriesContainer}>
          <div
            className={`${category} ${categoryProficient} ${
              finalMark >= 180 ? categorySelected : ''
            }`}
          >
            <span>PROFICIENT</span>
          </div>
          <div
            className={`${category} ${categoryIndependent} ${
              finalMark >= 140 && finalMark < 180 ? categorySelected : ''
            }`}
          >
            <span>INDEPENDENT</span>
          </div>
          <div
            className={`${category} ${categoryBasic} ${
              finalMark >= 100 && finalMark < 140 ? categorySelected : ''
            }`}
          >
            <span>BASIC</span>
          </div>
          <div
            className={`${category} ${categoryInitial} ${finalMark < 100 ? categorySelected : ''}`}
          />
        </div>
        <div className={levelsContainer}>
          <div>
            <div className={levelsHorizontalLine} />
            <div className={`${level} ${levelC2} ${finalMark > 200 ? levelSelected : ''}`}>C2</div>
            <div className={levelsHorizontalLine} />
            <div
              className={`${level} ${levelC1} ${
                finalMark >= 180 && finalMark < 200 ? levelSelected : ''
              }`}
            >
              C1
            </div>
            <div className={levelsHorizontalLine} />
            <div
              className={`${level} ${levelB2} ${
                finalMark >= 160 && finalMark < 180 ? levelSelected : ''
              }`}
            >
              B2
            </div>
            <div className={levelsHorizontalLine} />
            <div
              className={`${level} ${levelB1} ${
                finalMark >= 140 && finalMark < 160 ? levelSelected : ''
              }`}
            >
              B1
            </div>
            <div className={levelsHorizontalLine} />
            <div
              className={`${level} ${levelA2} ${
                finalMark >= 120 && finalMark < 140 ? levelSelected : ''
              }`}
            >
              A2
            </div>
            <div className={levelsHorizontalLine} />
            <div
              className={`${level} ${levelA1} ${
                finalMark >= 100 && finalMark < 120 ? levelSelected : ''
              }`}
            >
              A1
            </div>
            <div className={levelsHorizontalLine} />
            <div className={`${level} ${levelA0} ${finalMark < 100 ? levelSelected : ''}`}>
              {'<'}A1
            </div>
            <div className={levelsHorizontalLine} />
          </div>
        </div>
        <div className={marksContainer}>
          {[...Array(151)].map((_, i) => {
            const size = i % 10 === 0 ? 'large' : i % 5 === 0 ? 'medium' : 'small'
            return (
              <div
                key={i}
                id={`scale-mark-${i + 80}`}
                className={`${mark} ${
                  size === 'large' ? markLarge : size === 'medium' ? markMedium : ''
                }`}
                onClick={() => {
                  console.log(80 + i)
                }}
              >
                <span>{i % 10 === 0 && i !== 0 ? 80 + i : ''}</span>
              </div>
            )
          })}
        </div>
      </div>
      <div className={labelsContainer}>
        <TagLabel subject='reading' mark={readingMark} />

        {useOfEnglishMark ? <TagLabel subject='useOfEnglish' mark={useOfEnglishMark} /> : ''}

        <TagLabel subject='writing' mark={writingMark} />

        <TagLabel subject='listening' mark={listeningMark} />

        <TagLabel subject='speaking' mark={speakingMark} />
      </div>
      <div className={finalLabel} style={{ bottom: Math.max(bottom, 0) }}>
        <span>{finalMark}</span>
      </div>
    </div>
  )
}

export default Scale
