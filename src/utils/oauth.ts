// Discord
export const DISCORD_KEY = process.env.POLL_DISCORD_KEY;
export const DISCORD_ID = process.env.POLL_DISCORD_ID;
export const DISCORD_OAUTH = process.env.POLL_DISCORD_OAUTH;

// Github
export const GITHUB_KEY = process.env.POLL_GITHUB_KEY;
export const GITHUB_ID = process.env.POLL_GITHUB_ID;
export const GITHUB_OAUTH = GITHUB_ID === undefined ? undefined : `https://github.com/login/oauth/authorize?scope=user:email&client_id=${GITHUB_ID}`;