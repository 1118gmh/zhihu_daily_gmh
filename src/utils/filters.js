const formatTime = (currency) => {
  const day = parseInt(currency.substr(6, 2));
  const mouth = parseInt(currency.substr(4, 2));
  const result = `${mouth} 月 ${day} 日`;
  return result;
};
const addZero = (str) => {
  str = str.length < 2 ? `0${str}` : str;
  return str;
};
export default {
  formatTime,
  toTime(currency) {
    let time = new Date(parseInt(`${currency}000`)).toLocaleDateString().split('/');
    time[1] = addZero(time[1]);
    time[2] = addZero(time[2]);
    time = time.join('');
    time = formatTime(time);
    return time;
  },
};
