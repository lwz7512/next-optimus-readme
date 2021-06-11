export default function PostHeader({title, description}) {
  return (
    <div className="post-header">
      <h1>{title}</h1>
      {description && (
        <p className="description">{description}</p>
      )}
    </div>
  )
}