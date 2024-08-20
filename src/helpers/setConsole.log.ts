const l = console.log;

console.log = (...args) => {
  const now = new Date();
  const dateTimeString = now.toLocaleString("en-US", { timeZone: 'UTC' });
  l(...args, `[${dateTimeString }]`);
};
