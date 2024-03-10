import styles from "./Button.module.css";
interface ButtonProps {
    children?: React.ReactNode;
    variant?: 'default' | 'answer' | 'selectedAnswer' | 'correctAnswer' | 'incorrectAnswer';
    onClick?: (event: React.MouseEvent) => void;
    isDisabled? : boolean;
}
const Button: React.FC<ButtonProps> = ({ children, onClick, isDisabled = false, variant = 'default' } ) => {
    const variantClass = styles[variant] || styles.default;
    const buttonClasses = `${styles.button} ${isDisabled ? styles.buttonDisabled : ''} ${variantClass}`;
    //Todo remove hard coded styling when in CSS phase
    return (
        <button className={buttonClasses} onClick={onClick}  disabled={isDisabled}>
            {children}
        </button>
    );
};

export default Button;
