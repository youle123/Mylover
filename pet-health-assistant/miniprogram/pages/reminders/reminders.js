// 提醒管理页面
Page({
  data: {
    reminders: []
  },

  onLoad: function () {
    this.loadReminders();
  },

  loadReminders: function() {
    const mockReminders = [
      {
        id: 1,
        title: '小白喂食',
        time: '08:00',
        repeat: '每天',
        icon: '🍽️',
        enabled: true
      },
      {
        id: 2,
        title: '咪咪疫苗',
        time: '14:00',
        repeat: '一次性',
        icon: '💉',
        enabled: true
      }
    ];
    
    this.setData({ reminders: mockReminders });
  },

  onToggleReminder: function(e) {
    const id = e.currentTarget.dataset.id;
    const enabled = e.detail.value;
    
    const reminders = this.data.reminders.map(item => {
      if (item.id === id) {
        item.enabled = enabled;
      }
      return item;
    });
    
    this.setData({ reminders });
  },

  navigateToAddReminder: function() {
    wx.navigateTo({
      url: '/pages/add-reminder/add-reminder'
    });
  }
});
