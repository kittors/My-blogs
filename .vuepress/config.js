module.exports = {
  title: "TrinkDifferent",
  description: "A thousand miles begins with a single step",
  dest: "public",
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,user-scalable=no",
      },
    ],
  ],
  theme: "reco",
  themeConfig: {
    nav: [
      { text: "主页", link: "/", icon: "reco-home" },
      { text: "时间线", link: "/timeline/", icon: "reco-date" },
      {
        text: "文件",
        icon: "reco-message",
        items: [{ text: "vuepress-reco", link: "/docs/theme-reco/" }],
      },
      {
        text: "联系", //contact
        icon: "reco-message",
        items: [
          {
            text: "GitHub",
            link: "https://github.com/kittors",
            icon: "reco-github",
          },
        ],
      },
    ],
    sidebar: {
      "/docs/theme-reco/": ["", "theme", "plugin", "api"],
    },
    type: "blog",
    // 博客设置
    blogConfig: {
      category: {
        location: 2, // 在导航栏菜单中所占的位置，默认2
        text: "分类", // 默认 “分类”
      },
      tag: {
        location: 3, // 在导航栏菜单中所占的位置，默认3
        text: "标签", // 默认 “标签”
      },
    },
    friendLink: [
      {
        title: "派大星",
        desc: "做一个极致的人",
        link: "https://pdxalive.vercel.app/",
        logo: "/paidaxing.jpg",
      },
      {
        title: "专业吃泡面",
        desc: "人生最终的价值在于觉醒和思考的能力,而不只在于生存",
        email: "364299311@qq.com",
        logo: "/avatar.jpg",
        link: "https://space.bilibili.com/456009975",
      },
    ],
    logo: "/logo.png",
    // 搜索设置
    search: true,
    searchMaxSuggestions: 10,
    // 自动形成侧边导航
    // sidebar: 'auto',
    // 最后更新时间
    lastUpdated: "Last Updated",
    // 作者
    author: "WuTao",
    // 作者头像
    authorAvatar: "/avatar.jpg",
    // 备案号
    record: "364299311@qq.com",
    // 项目开始时间
    startYear: "2021",
    /**
     * 密钥 (if your blog is private)
     */

    // keyPage: {
    //   keys: ['your password'],
    //   color: '#42b983',
    //   lineColor: '#42b983'
    // },

    /**
     * valine 设置 (if you need valine comment )
     */

    valineConfig: {
      appId: "...", // your appId
      appKey: "...", // your appKey
    },
  },
  markdown: {
    lineNumbers: true,
  },
};
