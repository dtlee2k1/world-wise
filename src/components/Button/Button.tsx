import React from 'react'
import styles from './Button.module.css'

interface PropTypes {
  children: React.ReactNode
  type?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export default function Button(props: PropTypes) {
  const { children, type, onClick } = props
  return (
    <button className={`${styles.btn} ${type ? styles[type] : ''}`} onClick={onClick}>
      {children}
    </button>
  )
}
