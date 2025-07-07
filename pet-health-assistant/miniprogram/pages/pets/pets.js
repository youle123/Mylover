// 宠物管理页面
const app = getApp()

Page({
  data: {
    loading: false,
    pets: []
  },

  onLoad: function (options) {
    console.log('宠物管理页面加载');
    this.loadPets();
  },

  onShow: function () {
    console.log('宠物管理页面显示');
    this.loadPets();
  },

  onPullDownRefresh: function () {
    this.loadPets().then(() => {
      wx.stopPullDownRefresh();
    });
  },

  // 加载宠物数据
  loadPets: function() {
    this.setData({ loading: true });
    
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
          gender: '公',
          birthday: '2023-03-15',
          color: '金黄色',
          microchip: 'MC123456789'
        },
        {
          id: 2,
          name: '咪咪',
          breed: '英短',
          age: 1,
          avatar: '/images/pet2.jpg',
          weight: 4.2,
          healthStatus: '优秀',
          gender: '母',
          birthday: '2024-01-20',
          color: '银渐层',
          microchip: 'MC987654321'
        },
        {
          id: 3,
          name: '小黑',
          breed: '拉布拉多',
          age: 3,
          avatar: '/images/pet3.jpg',
          weight: 30.0,
          healthStatus: '注意',
          gender: '公',
          birthday: '2022-06-10',
          color: '黑色',
          microchip: 'MC456789123'
        }
      ];
      
      setTimeout(() => {
        this.setData({ 
          pets: mockPets,
          loading: false 
        });
        resolve(mockPets);
      }, 500);
    });
  },

  // 宠物卡片点击事件
  onPetTap: function(e) {
    const pet = e.currentTarget.dataset.pet;
    wx.navigateTo({
      url: `/pages/pet-detail/pet-detail?id=${pet.id}`
    });
  },

  // 编辑宠物
  onEditPet: function(e) {
    const pet = e.currentTarget.dataset.pet;
    wx.navigateTo({
      url: `/pages/add-pet/add-pet?mode=edit&id=${pet.id}`
    });
  },

  // 删除宠物
  onDeletePet: function(e) {
    const petId = e.currentTarget.dataset.id;
    const that = this;
    
    wx.showModal({
      title: '确认删除',
      content: '删除后将无法恢复，确定要删除这只宠物吗？',
      confirmColor: '#FF6B9D',
      success: function(res) {
        if (res.confirm) {
          that.deletePet(petId);
        }
      }
    });
  },

  // 执行删除操作
  deletePet: function(petId) {
    const pets = this.data.pets.filter(pet => pet.id !== petId);
    this.setData({ pets });
    
    wx.showToast({
      title: '删除成功',
      icon: 'success'
    });
    
    // 实际项目中这里应该调用云函数删除数据
    console.log('删除宠物:', petId);
  },

  // 导航到添加宠物页面
  navigateToAddPet: function() {
    wx.navigateTo({
      url: '/pages/add-pet/add-pet'
    });
  },

  // 分享页面
  onShareAppMessage: function () {
    return {
      title: '我的宠物管理',
      path: '/pages/pets/pets'
    };
  }
});
