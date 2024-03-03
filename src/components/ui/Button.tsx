import React from "react";

const Button = ({ children, style, onClick } : {children: any, style: React.CSSProperties; onClick: (event: React.MouseEvent) => void}) => {
    return (
        <button style={style} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
