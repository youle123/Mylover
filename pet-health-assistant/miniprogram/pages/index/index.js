// 首页逻辑
const app = getApp()

Page({
  data: {
    loading: false,
    userInfo: {},
    greeting: '早上好',
    weather: null,
    pets: [],
    currentPet: null,
    todayReminders: [],
    communityPosts: []
  },

  onLoad: function (options) {
    console.log('首页加载', options);
    this.initPage();
  },

  onShow: function () {
    console.log('首页显示');
    this.refreshData();
  },

  onPullDownRefresh: function () {
    console.log('下拉刷新');
    this.refreshData().then(() => {
      wx.stopPullDownRefresh();
    });
  },

  onReachBottom: function () {
    console.log('上拉加载更多');
    this.loadMoreCommunityPosts();
  },

  // 初始化页面
  initPage: function() {
    this.setGreeting();
    this.getUserInfo();
    this.loadData();
  },

  // 设置问候语
  setGreeting: function() {
    const hour = new Date().getHours();
    let greeting = '早上好';
    
    if (hour >= 6 && hour < 12) {
      greeting = '早上好';
    } else if (hour >= 12 && hour < 18) {
      greeting = '下午好';
    } else {
      greeting = '晚上好';
    }
    
    this.setData({ greeting });
  },

  // 获取用户信息
  getUserInfo: function() {
    const that = this;
    
    app.getUserInfo(function(userInfo) {
      that.setData({ userInfo });
    });
  },

  // 加载数据
  loadData: function() {
    this.setData({ loading: true });
    
    Promise.all([
      this.loadPets(),
      this.loadTodayReminders(),
      this.loadCommunityPosts(),
      this.loadWeather()
    ]).finally(() => {
      this.setData({ loading: false });
    });
  },

  // 刷新数据
  refreshData: function() {
    return this.loadData();
  },

  // 加载宠物数据
  loadPets: function() {
    return new Promise((resolve, reject) => {
      // 模拟数据，实际应该从云数据库获取
      const mockPets = [
        {
          id: 1,
          name: '小白',
          breed: '金毛',
          age: 2,
          avatar: '/images/pet1.jpg',
          weight: 25.5,
          healthStatus: '良好',
          nextVaccine: '2025-08-15'
        },
        {
          id: 2,
          name: '咪咪',
          breed: '英短',
          age: 1,
          avatar: '/images/pet2.jpg',
          weight: 4.2,
          healthStatus: '优秀',
          nextVaccine: '2025-09-01'
        }
      ];
      
      setTimeout(() => {
        this.setData({ 
          pets: mockPets,
          currentPet: mockPets[0] || null
        });
        resolve(mockPets);
      }, 500);
    });
  },

  // 加载今日提醒
  loadTodayReminders: function() {
    return new Promise((resolve, reject) => {
      // 模拟数据
      const mockReminders = [
        {
          id: 1,
          title: '小白喂食时间',
          time: '08:00',
          icon: '🍽️',
          type: 'feeding'
        },
        {
          id: 2,
          title: '咪咪疫苗提醒',
          time: '14:00',
          icon: '💉',
          type: 'vaccine'
        }
      ];
      
      setTimeout(() => {
        this.setData({ todayReminders: mockReminders });
        resolve(mockReminders);
      }, 300);
    });
  },

  // 加载社区动态
  loadCommunityPosts: function() {
    return new Promise((resolve, reject) => {
      // 模拟数据
      const mockPosts = [
        {
          id: 1,
          author: {
            name: '爱宠小主',
            avatar: '/images/user1.jpg'
          },
          content: '今天带小狗去公园玩，它特别开心！',
          createTime: '2小时前',
          likes: 15,
          comments: 3
        },
        {
          id: 2,
          author: {
            name: '猫咪达人',
            avatar: '/images/user2.jpg'
          },
          content: '分享一个猫咪健康小贴士：定期检查猫咪的牙齿健康很重要哦～',
          createTime: '5小时前',
          likes: 28,
          comments: 7
        }
      ];
      
      setTimeout(() => {
        this.setData({ communityPosts: mockPosts });
        resolve(mockPosts);
      }, 400);
    });
  },

  // 加载更多社区动态
  loadMoreCommunityPosts: function() {
    // 实际项目中这里会加载更多数据
    console.log('加载更多社区动态');
  },

  // 加载天气信息
  loadWeather: function() {
    return new Promise((resolve, reject) => {
      // 模拟天气数据
      const mockWeather = {
        temperature: 25,
        description: '晴朗'
      };
      
      setTimeout(() => {
        this.setData({ weather: mockWeather });
        resolve(mockWeather);
      }, 200);
    });
  },

  // 导航到添加记录页面
  navigateToAddRecord: function() {
    wx.navigateTo({
      url: '/pages/add-record/add-record'
    });
  },

  // 导航到添加提醒页面
  navigateToAddReminder: function() {
    wx.navigateTo({
      url: '/pages/add-reminder/add-reminder'
    });
  },

  // 导航到AI建议页面
  navigateToAIAdvice: function() {
    wx.navigateTo({
      url: '/pages/ai-advice/ai-advice'
    });
  },

  // 导航到兽医咨询页面
  navigateToVetConsult: function() {
    wx.navigateTo({
      url: '/pages/vet-consult/vet-consult'
    });
  },

  // 导航到宠物管理页面
  navigateToPets: function() {
    wx.switchTab({
      url: '/pages/pets/pets'
    });
  },

  // 导航到添加宠物页面
  navigateToAddPet: function() {
    wx.navigateTo({
      url: '/pages/add-pet/add-pet'
    });
  },

  // 导航到提醒页面
  navigateToReminders: function() {
    wx.switchTab({
      url: '/pages/reminders/reminders'
    });
  },

  // 导航到健康记录页面
  navigateToHealthRecord: function() {
    wx.switchTab({
      url: '/pages/health-record/health-record'
    });
  },

  // 导航到社区页面
  navigateToCommunity: function() {
    wx.switchTab({
      url: '/pages/community/community'
    });
  },

  // 导航到帖子详情页面
  navigateToPostDetail: function(e) {
    const postId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/post-detail/post-detail?id=${postId}`
    });
  },

  // 宠物卡片点击事件
  onPetTap: function(e) {
    const pet = e.currentTarget.dataset.pet;
    this.setData({ currentPet: pet });
    
    wx.navigateTo({
      url: `/pages/pet-detail/pet-detail?id=${pet.id}`
    });
  },

  // 完成提醒事项
  onReminderComplete: function(e) {
    const reminderId = e.currentTarget.dataset.id;
    const reminders = this.data.todayReminders.filter(item => item.id !== reminderId);
    
    this.setData({ todayReminders: reminders });
    
    wx.showToast({
      title: '已完成',
      icon: 'success'
    });
  },

  // 分享页面
  onShareAppMessage: function () {
    return {
      title: 'AI宠物健康管理助手',
      path: '/pages/index/index',
      imageUrl: '/images/share-cover.jpg'
    };
  }
});
