// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const { userInfo } = event
  
  try {
    // 检查用户是否已存在
    const existingUser = await db.collection('users').where({
      openid: wxContext.OPENID
    }).get()
    
    const userData = {
      openid: wxContext.OPENID,
      appid: wxContext.APPID,
      unionid: wxContext.UNIONID,
      nickName: userInfo.nickName,
      avatarUrl: userInfo.avatarUrl,
      gender: userInfo.gender,
      country: userInfo.country,
      province: userInfo.province,
      city: userInfo.city,
      language: userInfo.language,
      lastLoginTime: new Date(),
      updateTime: new Date()
    }
    
    if (existingUser.data.length > 0) {
      // 更新用户信息
      const result = await db.collection('users').doc(existingUser.data[0]._id).update({
        data: userData
      })
      
      return {
        success: true,
        message: '用户信息更新成功',
        data: {
          _id: existingUser.data[0]._id,
          ...userData
        }
      }
    } else {
      // 创建新用户
      userData.createTime = new Date()
      const result = await db.collection('users').add({
        data: userData
      })
      
      return {
        success: true,
        message: '用户创建成功',
        data: {
          _id: result._id,
          ...userData
        }
      }
    }
  } catch (error) {
    console.error('保存用户信息失败:', error)
    return {
      success: false,
      message: '保存用户信息失败',
      error: error.message
    }
  }
}
