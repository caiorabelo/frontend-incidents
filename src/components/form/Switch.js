import styles from './Switch.module.css'

function Switch({ name, handleOnChange, value, checked, errors=null }) {
  return (
    <div>
      <label className={styles.title}>Status</label>
      <label
        className={styles.switch}>
        <input
          type="checkbox"
          name={name}
          id={name}
          checked={checked}
          value={value}
          onChange={handleOnChange}
        />
        <span className={`${styles.slider} ${styles.round}`}></span>
      </label>
      {errors && (<small>{errors[0]}</small>)}
    </div>
  )
}

export default Switch
