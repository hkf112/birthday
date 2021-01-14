class pagination {

    constructor (ele, options = {}) {

        this.ele = document.querySelector(ele)
        // 多少条数据
        this.total = options.total || 1000
        // 一页显示多少
        this.pagesize = options.pagesize || 10
        // 总共显示多少页
        this.tatalPage = Math.ceil(this.total / this.pagesize)
        // 跳转 哪几个页面
        this.sizeList = options.sizeList || [10,20,40,50]
        // 当前显示 第几页
        this.current = 1
        this.first = options.first || 'first'
        this.prev = options.prev || '<<'
        this.next = options.next || '>>'
        this.last = options.last || 'last'
        this.jump = options.jump || 'jump'
        this.change = options.change || function() {}

        this.init()

    }

    // 入口函数
    init () {   
        this.bindHtml()
        this.setEvent()
    }

    // 渲染页面
    bindHtml () {
        let str = `
            <select name="" id="" class="sizeList">
        `

        this.sizeList.forEach( (index) => {
            str += `<option value="${index}">${index}</option>`
        })

        str += `
            </select>
            <p class="first ${this.current === 1 ?' paginactive' : ''}">${this.first}</p>
            <p class="prev ${this.current === 1 ?' paginactive' : ''}">${this.prev}</p>
            <div class="list">
        `

        str += this.bindList (this.current,this.tatalPage)

        str += `
            </div>
            <p class="next ${this.current === this.tatalPage ?' paginactive' : ''}">${this.next}</p>
            <p class="last ${this.current === this.tatalPage ?' paginactive' : ''}">${this.last}</p>
            <p>${this.tatalPage}</p>
            <span>/</span>
            <input type="text" value="${this.current}" class="jumptext">
            <button class="jump" type="button">${this.jump}</button>
        `
        this.ele.innerHTML = str
        const select = this.ele.querySelector('select')
        select.value = this.pagesize

        this.change(this.current, this.pagesize)
    }

    bindList () {
        let str = ``

        // 页面 不够 9 页 时出现的情况
        if(this.tatalPage <= 9) {
           for(let i = 1; i <= this.tatalPage; i++) {
               str += `<p class = " ${i === this.current ? 'paginacolor' : ''} item">${i}</p>`
           }
           return str
        }
        

            // 当前页面 小于  5 显示情况
            if(this.current <= 5) {
                for(let i = 1; i <= 9; i++) {
                    str += `
                    <p class = " ${i === this.current ? 'paginacolor' : ''} item">${i}</p>
                    `
                }   
                return str
                
            }
            
            // 当前 页面  大于 5 显示情况
            if(this.current === 5) {
                for(let i = 1; i <= 7; i++ ) {
                    str += `
                    <p class = " ${i === this.current ? 'paginacolor' : ''} item">${i}</p>
                    `
                }
                str += `<span>...</span><p class="item">${this.tatalPage}</p>`
                return str 
            }
            
            
            // 当前 小于倒数 第 6页  显示 情况
            if(this.current < this.tatalPage - 4 ) {
                str += `<p class="item">1</p><span>...</span>`
                for(let i = this.current - 2; i <= this.current + 2; i ++ ){
                    str += ` <p class = " ${i === this.current ? 'paginacolor' : ''} item">${i}</p>`
                }
                return str += `<span>...</span><p class="item">${this.tatalPage}</p>`
            }
            
            //  当前 大于倒数 第 6页  显示 情况
            if(this.current >= this.tatalPage - 4) {
                str += `<p class="item">1</p><span>...</span>`
                for(let i = this.tatalPage - 6; i <= this.tatalPage; i++) {
                    str += ` <p class = " ${i === this.current ? 'paginacolor' : ''} item">${i}</p>`
                }
                return str
            }


    
    
}

    // 点击事件
    setEvent () {
        this.ele.addEventListener("click", e => {
            e = e || window.event
            const target = e.target || e.srcElement

            // 首页
            if(target.className.indexOf('first') !== -1 && target.className.indexOf('paginactive') === -1){
                this.current = 1
                this.bindHtml()
                return 
            }

            // 上一页
            if(target.className.indexOf('prev') !== -1 && target.className.indexOf('paginactive') === -1){
                this.current--
                if(this.current <= 1) this.current = 1
                this.bindHtml()
                return 
            }

            // 下一页
            if(target.className.indexOf('next') !== -1 && target.className.indexOf('paginactive') === -1){
                this.current ++
                if(this.current >= this.tatalPage) this.current = this.tatalPage
                this.bindHtml()
                return 
            }

            // 末页
            if(target.className.indexOf('last') !== -1 && target.className.indexOf('paginactive') === -1){
                this.current = this.tatalPage
                this.bindHtml()
                return 
            }

            // 点击 单页
            if(target.className.indexOf('item') !== -1 && target.className.indexOf('paginacolor') === -1){
                this.current = target.innerText - 0
                this.bindHtml()
                return 
            }

            // 跳转
            if(target.className === 'jump') {
                let text = this.ele.querySelector('.jumptext').value.trim() - 0
                if(isNaN(text)) return 
                if(text >= this.tatalPage) text = this.tatalPage
                if(text <= 0) text = 1
                this.current = text - 0
                this.bindHtml()
                return 
            }
            
        } )

           // 点击 select
           this.ele.addEventListener('change', e => {
               e = e || window.event
               const  target = e.target || e.srcElement
              if(target.className === 'sizeList') {

                this.pagesize = target.value
                this.tatalPage = Math.ceil(this.total / this.pagesize)
                this.current = 1
                this.bindHtml ()
                
              }

           })
    }
}


