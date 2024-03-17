import styles from "./Button.module.css";
interface ButtonProps {
    children?: React.ReactNode;
    variant?: 'default' | 'answer' | 'correctAnswer' | 'incorrectAnswer';
    onClick?: (event: React.MouseEvent) => void;
    isDisabled? : boolean;
}
const Button: React.FC<ButtonProps> = ({ children, onClick, isDisabled = false, variant = 'default' } ) => {
    const variantClass = styles[variant] || styles.default;
    const buttonClasses = `${styles.button} ${isDisabled ? styles.buttonDisabled : ''} ${variantClass}`;

    return (
        <button className={buttonClasses} onClick={onClick}  disabled={isDisabled}>
            {children}
        </button>
    );
};

export default Button;
