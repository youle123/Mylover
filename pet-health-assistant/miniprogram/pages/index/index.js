// pages/index/index.js
const app = getApp();

Page({
  data: {
    userInfo: null,
    pets: [],
    currentPet: null,
    todayReminders: [],
    healthData: [],
    aiSuggestions: [],
    communityPosts: [],
    weather: null,
    loading: true
  },

  onLoad(options) {
    console.log('首页加载');
    this.initPage();
  },

  onShow() {
    console.log('首页显示');
    this.refreshData();
  },

  onPullDownRefresh() {
    console.log('下拉刷新');
    this.refreshData().finally(() => {
      wx.stopPullDownRefresh();
    });
  },

  onReachBottom() {
    console.log('触底加载');
    this.loadMoreCommunityPosts();
  },

  // 初始化页面
  async initPage() {
    try {
      app.showLoading('加载中...');
      
      // 获取用户信息
      await this.getUserInfo();
      
      // 如果用户已登录，加载相关数据
      if (this.data.userInfo) {
        await Promise.all([
          this.loadPets(),
          this.loadTodayReminders(),
          this.loadAISuggestions(),
          this.loadCommunityPosts(),
          this.loadWeather()
        ]);
      }
      
      this.setData({ loading: false });
    } catch (error) {
      console.error('页面初始化失败:', error);
      app.showError('加载失败，请重试');
    } finally {
      app.hideLoading();
    }
  },

  // 刷新数据
  async refreshData() {
    try {
      if (!this.data.userInfo) {
        await this.getUserInfo();
      }
      
      if (this.data.userInfo) {
        await Promise.all([
          this.loadPets(),
          this.loadTodayReminders(),
          this.loadHealthData(),
          this.loadAISuggestions(),
          this.loadCommunityPosts(),
          this.loadWeather()
        ]);
      }
    } catch (error) {
      console.error('数据刷新失败:', error);
      app.showError('刷新失败');
    }
  },

  // 获取用户信息
  async getUserInfo() {
    const userInfo = app.globalData.userInfo;
    if (userInfo) {
      this.setData({ userInfo });
    }
  },

  // 加载宠物列表
  async loadPets() {
    try {
      const result = await wx.cloud.callFunction({
        name: 'getPets',
        data: {}
      });
      
      const pets = result.result.data || [];
      const currentPet = pets.length > 0 ? pets[0] : null;
      
      this.setData({ 
        pets: pets.slice(0, 3), // 首页只显示前3个
        currentPet 
      });
      
      // 更新全局数据
      app.globalData.pets = pets;
      app.globalData.currentPet = currentPet;
      
      // 如果有当前宠物，加载健康数据
      if (currentPet) {
        await this.loadHealthData();
      }
    } catch (error) {
      console.error('加载宠物列表失败:', error);
    }
  },

  // 加载今日提醒
  async loadTodayReminders() {
    try {
      const today = new Date();
      const todayStr = today.toISOString().split('T')[0];
      
      const result = await wx.cloud.callFunction({
        name: 'getReminders',
        data: {
          date: todayStr,
          limit: 5
        }
      });
      
      this.setData({ 
        todayReminders: result.result.data || [] 
      });
    } catch (error) {
      console.error('加载今日提醒失败:', error);
    }
  },

  // 加载健康数据
  async loadHealthData() {
    if (!this.data.currentPet) return;
    
    try {
      const result = await wx.cloud.callFunction({
        name: 'getHealthRecords',
        data: {
          petId: this.data.currentPet._id,
          type: 'weight',
          limit: 30
        }
      });
      
      this.setData({ 
        healthData: result.result.data || [] 
      });
    } catch (error) {
      console.error('加载健康数据失败:', error);
    }
  },

  // 加载AI建议
  async loadAISuggestions() {
    if (!this.data.currentPet) return;
    
    try {
      const result = await wx.cloud.callFunction({
        name: 'getAISuggestions',
        data: {
          petId: this.data.currentPet._id,
          limit: 3
        }
      });
      
      this.setData({ 
        aiSuggestions: result.result.data || [] 
      });
    } catch (error) {
      console.error('加载AI建议失败:', error);
    }
  },

  // 加载社区动态
  async loadCommunityPosts() {
    try {
      const result = await wx.cloud.callFunction({
        name: 'getCommunityPosts',
        data: {
          limit: 3,
          skip: 0
        }
      });
      
      this.setData({ 
        communityPosts: result.result.data || [] 
      });
    } catch (error) {
      console.error('加载社区动态失败:', error);
    }
  },

  // 加载更多社区动态
  async loadMoreCommunityPosts() {
    try {
      const result = await wx.cloud.callFunction({
        name: 'getCommunityPosts',
        data: {
          limit: 5,
          skip: this.data.communityPosts.length
        }
      });
      
      const newPosts = result.result.data || [];
      this.setData({ 
        communityPosts: [...this.data.communityPosts, ...newPosts]
      });
    } catch (error) {
      console.error('加载更多社区动态失败:', error);
    }
  },

  // 加载天气信息
  async loadWeather() {
    try {
      // 获取用户位置
      const location = await this.getUserLocation();
      if (!location) return;
      
      const result = await wx.cloud.callFunction({
        name: 'getWeather',
        data: {
          latitude: location.latitude,
          longitude: location.longitude
        }
      });
      
      this.setData({ 
        weather: result.result.data 
      });
    } catch (error) {
      console.error('加载天气信息失败:', error);
    }
  },

  // 获取用户位置
  getUserLocation() {
    return new Promise((resolve) => {
      wx.getLocation({
        type: 'gcj02',
        success: (res) => {
          resolve({
            latitude: res.latitude,
            longitude: res.longitude
          });
        },
        fail: () => {
          resolve(null);
        }
      });
    });
  },

  // 用户登录
  async login() {
    try {
      const userInfo = await app.login();
      this.setData({ userInfo });
      await this.refreshData();
      app.showSuccess('登录成功');
    } catch (error) {
      console.error('登录失败:', error);
      app.showError('登录失败');
    }
  },

  // 选择宠物
  selectPet(e) {
    const pet = e.currentTarget.dataset.pet;
    this.setData({ currentPet: pet });
    app.globalData.currentPet = pet;
    this.loadHealthData();
    this.loadAISuggestions();
  },

  // 完成提醒
  async completeReminder(e) {
    const reminder = e.detail.reminder;
    try {
      await wx.cloud.callFunction({
        name: 'completeReminder',
        data: {
          reminderId: reminder._id
        }
      });
      
      // 更新本地数据
      const updatedReminders = this.data.todayReminders.filter(
        item => item._id !== reminder._id
      );
      this.setData({ todayReminders: updatedReminders });
      
      app.showSuccess('提醒已完成');
    } catch (error) {
      console.error('完成提醒失败:', error);
      app.showError('操作失败');
    }
  },

  // 显示操作菜单
  showActionSheet() {
    wx.showActionSheet({
      itemList: ['添加宠物', '记录健康', '设置提醒', '发布动态'],
      success: (res) => {
        switch (res.tapIndex) {
          case 0:
            this.navigateToAddPet();
            break;
          case 1:
            this.navigateToAddRecord();
            break;
          case 2:
            this.navigateToAddReminder();
            break;
          case 3:
            this.navigateToPublish();
            break;
        }
      }
    });
  },

  // 页面导航方法
  navigateToPets() {
    wx.switchTab({ url: '/pages/pets/pets' });
  },

  navigateToAddPet() {
    wx.navigateTo({ url: '/pages/add-pet/add-pet' });
  },

  navigateToAddRecord() {
    if (!this.data.currentPet) {
      app.showError('请先添加宠物');
      return;
    }
    wx.navigateTo({ 
      url: `/pages/add-record/add-record?petId=${this.data.currentPet._id}` 
    });
  },

  navigateToReminders() {
    wx.navigateTo({ url: '/pages/reminders/reminders' });
  },

  navigateToAddReminder() {
    wx.navigateTo({ url: '/pages/add-reminder/add-reminder' });
  },

  navigateToAIAdvice() {
    if (!this.data.currentPet) {
      app.showError('请先添加宠物');
      return;
    }
    wx.navigateTo({ 
      url: `/pages/ai-advice/ai-advice?petId=${this.data.currentPet._id}` 
    });
  },

  navigateToVetConsult() {
    wx.navigateTo({ url: '/pages/vet-consult/vet-consult' });
  },

  navigateToCommunity() {
    wx.switchTab({ url: '/pages/community/community' });
  },

  navigateToPostDetail(e) {
    const post = e.currentTarget.dataset.post;
    wx.navigateTo({ 
      url: `/pages/post-detail/post-detail?id=${post._id}` 
    });
  },

  navigateToPublish() {
    wx.navigateTo({ url: '/pages/publish/publish' });
  }
});
