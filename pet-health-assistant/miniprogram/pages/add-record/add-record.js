// 添加健康记录页面
Page({
  data: {
    recordTypes: ['体重记录', '疫苗接种', '体检记录', '用药记录', '其他'],
    selectedTypeIndex: 0,
    needValue: true,
    recordData: {
      type: '',
      date: '',
      description: '',
      value: ''
    }
  },

  onLoad: function (options) {
    const today = new Date().toISOString().split('T')[0];
    this.setData({
      'recordData.date': today,
      'recordData.type': this.data.recordTypes[0]
    });
  },

  onTypeChange: function(e) {
    const index = e.detail.value;
    const type = this.data.recordTypes[index];
    const needValue = type === '体重记录';
    
    this.setData({
      selectedTypeIndex: index,
      'recordData.type': type,
      needValue: needValue
    });
  },

  onDateChange: function(e) {
    this.setData({
      'recordData.date': e.detail.value
    });
  },

  onDescriptionInput: function(e) {
    this.setData({
      'recordData.description': e.detail.value
    });
  },

  onValueInput: function(e) {
    this.setData({
      'recordData.value': e.detail.value
    });
  },

  onSave: function() {
    const { type, date, description } = this.data.recordData;
    
    if (!type || !date || !description) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      });
      return;
    }

    wx.showLoading({ title: '保存中...' });
    
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
