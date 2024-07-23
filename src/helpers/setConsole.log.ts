const l = console.log;

console.log = (...args) => {
  const now = new Date();
  const dateTimeString = now.toLocaleString();
  l(...args, `[${dateTimeString}]`);
};
