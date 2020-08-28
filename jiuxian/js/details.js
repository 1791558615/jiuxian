layui.config({
  base: '../mods/',
  version: '1.0',
})
//一般直接写在一个js文件中
layui.use(['layer', 'form', 'layarea'], function () {
  var layer = layui.layer,
    form = layui.form,
    layarea = layui.layarea
  layarea.render({
    elem: '#area-picker',
    change: function (res) {
      //选择结果
      console.log(res)
    },
  })
})

$('.show-list>ul>li').on({
  mouseover: function () {
    var url = $(this).children().attr('src')
    $(this)
      .css({
        border: '1px solid #c00',
      })
      .siblings()
      .css({
        border: 'none',
      })
    $('.imgbox>img').attr('src', url)
  },
})
var active = {
  offset: function (othis) {
    var type = othis.data('type'),
      text = othis.text()

    layer.open({
      type: 1,
      offset: type,
      id: 'layerDemo' + type,
      content: '<div style="padding: 20px 100px;">' + '加入购物成功' + '</div>',
      btn: '进入购物车',
      btnAlign: 'c',
      shade: 0,
      yes: function () {
        window.location.href = './cart.html'
      },
    })
  },
}

$('#btnDetail .layui-btn').on('click', function () {
  var othis = $(this),
    method = othis.data('method')
  active[method] ? active[method].call(this, othis) : ''
})
$('.jian').on('click', function () {
  var i = parseInt($(this).next().val())
  i = i <= 1 ? (i = 1) : i - 1
  console.log($(this).next().val())
  $(this).next().val(i)
})
$('.jia').on('click', function () {
  var i = parseInt($(this).prev().val())
  console.log($(this).prev().val())
  $(this)
    .prev()
    .val(i + 1)
})
$('#btnDetail>button').on('click', function () {
  var id = parseInt($('.spid').html())
  var name = $('.comName>h1').html()
  var img = $('.imgbox>img').attr('src')
  var price = parseInt($('.pri>strong').html())
  var num = parseInt($('.sum').val())
  var data = price * num
  console.log(id, name, img, price, num, data)
  $.ajax({
    url: '../php/addwq.php',
    type: 'post',
    data: {
      id,
      name,
      img,
      price,
      num,
      data,
    },
    success: function (response) {
      console.log(response)
    },
  })
})
