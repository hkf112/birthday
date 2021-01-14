// 1. 设置 cookie
function setCookie(key,value,expires) {

    if(!expires) {
        document.cookie = key + '=' + value
        return
    }
    let time = new Date()
    time.setTime(time.getTime() - 1000 * 60 * 60 * 8 + expires * 1000)  // 转化时间
    document.cookie = `${key}=${value};expires=${time}`
}

// 2. 获取 cookie 
function getCookie(key) {
    const obj = {}
    let cookie = document.cookie.split('; ')  // 裁剪
    cookie.forEach(item => {                  // 遍历数组
        let t = item.split('=')               // 裁剪
        obj[t[0]] = t[1]
    })
    return key ? obj[key] : obj               // 判断是否传参
}

// 3. 删除 cookie
function delCookie(a) {
    setCookie(key, '', -1)                    // 调用 函数 setCookie
}

// 4. 倒计时 传两个参数 进行使用
function fn(date, date1) {
    var time = date.getTime()
    var time1 = date1.getTime()
    var sub = (time - time1) / 1000
    var day = parseInt(sub / (60 * 60 * 24))
    var hour = parseInt(sub % (60 * 24 * 60) / (60 * 60))
    var mintuse = parseInt(sub % (60 * 60 * 24) % (60 * 60) / 60)
    var second = parseInt(sub % 60)
    var res = {
        day: day,
        hour: hour,
        mintuse: mintuse,
        second: second
    }
    return res
}

// 4.1 使用倒计时 案例
setInterval(function () {
    var date = new Date()
    var date1 = new Date('2020-01-01 00:00:00')
    // var bbb = document.getElementsByTagName('div')
    var sub = fn(date, date1)
    var str = '离上次相见已经有'+sub.day+'天'+sub.hour+'小时'+sub.mintuse+'分'+sub.second+'秒'
    // box.innerText = str
}, 1000)


// 5. 放大镜
function Enlarge (ele) {
    this.ele = document.querySelector(ele)
    this.mask = this.ele.querySelector('.mask')
    this.show = this.ele.querySelector('.show')
    this.list = this.ele.querySelector('.list')
    this.enlarge = this.ele.querySelector('.enlarge')
    this.showW = this.show.clientWidth
    this.showH = this.show.clientHeight
    this.enlargeW = parseInt(window.getComputedStyle(this.enlarge).width)
    this.enlargeH = parseInt(window.getComputedStyle(this.enlarge).height)
    this.bgW = parseInt(window.getComputedStyle(this.enlarge).backgroundSize.split(' ')[0])
    this.bgH = parseInt(window.getComputedStyle(this.enlarge).backgroundSize.split(' ')[1])
    this.init()
}

// 入口函数
Enlarge.prototype.init = function () {
    // this.overOut ()
    this.setSize()
    this.move()
    this.changeEle()
}

// 移入移出
Enlarge.prototype.overOut = function () {

    // 移入
    this.show.addEventListener('mouseover', () => {
        this.mask.style.display = 'block'
        this.enlarge.style.display = 'block'
    })

    // 移出
    this.show.addEventListener('mouseout', () => {
        this.mask.style.display = 'none'
        this.enlarge.style.display = 'none'
    })
}

// 改变 mask 大小
Enlarge.prototype.setSize = function () {

    this.maskW = this.showW * this.enlargeW / this.bgW
    this.maskH = this.showH * this.enlargeH / this.bgH

    this.mask.style.width = this.maskW + 'px'
    this.mask.style.height = this.maskH + 'px'

}

// 鼠标跟随 移动
Enlarge.prototype.move = function () {

    this.show.addEventListener('mousemove', e => {
        e = e || window.event
        let left = e.offsetX - this.maskW / 2 
        let top = e.offsetY - this.maskH / 2 
        
        if(left <= 0) { left = 0 }
        if(top <= 0) { top = 0 }
        if(left >= this.showW - this.maskW) { left =  this.showW - this.maskW}
        if(top >= this.showH - this.maskH) { top =  this.showH - this.maskH}

        this.mask.style.left = left + 'px'
        this.mask.style.top = top + 'px'

        // 调整 bg 位置 跟随移动
        const bgLeft = this.enlargeW * left / this.maskW
        const bgTop = this.enlargeH * top / this.maskH

        this.enlarge.style.backgroundPosition = `-${bgLeft}px -${bgTop}px`
    })


    
}

// 点击  list 切换整套内容
Enlarge.prototype.changeEle = function () {

    this.list.addEventListener('click',e => {
        e = e || window.event
        target = e.target || e.srcElement

        if(target.nodeName === 'IMG') {
            const son = this.list.children
            for(let i = 0; i < this.list.children.length; i++) {
                console.log
                son[i].classList.remove('active')
            }
            target.parentElement.classList.add('active')

            const showUrl  = target.getAttribute('show')
            const enlargeUrl  = target.getAttribute('enlarge')
            
            this.show.firstElementChild.src = showUrl
            this.enlarge.style.backgroundImage = `url( ${enlargeUrl} )`
        }
    })
    
}
