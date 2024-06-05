const isPrime = (user) => {
  return user.availCoins >= 150 || user.joinedRooms.length === 0;
};

module.exports = { isPrime };
