import github from '../../assets/github-mark-white.png';
import githubDark from'../../assets/github-mark.png';
import styles from '../ui/Footer.module.css';
import DisplayText from "./DisplayText.tsx";
import {useEffect, useState} from "react";
const Footer = () => {
    const [defaultImage, setDefaultImage] = useState(github);

    useEffect(() => {
        const isDarkMode = window.matchMedia('(prefers-color-scheme: light)').matches;
        setDefaultImage(isDarkMode ? githubDark : github);
    }, []);
    return (
        <div className={styles.footerContainer}>
            <div className={styles.copyright}>
                <DisplayText>Copyright © 2024 John Serwatka</DisplayText>
            </div>
            <div className={styles.github}>
                <a href="https://github.com/Withriin/trivia-app" target="_blank" rel="noopener noreferrer">
                <img src={defaultImage} alt="GitHub Repository" />
                </a>
            </div>
        </div>
    )
}
export default Footer
