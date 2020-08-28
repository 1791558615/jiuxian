layui.use('element', function () {
  var element = layui.element //导航的hover效果、二级菜单等功能，需要依赖element模块
})
layui.use('carousel', function () {
  var carousel = layui.carousel
  //建造实例
  carousel.render({
    elem: '.swipt',
    height: '470px',
    width: '100%', //设置容器宽度
    arrow: 'none', //始终显示箭头
    //,anim: 'updown' //切换动画方式
  })
})
$('.layui-tab-title>li').on('click', function () {
  $(this)
    .css({
      'border-top': '2px solid #cc0000',
      color: '#cc0000',
      'background-color': '#fff',
    })
    .siblings()
    .css({
      'border-top': '2px solid #ececec',
      color: '#666',
      'background-color': '#f9f9f9',
    })
})

layui.use('flow', function () {
  var $ = layui.jquery //不用额外加载jQuery，flow模块本身是有依赖jQuery的，直接用即可。
  var flow = layui.flow
  flow.load({
    elem: '.indexTabCon',
    isLazyimg: true,
    isAuto: false, //指定列表容器
    done: function (page, next) {
      //到达临界点（默认滚动触发），触发下一页
      var lis = []
      //以jQuery的Ajax请求为例，请求下一页数据（注意：page是从2开始返回）
      $.ajax({
        url: '../json/commodity.json',
        type: 'get',
        contentType: 'json',
        success: function (data) {
          var arr = JSON.parse(data).data
          var max = 18
          layui.each(arr, function (index, item) {
            $(
              '.indexTabCon',
            ).prepend(`<a href="http://www.jiuxian.com/goods-${item.productId}.html?"><li>
              <img lay-src="${item.imgurl}" alt="" />
              <p>${item.word}</p>
              <span>${item.promoPrice}</span>
            </li></a>`)
          })
        },
      })
      //假设你的列表返回在data集合中
      //执行下一页渲染，第二参数为：满足“加载更多”的条件，即后面仍有分页
      //pages为Ajax返回的总页数，只有当前页小于总页数的情况下，才会继续出现加载更多
    },
  })
})
// $('.erjs>dd').on({
//   mouseout: () => {
//     $('.secondary').css({
//       display: 'none',
//     })
//   },
// })
$('.ification').on({
  mousemove: function () {
    $('.erjs').css({
      display: 'block',
    })
  },
  mouseout: () => {
    $('.erjs>dd').on({
      mousemove: function () {
        $(this)
          .css({
            backgroundColor: '#f1f1f1',
            'border-left': '1px solid red',
          })
          .siblings()
          .css({
            backgroundColor: '#fff',
            'border-left': '1px solid #fff',
          })
      },
      mouseout: () => {
        $('.secondary').css({
          display: 'block',
        })
        $('.secondary').on('mouseout', function () {
          $(this).css({
            display: 'none',
          })
        })
      },
    })
  },
})
