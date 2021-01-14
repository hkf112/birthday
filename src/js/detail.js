$(function () {
    let foot = null
    let id = null
    let Info = null
    // 渲染页面
    bindHtml()
    async function bindHtml () {
        id = window.sessionStorage.getItem('id')
        const { info } =await $.get('../server/getGoodsInfo.php', `goods_id=${id}`, null, 'json')
        Info = info
        let str = ``
        // 遍历对象
        for (let key in info) {
            str = `
            <div class="box">
            <div class="show">
                <img src="${info.goods_big_logo}" alt="">
                <div class="mask"></div>
            </div>
            <div class="list">
                <p class="active"><img src="${info.goods_small_logo}" alt="" show="${info.goods_big_logo}"  enlarge="${info.goods_big_logo}"></p>
            </div>
            <div class="enlarge" style="background-image: url(${info.goods_big_logo});"></div>
        </div>

        <!-- // 详情 -->
        <div class="bbody-right">
            <h3>${info.goods_name}</h3>
            <h4><span>${info.cat_one_id}:</span><span>${info.cat_three_id}</span></h4>
            <span></span>
            <p><b>促销:</b><i>$${info.goods_price}</i>$${info.goods_weight}.00</p>
            <strong>库存量: <span>${info.goods_number}</span></strong>
            <mark><i class="iconfont icon-weibiaoti1"></i>收益请影响,不会寄到你加附近,为我们直达月球,请自己去取</mark>
            <ul class="size">
                <li>X</li>
                <li>Y</li>
                <li>L</li>
                <li>XL</li>
            </ul>
            <ol>
                <span>数量:</span>
                <li class="sub"  data-id="${info.goods_id}">-</li>
                <input type="text" value="1" class="num">
                <li class="add"  data-id="${info.goods_id}">+</li>
            </ol>
            <div>
                <button class="car"  data-id="${info.goods_id}">加入购物车</button>
                <button class="jump">返回继续瞅</button>
            </div>
           
        </div>
            `
            foot = info.goods_introduce
        }
        
        $('.body').html(str)
        $('.footer').before(foot)
        
        
        
    }
    console.log(foot)


    $('.body-box').on('mouseenter', '.body', function(e) {
        let value = $('num').val()
        function Enlarge (ele) {

            this.ele = document.querySelector(ele)
            this.show = this.ele.querySelector(".show")
            this.mask = this.ele.querySelector(".mask")
            this.enlarge = this.ele.querySelector(".enlarge")
            this.list = this.ele.querySelector('.list')
            this.showW = this.show.clientWidth
            this.showH = this.show.clientHeight
            this.enlargeW = parseInt(window.getComputedStyle(this.enlarge).width)
            this.enlargeH = parseInt(window.getComputedStyle(this.enlarge).height)
            this.bgW = parseInt(window.getComputedStyle(this.enlarge).backgroundSize.split(' ')[0])
            this.bgH = parseInt(window.getComputedStyle(this.enlarge).backgroundSize.split(' ')[1])
            this.init ()
        }
        
        Enlarge.prototype.init = function () {
            this.overEle ()
            this.outEle ()
            this.setSize ()
            this.changeEle ()
            this.move ()
        }
        
        // 移入产生
        Enlarge.prototype.overEle = function () {
            this.show.addEventListener('mouseover', () => {
                this.mask.style.display = 'block'
                this.enlarge.style.display = 'block'
            })
           
        }
        
        //  移出  消失
        Enlarge.prototype.outEle = function () {
            this.show.addEventListener('mouseout', () => {
                this.mask.style.display = 'none'
                this.enlarge.style.display = 'none'
            })
            
        }
        
    
        //  改变 mask  大小  成比例
        Enlarge.prototype.setSize = function () {
            this.maskW = this.enlargeW * this.showW / this.bgW
            this.maskH = this.enlargeH * this.showH / this.bgH
            this.mask.style.width = this.maskW + 'px'
            this.mask.style.height = this.maskW + 'px'
            
        }
        
        
        //  点击切换列表
        Enlarge.prototype.changeEle = function () {
            const son = this.list.children
            this.list.addEventListener('click', e => {
                e = e || window.event
                target = e.target || e.srcElement
        
                // 让所有的 p 边框去除
                if(target.nodeName === 'IMG'){
                    for(let i = 0; i < son.length; i++){
                        son[i].classList.remove('active')
                    }
                   
                // 点击 img 让 p 加边框
                    target.parentElement.classList.add('active')
                    
        
                // 获得自定义属性    
                    const showUrl = target.getAttribute('show')
                    const enlargeUrl = target.getAttribute('enlarge')
                
                // 切换列表 换整套图片
                    this.show.firstElementChild.src = showUrl
                    this.enlarge.style.backgroundImage = `url( ${enlargeUrl} )`
                }
        
                
            })
        }
        
        // 鼠标移动跟随
        Enlarge.prototype.move = function () {
            
            this.show.addEventListener('mousemove', e => {
                e = e || window.event
                let left = e.offsetX - this.maskW/2
                let top = e.offsetY - this.maskH/2
        
                if(left <= 0 ) { left = 0 }
                if(top <= 0 ) { top = 0 }
                if(left >= this.showW - this.maskW) { left = this.showW - this.maskW }
                if(top >= this.showH - this.maskH) { top = this.showH - this.maskH }
        
                this.mask.style.left = left  + 'px'
                this.mask.style.top = top  + 'px'
        
                // 计算背景照片  移动位置
                let bgLeft =  left * this.enlargeW / this.maskW
                let bgtop = top * this.enlargeH / this.maskH
        
                this.enlarge.style.backgroundPosition = `-${bgLeft}px -${bgtop}px`
        
            })
        
        }
    
        new Enlarge('.box')
    })


    // 点击事件回到购物
    $('.title-box').on('click', 'p', () => {
        window.location.href = './list.html'
    })

    // 点击事件
    $('.body')
        .on('click', '.size > li', function(){
            $(this).addClass('active').siblings().removeClass('active')
        })

        // ++ 事件
        .on('click', '.add', function(){
            console.log(1111)
            console.log(Info)
            let num = $('.num').val() - 0
           
            if(num == Info.goods_number || num > Info.goods_number) {
                $('.num').val(Info.goods_number)
            }else{
                $('.num').val(num + 1)
            }
        })

        // -- 事件
        .on('click', '.sub', function(){
            let num = $('.num').val() - 0
           
            if(num == 1 || num < 1) {
                $('.num').val(1)
            }else{
                $('.num').val(num - 1)
            }
        })


        // 加入购物车
        .on('click', '.car', function(){
            const name = getCookie('name')
            if(!name) {
                $('.login-box').css('display', 'block');
                
                window.sessionStorage.setItem('url', 'detail')
                return
            }

            // Info.cat_number = $('.num').val()
            

            // 获得localstorage
            const car = JSON.parse(window.localStorage.getItem('car')) || []
            const flag = car.some(item => item.goods_id == id)
            console.log(flag)
            if(flag) {
                let goods_number = car.filter(item => item.goods_id == id)[0]
                console.log(goods_number) 
                console.log($('.num').val())
                goods_number.cart_number = goods_number.cart_number - 0 + ($('.num').val() - 0)
            }else{

                Info.cart_number = $('.num').val()
                car.push(Info)
            }

            window.localStorage.setItem('car', JSON.stringify(car))

        })

        $('.body').on('click', '.jump', function(e) {
            window.location.href = './list.html'
        })

   

    
    
    
})


