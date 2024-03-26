import logo from '../../assets/logo.webp';
import styles from '../ui/Header.module.css';
const Header = () => {
    return (
        <>
       <div className={styles.headerContainer}>
           <div className={styles.logo}><img src={logo}  alt='Logo'  /></div>
       </div>
            </>
    )
}
export default Header
