const mongoose = require('mongoose');
const { Schema } = mongoose;

const SubscriptionSchema = new Schema({
  userId:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  planSlug: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'past_due', 'canceled', 'trial'],
    default: 'trial'
  },
  startedAt: {
    type: Date,
    default: Date.now
  },
  currentPeriodStart: {
    type: Date,
    default: Date.now
  },
  currentPeriodEnd: {
    type: Date,
    default: () => new Date(Date.now() + 30*24*60*60*1000)
  },
  cancelAtPeriodEnd: {
    type: Boolean,
    default: false
  },
  stripeSubscriptionId: {
    type: String,
    unique: true,
    sparse: true,
    default: null
  },
  metadata: {
    type: Object
  }
}, { timestamps: true });
SubscriptionSchema.index({ userId: 1 });
SubscriptionSchema.index({ currentPeriodEnd: 1 });

module.exports = mongoose.model('Subscription', SubscriptionSchema);