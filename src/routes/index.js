const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const productRoutes = require('./productRoutes');
const planRoutes = require('./planRoutes');
const subscriptionRoutes = require('./subscriptionRoutes');
const stageRoutes = require('./stageRoutes');
const sensorRoutes = require('./sensorRoutes');
const deviceRoutes = require('./deviceRoutes');
const telemetryRoutes = require('./telemetryRoutes');
const commandRoutes = require('./commandRoutes');
const actuatorRoutes = require('./actuatorRoutes');
const alertRoutes = require('./alertRoutes');
const imageRoutes = require('./imageRoutes');
const refreshTokenRoutes = require('./refreshTokenRoutes');


router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/plans', planRoutes);
router.use('/subscriptions', subscriptionRoutes);
router.use('/stages', stageRoutes);
router.use('/sensors', sensorRoutes);
router.use('/devices', deviceRoutes);
router.use('/telemetries', telemetryRoutes);
router.use('/commands', commandRoutes);
router.use('/actuators', actuatorRoutes);
router.use('/alerts', alertRoutes);
router.use('/images', imageRoutes);
router.use('/refresh-tokens', refreshTokenRoutes);


module.exports = router;