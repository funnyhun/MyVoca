const AppSetting = {
  min_width: "320px",
  max_width: "768px",
};

const LightTheme = {
  ...AppSetting,
  main: "#fff",
  inverse: "#000",
  background: "#F6F7F8",
  font: "#1f1f1f",
  label: "#666666",
  sub: "#aaaaaa",
  brand: "#137FEC",
  week: "#C8DEF5",
  success: "#34C759",
  week_success: "#7ED321",
  danger: "#FF3B30",
};

const DarkTheme = {
  ...AppSetting,
  themeColor: "#000",
  inverseColor: "#fff",
  color: "#F5F5F5",
  subColor: "#9b9b9bff",
  accentColor: "#232222",
  borderColor: "#373737",
};

export { LightTheme, DarkTheme };
