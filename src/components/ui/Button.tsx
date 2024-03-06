interface ButtonProps {
    children?: React.ReactNode;
    style?: React.CSSProperties;
    onClick?: (event: React.MouseEvent) => void;
    isDisabled? : boolean;
}
const Button: React.FC<ButtonProps> = ({ children, style, onClick, isDisabled = false } ) => {
    const selectedStyle = isDisabled ? { backgroundColor: '#b62020', ...style} : style;
    //Todo remove hard coded styling when in CSS phase
    return (
        <button style={selectedStyle} onClick={onClick}  disabled={isDisabled}>
            {children}
        </button>
    );
};

export default Button;
