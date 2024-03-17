import React from "react";
import styles from "./DisplayText.module.css";

interface DisplayTextProps{
    children?: React.ReactNode;
    variant?: 'default' | 'game';
}
const DisplayText: React.FC<DisplayTextProps> = ({children, variant = 'default'}) => {
        const variantClass = styles[variant] || styles.default;

    return (
            <div className={variantClass}>{children}</div>
    );
};
export default DisplayText
