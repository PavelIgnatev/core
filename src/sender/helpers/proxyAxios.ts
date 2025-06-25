import axios from 'axios';
import { HttpsProxyAgent } from 'https-proxy-agent';

const proxyUrl =
  'http://csyk3lwrZAB8r396Vd-dc-ANY:O52cprX1XXZ65Wy@gw.thunderproxy.net:5959';
const httpsAgent = new HttpsProxyAgent(proxyUrl);

const proxyAxios = axios.create({
  httpsAgent: httpsAgent,
  timeout: 60000, // Увеличиваем до 60 секунд
});

export default proxyAxios;
