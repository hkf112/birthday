$(function () {
    $('#sigin').validate({
        // 表单规则
        rules: {
            username: {
                required: true,
                minlength: 2,
                maxlength: 12,
            },

            password: {
                required: true,
                minlength: 6,
                maxlength: 16,
            },

            user: {
                required: true,
                minlength: 2,
                maxlength: 6,
            }
        },

        // messages 改变失败文本
        messages: {
            username: {
                required: '必填内容,请完整填写',
            },
            password: {
                required: '必填内容,请完整填写',
            },
            user: {
                required: '不填,圆润的离开'
            }
        },
        

        // 验证完毕之后 , 执行的函数
        submitHandler: function (from) {
            const info = $(from).serialize()
            console.log(info)
            $('.sigin-box button').css('border', '2px solid black')
            
            // 发请求
            $.post('../server/signIn.php', info, null, 'json').then(res => {
                const { code,name } = res
                console.log(code)
                if (code === 1 ) {
                    $('.erro-title').css('display', 'block')
                    $('.sigin-box button').css('border', 'none')
                    $('input').val('')
                }else if (code === 0) {
                    setCookie('user', name)
                    $('.sigin-box').css('display', 'none')
                }
            })
        }

    })

    $('#sigin').on('input', 'input',() => {
        $('.erro-title').css('display', 'none')

    })

    $('.jum-ligin').click(function() {
        $('.sigin-box').css('display', 'none')
        $('.login-box').css('display', 'flex')
    })
    
    $('.sigin-close').click(function(e) {
        $('.sigin-box').css('display', 'none')
    })
})