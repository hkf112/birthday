$(function () {
    const name = 'name'
    const info = JSON.parse(window.localStorage.getItem('car')) || []
    
    // 判断info 内有没有信息
    if(!info.length) {
        $('.off').css('display', 'block')
        $('.on').css('display', 'none')
    }else {
        $('.on').css('display', 'block')
        $('.body-box').css({
            paddingBottom:'10px',
            height:'auto'
        })
        $('.off').css('display', 'none')
    }

   // 渲染页面
   bindHtml()
   function bindHtml() {
    //    window.localStorage.setItem('car', JSON.stringify(info))
       // 全选判断
       let selectAll = info.every(item => item.is_select == 1)
       
        
       // 设置下面需要用到的变量
       let total = 0
       let allMoney = 0
       
       let str = `
            <ol class="body-title">
            <input type="checkbox" ${selectAll ? 'checked' : ''} }>全选
            <li>商品</li>
            <li>属性</li>
            <li>单价</li>
            <li>数量</li>
            <li>小计</li>
            <li>操作</li>
            </ol>
            <p class="myseleft">360自营店</p>
            <ul class="body-body">
       `
       
       
       
       info.forEach(item => {
           if(item.is_select == 1) {
               total +=  item.cart_number - 0
               allMoney += (item.goods_price * total).toFixed(2) - 0
            }
        })
        
        // 遍历
        
            info.forEach(item => {
                str += `
                    <li>
                        <input type="checkbox" data-id="${item.goods_id}" ${item.is_select == 0 ? '' : 'checked'}>
                        <div class="imgbox">
                            <img src="${item.goods_big_logo}" alt="">
                            <p>${item.goods_name}</p>
                        </div>

                        <p class="goods-info">${item.cat_three_id}</p>
                        <p class="goods">${item.goods_price}</p>
                        <div class="change">
                            <p class="sub" data-id="${item.goods_id}">-</p>
                            <input type="text" value="${item.cart_number}" data-id="${item.goods_id}" class="num">
                            <p class="add" data-id="${item.goods_id}">+</p>
                        </div>
                        <span class="price">${(item.goods_price * item.cart_number)}.00</span>

                        <button class="del" data-id="${item.goods_id}">删除</button>
                    </li>
                `
            })
       
       str +=`
            </ul>
            <div class="body-foot">
                <div class="body-fleft">
                    <input type="checkbox">全清
                    <span>删除选中商品</span>
                </div> 
                <div class="body-fright">
                    <h3>
                        已选择<span>${total}件</span>商品
                        <strong>合计: $${allMoney.toFixed(2)}</strong>
                    </h3>
                    <button>去结算</button>
                </div> 
            </div>
         `
       // 插入页面
       $('.on').html(str)
   } 

   // 点击事件
   $('.on')

        // -- 
        .on('click', '.sub', function() {
            const num = $('.num').val() - 0
            if(num === 1 || num < 1) {
                $('.num').val('1')
            }else{
                $('.num').val(num- 1)
            }
            const id = $(this).data('id')
            const goods = info.filter(item => item.goods_id == id)[0]
            goods.cart_number = $('.num').val()
            
            window.localStorage.setItem('car', JSON.stringify(info))
            bindHtml()
        })
        
        // ++
        .on('click', '.add', function() {
            const num = $('.num').val() - 0
            $('.num').val(num + 1)
            const id = $(this).data('id')
            const goods = info.filter(item => item.goods_id == id)[0]
            goods.cart_number = $('.num').val()
            
            window.localStorage.setItem('car', JSON.stringify(info))
            bindHtml()
        })

        // 点击选框按钮
        .on('click', '.body-body input', function() {
            const type = this.checked - 0
            const id = $(this).data('id')
            const goods = info.filter(item => item.goods_id == id)[0]
            if(!type) {
                goods.is_select = 0
            }else{
                goods.is_select = 1
            }
            window.localStorage.setItem('car', JSON.stringify(info))
            bindHtml()
        })

        // 全选按钮
        .on('click', '.body-title input', function() {
            const type = this.checked - 0
            info.forEach(item => item.is_select = type)
            window.localStorage.setItem('car', JSON.stringify(info))
            bindHtml()
        })

        // 删除按钮
        .on('click', 'button.del', function() {
            console.log(10111)
            const id = $(this).data('id')
            for(let i = 0; i < info.length; i++) {
                if(info[i].goods_id == id) info.splice(i, 1)
                break
            }
            window.localStorage.setItem('car', JSON.stringify(info))
            bindHtml()
        })

        // 清空购物车
        .on('click', '.body-fleft > input', function(){
            window.localStorage.setItem('car', JSON.stringify([]))
            window.location.reload()
        })

        // 点击登录跳转index
        $('.login').click(function(){
            window.location.href = './index.html'
        })
   
       
})