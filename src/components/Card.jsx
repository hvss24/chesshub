const Card = ({ title, description, extra }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{description}</p>
      {extra && <p>{extra}</p>}
    </div>
  );
};

export default Card;