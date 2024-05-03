export const getTheme = () => {
  let theme = '';
  let today = new Date().getHours();
  // If current time is between 7AM to 7PM
  if (today >= 7 && today <= 18) {
    theme = 'light';
  } else {
    theme = 'light';
  }
  return theme;
};
