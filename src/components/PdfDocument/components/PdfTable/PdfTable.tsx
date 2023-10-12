import { View, StyleSheet, Text } from '@react-pdf/renderer'

interface PdfTableProps {
  headers: string[]
  rows: string[][]
}

const styles = StyleSheet.create({
  table: {
    backgroundColor: '#E4E4E4',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  header: {
    backgroundColor: 'orange',
    fontFamily: 'Helvetica-Bold',
    fontSize: 12,
  },
  row: {
    borderBottom: '1px solid black',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  cell: {
    borderRight: '1px solid black',
    fontSize: 10,
    padding: 5,
    width: 75,
  },
  cellFirst: {
    fontFamily: 'Helvetica-Bold',
    width: 150,
  },
})

const PdfTable: React.FC<PdfTableProps> = ({ headers, rows }) => {
  const [name, ...subjects] = headers

  return (
    <View style={styles.table}>
      <View style={[styles.row, styles.header]}>
        <Text style={[styles.cell, styles.cellFirst]}>{name}</Text>
        {subjects.map((subject) => (
          <Text key={subject} style={styles.cell}>
            {subject}
          </Text>
        ))}
      </View>
      {rows.map((row) => {
        if (row.slice(1).every((value) => value === 'undefined')) return null

        return (
          <View key={row[0]} style={styles.row}>
            {row.map((value, col) => {
              const key = `${row[0]}-${headers[col]}`

              if (value === 'undefined') return <Text key={key} style={styles.cell}></Text>

              return (
                <Text key={key} style={[styles.cell, col === 0 ? styles.cellFirst : {}]}>
                  {value}
                </Text>
              )
            })}
          </View>
        )
      })}
    </View>
  )
}

export default PdfTable
