const Flagsmith = require('flagsmith-nodejs');

let flagsmith = null;
let ready = false;

async function init() {
  const key = process.env.FLAGSMITH_ENVIRONMENT_KEY;
  if (!key) return;

  try {
    flagsmith = new Flagsmith({ environmentKey: key, enableLocalEvaluation: true });
    await flagsmith.getEnvironmentFlags();
    ready = true;
  } catch (err) {
    console.error('Flagsmith init failed:', err.message);
  }
}

async function isFeatureEnabled(featureName, identity) {
  if (!ready || !flagsmith) return false;
  try {
    const flags = identity
      ? await flagsmith.getIdentityFlags(identity)
      : await flagsmith.getEnvironmentFlags();
    return flags.isFeatureEnabled(featureName);
  } catch {
    return false;
  }
}

module.exports = { init, isFeatureEnabled };
