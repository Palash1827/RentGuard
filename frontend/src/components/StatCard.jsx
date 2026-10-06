function StatCard({
  icon,
  title,
  value,
  description,
}) {

  return (
    <div className="stat-card">

      <div className="stat-icon">
        {icon}
      </div>

      <h2>
        {value}
      </h2>

      <strong>
        {title}
      </strong>

      <span>
        {description}
      </span>

    </div>
  );
}

export default StatCard;