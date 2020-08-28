$('.loginTit>a').click(function (even) {
  $(this).addClass('active').siblings().removeClass('active')
  if ($(this).index() == 0) {
    $('.account').css({
      display: 'block',
    })
    $('.dynamic').css({
      display: 'none',
    })
  } else {
    $('.account').css({
      display: 'none',
    })
    $('.dynamic').css({
      display: 'block',
    })
  }
  even.preventDefault()
})
function code() {
  var num = ''
  var str = ''
  var code = ''
  for (var i = 0; i < 2; i++) {
    num = Math.floor(Math.random() * 10)
    str = String.fromCharCode(Math.ceil(Math.random() * 25 + 65))
    code += num + str
    $('.code').text(code)
  }
}

$('.code').click(function () {
  $(this).text('')
  code()
})
var uname = ''
var pwd = ''
var cod = ''
var str = ''
$('input').on({
  focus: function () {
    console.log($(this).index())
    code()
    $(this).next().removeClass('mistakeTip')
  },
  blur: function () {
    if ($(this).val() == '') {
      $(this).next().addClass('mistakeTip')
    }

    if (
      $('.userName').val() &&
      $('.password').val() &&
      $('.Verification').val()
    ) {
      $('.btn').prop('disabled', false)
    }
  },
})

$('.btn').click(function () {
  if ($('.Verification').val() == $('.code:eq(0)').text()) {
    $.ajax({
      type: 'post', //默认get
      url: '../php/regist.php',
      data: {
        name: $('.userName').val(),
        pwd: $('.password').val(),
      },
      success: function (response) {
        //请求成功回调
        var arr = JSON.parse(response)
        if (arr.code == 1) {
          $(location).attr('href', './login.html')
        }
      },
      error: function (e) {
        //请求超时回调
        if (e.statusText == 'timeout') {
          alert('请求超时')
        }
      },
      complete: function () {}, //无论请求是成功还是失败都会执行的回调，常用全局成员的释放，或者页面状态的重置
    })
  } else {
    $('.Verification').next().addClass('mistakeTip')
  }
})
