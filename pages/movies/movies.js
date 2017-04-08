// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    subtitle: '加载中...',
    type: 'in_theaters',
    loading: true,
    hasMore: true,
    page: 1,
    size: 20,
    movies: []
  },

  handleLoadMore () {
    if (!this.data.hasMore) return

    this.setData({ subtitle: '加载中...', loading: true })

    return app.douban.find(this.data.type, this.data.page++, this.data.size)
      .then(response => {
        if (response.subjects.length) {
          this.setData({
            subtitle: response.title,
            movies: this.data.movies.concat(response.subjects),
            loading: false
          });
        } else {
          this.setData({
            subtitle: response.title,
            hasMore: false, loading: false
          });
        }
      })
      .catch(e => {
        this.setData({ subtitle: '获取数据异常', loading: false });
        console.error(e)
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (params) {
    this.data.title = params.title || this.data.title;

    // 类型： in_theaters  coming_soon  us_box
    this.data.type = params.type || this.data.type;

    this.handleLoadMore();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    wx.setNavigationBarTitle({ title: this.data.title + ' « 电影 « 豆瓣' })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    // FIXME: the pull refresh is not working
    this.setData({ movies: [], page: 1, hasMore: true });
    this.handleLoadMore()
      .then(() => wx.stopPullDownRefresh());
  },
  onReachBottom: function () {
    this.handleLoadMore();
  }
})
