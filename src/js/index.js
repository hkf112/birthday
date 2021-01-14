$(function () {

    // 轮播
    var mySwiper = new Swiper ('.swiper-container', {
        direction: 'horizontal', // 垂直切换选项
        loop: true, // 循环模式选项
        
        noSwiping : true,
        noSwipingClass : 'stop-swiping',    

        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
          clickable :true,
        },
        
        // 如果需要前进后退按钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      })    


      $('.goods-all').click(function(){
          window.location.href = './list.html'
      })

      
     

      // 侧导航栏
      $('.nav-list > li').mouseenter(function(){
        // $(this).
        const num = $(this).index()
        console.log($('.nav-right').eq(num).css('display', 'block').parent())
        $('.nav-right').parent().find('.nav-right').css('display', 'none').eq(num).css('display', 'block')
      })
      $('.nav-right').mouseleave(function(){
        $('.nav-right').css('display', 'none')
      })
      // $('.nav-list').mouseleave(function(){
      //   $('.nav-right').css('display', 'none')
      // })



    // 发送请求x渲染  nav
    $('.nav-list > li').mouseenter(async function (e) {
        const num = $(this).index() - 0 + 20
        // const res = await $.get('/index', `type=pc_index_category&id=${num}`, null, 'json').then(res => {
        
        // console.log(res)


    //         // 获得内容
    //         const { secondary } = res.data

    //         let str = null
    //         // 循环遍历
    //         secondary.forEach(item => {
    //             str += `
    //                 <li>
    //                     <h4>${item.name} 
    //                         <span></span>
    //                     </h4>
    //                     <div class="li-right">
             
    //                     </div>
    //                 </li>  
    //         `
    //         })

    //         console.log(secondary.item)
    //         // secondary.item.forEach((item1, index) => {
    //         //     // let str1 = `
    //         //     // <div>

    //         //     //     <img src="https://p3.ssl.qhimg.com/t01c8169ecc14f6af6c.webp" alt="">
    //         //     //     <span>摄像机</span>

    //         //     // </div>
                
    //         //     // `
    //         //     console.log(item1)
    //         // })
            
    
    //         console.log(secondary)

            
          
            
        // })

    })



})