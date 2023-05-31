import "./VioletButton.scss";

export const VioletButton = ({ children, style, onClick }) => {
  return (
    <button className="violetButton" style={style} onClick={onClick}>
      {children}
    </button>
  );
};
