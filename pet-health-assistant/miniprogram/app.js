// 小程序入口文件
App({
  // 全局数据
  globalData: {
    userInfo: null,
    openid: null,
    pets: [],
    currentPet: null,
    systemInfo: null
  },

  // 小程序初始化
  onLaunch: function (options) {
    console.log('小程序启动', options);
    
    // 获取系统信息
    this.getSystemInfo();
    
    // 初始化云开发
    this.initCloud();
    
    // 检查更新
    this.checkUpdate();
  },

  // 小程序显示
  onShow: function (options) {
    console.log('小程序显示', options);
  },

  // 小程序隐藏
  onHide: function () {
    console.log('小程序隐藏');
  },

  // 小程序错误
  onError: function (msg) {
    console.error('小程序错误:', msg);
    // 错误上报
    this.reportError(msg);
  },

  // 页面不存在
  onPageNotFound: function (res) {
    console.log('页面不存在:', res);
    wx.redirectTo({
      url: '/pages/index/index'
    });
  },

  // 初始化云开发
  initCloud: function() {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
      return;
    }

    wx.cloud.init({
      env: 'pet-health-env', // 云开发环境ID
      traceUser: true
    });

    console.log('云开发初始化成功');
  },

  // 获取系统信息
  getSystemInfo: function() {
    const that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.globalData.systemInfo = res;
        console.log('系统信息:', res);
      },
      fail: function(err) {
        console.error('获取系统信息失败:', err);
      }
    });
  },

  // 检查小程序更新
  checkUpdate: function() {
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager();
      
      updateManager.onCheckForUpdate(function (res) {
        console.log('检查更新结果:', res.hasUpdate);
      });

      updateManager.onUpdateReady(function () {
        wx.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success: function (res) {
            if (res.confirm) {
              updateManager.applyUpdate();
            }
          }
        });
      });

      updateManager.onUpdateFailed(function () {
        wx.showToast({
          title: '更新失败',
          icon: 'none'
        });
      });
    }
  },

  // 获取用户信息
  getUserInfo: function(callback) {
    const that = this;
    
    if (this.globalData.userInfo) {
      typeof callback === 'function' && callback(this.globalData.userInfo);
      return;
    }

    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: function(res) {
        that.globalData.userInfo = res.userInfo;
        typeof callback === 'function' && callback(res.userInfo);
      },
      fail: function(err) {
        console.error('获取用户信息失败:', err);
        wx.showToast({
          title: '获取用户信息失败',
          icon: 'none'
        });
      }
    });
  },

  // 获取用户openid
  getOpenid: function(callback) {
    const that = this;
    
    if (this.globalData.openid) {
      typeof callback === 'function' && callback(this.globalData.openid);
      return;
    }

    wx.cloud.callFunction({
      name: 'getOpenid',
      success: function(res) {
        that.globalData.openid = res.result.openid;
        typeof callback === 'function' && callback(res.result.openid);
      },
      fail: function(err) {
        console.error('获取openid失败:', err);
        wx.showToast({
          title: '获取用户标识失败',
          icon: 'none'
        });
      }
    });
  },

  // 错误上报
  reportError: function(error) {
    // 这里可以集成错误监控服务
    console.log('错误上报:', error);
  },

  // 工具函数
  utils: {
    // 格式化日期
    formatDate: function(date, format = 'YYYY-MM-DD') {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const hour = String(d.getHours()).padStart(2, '0');
      const minute = String(d.getMinutes()).padStart(2, '0');
      const second = String(d.getSeconds()).padStart(2, '0');

      return format
        .replace('YYYY', year)
        .replace('MM', month)
        .replace('DD', day)
        .replace('HH', hour)
        .replace('mm', minute)
        .replace('ss', second);
    },

    // 显示加载提示
    showLoading: function(title = '加载中...') {
      wx.showLoading({
        title: title,
        mask: true
      });
    },

    // 隐藏加载提示
    hideLoading: function() {
      wx.hideLoading();
    },

    // 显示成功提示
    showSuccess: function(title) {
      wx.showToast({
        title: title,
        icon: 'success',
        duration: 2000
      });
    },

    // 显示错误提示
    showError: function(title) {
      wx.showToast({
        title: title,
        icon: 'none',
        duration: 2000
      });
    }
  }
});
