const express = require('express');
const fs = require('fs');
const app = express();
app.all('*', function (req, res, next) {
    res.header('access-control-allow-origin', '*');
    next();
})
app.use('/public/', express.static('./public/'));
app.engine('html', require('express-art-template'));

app.get('/', function (req, res) {
    res.render('doc.html');
});
const datamodule = require("./data.js");
/* 注册接口 */
app.get('/register', function (req, res) {
    /* 账号:name,密码:psw,性别:sex */
    req.query ??= { name: '', psw: '', sex: '男' };
    let { name, psw } = req.query;
    if (!name || !psw) {
        res.send({ code: 0, msg: '账号,密码不能为空' });
    } else {
        fs.readFile('./files/' + name, function (err, data) {
            if (err) {
                fs.writeFile('./files/' + name, JSON.stringify(req.query), function (err, data) {
                    if (!err) {
                        res.send({ code: 1, msg: '注册成功!' });
                    } else {
                        res.send({ code: 0, msg: '注册失败!' });
                    }
                })
            } else {
                res.send({ code: 0, msg: '该账号已经被注册!' });
            }
        })
    }

});

/* 登录接口 */
app.get('/login', function (req, res) {
    /* 账号:name,密码:psw */
    req.query ??= { name: '', psw: '' }
    let { name, psw } = req.query;
    if (!name || !psw) {
        res.send({ code: 0, msg: '账号,密码不能为空' });
    } else {
        fs.readFile('./files/' + name, function (err, data) {
            if (err) {
                res.send({ code: 0, msg: '账号不存在' });

            } else {
                let user = JSON.parse(data);
                if (psw !== user.psw) {
                    res.send({ code: 0, msg: '账号密码不匹配!' });
                } else {
                    user.lastplace = '无锡';
                    user.lastlogintime = datamodule.dateFormat('YYYY-mm-dd', new Date());
                    res.send({ code: 1, msg: '登录成功!', data: user });
                }
            }
        })
    }
})

/* 首页课程购买情况接口 */
app.get('/buycourse', (req, res) => {
    res.send({ code: 1, msg: '获取课程数据成功', data: datamodule.courselist });
})

/* 首页订单支付情况接口 */
app.get('/buyorder', (req, res) => {
    res.send({ code: 1, msg: '获取订单数据成功', data: datamodule.buyorder });
})

/* 首页图表接口 */
app.get('/charts', (req, res) => {
    req.query.type ??= 'bar';
    if (req.query.type == 'bar') {
        res.send({ code: 1, msg: '获取柱形图数据成功', data: datamodule.bardata });
    } else if (req.query.type == 'line') {
        res.send({ code: 1, msg: '获取折线图数据成功', data: datamodule.linedata });
    } else if (req.query.type == 'pie') {
        res.send({ code: 1, msg: '获取饼图数据成功', data: datamodule.piedata });
    } else {
        res.send({ code: 0, msg: '获取图表数据失败' });
    }
})

//用户列表接口
app.get('/userlist', (req, res) => {
    datamodule.getUsers((list) => {
        //深拷贝
        let list1 = JSON.parse(JSON.stringify(list));
        req.query.page ??= 0;
        let page = parseInt(req.query.page) * 5;
        let count = page + 5;
        //按页数截取数组元素
        let pageary = list1.slice(page, count);
        res.send({ cord: 1, msg: '用户列表获取成功!', data: { list: pageary, total: list.length } })
    })
})
//用户搜索接口
app.get('/usersearch', (req, res) => {
    datamodule.getUsers((list) => {
        req.query.keywords ??= '';
        console.log(req.query)
        if (req.query.keywords == '') {
            res.send({ code: 0, msg: '未搜索到结果!', data: [] })
        } else {
            let ary = list.filter(item => {
                return item.name.includes(req.query.keywords);
            })

            res.send({ code: 1, msg: '搜索用户成功!', data: ary })
        }
    })
});

//修改用户信息接口
app.get('/usermodi', (req, res) => {
    datamodule.getUsers((list) => {
        req.query.name ??= '';
        req.query.email ??= '';
        req.query.phone ??= '';
        fs.readFile('./files/users', (err, data) => {
            if (!err) {
                let ary = JSON.parse(data);
                let index = ary.findIndex((item) => {
                    return item.name === req.query.name
                });
                if(index !== -1){
                    ary[index].email = req.query.email;
                    ary[index].phone = req.query.phone;
                    fs.writeFile('./files/users', JSON.stringify(ary), (err, data) => {
                        if (!err) {
                            res.send({ code: 1, msg: '修改成功!' });
                        }
                    })

                }else{
                    res.send({ code: 0, msg: '用户不存在!' });
                }
                
            } else {
                res.send({ code: 0, msg: '修改失败!' });
            }
        })

    })
});

//删除用户接口
app.get('/userdelete', (req, res) => {
    datamodule.getUsers((list) => {
        req.query.name ??= '';
        if (req.query.name == '') {
            res.send({ code: 0, msg: '未传入用户名!', data: [] })
        } else {
            fs.readFile('./files/users', (err, data) => {
                if (!err) {
                    let ary = JSON.parse(data);
                    let ary1 = ary.filter(item => {
                        return item.name !== req.query.name;
                    });
                    fs.writeFile('./files/users', JSON.stringify(ary1), (err, data) => {
                        if (!err) {
                            res.send({ code: 1, msg: '删除成功!' });
                        }
                    })
                } else {
                    res.send({ code: 0, msg: '用户不存在!' });
                }
            })
        }
    })
});

//订单列表接口
app.get('/orderlist', (req, res) => {
    datamodule.getOrders((list) => {
        //深拷贝
        let list1 = JSON.parse(JSON.stringify(list));
        req.query.page ??= 0;
        let page = parseInt(req.query.page) * 5;
        let count = page + 5;
        //按页数截取数组元素
        let pageary = list1.slice(page, count);
        console.log(pageary);
        res.send({ code: 1, msg: '订单列表获取成功!', data: { list: pageary, total: list.length } })
    })
})
//订单搜索接口
app.get('/ordersearch', (req, res) => {
    datamodule.getOrders((list) => {
        req.query.keywords ??= '';
        console.log(req.query)
        if (req.query.keywords == '') {
            res.send({ code: 0, msg: '未搜索到结果!', data: [] })
        } else {
            let ary = list.filter(item => {
                return item.order_name.includes(req.query.keywords);
            })

            res.send({ cord: 1, msg: '搜索订单成功!', data: ary })
        }
    })
})

//订单修改接口
app.get('/ordermodi', (req, res) => {
    datamodule.getOrders((list) => {
        req.query.order_id ??= '';
        req.query.order_price ??= '';
        req.query.order_pay ??= false;
        req.query.order_send ??= false;
        console.log(req.query)
        if (req.query.order_id == '') {
            res.send({ code: 0, msg: '订单号不能为空!' })
        } else {
            fs.readFile('./files/orders', (err, data) => {
                if (!err) {
                    let ary = JSON.parse(data);
                    let index = ary.findIndex((item) => {
                        return item.order_id === req.query.order_id
                    });
                    if (index == -1) {
                        res.send({ code: 0, msg: '未查询到相关订单!' })
                    } else {
                        (req.query.order_price !== '') && (ary[index].order_price = req.query.order_price);
                        (req.query.order_pay !== '') && (ary[index].order_pay = req.query.order_pay ? '是' : '否');
                        (req.query.order_send !== '') && (ary[index].order_send = req.query.order_send ? '是' : '否');
                        fs.writeFile('./files/orders', JSON.stringify(ary), (err, data) => {
                            if (!err) {
                                res.send({ code: 1, msg: '修改成功!' });
                            }
                        })

                    }

                } else {
                    res.send({ code: 0, msg: '修改订单失败!' });
                }
            })
        }
    })
})

//修改密码接口
app.get('/modifypsw', (req, res) => {
    let { name, oldpsw, newpsw } = req.query;
    console.log(req.query);
    fs.readFile('./files/' + name, (err, data) => {
        if (!err) {
            /* 
            判断参数传递过来的密码是否和服务器中密码一致,
            如果一致进行下一步,否则报错
            */
            let user = JSON.parse(data.toString());
            if (oldpsw == user.psw) {
                user.psw = newpsw;
                fs.writeFile('./files/' + name, JSON.stringify(user), (err, data) => {
                    if (!err) {
                        res.send({ code: 1, msg: '密码修改成功!' });
                    } else {
                        res.send({ code: 0, msg: '密码修改失败!' });
                    }

                });
            } else {
                res.send({ code: 0, msg: '原密码不正确!' });
            }
        }
    })
});

app.listen(3000, function (req, res) {
    console.log('服务器运行中...');
});