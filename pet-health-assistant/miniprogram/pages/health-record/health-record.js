// 健康记录页面
Page({
  data: {
    pets: [],
    petNames: [],
    selectedPetIndex: 0,
    selectedPet: {},
    records: []
  },

  onLoad: function (options) {
    this.loadPets();
  },

  onShow: function () {
    this.loadRecords();
  },

  loadPets: function() {
    // 模拟数据
    const mockPets = [
      { id: 1, name: '小白' },
      { id: 2, name: '咪咪' }
    ];
    
    this.setData({
      pets: mockPets,
      petNames: mockPets.map(pet => pet.name),
      selectedPet: mockPets[0] || {}
    });
  },

  loadRecords: function() {
    // 模拟健康记录数据
    const mockRecords = [
      {
        id: 1,
        date: '2025-07-07',
        type: '体重记录',
        description: '定期体重检查',
        value: '25.5kg'
      },
      {
        id: 2,
        date: '2025-07-06',
        type: '疫苗接种',
        description: '狂犬病疫苗',
        value: ''
      }
    ];
    
    this.setData({ records: mockRecords });
  },

  onPetChange: function(e) {
    const index = e.detail.value;
    this.setData({
      selectedPetIndex: index,
      selectedPet: this.data.pets[index]
    });
    this.loadRecords();
  },

  navigateToAddRecord: function() {
    wx.navigateTo({
      url: '/pages/add-record/add-record'
    });
  }
});
