/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import styles from './Button.module.css'
function Button({children,onClick,type}) {
  return <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>{children}</button>;
}

export default Button;

Button.propTypes = {
    children: PropTypes.array.isRequired,
    onClick: PropTypes.string.isRequired,
    type:PropTypes.string.isRequired
  };