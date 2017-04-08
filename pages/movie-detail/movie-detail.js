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
    loading: true,
    movies: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (params) {
    app.douban.findOne(params.id)
      .then(response => {
        this.setData({ title: response.title, movie: response, loading: false })
        wx.setNavigationBarTitle({ title: response.title + ' « 电影 « 豆瓣' })
      })
      .catch(e => {
        this.setData({ title: '获取数据异常', movie: {}, loading: false })
        console.error(e)
      });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    wx.setNavigationBarTitle({ title: this.data.title + ' « 电影 « 豆瓣' })
  },


  onShareAppMessage () {
    const { movie } = this.data;
    return {
      title: movie.title,
      desc: movie.summary,
      path: '/pages/movie-detail/movie-detail?id=' + movie.id
    }
  }
})
