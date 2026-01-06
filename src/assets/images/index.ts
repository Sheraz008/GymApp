// Icon Assets Index
// Centralized export for all custom icons

export const icons = {
  delete: require('./delete.png'),
  refresh: require('./refresh.png'),
  calendar: require('./calendar.png'),
  google: require('./google.png'),
};

export type IconName = keyof typeof icons;
