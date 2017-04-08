// 获取全局应用程序实例对象
const app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    boards: [
      { key: 'in_theaters' },
      { key: 'coming_soon' },
      { key: 'top250' },
      { key: 'us_box', name: '北美票房榜' }
    ],
    loading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    const promises = this.data.boards.map(board => {
      return app.douban.find(board.key, 1, 10)
        .then(response => {
          board.title = response.title
          board.movies = response.subjects
          return board
        });
    })
    Promise.all(promises).then(boards => this.setData({ boards: boards, loading: false }));
  },

})
