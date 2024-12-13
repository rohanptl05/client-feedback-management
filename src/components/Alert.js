import React from "react";

const Alert = (props) => {
  // Define the capitalize function here
  const capitalize = (word) => {
    if(word==="danger"){
      word="error"
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  return (
    <div>
      <div style={{ height: "30px" }} className="alert ">
        {props.alert && (
          <div
            className={`alert alert-${props.alert.type} alert-dismissible fade show`}
            role="alert"
          >
            <strong>{capitalize(props.alert.type)}</strong>: {props.alert.message}
          </div>
        )}
      </div>
    </div>
  );
};


export default Alert;