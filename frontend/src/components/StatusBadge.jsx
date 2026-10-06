function StatusBadge({ status }) {

  const text = status
    ?.replaceAll("_", " ");

  return (
    <span
      className={`badge ${status?.toLowerCase()}`}
    >
      {text}
    </span>
  );
}

export default StatusBadge;