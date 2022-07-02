import styles from './Container.module.css'

function Container(props) {
  return (
    <div>
      <div className={`${styles.container} ${styles[props.customClass]}`}>
        {props.children}
      </div>
    </div>
  )
}

export default Container
