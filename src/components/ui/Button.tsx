import React from "react";

const Button = ({ children, style, onClick } : {children?: React.ReactNode, style?: React.CSSProperties; onClick?: (event: React.MouseEvent) => void}) => {
    return (
        <button style={style} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
