const palindrome = string => {
  return string.split('').reverse().join('');
};

const average = array => {
  if (array.length === 0) return 0;

  const reducer = (sum, element) => sum + element;
  return array.reduce(reducer, 0) / array.length;
};

module.exports = {
  palindrome,
  average,
};
