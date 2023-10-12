import React from 'react'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'
import PdfTable from './components/PdfTable'
import { type StudentMarks } from '../../redux/slices/dataSlice'
import { SUBJECTS_ALL, SUBJECT_PARTS_ALL } from '../../constants'

interface PdfDocumentProps {
  selectedLevel: string
  comment?: string
  data: StudentMarks[]
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#E4E4E4',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Helvetica',
    padding: 40,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 30,
    fontFamily: 'Helvetica-Bold',
    padding: 20,
    textDecoration: 'underline',
    width: '100%',
  },
  comment: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    padding: 20,
  },
})

const HEADERS = ['Name', 'Reading', 'Use of english', 'writing', 'listening', 'speaking']

const PdfDocument: React.FC<PdfDocumentProps> = ({ selectedLevel, comment, data }) => {
  const totalRows: string[][] = data
    .map((student) => {
      return [
        student.name,
        student.reading.total + '',
        student.useOfEnglish.total + '',
        student.writing.total + '',
        student.listening.total + '',
        student.speaking.total + '',
      ]
    })
    .filter((row) => row[0] !== '')

  const partsRows: { student: string; marks: string[][] }[] = data
    .map((student) => {
      return {
        student: student.name,
        marks: SUBJECT_PARTS_ALL.map((part) => {
          return [part, ...SUBJECTS_ALL.map((subject) => student[subject][part] + '')]
        }),
      }
    })
    .filter((row) => row.student !== '')

  let filteredHeaders = HEADERS
  if (['A2', 'B1'].includes(selectedLevel)) {
    filteredHeaders = HEADERS.slice(0, 2).concat(HEADERS.slice(3))
    totalRows.forEach((row) => {
      row.splice(2, 1)
    })
    partsRows.forEach((student) => {
      student.marks.forEach((row) => {
        row.splice(2, 1)
      })
    })
  }

  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <View style={styles.header}>
          <Text>Results {selectedLevel}</Text>
        </View>
        <Text style={styles.comment}>{comment}</Text>
        <View style={styles.content}>
          <PdfTable headers={filteredHeaders} rows={totalRows} />
        </View>
      </Page>
      {partsRows.map((row) => (
        <Page key={row.student} size='A4' style={styles.page}>
          <View style={styles.header}>
            <Text>Student {row.student}</Text>
          </View>
          <View style={styles.content}>
            <PdfTable headers={filteredHeaders} rows={row.marks} />
          </View>
        </Page>
      ))}
    </Document>
  )
}

export default PdfDocument
