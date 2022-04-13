import { ConfigInterface } from '.';

export default (): ConfigInterface => ({
  NODE_ENV: process.env.NODE_ENV,
  PORT: parseInt(process.env.PORT, 10),
});
