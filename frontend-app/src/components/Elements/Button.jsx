const Button = ({ type = "button", classname, onClick, children }) => {
    return (
      <button type={type} className={classname} onClick={onClick}>
        {children}
      </button>
    );
  };
  
  export default Button;
  