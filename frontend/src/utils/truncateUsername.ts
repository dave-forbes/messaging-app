const truncateUsername = (username: string | undefined) => {
  return username && username.length > 10
    ? username.slice(0, 10) + '...'
    : username;
};

export default truncateUsername;
