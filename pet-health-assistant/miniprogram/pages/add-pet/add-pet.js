// 添加宠物页面
Page({
  data: {
    petData: {
      name: '',
      breed: '',
      gender: '公',
      birthday: '',
      weight: '',
      avatar: ''
    }
  },

  onLoad: function (options) {
    if (options.mode === 'edit' && options.id) {
      this.loadPetData(options.id);
    }
  },

  loadPetData: function(id) {
    // 模拟加载宠物数据
    const mockPet = {
      name: '小白',
      breed: '金毛',
      gender: '公',
      birthday: '2023-03-15',
      weight: '25.5',
      avatar: '/images/pet1.jpg'
    };
    
    this.setData({ petData: mockPet });
  },

  chooseAvatar: function() {
    const that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        that.setData({
          'petData.avatar': res.tempFilePaths[0]
        });
      }
    });
  },

  onNameInput: function(e) {
    this.setData({
      'petData.name': e.detail.value
    });
  },

  onBreedInput: function(e) {
    this.setData({
      'petData.breed': e.detail.value
    });
  },

  onGenderChange: function(e) {
    this.setData({
      'petData.gender': e.detail.value
    });
  },

  onBirthdayChange: function(e) {
    this.setData({
      'petData.birthday': e.detail.value
    });
  },

  onWeightInput: function(e) {
    this.setData({
      'petData.weight': e.detail.value
    });
  },

  onSave: function() {
    const { name, breed, birthday } = this.data.petData;
    
    if (!name || !breed || !birthday) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      });
      return;
    }

    wx.showLoading({ title: '保存中...' });
    
    // 模拟保存操作
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '保存成功',
        icon: 'success'
      });
      
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    }, 1000);
  }
});
