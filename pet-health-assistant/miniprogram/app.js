// app.js
App({
  onLaunch() {
    // 初始化云开发
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'pet-health-dev', // 云开发环境ID
        traceUser: true,
      });
    }

    // 检查用户登录状态
    this.checkLoginStatus();
    
    // 获取系统信息
    this.getSystemInfo();
  },

  onShow() {
    // 小程序显示时的处理
    console.log('小程序显示');
  },

  onHide() {
    // 小程序隐藏时的处理
    console.log('小程序隐藏');
  },

  onError(error) {
    // 小程序错误处理
    console.error('小程序错误:', error);
    this.reportError(error);
  },

  // 检查用户登录状态
  checkLoginStatus() {
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.globalData.userInfo = userInfo;
      this.globalData.isLoggedIn = true;
    } else {
      this.globalData.isLoggedIn = false;
    }
  },

  // 获取系统信息
  getSystemInfo() {
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.systemInfo = res;
        // 设置状态栏高度
        this.globalData.statusBarHeight = res.statusBarHeight;
        // 设置导航栏高度
        this.globalData.navBarHeight = res.statusBarHeight + 44;
      },
      fail: (error) => {
        console.error('获取系统信息失败:', error);
      }
    });
  },

  // 用户登录
  login() {
    return new Promise((resolve, reject) => {
      wx.getUserProfile({
        desc: '用于完善用户资料',
        success: (res) => {
          const userInfo = res.userInfo;
          // 保存用户信息到本地存储
          wx.setStorageSync('userInfo', userInfo);
          this.globalData.userInfo = userInfo;
          this.globalData.isLoggedIn = true;
          
          // 调用云函数保存用户信息
          this.saveUserToCloud(userInfo);
          resolve(userInfo);
        },
        fail: (error) => {
          console.error('获取用户信息失败:', error);
          reject(error);
        }
      });
    });
  },

  // 保存用户信息到云数据库
  saveUserToCloud(userInfo) {
    wx.cloud.callFunction({
      name: 'saveUser',
      data: {
        userInfo: userInfo
      },
      success: (res) => {
        console.log('用户信息保存成功:', res);
      },
      fail: (error) => {
        console.error('用户信息保存失败:', error);
      }
    });
  },

  // 用户退出登录
  logout() {
    wx.removeStorageSync('userInfo');
    this.globalData.userInfo = null;
    this.globalData.isLoggedIn = false;
    
    // 跳转到登录页面
    wx.reLaunch({
      url: '/pages/login/login'
    });
  },

  // 错误上报
  reportError(error) {
    wx.cloud.callFunction({
      name: 'reportError',
      data: {
        error: error,
        timestamp: new Date().getTime(),
        userInfo: this.globalData.userInfo
      },
      success: (res) => {
        console.log('错误上报成功:', res);
      },
      fail: (err) => {
        console.error('错误上报失败:', err);
      }
    });
  },

  // 显示加载提示
  showLoading(title = '加载中...') {
    wx.showLoading({
      title: title,
      mask: true
    });
  },

  // 隐藏加载提示
  hideLoading() {
    wx.hideLoading();
  },

  // 显示成功提示
  showSuccess(title) {
    wx.showToast({
      title: title,
      icon: 'success',
      duration: 2000
    });
  },

  // 显示错误提示
  showError(title) {
    wx.showToast({
      title: title,
      icon: 'error',
      duration: 2000
    });
  },

  // 全局数据
  globalData: {
    userInfo: null,
    isLoggedIn: false,
    systemInfo: null,
    statusBarHeight: 0,
    navBarHeight: 0,
    currentPet: null, // 当前选中的宠物
    pets: [], // 用户的宠物列表
    version: '1.0.0'
  }
});
