import 'core-js';
import  'es6-promise'
import  'whatwg-fetch'
define(['jquery','jsDir/cookie','vconsole'],function (a,b,VConsole) {
    var vConsole = new VConsole();

    var address=$('#address')
   var  btnSearch=document.getElementById('btnSearch')
    address.on('keydown', executeSearch);
    let city = '全国'
    const AK_KEY = 'KPx7nDiVnDGqlWjCnZ6cd6rAsimIpzV3',
        //API_DOMAIN = 'http://api.map.baidu.com'
        API_DOMAIN = '/bapi'

    //搜索
    async function search(keyWords, city) {
        // return fetch(`${API_DOMAIN}/place/v2/search?q=${encodeURIComponent(keyWords)}&region=${encodeURIComponent(city)}&output=json&ak=${AK_KEY}`).then(res=>res.json())
        return fetch(`${API_DOMAIN}/place/v2/suggestion?q=${encodeURIComponent(keyWords)}&region=${encodeURIComponent(city)}&city_limit=true&output=json&ak=${AK_KEY}`).then(res => res.json())
    }
//定位城市
    async function locate() {
       return new Promise((resolve,reject)=>{
           $.ajax({
               url:'/bapi/location/ip?ak=KPx7nDiVnDGqlWjCnZ6cd6rAsimIpzV3',
               success:function (res) {
                    console.log('NIMABI');
                   resolve(res);
               }
           })
       })
       /* return  fetch('').then(res =>{
            alert(12)
            res.json()
        })*/
        // return fetch(`${API_DOMAIN}/location/ip?ak=${AK_KEY}`).then(res => res.json())
    }


//初始化
    async function init() {
        let result = await locate()
        console.log(result);
        //city = result.content.address_detail.city
        city = '北京市'
        defaultCity.innerText = city
        btnSearch.removeAttribute('disabled')
    }
//搜索
    btnSearch.addEventListener('click', async () => {
        let results = await search(address.val(), city)
        render(results.result)
    })

//执行搜索
    async function  executeSearch() {
        var ev = window.event || arguments.callee.caller.arguments[0];
        if (ev.keyCode == 13) {
            let results = await search(address.val(), city)
            console.log(results);
            render(results.result)
        }
    }

//渲染
    function render(results) {
        list.innerHTML = ''
        let htmlStr = ''
        results.forEach(v => {
            htmlStr += `<li data-lat = "${v.location.lat}" data-lng = "${v.location.lng}" data-loc='${v.name}|${v.district}'>${v.name} <br/>${v.district}</li>`
        })
        list.innerHTML = htmlStr
    }


    $('#list').on('click', ev => {
        if (ev.target.tagName == 'LI') {
            let el = ev.target
            localStorage.setItem('lat', el.getAttribute('data-lat'));
            localStorage.setItem('lng', el.getAttribute('data-lng'));
            localStorage.setItem('loc', el.getAttribute('data-loc'))
            console.log(localStorage)

            window.location.href = '/index.html'
        }
    })

    init()

})
