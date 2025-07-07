// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const { limit = 20, skip = 0 } = event
  
  try {
    // 获取用户的宠物列表
    const result = await db.collection('pets')
      .where({
        userId: wxContext.OPENID
      })
      .orderBy('createTime', 'desc')
      .limit(limit)
      .skip(skip)
      .get()
    
    // 计算宠物年龄
    const pets = result.data.map(pet => {
      if (pet.birthDate) {
        const birthDate = new Date(pet.birthDate)
        const now = new Date()
        const diffTime = Math.abs(now - birthDate)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        
        if (diffDays < 365) {
          pet.age = Math.floor(diffDays / 30)
          pet.ageUnit = 'month'
        } else {
          pet.age = Math.floor(diffDays / 365)
          pet.ageUnit = 'year'
        }
      }
      
      return pet
    })
    
    return {
      success: true,
      data: pets,
      total: result.data.length
    }
  } catch (error) {
    console.error('获取宠物列表失败:', error)
    return {
      success: false,
      message: '获取宠物列表失败',
      error: error.message,
      data: []
    }
  }
}
