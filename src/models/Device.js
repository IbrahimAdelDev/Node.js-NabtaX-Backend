const mongoose = require('mongoose');
const { Schema } = mongoose;

const DeviceSchema = new Schema(
  {
    // 👤 مالك الجهاز
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true, // لتحسين الاستعلامات
    },

    // 🌿 المزرعة (Garden) التي ينتمي إليها الجهاز
    gardenId: {
      type: Schema.Types.ObjectId,
      ref: 'Garden',
      required: true,
      index: true,
    },

    // 📦 المنتج (النوع أو الموديل التجاري للجهاز)
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },

    // 🧠 الحساسات Sensors المرتبطة بالجهاز
    sensors: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Sensor',
      },
    ],

    // ⚙️ المشغلات (Actuators) المرتبطة بالجهاز
    actuators: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Actuator',
      },
    ],

    // 🔢 رقم السيريال الفريد للجهاز
    serial: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      uppercase: true,
    },

    // 🧩 المراحل (Stages) التي يشارك فيها الجهاز
    stages: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Stage',
      },
    ],

    // 💻 موديل الجهاز (اسم النسخة أو الموديل الفني)
    model: {
      type: String,
      required: true,
      trim: true,
      default: '',
    },

    // 🧾 المواصفات الفنية (نص أو JSON حسب الحاجة)
    specifications: {
      type: String,
      required: true,
      default: '',
    },

    // 🧠 إصدار الـ Firmware
    firmware: {
      type: String,
      required: true,
      default: '1.0.0',
      match: /^\d+\.\d+\.\d+$/, // يتحقق من شكل الإصدار مثلاً 1.0.2
    },

    // 🏭 الشركة المصنعة
    manufacturer: {
      type: String,
      required: true,
      trim: true,
    },

    // ⚙️ حالة الجهاز الحالية
    status: {
      type: String,
      enum: ['active', 'inactive', 'maintenance', 'decommissioned'],
      default: 'active',
      index: true,
    },

    // 🕒 آخر اتصال بالجهاز (مفيد للـ monitoring)
    lastConnection: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// ✅ Indexes لتحسين الاستعلامات الشائعة
DeviceSchema.index({ serial: 1 });
DeviceSchema.index({ ownerId: 1, gardenId: 1 });
DeviceSchema.index({ status: 1 });

module.exports = mongoose.model('Device', DeviceSchema);
