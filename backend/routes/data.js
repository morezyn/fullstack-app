const { Router } = require('express');
const featureFlag = require('../middleware/featureFlag');

const router = Router();

const basicData = [
  { id: 1, name: 'Item A' },
  { id: 2, name: 'Item B' },
  { id: 3, name: 'Item C' },
];

const enhancedData = [
  { id: 1, name: 'Item A', description: 'The first item', version: 2 },
  { id: 2, name: 'Item B', description: 'The second item', version: 2 },
  { id: 3, name: 'Item C', description: 'The third item', version: 2 },
];

router.get('/data', featureFlag('new-data-endpoint'), (req, res) => {
  res.json(enhancedData);
});

router.get('/v1/data', (req, res) => {
  res.json(basicData);
});

module.exports = router;
