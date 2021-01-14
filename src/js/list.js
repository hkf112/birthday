$(function () {
    let list = null
    let INFO = null
    // 信息
    const list_info = {
        cat_one:'all',
        cat_two:'all',
        cat_three:'all',
        sort_method:'综合',
        sort_type:'ASC',
        current:1,
        pagesize:25
    }

    // 渲染一级列表
    getOne()
    async function getOne() {
        const cat_one_list = await $.get('../server/getOne.php', null, null, 'json')
        let str = `<li data-type="all" class="active">全部</li>`

        cat_one_list.list.forEach(function (item) {
            str += `
            <li data-type="${item.cat_one_id}">${item.cat_one_id}</li>
            `
        })

        $('.ginfo-one > ol').html(str)
    }

    // 渲染二级列表
    async function getTwo() {
        const cat_two_list = await $.get('../server/getTwo.php', list_info , null, 'json')
        let str = `<li data-type="all" class="active">全部</li>`
        cat_two_list.list.forEach(function (item) {
            str += `
            <li data-type="${item.cat_two_id}">${item.cat_two_id}</li>
            `
        })

        // 渲染二级
        $('.ginfo-two > ol').html(str)
    }

    // 渲染三级列表
    getThree()
    async function getThree() {
        const cat_three_list = await $.get('../server/getThree.php', list_info , null, 'json')
        let str = `<li data-type="all" class="active">全部</li>`
        cat_three_list.list.forEach(function (item) {
            str += `
            <li data-type="${item.cat_tthree_id}">${item.cat_three_id}</li>
            `

        })

        // 渲染三级
        $('.ginfo-three > ol').html(str)
    }

    // 点击一级列表
    $('.ginfo-one').on('click', 'li', function (e) {
        const text = $(this).text().trim()
        $(this).addClass('active').siblings().removeClass('active')
        list_info.cat_one = text
        const type = $(this).data('type')
        list_info.cat_two = 'all'
        list_info.cat_three = 'all'
        if(type === 'all') {
            list_info.cat_one = 'all'
            $('.ginfo-two > ol').html(`<li data-type="all" class="active">全部</li>`)
            
        } else{
            getTwo()
        }
        $('.ginfo-three > ol').html(`<li data-type="all" class="active">全部</li>`)
        getCount()
    })

    // 点击二级列表
    $('.ginfo-two').on('click', 'li', function (e) {
        const text = $(this).text().trim()
        $(this).addClass('active').siblings().removeClass('active')
        list_info.cat_two = text
        list_info.cat_three = 'all'
        if(list_info.cat_two === 'all') {
            $('.ginfo-three > ol').html(`<li data-type="all" class="active">全部</li>`)
        }else {
            getThree()
        }
        getCount()
    })

    // 点击三界列表
    $('.ginfo-three').on('click', 'li', function (e) {
        const text = $(this).text().trim()
        $(this).addClass('active').siblings().removeClass('active')
        list_info.cat_three = text
        getCount()
    })

    // 渲染分页
    getCount()
    async function getCount() {
        const { total } = await $.get('../server/getCurrent.php', list_info, null, 'json')
        new pagination ('.pagination', { 
            total: total, 
            pagesize: 20,
            sizeList:[20, 30, 40, 40],
            change(current, pagesize) {
                list_info.current = current
                list_info.pagesize = pagesize

                // 请求商品列表
                getgoodslist()
            }
        })
     
    }

    // 请求商品列表
    async function getgoodslist () {
       const { list } =await $.get('../server/getGoodsList.php', list_info, null, 'json')
       INFO = list
        
       let str = ``
       
       // 循环遍历
       list.forEach(item => {
           str += `
           <li class="list-goods" data-id="${item.goods_id}">
               <div class="imgbox"> <img src="${item.goods_small_logo}" alt=""></div>
                <h3>${item.goods_name}</h3>
                <p>￥${item.goods_price}.00<span>￥${item.goods_weight}.00</span></p>
                <div class="car" data-id="${item.goods_id}">
                    <i class="iconfont icon-che"></i>
                    <span data-id="${item.goods_id}">加入购物车</span>
                </div>
            </li>
           `
        })
        $('.body-goods > ol.list').html(str)
        $('.pagination > .list').on('click', 'p', function(e) {
       const top = $('.body-goods').offset().top - 50 + 'px'
       $('html').animate({scrollTop: top}, 500)
       })
    }

    // 点击排序
    $('.ginfo-four').on('click', 'li', function(e) {
        const type = $(this).data('sort')
        const method = $(this).data('method')
        if(method === '价格') {
            list_info.sort_method = method
            list_info.sort_type = type
        } 
        if(type === '综合') {
            list_info.sort_method = '综合'
            list_info.sort_type = 'ASC'
        }

        // 切换类名
        $(this).addClass('active').siblings().removeClass('active')

        getgoodslist ()

    })

    // 点击进入详情页
    $('.list').on('click', '.list-goods', function (e) {
        window.sessionStorage.setItem('id', this.dataset.id)
        window.location.href = './detail.html'
    })

    // 加入购物车
    $('ol.list').on('click', '.car', async function(e) {
        e.stopPropagation()
        const car = JSON.parse(window.localStorage.getItem('car')) || []
        const name = getCookie('name')
        if(!name) {
            $('.login-box').css('display', 'block');
            window.sessionStorage.setItem('url', 'list')
            return
        }
        const id = this.dataset.id
        const flag = car.some(item => item.goods_id == id)
        if(flag) {
            console.log(11111)
            const number = car.filter(item => item.goods_id == id)[0]
            number.cart_number = number.cart_number - 0 + 1
        }else{
           for(let i = 0; i < INFO.length; i++) {
               if(INFO[i].goods_id == id) {
                   INFO[i].cart_number = 1
                    car.push(INFO[i])
                    break
               }
           }
          
        }

        window.localStorage.setItem('car', JSON.stringify(car))
    })

    
})