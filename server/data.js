const { Math } = require('core-js');
const fs = require('fs');
/* 日期格式化 */
function dateFormat(fmt, date) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}

let courselist = [
    {
        name: "html",
        todayBuy: 10,
        monthBuy: 122,
        totalBuy: 2314,
    },
    {
        name: "css",
        todayBuy: 13,
        monthBuy: 222,
        totalBuy: 4374,
    },
    {
        name: "javascript",
        todayBuy: 27,
        monthBuy: 322,
        totalBuy: 4582,
    },
    {
        name: "jquery",
        todayBuy: 17,
        monthBuy: 192,
        totalBuy: 1385,
    },
    {
        name: "bootstrap",
        todayBuy: 11,
        monthBuy: 120,
        totalBuy: 1322,
    },
    {
        name: "vue",
        todayBuy: 57,
        monthBuy: 322,
        totalBuy: 8899,
    },
    {
        name: "react",
        todayBuy: 17,
        monthBuy: 521,
        totalBuy: 2234,
    }
]
//首页购买订单详情
let buyorder = [
    {
        name: "今日支付订单",
        value: 12,
        icon: "el-icon-circle-check",
        color: "#2ec7c9",
    },
    {
        name: "今日收藏订单",
        value: 8,
        icon: "el-icon-star-off",
        color: "#ffb980",
    },
    {
        name: "今日未支付订单",
        value: 34,
        icon: "el-icon-goods",
        color: "#5ab1ef",
    },
    {
        name: "本月支付订单",
        value: 347,
        icon: "el-icon-circle-check",
        color: "#2ec7c9",
    },
    {
        name: "本月收藏订单",
        value: 1435,
        icon: "el-icon-star-off",
        color: "#ffb980",
    },
    {
        name: "本月未支付订单",
        value: 2906,
        icon: "el-icon-goods",
        color: "#5ab1ef",
    },
]
let bardata = {
    title: '课程销量',
    xdata: [
        'html',
        'css',
        'js',
        'vue',
        'react'
    ],
    ydata: [5, 12, 35, 55, 24]
};

let linedata = {
    xdata: [
        'html',
        'css',
        'js',
        'vue',
        'react'
    ],
    ydata: [15, 14, 35, 45, 5]
}

let piedata = [
    { value: 11, name: "html" },
    { value: 22, name: "css" },
    { value: 23, name: "js" },
    { value: 56, name: "vue" },
    { value: 14, name: "react" },
]
//随机生成订单编号
function orderId() {
    var orderCode = '';
    for (var i = 0; i < 6; i++) //6位随机数，用以加在时间戳后面。
    {
        orderCode += Math.floor(Math.random() * 10);
    }
    orderCode = new Date().getTime() + orderCode;  //时间戳，用来生成订单号。
    console.log(orderCode)
    return orderCode;
}
//随机生成价格
function orderPrice() {
    let price = Math.floor(Math.random() * 500) + 10;
    return price;
}
//随机时间
function randomTime() {
    let min = +new Date('2000-12-17T03:24:00');
    let max = +new Date();
    let r = Math.floor((Math.random() * min) + (max - min));
    let t = new Date(r);
    let rr = dateFormat('YYYY-mm-dd', t);
    return rr;
}
//随机课程名
function randomCourse() {
    let courseAry = ['html', 'css', 'javascript', 'jquery', 'bootstrap', 'nodejs'];
    let count = Math.floor(Math.random() * 6);
    return courseAry[count];
}
//获取订单
function getOrders(callback) {
    fs.readFile('./files/orders', (err, data) => {
        if (!err) {
            //如果订单文件存在直接获取订单内容
            callback(JSON.parse(data));

        } else {
            let orderary = [];
            //如果订单文件不存在创建订单
            for (let i = 0; i < 40; i++) {
                let order = {
                    order_name: randomCourse(),
                    order_id: orderId(),
                    order_price: orderPrice(),
                    order_pay: '否',
                    order_send: '否',
                    order_time: randomTime()
                }
                orderary.push(order);
            }
            
            fs.writeFile('./files/orders', JSON.stringify(orderary), (err, data) => {
                if (!err) {
                    console.log('订单保存成功')
                    callback(orderary);
                }
            })
        }
    })
}
//该函数功能是生成随机姓名数组，共有329个
function CreateNames() {
    var m = "刀白凤,丁春秋,马夫人,马五德,小翠,于光豪,巴天石,不平道人,邓百川,风波恶,甘宝宝,公冶乾,木婉清,少林老僧,太皇太后,天狼子,天山童姥,王语嫣,乌老大,无崖子,云岛主,云中鹤,止清,白世镜,包不同,本参,本观,本相,本因,出尘子,冯阿三,古笃诚,过彦之,兰剑,平婆婆,石清露,石嫂,司空玄,司马林,玄慈,玄寂,玄苦,玄难,玄生,玄痛,叶二娘,左子穆,华赫艮,李春来,李傀儡,李秋水,刘竹庄,朴者和尚,祁六三,乔峰,全冠清,阮星竹,西夏宫女,许卓诚,朱丹臣,竹剑,阿碧,阿洪,阿胜,阿朱,阿紫,波罗星,陈孤雁,何望海,鸠摩智,来福儿,孟师叔,努儿海,宋长老,苏星河,苏辙,完颜阿古打,吴长风,吴光胜,吴领军,辛双清,严妈妈,余婆婆,岳老三,张全祥,单伯山,单季山,单叔山,单小山,单正,段延庆,段誉,段正淳,段正明,范禹,范百龄,范骅,苟读,郁光标,卓不凡,宗赞王子,哈大霸,姜师叔,枯荣长老,梦姑,神山上人,神音,狮鼻子,室里,项长老,姚伯当,幽草,赵钱孙,赵洵,哲罗星,钟灵,钟万仇,高升泰,龚光杰,贾老者,康广陵,秦红棉,容子矩,桑土公,唐光雄,奚长老,徐长老,诸保昆,崔百泉,崔绿华,符敏仪,黄眉和尚,菊剑,聋哑婆婆,梅剑,萧远山,虚竹,游骥,游驹,游坦之,程青霜,傅思归,葛光佩,缘根,智光大师,鲍千灵,褚万里,瑞婆婆,端木元,赫连铁树,黎夫人,慕容博,慕容复,谭公,谭婆,谭青,摘星子,慧方,慧观,慧净,慧真,穆贵妃,薛慕华,和里布,耶律洪基,耶律莫哥,耶律涅鲁古,耶律重元,易大彪,卜沉,丁坚,丁勉,上官云,万大平,于人豪,于嫂,不戒和尚,长青子,仇松年,丹青生,邓八公,方人智,方生,方证,风清扬,计无施,木高峰,天门道人,天松道人,天乙道人,王伯奋,王诚,王二叔,王夫人,王家驹,王家骏,王元霸,王仲强,白二,白熊,丛不弃,东方不败,乐厚,令狐冲,宁中则,平夫人,平一指,申人俊,史镖头,史登达,司马大,田伯光,仪和,仪琳,仪清,玉玑子,玉灵道人,玉磬子,玉音子,玉钟子,左冷禅,成不忧,成高道人,冲虚道长,吉人通,老不死,老头子,刘菁,刘芹,刘正风,米为义,农妇,齐堂主,曲非烟,曲洋,任我行,英颚,西宝,向大年,向问天,陈七,陈歪嘴,迟百诚,狄镖头,狄修,定静师太,杜长老,何三七,季镖头,劳德诺,陆伯,陆大有,任盈盈,沙天江,秃笔翁,吴柏英,吴天德,辛国梁,严三星,杨莲亭,余沧海,余人彦,岳灵珊,张夫人,张金鏊,定逸,建除,林平之,林远图,林震南,罗人杰,易国梓,易师爷,易堂主,英白罗,英长老,岳不群,郑镖头,郑萼,周孤桐,费彬,封不平,洪人雄,侯人英,觉月,施戴子,施令威,闻先生,哑婆婆,钟镇,祝镖头,祖千秋,高克新,高明根,贾布,贾人达,莫大,秦娟,秦伟帮,桑三娘,桃干仙,桃根仙,桃花仙,桃实仙,桃叶仙,梁发,绿竹翁,麻衣汉子,清虚道人,游迅,葛长老,黑白子,黑熊,桃枝仙,陶钧,夏老拳师,崔镖头,黄伯流,黄国柏,黄钟公, 鲁连荣,舒奇,童百熊,鲍大楚,解风,蓝凤凰,谭迪人,假东方不败,震山子";
    var randnames = m.split(",");
    return randnames;
}
let nameAry = CreateNames();
//随机姓名
function randomName() {
    var rn = parseInt((nameAry.length - 1) * Math.random());
    var getname = nameAry[rn];
    nameAry.splice(rn, 1);//昵称被随机选定，那就从数组中删除该昵称
    return getname;
}

function randomPhone() {
    var prefixArray = new Array("130", "131", "132", "133", "135", "137", "138", "170", "187", "189");
    var i = parseInt(10 * Math.random());
    var prefix = prefixArray[i];
    for (var j = 0; j < 8; j++) {
        prefix = prefix + Math.floor(Math.random() * 10);
    }
    return prefix;
}

function randomEmail() {
    let ary = [
        'onoeemhankewmtc@21cn.com',
        'soeusvdn@eyou.com',
        'ombvkwdocgkob@126.com',
        'lksaehbab@china.com',
        'sltpkn@263.net',
        'plmlqwje@china.com',
        'tdn@163.com',
        'hkimnqmlwqd@56.com',
        'sjstf@yeah.net',
        'bvwbbscbu@msn.com',
        'qdcmf@sina.com',
        'ssdw@sina.com',
        'msrjniavbt@hotmail.com',
        'kglsnlo@56.com',
        'kamgepskqqbje@yeah.net',
        'aqklecphs@yahoo.com.cn',
        'smwfo@citiz.com',
        'dcrfdjp@citiz.com',
        'hdfwg@xinhuanet',
        'rtbdnmrqqcktf@yahoo.com.cn',
        'bqobjlsn@xinhuanet',
        'woi@msn.com',
        'ekahf@netease.com',
        'edohala@china.com',
        'vbtblhfiqvgahnu@msn.com',
        'dvwsvfcm@netease.com',
        'kblgnbwbn@xinhuanet',
        'btepngclu@sohu.com',
    ]
    return ary[Math.floor(Math.random()*ary.length)];

}
//获取用户列表
function getUsers(callback) {
    fs.readFile('./files/users', (err, data) => {
        if (!err) {
            //如果用户文件存在直接获取用户内容
            callback(JSON.parse(data));

        } else {
            let usersary = [];
            //如果用户文件不存在创建用户
            for (let i = 0; i < 40; i++) {
                let user = {
                    name: randomName(),
                    email: randomEmail(),
                    phone: randomPhone(),
                    
                }
                usersary.push(user);
            }
            callback(usersary);
            fs.writeFile('./files/users', JSON.stringify(usersary), (err, data) => {
                if (!err) {
                    console.log('用户保存成功')
                }
            })
        }
    })
}
exports.dateFormat = dateFormat;//日期格式化
exports.courselist = courselist;//首页课程列表
exports.buyorder = buyorder;//首页订单情况
exports.bardata = bardata;//首页柱形图
exports.linedata = linedata;//首页线形图
exports.piedata = piedata;//首页饼图
exports.getOrders = getOrders;//获取订单
exports.getUsers = getUsers;//获取用户
