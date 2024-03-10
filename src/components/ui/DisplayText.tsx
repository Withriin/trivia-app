import React from "react";

const DisplayText = ({children, style} : {children: any, style?: React.CSSProperties;}) => {


    return (
            <div style={{...style, whiteSpace: 'pre-wrap'}}>{children}</div>
    );
};
export default DisplayText
