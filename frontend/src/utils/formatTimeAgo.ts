export default function formatTimeAgo(date: string) {
  const diffMs = new Date().getTime() - new Date(date).getTime();

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays > 0) {
    return `${diffDays} days ago`;
  }

  if (diffHours > 0) {
    return `${diffHours} hours ago`;
  }

  return `${diffMinutes} minutes ago`;
}
