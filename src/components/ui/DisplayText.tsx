import React from "react";

const DisplayText = ({children, style} : {children: any, style?: React.CSSProperties;}) => {


    return (
            <textarea style={style} value={children} readOnly />
    );
};
export default DisplayText
