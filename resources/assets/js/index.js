import  'whatwg-fetch'
import {ctsfToken,ajaxGetSignature} from 'jsDir/api'
define(['jsDir/api','jsDir/cookie','jsDir/pointTran','vconsole'],function (api,Cookies,pointTran,Vconsole) {
let vconsole=new Vconsole();
    let code_id /* sms code_id*/, crsfToken /* crsf Token */
//发送验证
    btnSendSMS.addEventListener('click', async () => {
        try {
            let result = await api.sendSMSCode(phone.value)
            result.status ? code_id = result.data['code_id'] : displayMessage(result)
            console.log(code_id,code_id);
        } catch (err) {
            message.innerText = err.message
        }
    })

//模拟登陆
    btnLogin.addEventListener('click', async () => {
        try {
            let result = await api.login(phone.value, code.value, code_id)
            if (result.status) {
                loginZone.style.display = 'none'
                btnSign.removeAttribute('disabled') //允许打卡

                //更新cookie过期时间
                let QJYDSID = Cookies.get('QJYDSID')
                Cookies.remove('QJYDSID')
                //7天过期
                Cookies.set('QJYDSID', QJYDSID, { expires: 7 })
                localStorage.setItem('phone', phone.value)

                //显示登出
                btnLogout.style.display = 'inline'

                setPanelInfo()
                alert(result.message || '登陆成功')


            } else {
                displayMessage(result)
            }
        } catch (err) {
            message.innerText = err.message
        }
    })

    btnLogout.addEventListener('click', () => {
        Cookies.remove('QJYDSID')
        clearInfo()
        setTimeout(function () {
            window.location.reload()
        }, 100)
    })

    btnSign.addEventListener('click', () => {
        executeSign()
    })

//执行打卡
    async function executeSign() {
        let tokenRes = await api.ctsfToken()
        // let signature = await api.ajaxGetSignature(tokenRes)
        // console.log(signature);
        if (tokenRes.status) {
            crsfToken = tokenRes.data.csrf
            //let result = await sign(116.27675861439648, 40.04732987671876, crsfToken)
            let loc = getGeoLocation()
            //loc.lng = 119.27675861439648
            //loc.lat = 42.04732987671876
            let result = await api.sign(loc.lng, loc.lat, crsfToken)
            result.status ? alert('签到成功') : displayMessage(result)
        } else {
            displayMessage(tokenRes)
        }
    }


//初始化页面
    function init() {
        //检查登陆状态
        var qjydsid = api.getCookie('QJYDSID')
        if (!qjydsid) {
            loginZone.style.display = 'block'
        } else {
            loginZone.style.display = 'none'
            btnSign.removeAttribute('disabled') //允许打卡
        }

        //检查地址设置情况
        if (localStorage.getItem('lat') == null || localStorage.getItem('lng') == null) {
            window.location.href = '/point.html'
        }

        setPanelInfo()

    }

//获取经纬度
    let tran = pointTran.getTrans()
    function getGeoLocation() {
        let lng = localStorage.getItem('lng'),
            lat = localStorage.getItem('lat'),
            pp1 = tran.bd09togcj02(lng, lat),
            pp2 = tran.gcj02towgs84(pp1[0], pp1[1])

        return {
            lng: pp2[0],
            lat: pp2[1]
        }
    }

    function setPanelInfo() {
        var qjydsid = api.getCookie('QJYDSID')
        rec_status.innerText = qjydsid ? '已登陆' : '未登录'
        rec_phone.innerText = localStorage.getItem('phone') || ''
        rec_loc.innerText = localStorage.getItem('loc') || ''
        rec_geoLoc.innerText = (localStorage.getItem('lng') || '') + ',' + (localStorage.getItem('lat') || '')
        btnLogout.style.display = qjydsid ? 'inline' : 'none'
    }



    function displayMessage(result) {
        //登陆状态失效
        if (result.code && result.code == 4001) {
            Cookies.remove('QJYDSID')
            clearInfo()
            setTimeout(function () {
                window.location.reload();
            }, 100)
        }
        message.innerText = result.message + (result.data && result.data.msg ? '|' + result.data.msg : '')
    }

//清除不必要的信息
    function clearInfo() {
        localStorage.removeItem('phone')
    }

    init()


//博彦科技大厦 116.289448,40.054959
//116.27702103214757,40.04737826867027
//{longitude: 116.27702103214757, latitude: 40.04737826867027}

});


