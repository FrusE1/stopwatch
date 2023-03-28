const formatSecondsInTime = (seconds) => {
  let result = "";
  let sec = seconds % 60;
  let min = (Math.floor(seconds / 60)) % 60;
  let h = (Math.floor(seconds / 3600)) % 60;
  if (((h || min) && sec < 10) || sec < 10) {
    sec = `0${sec}`;
  }
  if (h && min < 10) {
    min = `0${min}`;
  }
  if (seconds < 60) {
    result = `${seconds}`;
  } else if (seconds < 3600) {
    result = `${min}:${sec}`;
  } else if (seconds >= 3600) {
    result = `${h}:${min}:${sec}`;
  } else if (seconds < 0) {
    result = "0";
  }
  return result;
}

export default formatSecondsInTime;