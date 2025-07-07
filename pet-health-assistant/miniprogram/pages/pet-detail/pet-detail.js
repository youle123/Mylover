// 宠物详情页面
Page({
  data: {
    pet: {}
  },

  onLoad: function (options) {
    if (options.id) {
      this.loadPetDetail(options.id);
    }
  },

  loadPetDetail: function(id) {
    // 模拟数据
    const mockPet = {
      id: 1,
      name: '小白',
      breed: '金毛',
      age: 2,
      avatar: '/images/pet1.jpg',
      weight: 25.5,
      healthStatus: '良好',
      gender: '公',
      birthday: '2023-03-15'
    };
    
    this.setData({ pet: mockPet });
  },

  editPet: function() {
    wx.navigateTo({
      url: `/pages/add-pet/add-pet?mode=edit&id=${this.data.pet.id}`
    });
  },

  addRecord: function() {
    wx.navigateTo({
      url: `/pages/add-record/add-record?petId=${this.data.pet.id}`
    });
  }
});
