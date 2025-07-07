/**
 * 常量定义
 */

// 宠物类型
export const PET_TYPES = {
  DOG: 'dog',
  CAT: 'cat',
  BIRD: 'bird',
  FISH: 'fish',
  RABBIT: 'rabbit',
  HAMSTER: 'hamster',
  OTHER: 'other'
};

// 宠物类型标签
export const PET_TYPE_LABELS = {
  [PET_TYPES.DOG]: '狗狗',
  [PET_TYPES.CAT]: '猫咪',
  [PET_TYPES.BIRD]: '鸟类',
  [PET_TYPES.FISH]: '鱼类',
  [PET_TYPES.RABBIT]: '兔子',
  [PET_TYPES.HAMSTER]: '仓鼠',
  [PET_TYPES.OTHER]: '其他'
};

// 性别
export const GENDERS = {
  MALE: 'male',
  FEMALE: 'female'
};

// 性别标签
export const GENDER_LABELS = {
  [GENDERS.MALE]: '公',
  [GENDERS.FEMALE]: '母'
};

// 健康状态
export const HEALTH_STATUS = {
  GOOD: 'good',
  WARNING: 'warning',
  DANGER: 'danger'
};

// 健康状态标签
export const HEALTH_STATUS_LABELS = {
  [HEALTH_STATUS.GOOD]: '良好',
  [HEALTH_STATUS.WARNING]: '需关注',
  [HEALTH_STATUS.DANGER]: '异常'
};

// 健康记录类型
export const HEALTH_RECORD_TYPES = {
  WEIGHT: 'weight',
  FOOD: 'food',
  EXERCISE: 'exercise',
  VACCINE: 'vaccine',
  CHECKUP: 'checkup',
  MEDICINE: 'medicine',
  SYMPTOM: 'symptom'
};

// 健康记录类型标签
export const HEALTH_RECORD_TYPE_LABELS = {
  [HEALTH_RECORD_TYPES.WEIGHT]: '体重',
  [HEALTH_RECORD_TYPES.FOOD]: '饮食',
  [HEALTH_RECORD_TYPES.EXERCISE]: '运动',
  [HEALTH_RECORD_TYPES.VACCINE]: '疫苗',
  [HEALTH_RECORD_TYPES.CHECKUP]: '体检',
  [HEALTH_RECORD_TYPES.MEDICINE]: '用药',
  [HEALTH_RECORD_TYPES.SYMPTOM]: '症状'
};

// 提醒类型
export const REMINDER_TYPES = {
  FEED: 'feed',
  VACCINE: 'vaccine',
  CHECKUP: 'checkup',
  MEDICINE: 'medicine',
  EXERCISE: 'exercise',
  CUSTOM: 'custom'
};

// 提醒类型标签
export const REMINDER_TYPE_LABELS = {
  [REMINDER_TYPES.FEED]: '喂食',
  [REMINDER_TYPES.VACCINE]: '疫苗',
  [REMINDER_TYPES.CHECKUP]: '体检',
  [REMINDER_TYPES.MEDICINE]: '用药',
  [REMINDER_TYPES.EXERCISE]: '运动',
  [REMINDER_TYPES.CUSTOM]: '自定义'
};

// 重复类型
export const REPEAT_TYPES = {
  ONCE: 'once',
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly'
};

// 重复类型标签
export const REPEAT_TYPE_LABELS = {
  [REPEAT_TYPES.ONCE]: '仅一次',
  [REPEAT_TYPES.DAILY]: '每天',
  [REPEAT_TYPES.WEEKLY]: '每周',
  [REPEAT_TYPES.MONTHLY]: '每月'
};

// 提醒状态
export const REMINDER_STATUS = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

// 提醒状态标签
export const REMINDER_STATUS_LABELS = {
  [REMINDER_STATUS.ACTIVE]: '活跃',
  [REMINDER_STATUS.COMPLETED]: '已完成',
  [REMINDER_STATUS.CANCELLED]: '已取消'
};

// 社区动态类型
export const POST_TYPES = {
  TEXT: 'text',
  IMAGE: 'image',
  VIDEO: 'video',
  QUESTION: 'question',
  EXPERIENCE: 'experience'
};

// 社区动态类型标签
export const POST_TYPE_LABELS = {
  [POST_TYPES.TEXT]: '文字',
  [POST_TYPES.IMAGE]: '图片',
  [POST_TYPES.VIDEO]: '视频',
  [POST_TYPES.QUESTION]: '求助',
  [POST_TYPES.EXPERIENCE]: '经验'
};

// 常见狗狗品种
export const DOG_BREEDS = [
  '金毛寻回犬',
  '拉布拉多犬',
  '哈士奇',
  '萨摩耶',
  '边境牧羊犬',
  '德国牧羊犬',
  '泰迪',
  '比熊',
  '博美',
  '柯基',
  '法斗',
  '雪纳瑞',
  '阿拉斯加',
  '松狮',
  '中华田园犬',
  '其他'
];

// 常见猫咪品种
export const CAT_BREEDS = [
  '英国短毛猫',
  '美国短毛猫',
  '苏格兰折耳猫',
  '波斯猫',
  '暹罗猫',
  '布偶猫',
  '缅因猫',
  '俄罗斯蓝猫',
  '孟加拉猫',
  '挪威森林猫',
  '土耳其安哥拉猫',
  '中华田园猫',
  '其他'
];

// 疫苗类型
export const VACCINE_TYPES = {
  DOG: [
    '狂犬疫苗',
    '六联疫苗',
    '八联疫苗',
    '犬瘟疫苗',
    '细小疫苗',
    '冠状疫苗'
  ],
  CAT: [
    '狂犬疫苗',
    '三联疫苗',
    '四联疫苗',
    '猫瘟疫苗',
    '猫鼻支疫苗',
    '猫杯状疫苗'
  ]
};

// 常见症状
export const COMMON_SYMPTOMS = [
  '食欲不振',
  '精神萎靡',
  '呕吐',
  '腹泻',
  '咳嗽',
  '打喷嚏',
  '流鼻涕',
  '发热',
  '皮肤瘙痒',
  '掉毛严重',
  '口臭',
  '眼部分泌物',
  '行走异常',
  '呼吸急促',
  '其他'
];

// 食物类型
export const FOOD_TYPES = [
  '狗粮/猫粮',
  '湿粮/罐头',
  '零食',
  '营养品',
  '自制食物',
  '其他'
];

// 运动类型
export const EXERCISE_TYPES = [
  '散步',
  '跑步',
  '游戏',
  '训练',
  '游泳',
  '其他'
];

// API错误码
export const ERROR_CODES = {
  SUCCESS: 0,
  PARAM_ERROR: 1001,
  AUTH_ERROR: 1002,
  DATA_NOT_FOUND: 1003,
  PERMISSION_DENIED: 1004,
  SERVER_ERROR: 5000
};

// API错误信息
export const ERROR_MESSAGES = {
  [ERROR_CODES.SUCCESS]: '成功',
  [ERROR_CODES.PARAM_ERROR]: '参数错误',
  [ERROR_CODES.AUTH_ERROR]: '认证失败',
  [ERROR_CODES.DATA_NOT_FOUND]: '数据不存在',
  [ERROR_CODES.PERMISSION_DENIED]: '权限不足',
  [ERROR_CODES.SERVER_ERROR]: '服务器错误'
};

// 存储键名
export const STORAGE_KEYS = {
  USER_INFO: 'userInfo',
  CURRENT_PET: 'currentPet',
  PETS: 'pets',
  SETTINGS: 'settings'
};

// 默认配置
export const DEFAULT_CONFIG = {
  PAGE_SIZE: 20,
  MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_IMAGE_COUNT: 9,
  CACHE_EXPIRE_TIME: 30 * 60 * 1000 // 30分钟
};

// 颜色配置
export const COLORS = {
  PRIMARY: '#FF6B9D',
  SECONDARY: '#FF8FA3',
  SUCCESS: '#34C759',
  WARNING: '#FF9500',
  DANGER: '#FF3B30',
  INFO: '#007AFF',
  LIGHT: '#F8F9FA',
  DARK: '#333333',
  MUTED: '#999999'
};
