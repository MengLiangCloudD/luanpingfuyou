# lu

> A Vue.js project
111
## Build Setup
测试
```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
111
# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

pug  es6  node  微信接口 mongodb

"inventory": "0",                       药品库存
"packing": "20mg.*14",                  药品包装
"spec": "20mg.",                        药品规格
"storageCode": "3001",                  药局编码
"storageName": "药房",                  药局名称
"subStorage": "A01",                    子药局
"unit": "粒",                           药品单位
"venderSign": "YS000211",               厂家标识
"ypCode": "A9100001CP00",               药品编码
"ypName": "奥美拉唑胶囊",               药品名称
"ypPrice": "1.45",                      药品价格
"yplotNum": "14350944"                  生产批号




patientid 患者openId
name 患者姓名
cardno 患者卡号
clinicno 门诊号 
orderby 就诊科室 
doctorname 医生姓名 
doctorNo 医生编码  

itemClass 项目类别 （必传）
orderClass 医嘱类别 
drugCode 药品编码 
drugName 药品名称 
drugSpec 药品规格
firmId 厂家标识 
units 药品单位
amount 数量 
costs 计价金额
charges 实收费用 
dispensary 摆药药局 
orderNo 医嘱组别 （如无数据按顺序号填入）
subOrderNo 子医嘱组别（无数据填入‘1’）
dispensarySub 摆药子药局
abidance 用药天数 
chargesIndicator 收费标记（我方填入未收费）
收费时间
dosAge 一次用量 
dosAgeUnits 用量单位 
医嘱说明
门诊处方
price 单价
自备药
剂数
serialNo 流水号（不需要给后台穿）
就诊日期

sumCharges 总费用 
orderDate 开单时间（不需要给后台穿）
visitNo 就诊序号（不需要给后台穿）
visitDate 就诊时间 （不需要给后台穿）
OutpPresc集合（处方子表数据）







administretion 用药途径 
frequency 频次
 








 
freqDetail 医嘱说明 
getDrugFlag 取药标志（1取药，2不取药）
providedIndicator 自备标记是否为自备药 ，0为不是，1为是
prescNo 处方序号 （不传）
itemNo 项目序号（不传）

prescAttr “门诊处方（不用传）

repetition 剂数 
ChargeTime 收费时间先不要
serialNo 流水号（不需要给后台穿）
visitNo 就诊序号 （不需要给后台穿）
visitDate 就诊日期 （不需要给后台穿）

{
    "hosdepname": "妇科门诊一",
    "birthdate": "1991-03-21",
    "tradeno": "2019062114583501078",
    "starttime": "2019-06-21 14:58:35",
    "body": "微信挂号",
    "transactionid": "1",
    "cardname": "微信支付",
    "id": 804,
    "registerfee": "1.8",
    "hosdocname": "曲博",
    "regname": "妇科门诊一",
    "refunddee": "0",
    "openid": "oD2QnwF4BFqG1JA9PAqEYfVXr0Do",
    "sex": "女",
    "cardno": "1301111033",
    "idno": "130824199103210022",
    "tradetype": "JSAPI",
    "refundno": "",
    "amorpm": "昼夜",
    "name": "边博宇",
    "regdate": "2019-6-21",
    "regcode": "妇科门诊一",
    "endtiem": "",
    "hosdepcode": "10010101",
    "prepayid": "0",
    "hosdoccode": "0000QB",
    "age": "28 ",
    "status": 5
},
18771130786