layui.use('table', function () {
  var table = layui.table
  //监听表格复选框选择
  table.on('checkbox(demo)', function (obj) {
    console.log(obj)
  })

  //监听工具条
  table.on('tool(demo)', function (obj) {
    var data = obj.data
    if (obj.event === 'detail') {
      layer.msg('ID：' + data.id + ' 的查看操作')
    } else if (obj.event === 'del') {
      layer.confirm('真的删除行么', function (index) {
        obj.del()
        layer.close(index)
      })
    } else if (obj.event === 'edit') {
      layer.alert('编辑行：<br>' + JSON.stringify(data))
    }
  })

  var $ = layui.$,
    active = {
      getCheckData: function () {
        //获取选中数据
        var checkStatus = table.checkStatus('idTest'),
          data = checkStatus.data
        layer.alert(JSON.stringify(data))
      },
      getCheckLength: function () {
        //获取选中数目
        var checkStatus = table.checkStatus('idTest'),
          data = checkStatus.data
        layer.msg('选中了：' + data.length + ' 个')
      },
      isAll: function () {
        //验证是否全选
        var checkStatus = table.checkStatus('idTest')
        layer.msg(checkStatus.isAll ? '全选' : '未全选')
      },
    }

  $('.demoTable .layui-btn').on('click', function () {
    var type = $(this).data('type')
    active[type] ? active[type].call(this) : ''
  })
})
$(function () {
  $.ajax({
    url: '../php/showlist.php',
    type: 'get',
    success: function (res) {
      var data = JSON.parse(res)
      var arr = data.data[0]
      console.log(arr)
      $('thead').append(`<tr>
            <td></td>
            <td><img src="${arr.product_img}"></td>
            <td>${arr.product_name}</td>
            <td>${arr.product_price}</td>
            <td>${arr.product_num}</td>
            <td>${arr.total_price}</td>
            <td><a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a></td>
          </tr>`)
    },
  })
})
