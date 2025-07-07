// 社区页面
Page({
  data: {
    activeTab: 'all',
    posts: []
  },

  onLoad: function () {
    this.loadPosts();
  },

  onShow: function () {
    this.loadPosts();
  },

  onPullDownRefresh: function () {
    this.loadPosts().then(() => {
      wx.stopPullDownRefresh();
    });
  },

  onReachBottom: function () {
    this.loadMorePosts();
  },

  loadPosts: function() {
    return new Promise((resolve) => {
      const mockPosts = [
        {
          id: 1,
          title: '我家小狗今天特别开心',
          content: '今天带小狗去公园玩，它特别开心！遇到了很多小伙伴，玩得不亦乐乎。',
          category: '日常',
          author: {
            name: '爱宠小主',
            avatar: '/images/user1.jpg'
          },
          createTime: '2小时前',
          likes: 15,
          comments: 3,
          views: 128,
          images: ['/images/post1.jpg']
        },
        {
          id: 2,
          title: '猫咪健康小贴士分享',
          content: '分享一个猫咪健康小贴士：定期检查猫咪的牙齿健康很重要哦～',
          category: '健康',
          author: {
            name: '猫咪达人',
            avatar: '/images/user2.jpg'
          },
          createTime: '5小时前',
          likes: 28,
          comments: 7,
          views: 256,
          images: []
        }
      ];
      
      setTimeout(() => {
        this.setData({ posts: mockPosts });
        resolve(mockPosts);
      }, 500);
    });
  },

  loadMorePosts: function() {
    console.log('加载更多帖子');
  },

  onTabChange: function(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({ activeTab: tab });
    this.loadPosts();
  },

  onPostTap: function(e) {
    const postId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/post-detail/post-detail?id=${postId}`
    });
  },

  navigateToPost: function() {
    wx.navigateTo({
      url: '/pages/create-post/create-post'
    });
  }
});
