import "./Card.css";
function Card({ className, style, children }) {
  return (
    <div className={`card ${className}`} style={style}>
      {children}
    </div>
  );
}

export default Card;
