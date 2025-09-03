const appealFlows = ['mistake', 'hacked'];

const randomElement = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

export const generateAppealFlow = (): 'mistake' | 'hacked' => {
  return randomElement(appealFlows) as 'mistake' | 'hacked';
};