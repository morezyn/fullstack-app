const { isFeatureEnabled } = require('../flagsmith');

function featureFlag(featureName) {
  return async (req, res, next) => {
    const identity = req.headers['x-user-id'] || null;
    const enabled = await isFeatureEnabled(featureName, identity);

    if (!enabled) {
      return res.status(404).json({ error: 'Not available', feature: featureName });
    }

    next();
  };
}

module.exports = featureFlag;
