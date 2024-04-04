const util = require("util");
const exec = util.promisify(require("child_process").exec);

async function getAccounts() {
  try {
    const response = await fetch("http://localhost:5050/accounts/ids");
    if (!response.ok) {
      throw new Error(`Failed to retrieve accounts: ${response.statusText}`);
    }
    const accounts = await response.json();
    console.log(accounts);
    return accounts;
  } catch (error) {
    console.error(`Failed to retrieve accounts: ${error}`);
    return [];
  }
}

async function startProcesses() {
  const ids = await getAccounts();
  for (const accId of ids) {
    console.log(`ID=${accId} pm2 start out.js --name ${accId}`);
    await exec(`ID=${accId} pm2 start out.js --name ${accId}`);
  }
}

startProcesses();
