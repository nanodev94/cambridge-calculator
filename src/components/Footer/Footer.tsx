import styles from './styles.module.css'

const { container } = styles

const Footer: React.FC = () => {
  return (
    <footer className={container}>
      <span>
        Developed by{' '}
        <a href='https://twitter.com/nanodev94' target='_blank'>
          @nanodev94
        </a>
      </span>
    </footer>
  )
}

export default Footer
