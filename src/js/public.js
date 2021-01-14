$(function () {
    // 删除标签
    
    const name = getCookie('name')
   
    if(!name) {
    
    }else{
        $('.login>span').text(name + ',您好')
        $('.sigin').remove()
        $('.nav-right').on('mouseenter', '.login', () =>{
            $('.login-info').css('display', 'block')
        })
        $('.nav-right').on('mouseleave', '.login', () =>{
            $('.login-info').css('display', 'none')
        })


    }

    $('#login > input').on('input', function () {
        $('.erro-title').css('display', 'none')
    })

    // 点击登录页面显示
    $('.login').click(function () {
        id = $('.login').data('id')
        console.log(id)
        // 登录页面显示
        if (!id) {
          
            return
           
        }else{
              // 加蒙版
            const div = $('<div class="mask"></div>')
            div.prependTo($('body'))

            // 登录页面显示
            $('.login-box').css('display', 'block')
        }
    })

    // 点击是否判断注册
    $('.sigin').click(function(){
        if (!name) {
            console.log(111)
            $('.sigin-box').css('display', 'flex')
        }
    })

    if(!name) {
       
    }else{
        $('.login').off('click')
    }

    //  滚动,让nav-box有固定定位
    $(window).scroll(function () {
       var top = document.scroll || document.documentElement.scrollTop
       if(top >= 90) {
           
            $('.nav-box').css({
                'position': 'fixed',
                'top': 0 , 
                zIndex: 20
            })
       }else{
        $('.nav-box').css({
            'position': '',
            'top': 0 , 
            zIndex: 20
        })
       }
    })

   $('.icon-gouwuche').click(() => {
       window.location.href = './car.html'
   })

}) 






// 搜索引擎
$('.right-top').on('input', '.search-top', function() {
    const script = document.createElement('script')
    const value = $('.search-top').val()
    const url = `https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=1446,32857,33124,33061,32973,33099,33101,32962,22159&wd=${value}&req=2&csor=1&cb=bindHtml&_=1605768936993`
    script.src = url
    document.body.appendChild(script)
    script.remove()
})

function bindHtml(res) {
    if(!res.g) {
        $('.search').removeClass('active')
        console.log(11111)
        return
    }

    let str = ``
    for(let i = 0; i < res.g.length; i++) {
        str += `
        <li>${ res.g[i].q }</li>
        `
    }
    $('.search').html(str)
    $('.search').addClass('active')
    
}