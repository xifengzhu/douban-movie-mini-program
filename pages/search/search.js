//profile.js
//获取应用实例
const app = getApp();

Page({
  data: {
    page: 1,
    size: 20,
    subtitle: '请在此输入搜索内容',
    movies: [],
    search: '',
    loading: false,
    hasMore: false
  },


  handleLoadMore () {
    if (!this.data.hasMore) return

    this.setData({ subtitle: '加载中...', loading: true })

    return app.douban.find('search', this.data.page++, this.data.size, this.data.search)
      .then(response => {
        if (response.subjects.length) {
          this.setData({
            subtitle: response.title,
            movies: this.data.movies.concat(response.subjects),
            loading: false
          });
        } else {
          this.setData({ hasMore: false, loading: false });
        }
      })
      .catch(e => {
        this.setData({ subtitle: '获取数据异常', loading: false });
        console.error(e);
      })
  },

  handleSearch (e) {
    if (!e.detail.value) return;
    this.setData({ movies: [], page: 1 });
    this.setData({ subtitle: '加载中...', hasMore: true, loading: true, search: e.detail.value });

    this.handleLoadMore();
  },

  onReachBottom: function () {
    this.handleLoadMore();
  }
})
