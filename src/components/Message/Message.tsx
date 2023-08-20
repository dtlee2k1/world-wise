import styles from './Message.module.css'

interface PropTypes {
  message: string
}

function Message({ message }: PropTypes) {
  return (
    <p className={styles.message}>
      <span role='img'>👋</span> {message}
    </p>
  )
}

export default Message
