$(function () {

    $('.jump-sigin').click(() => {
        $('.login-box').css('display', 'none')
        $('.sigin-box').css('display', 'flex')
    })

    $('.tab > div').click(function(e) {
        let num = $(this).index()
        console.log(num)
        if(num === 2) num = 1
        $('.tab > div').eq(num).css({color:'#36b447', borderBottom: '2px solid #36b447'}).siblings().css({color:'black', borderBottom: 'none'})
        $('.btn > form').eq(num).addClass('active').siblings().removeClass('active')
        
    })

    $('.login-close').click(function(e) {
        $('.login-box').css('display', 'none')
        window.location.reload()
    })

    $('#login').validate({
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
            }
        },

        // messages 改变失败文本
        messages: {
            username: {
                required: '必填内容,请完整填写',
            },
            password: {
                required: '必填内容,请完整填写',
            }
        },

        // 验证完毕之后 , 执行的函数
        submitHandler: function (from) {
            const info = $(from).serialize()
            console.log(info)
            $.post('../server/login.php', info, null, 'json').then(res=> {
                console.log(res)
                const { code,data } = res
                if (code === 0) {
                    $('.erro-title').css('display', 'block')
                }else if (code === 1) {

                    setCookie('name', data)
                    $('.login').removeData('id')
                    const url = window.sessionStorage.getItem('url')
                    window.location.href = `./${url ? url : index}.html`
                }
            })
        }
    })

    


})