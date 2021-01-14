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
        
        console.log(this.mask)
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