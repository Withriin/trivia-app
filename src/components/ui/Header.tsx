import logo from '../../assets/logo.webp';
import styles from '../ui/Header.module.css';
const Header = () => {
    return (
        <>
        <div className={styles.logo}><img src={logo}  alt='Logo'  /></div>
            </>
    )
}
export default Header
