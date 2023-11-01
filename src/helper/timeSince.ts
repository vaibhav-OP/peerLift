function formatTimeSince(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  let interval = Math.floor(seconds / 31536000);

  if (interval > 0) {
    return interval === 1 ? `${interval} year ago` : `${interval} years ago`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 0) {
    return interval === 1 ? `${interval} month ago` : `${interval} months ago`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 0) {
    return interval === 1 ? `${interval} day ago` : `${interval} days ago`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 0) {
    return interval === 1 ? `${interval} hour ago` : `${interval} hours ago`;
  }
  interval = Math.floor(seconds / 60);
  if (interval > 0) {
    return interval === 1
      ? `${interval} minute ago`
      : `${interval} minutes ago`;
  }
  return "Just now";
}

export default formatTimeSince;
