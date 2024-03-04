import github from '../../assets/github-mark-white.png'
const Footer = () => {
    return (
        <div>
            <a href="https://github.com/Withriin/trivia-app" target="_blank" rel="noopener noreferrer">
            <img src={github} alt="GitHub Repository" style={{maxWidth: '2em', height: 'auto'}}/>
            </a>
        </div>
    )
}
export default Footer
