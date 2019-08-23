<template>
    <div class="prescription-page">
        <div class="content" id="content">
            <div class="item-wrapper">
                <span class="title-tip">
                    <span>患者姓名:</span>
                </span>
                <Input v-model='form.name' disabled   @on-blur.prevent="inputLoseFocus"/>
            </div>
            <div class="item-wrapper">
                <span class="title-tip">
                    <span>患者卡号:</span>
                </span>
                <Input v-model='form.cardno' disabled  @on-blur.prevent="inputLoseFocus"/>
            </div>
            <div class="item-wrapper">
                <span class="title-tip">
                    <span>就诊科室:</span>
                </span>
                <Input v-model='form.depname' disabled   @on-blur.prevent="inputLoseFocus"/>
            </div>
            <div class="item-wrapper">
                <span class="title-tip">
                    <span>就诊医生:</span>
                </span>
                <Input v-model='form.docname' disabled @on-blur.prevent="inputLoseFocus"/>
            </div>
            <div class="item-wrapper">
                <span class="title-tip">
                    <span>医嘱类别:</span>
                </span>
                <Input  v-model='form.orderclass' disabled  @on-blur.prevent="inputLoseFocus"/>
            </div>
            <!-- <div class="item-wrapper">
                <span class="title-tip">
                    <span>总费用:</span>
                </span>
                <Input  v-model='form.sumcharges' disabled @on-blur.prevent="inputLoseFocus" />
            </div> -->
            <div class="drug">
                <div class="add-btn" @click="showdrugmodal">
                    请添加药品
                </div>
                <div class="drug-tip" v-if=" form.outs ==undefined || form.outs.length <= 0">
                    <div>
                        请添加药品
                    </div>
                </div>
                <div v-if="form.outs !==undefined && form.outs.length > 0 ">
                    <div class="add-btn" @click="editdrugdetail(-1)">
                        查看全部药品
                    </div>
                    <div class="item-wrapper" :class="{active:styleindex==index}" v-for="(item,index) in form.outs" :key="index">
                        <div class="drugname">
                            {{item.drugName}}  
                        </div>
                        <div class="detaile" @click="editdrugdetail(index)">
                            详情
                        </div>
                        <div class="detaile" @click="isdeletitem(index)">
                            删除
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div :style="{opacity: opacity}" @touchstart='touchstart' @touchend='touchend'  @click="toinsertprescribe"   class="primarybtn">提交</div>
        </div>
        <Modal 
        v-model="isshowdrugs"
            fullscreen
            title="药品详情">
            <div class="collapse-box">
                <div v-for="(item,index) in form.outs" :key="index" v-show="currentdrugindex==index||isshowall">
                    <div slot="content" class="drug-item" >
                        <div class="drugName">{{item.drugName}}
                        </div>
                        <div class="drugSpec">规格：{{item.drugSpec}}</div>
                        <div class="drug-item-info" >
                            <div class="drug-fun">
                                <span class="lititle">
                                    每次用量：
                                </span>
                                <Input  @on-change='sumprice(item)' v-model="item.dosAge" type="number" @on-blur.prevent="inputLoseFocus"/>
                                <span class="unit">
                                    {{item.dosAgeUnits=="盒"?"":item.dosAgeUnits}}
                                </span>
                            </div>
                        </div>
                        <div class="drug-item-info">
                            <div class="drug-fun">
                                <span class="lititle">
                                    用法：
                                </span>
                                <Select 
                                    v-model="item.administretion" 
                                    label-in-value 
                                >
                                    <Option   v-for="item in channel" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                                <span class="unit">
                                    {{''}}
                                </span>
                            </div>
                        </div>
                        <div class="drug-item-info">
                            <div class="drug-fun">
                                <span class="lititle">
                                    <span>
                                        频次：
                                    </span>
                                </span>
                                <Select 
                                    v-model="item.frequency" 
                                    label-in-value 
                                    @on-change='changefrequency(item)'>
                                    <Option  v-for="item in frequency" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                                <span class="unit">
                                    {{''}}
                                </span>
                            </div>
                        </div>
                        <div class="drug-item-info">
                            <div class="drug-fun">
                                <span class="lititle">
                                    数量：
                                </span>
                                <Input @on-change='sumprice(item)' v-model="item.amount" type="number" @on-blur.prevent="inputLoseFocus"/>
                                <span class="unit">
                                    {{item.units}}
                                </span>
                            </div>
                        </div>
                        <div class="drug-item-info">
                            <div class="drug-fun">
                                <span class="lititle">
                                    用药天数：
                                </span>
                                <Input v-model="item.abidance" type="number" disabled @on-blur.prevent="inputLoseFocus"/>
                                <span class="unit">
                                    天
                                </span>
                            </div>
                        </div>
                        <div class="drug-item-info">
                            <div class="drug-fun">
                                <span class="lititle">
                                    单价：
                                </span>
                                <Input v-model="item.price" type="number" disabled @on-blur.prevent="inputLoseFocus"/>
                                <span class="unit">
                                    元
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
        <Modal
            v-model="searchdrugmodal"
            fullscreen
            title="选择药品">
            <div class="search-box-wrapper">
                <div class="search-box">
                <Input v-model='drugName' @on-change="dealsearchDrug" @on-blur.prevent="inputLoseFocus"/>
                </div>
                <div class="search-yplist" v-if=" searchdruglist !==undefined || searchdruglist.length > 0">
                    <div   v-for="(item,index) in searchdruglist" :key="index" >
                        <div class="search-ypnameitem " @click="adddrug(item)">
                            <div class="ypname">{{item.ypname}}</div>
                            <div class="ypinventory">{{item.inventory}}</div>
                        </div>
                    </div>
                </div>
                <div class="search-tip" v-if="searchdruglist ===undefined || searchdruglist.length <= 0">
                    没有搜索到该药品
                </div>
            </div>
        </Modal>
        <Modal
            v-model="isshowtip"
            @on-ok='deletoutsitem'
            title="提示">
            请正确填写信息
        </Modal>
        <Modal
            v-model="unselectdrugmodel"
            title="提示">
            请选择药品
        </Modal>
        <Modal
            v-model="isinsertprescribe"
            @on-ok='insertprescribe'
            title="提示">
            请确认是否提交
        </Modal>
        <loading class="loading" v-show="isshowloading"></loading>
    </div>
</template>

<script>
import loading from '../../common/loading'
    export default {
        components:{
            loading
        },
        data(){
            return{
                unselectdrugmodel:false,
                isfetchdrugs:false,//控制药品是否已经请求完成
                isinsertprescribe:false,//提交时控制确认弹窗是否显示
                styleindex:-1,//用来控制提示哪个药品信息没有填写完整
                isshowtip:false,//药品信息不全的提示信息
                deldrugindex:0,//删除的药品索引值
                currentdrugindex:0,//药品详情里显示的当前药品索引值
                isshowall:false,//控制药品详情显示全部的药品
                isshowdrugs:false,//控制药品详情的显示
                opacity:1,//控制按钮的透明度
                timestate:false,//控制重复选择药品无限弹窗的状态
                isshowloading:false,//显示加载动画
                searchdrugs:[],//存储查到药品
                channel:[],//用药途径
                frequency:[],//用药频次
                searchdrugmodal:false ,//控制搜索药品的弹窗显示
                drugName:"",//搜索药品的名字
                searchdruglist:[],//存放搜索到的药品
                form:{
                    name:'',//患者姓名
                    cardno:'',//患者卡号
                    visitno:'',//就诊序号
                    clinicno:'',//门诊号
                    orderby:'',//科室编码
                    depname:'',//科室名称
                    docname:'',//医生名字
                    doccode:'',//医生编码
                    sumcharges:'',//总费用
                    itemclass:"A",//项目类别
                    orderclass:'A',//医嘱类别
                    // tradeno:'',//挂号的订单号
                    openid:'',//患者的openid
                    starttime:'',//挂号的时间
                    nizhen:'',//患者病历的诊断
                    outs:[]//药品
               }
            }
        },
        mounted(){
            let _this=this
            setTimeout(function(){
                _this.initdata() 
                _this.init()
            },10)
        },
        methods:{
            //弹出键盘问题
            inputLoseFocus() {
                setTimeout(() => {
                window.scrollTo(0, 0);
                }, 100);
            },
            topath(){
                this.$router.push('/examination')
            },
            init(){
                let _this=this
                setTimeout(function(){
                    //获取拟诊
                    _this.getcurrentdayrecord()
                    // 搜索药品
                    _this.searchDrug(_this.form.orderclass)
                    //获取初始信息
                    _this.getpatientinfo()
                    //获取用药途径
                    _this.fetchchannel()
                    //获取用药频次
                    _this.fetchfrequency()
                },10)
                
            },
            initdata(){
                this.unselectdrugmodel=false
                this.isfetchdrugs=false
                this.isinsertprescribe=false
                this.styleindex=-1
                this.isshowtip=false
                this.deldrugindex=0
                this.currentdrugindex=0
                this.isshowall=false
                this.isshowdrugs=false
                this.opacity=1
                this.timestate=false//控制重复选择药品无限弹窗的状态
                this.isshowloading=false//显示加载动画
                this.searchdrugs=[]//存储查到药品
                this.channel=[]//用药途径
                this.frequency=[]//用药频次
                this.searchdrugmodal=false 
                this.drugName=""//搜索药品的名字
                this.searchdruglist=[]//存放搜索到的药品
                this.form.name=''
                this.form.cardno=''
                this.form.visitno=''
                this.form.clinicno=''
                this.form.orderby=''
                this.form.depname=''
                this.form.docname=''
                this.form.doccode=''
                this.form.sumcharges=''
                // this.form.tradeno=''
                this.form.openid=''
                this.form.starttime=''
                this.form.nizhen=''
                this.form.outs=[]
            },
            getcurrentdayrecord(){
                let _this = this;
                const yspatientinfo=JSON.parse(localStorage.getItem("yspatientinfo"));
                let patientid=yspatientinfo.patientid
                let visitno=yspatientinfo.visitno
                let now=new Date();
                let y = now.getFullYear();
                let m = now.getMonth() + 1;
                let d = now.getDate();
                if(m<10){
                    m='0'+m
                }
                if(d<10){
                    d="0"+d
                }
                let visitdate=y+'-'+m+'-'+d;
                let doccode=yspatientinfo.doctor
                
                let url =_this.$store.getters.getUrl + "medicalrecord/getthesamedayoutpmr.do";
                _this.isshowloading=true
                    $.ajax({
                        url: url,
                        type: "post",
                        dataType: "json",
                        async: true,
                        data: { patientid,visitdate,doccode,visitno },
                        success: function(data) {
                            _this.isshowloading=false
                            if(data.status==1){
                                _this.form.nizhen=data.data[0].diagdesc;
                            }else{
                                _this.requestmodel=true
                                _this.infomsg="获取数据失败"
                            }
                        },
                        error: function(data) {
                            _this.isshowloading=false
                            _this.requestmodel=true
                            _this.infomsg="请求发送失败"
                        }
                    })
            },
            //显示药品搜索弹窗
            showdrugmodal(){
                this.searchdrugmodal=true
                if(!this.isfetchdrugs){
                    this.isshowloading=true
                }
            },
            //处理搜索药品搜索到的数据
            dealsearchDrug(){
                let a=this.drugName
                let _letter=a.toUpperCase()
                let data=this.searchdrugs
                this.searchdruglist=[]
                //用输入的drugName去筛选药品
                if(this.drugName!==''){
                    for(var i=0;i<data.length;i++){
                        if(data[i].hasOwnProperty('ypname')){
                            //如果库存不为0
                            if(data[i].inventory!='0'){
                                let str=data[i].ypname.toString();
                                let letter=data[i].inputcode.toString();
                                if(str.includes(_letter)||letter.includes(_letter)){
                                    this.searchdruglist.push(data[i])
                                }
                            }
                        }
                    }
                }
                return
            },
            //搜索药品
            searchDrug(orderclass){
                let _this=this
                let url=''
                if(orderclass=='A'){
                    url=_this.$store.getters.getUrl+'prescription/westernmedicine.do'
                }else{
                    url=_this.$store.getters.getUrl+'prescription/chinesemedicine.do'
                }
                $.ajax({
                    url: url,
                    type: "post",
                    dataType: "json",
                    async: true,
                    data:'',
                    success: function(data) {
                        _this.isshowloading=false
                        _this.isfetchdrugs=true
                        
                        //==========================================筛选出有库存的=======================================//
                        
                        if(data.status=="1"){
                            let arr=[]
                            for(var i=0;i<data.data.length;i++){
                                if(data.data[i].inventory!=='0'){
                                    arr.push(data.data[i])
                                }
                            }
                            _this.searchdrugs=arr
                        }else if(data.status=="0"){
                            _this.requestmodel=true
                            _this.infomsg="暂无数据"
                        }else{
                            _this.requestmodel=true
                            _this.infomsg="系统异常"
                        }
                        
                    },
                    error: function(data) {
                        _this.isshowloading=false
                        _this.requestmodel=true
                        _this.infomsg="系统异常"
                    }
                });
            },
            
            //获取患者信息
            getpatientinfo(){
                let patientinfo=localStorage.getItem('yspatientinfo')
                let data=JSON.parse(patientinfo)
                this.form.name=data.name
                this.form.cardno=data.patientid//卡号
                this.form.orderby=data.registerdept//科室编码
                this.form.depname=data.hosdepname//科室名字
                this.form.docname=data.hosdocname//医生名字
                this.form.doccode=data.doctor//医生编码
                // this.form.tradeno=data.tradeno//订单号
                this.form.openid=data.openid//openid
                this.form.starttime=data.starttime//挂号日期
                this.form.visitno=data.visitno
                this.form.clinicno=data.clinicno
            },
            //处理获取的用药途径数据
            dealfetchchannel(data){
                this.channel=[]
                for(var i=0;i<data.length;i++){
                    this.channel.push({
                        value:data[i].pcusename,
                        label:data[i].pcusename
                    })
                }
            },
            //获取用药途径
            fetchchannel(){
                let _this=this
                let url=_this.$store.getters.getUrl+'prescription/channel.do'
                $.ajax({
                    url: url,
                    type: "post",
                    dataType: "json",
                    async: true,
                    data:'',
                    success: function(data) {
                        _this.dealfetchchannel(data.data)
                    },
                    error: function(data) {
                    }
                });
            },
            //处理获取到的频次数据
            dealfetchfrequency(data){
                this.frequency=[
                    {
                    value:'一日一次',
                    label:'一日一次'
                    },
                    {
                    value:'一日二次',
                    label:'一日二次'
                    },
                    {
                    value:'一日三次',
                    label:'一日三次'
                    },
                    {
                    value:'一日四次',
                    label:'一日四次'
                    },
                    {
                    value:'一日五次',
                    label:'一日五次'
                    },
                    {
                    value:'一日六次',
                    label:'一日六次'
                    }
                    ]
            },
            //获取用药频次
            fetchfrequency(){
                let _this=this
                let url=_this.$store.getters.getUrl+'prescription/frequency.do'
                $.ajax({
                    url: url,
                    type: "post",
                    dataType: "json",
                    async: true,
                    data:'',
                    success: function(data) {
                        _this.dealfetchfrequency(data.data);
                    },
                    error: function(data) {
                    }
                });
            },
            //编辑当前药品
            editdrugdetail(index){
                this.styleindex=-1
                if(index=='-1'){
                    this.isshowall=true
                }else{
                    this.isshowall=false
                    this.currentdrugindex=index
                }
                this.isshowdrugs=true
            },
            touchstart(){
                this.opacity=0.5
            },
            touchend(){
                this.opacity=1
            },
            changefrequency(item){
                this.sumprice(item)
            },
            //计算单个药品的总价（在选择药品时）
            sumprice(item){
                if(!item.amount||!item.dosAge||!item.frequency){
                    return
                }
                let _amount=parseFloat(item.amount);
                //包装数量÷（每次用量（不足整数，采用用加一发）*频次）=用药天数（取整）
                //amount*10*12/(5*2*3)
                var pricestr=item.price.toString()
                var pricestrarr=pricestr.split(".")
                var num=pricestrarr[1].length
                let _price=0
                if(pricestrarr[0]==0){
                    let _str=item.price*Math.pow(10,num)
                    _price=parseInt(_str)
                }else{
                    _price=item.price*Math.pow(10,num)
                }
                item.charges=_amount*_price/Math.pow(10,num)
                item.costs=_amount*_price/Math.pow(10,num)
                let freq
                if(item.frequency=='一日一次'){
                    freq=1
                }else if(item.frequency=='一日二次'){
                    freq=2
                }else if(item.frequency=='一日三次'){
                    freq=3
                }else if(item.frequency=='一日四次'){
                    freq=4
                }else if(item.frequency=='一日五次'){
                    freq=5
                }else if(item.frequency=='一日六次'){
                    freq=6
                }
                let days
                let totals
                let daycost
                if(item.units=="盒"){
                    let arr=item.drugSpec.split('*')
                    let yppaccount=parseInt(arr[1])
                    totals=_amount*yppaccount
                    daycost=Math.ceil(item.dosAge)*freq
                }else{
                    totals=_amount
                    daycost=Math.ceil(item.dosAge)*freq
                }
                days=Math.ceil(totals/daycost)
               
                item.abidance=days
                
                
                let drugs=this.form.outs

                let sum=0
                for(var i=0;i<drugs.length;i++){
                    let itemsum=parseInt(drugs[i].charges*100)/100
                    sum+=itemsum
                }

                this.form.sumcharges=sum
            },
            //确认是否删除药品
            isdeletitem(index){
                this.deldrugindex=index
                this.isshowtip=true
            },
            //删除药品
            deletoutsitem(){
                this.form.outs.splice(this.deldrugindex,1)
                let drugs=this.form.outs
                let sum=0
                for(var i=0;i<drugs.length;i++){
                    sum+=parseInt(drugs[i].charges*100)/100
                }
                this.form.sumcharges=sum
            },
            fetchfirmid(itemspec,itemcode){
                //获取公司标识
                let _data
                let _this=this
                let url=_this.$store.getters.getUrl+'prescription/specification.do'
                _this.isshowloading=true
                $.ajax({
                    url: url,
                    type: "post",
                    dataType: "json",
                    async: false,
                    data:{itemcode,itemspec},
                    success: function(data) {
                        _this.isshowloading=false
                        _data=data
                    },
                    error: function(data) {
                        _this.isshowloading=false
                        _data={status:5}
                    }
                });
                return _data
            },
            //把药品添加到form的outs里
            adddrug(data){
                let _this=this
                _this.searchdrugmodal=false;
                _this.isshowall=false
                setTimeout(function(){
                    //循环已添加药品看药品是否重复 用药品名称去检验
                    let state=true
                    //查询是否已经有重复的药品
                    for(var i=0;i<_this.form.outs.length;i++){
                        if(_this.form.outs[i].drugName==data.ypname){
                            state=false
                        }
                    }
                    //点击的药品名称相同，弹提示框并禁止该药品继续添加
                    if(!state){
                        //如果timestate为false 把timestate改成true
                        if(!_this.timestate){
                            _this.timestate=true
                            _this.$Message.warning({
                                content:'该药品已选择，请选择其他药品！',
                                duration:1
                            })
                            //开始计时1秒后把timestate改成false
                            let timer=setInterval(function(){
                                _this.timestate=false
                                clearInterval(timer)
                            },1100)
                        }
                        return
                    }

                    //如果医嘱类别是西药只能开五个药，如果是中药可以无限开
                    if(_this.form.orderclass=="A"){
                        if(_this.form.outs.length>=5){
                            _this.$Message.info('西药只能开五种药品！')
                            return
                        }
                    }
                    let drugitem={
                            drugCode:'',//药品编码
                            drugName:'',//药品名称（显示）
                            drugSpec:'',//药品规格（显示）
                            firmId:'',//厂家标识
                            units:'',//药品单位
                            dispensary:'',//药局名称改成编码
                            dispensarySub:'',//子药局
                            price:'',//药房进价
                            amount:null,//数量（显示）
                            abidance:'',//用药天数(用药天数)
                            dosAge:'',//一次用量（显示）
                            dosAgeUnits:'',// spec
                            administretion:'',//用药途径(显示)
                            frequency:'',//用药频次
                            charges:0,//实收费用应该收取的费用（显示）
                            //先写死的数据
                            costs:0,//总费用
                            orderNo:'1',//医嘱组别先写死为1
                            subOrderNo:'1',//子医嘱组别先写死为1
                            freqDetail:'医嘱说明',//医嘱说明
                            repetition:1//西药剂数为1
                    }
                    drugitem.drugCode=data.ypcode//药品编码
                    drugitem.drugName=data.ypname//药品名称（显示）
                    drugitem.drugSpec=data.drugspec//药品规格（显示）
                    drugitem.units=data.unit//药品单位
                    
                    drugitem.dispensary=data.storagecode//药局名称
                    drugitem.dispensarySub=data.substorage//子药局
                    let itemspec=data.drugspec
                    let itemcode=data.ypcode
                    const fetchfirmiddata=_this.fetchfirmid(itemspec,itemcode)
                    if(fetchfirmiddata.status=="0"){
                        _this.requestmodel=true
                        _this.infomsg="暂无数据"
                    }else if(fetchfirmiddata.status=="1"){
                        drugitem.firmId=fetchfirmiddata.data[0].firm_id
                        drugitem.drugSpec=fetchfirmiddata.data[0].drug_spec+fetchfirmiddata.data[0].drug_supplier_id//药品规格（显示）
                    }else if(fetchfirmiddata.status=="-1"){
                        _this.requestmodel=true
                        _this.infomsg="系统异常查询药库失败"
                    }else{
                        _this.requestmodel=true
                        _this.infomsg="请求发送失败"
                    }
                    //处理药品价格为.01这种格式的数据
                    if(data.ypprice.toString().indexOf('.')===0){
                        drugitem.price='0'+data.ypprice//药品单价
                    }else{
                        drugitem.price=data.ypprice//药品单价
                    }

                    if(data.unit=="盒"){
                        drugitem.dosAgeUnits=data.unit
                    }else{
                        drugitem.dosAgeUnits=data.unit
                    }
                    _this.form.outs.push(drugitem)
                    let arr=_this.form.outs
                    _this.isshowdrugs=true
                    _this.form.outs=[]
                    setTimeout(()=>{
                        _this.form.outs=arr
                        _this.currentdrugindex=arr.length-1
                        
                    },10)
                },10)
                
            },
            toinsertprescribe(){
                this.isinsertprescribe=true
            },
            //校验处方
            checkouts(data){
                let _this=this
                let state=false
                for(var i=0;i<data.length;i++){
                    for(var a in data[i]){
                        if(data[i][a]===''){
                            _this.styleindex=i
                            _this.$Message.warning('请把信息填写完整！')
                            state=false
                            return false
                        }else{
                            state=true
                        }
                    }
                }
                return state

            },
            //保存处方
            insertprescribe(){
                let _this=this
                //检验药品信息填写完整
                if(_this.form.outs.length==0){
                    this.unselectdrugmodel=true
                    return
                }
                let checkresult=_this.checkouts(_this.form.outs)
                if(!checkresult){
                    return
                }
                let str=JSON.stringify(_this.form.outs)
                let obj={}
                obj.outs=str//药品信息
                obj.name=_this.form.name//就诊人
                obj.cardno=_this.form.cardno//就诊人卡号
                obj.clinicno=_this.form.clinicno//门诊号
                obj.visitno=_this.form.visitno//就诊序号
                obj.orderby=_this.form.orderby//科室
                obj.docname=_this.form.docname//医生名字
                obj.doccode=_this.form.doccode//医生编码
                obj.sumcharges=_this.form.sumcharges//总费用
                obj.itemclass=_this.form.itemclass//项目类别？
                obj.orderclass=_this.form.orderclass//医嘱类别
                // obj.tradeno=_this.form.tradeno//挂号的订单号
                obj.openid=_this.form.openid//用户openid
                obj.depname=_this.form.depname//科室名称
                obj.starttime=_this.form.starttime//挂号的时间
                obj.nizhen=_this.form.nizhen//拟诊
                let url=_this.$store.getters.getUrl+'prescription/prescribe.do'
                _this.isshowloading=true
                $.ajax({
                    url: url,
                    type: "post",
                    dataType: "json",
                    async: true,
                    data:obj,
                    success: function(data) {
                        _this.isshowloading=false
                        if(data.status==='1'){
                            _this.$Message.info('开方成功')
                            _this.initdata()
                            _this.getcurrentdayrecord()
                            _this.init()
                            window.websocketobj.send(JSON.stringify({cardno:_this.form.cardno,massege:'123'}))
                        }else{
                            _this.$Message.error('开方失败')
                        }
                    },
                    error: function(data) {
                        _this.isshowloading=false
                        _this.$Message.error('请求失败')
                    }
                });
            }
        }
    }
</script>

<style scoped>
.loading{
    z-index: 10000;
}
.add-btn{
    margin-bottom: 2px;
    border: 1px solid #dcdee2;
    height: 46px;
    text-align: center;
    background: rgb(0, 187, 187);
    color: white;
    line-height: 46px;
    padding-left: 10px;
    border-radius: 5px;
}
.primarybtn{
    background: rgb(0,187,187);
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    color: rgb(255,255,255);
}
.primarybtn :active{
    background: rgb(182, 152, 17);
}
.prescription-page{
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: auto;
}
.prescription-page .content{
    flex: 1;
    overflow: auto;
}
.title{
    background: rgb(0,187,187);
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: white;
}
.title-arrow-icon{
  position: absolute;
  left: 0px;
  top: 0px;
  height: 50px;
  width:50px;
}
.info{
    padding: 10px;
}

.unit{
    align-self: center;
    padding-left: 5px;
    width: 60px;
}
.rowwrapper{
}
.info-item{
    display: flex;
    margin: 5px 0;
}
.info-title{
    width: 100px;
    display: flex;
}
.info-title span{
    align-self: center;
    font-size: 16px;
}
.info-text{
    width: 50px;       
}
.search-box{
    margin: 10px 0;
    text-align: center;
    padding: 0 20px;
}
.search{
    border-radius: 20px;
    height: 30px;
    width: 100%;
}
.select-drug-list{
    font-size: 10px;
}
.drug{
    display: flex;
    flex-direction: column;
    flex: 1;
}
.drug-title{
    background: rgb(0,187,187);
    padding: 10px;
    text-align: center;
    font-size: 16px;
    color: white;
    position: relative;
}
.addicon{
    position: absolute;
    right: 10px;
    font-size: 30px;
    width: 30px;
    top:0;
}
.drugName{
    margin: 3px 0;
    margin-left: 5px;
    font-size: 14px;
    font-weight: bolder;
    position: relative;
}
.closeicon{
    position: absolute;
    right: 10px;
    top: 0px;
}
.drugSpec{
    margin: 3px 0;
    margin-left: 5px;
    font-size: 10px;
}
.drug-item-info{
    display: flex;
}
.drug-fun{
    border: 1px solid rgba(202, 200, 200,0.3);
    flex: 1;
    padding: 5px 0;
    display: flex;

}
.lititle{
    width: 100px;
    align-self: center;
    margin-left: 5px;
}

.drug-tip{
    flex: 1;
    font-size: 25px;
    text-align: center;
    color: rgba(58, 57, 57, 0.3);
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content:center;
}
.line{
    height: 10px;
    background: rgb(248, 248, 248)
}
.btnwrapper{
    padding: 0 20px;
    margin: 10px 0 50px 0;
}
.submit{
    padding: 10px 0;
}
.search-box-wrapper{
    height: 100%;
    display: flex;
    flex-direction: column;
}
.search-box >>> .ivu-input{
    -webkit-appearance: none;
    -moz-appearance: none;
    -o-appearance: none;
    appearance: none;
}
.search-tip{
    flex: 1;
    align-self: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    overflow: auto;
}
.search-yplist{
    padding: 10px;
    overflow: auto;
}
.search-ypnameitem{
    display: flex;
    font-size: 15px;
    border: 1px solid rgb(187, 187, 187);
    padding: 5px;
}
.ypname{
    flex: 1
}
.ypinventory{

}
.title-tip{
    width: 100px;
}
.item-wrapper{
    display: flex;
    align-items: center;
    margin-bottom: 2px;
    border: 1px solid #dcdee2;
    height: 46px;
    line-height: 46px;
    padding-left: 10px;
    border-radius: 5px;
    padding-right: 5px;
}
.drugname{
    flex: 1;
}
.detaile{
    margin-right: 10px;
}
.detaile{
    color: rgb(0, 187, 187)
}
.active{
    border-color: red
}
.content >>> .ivu-input{
    -webkit-appearance: none;
    -moz-appearance: none;
    -o-appearance: none;
    appearance: none;
}
.content >>> .ivu-input{
    border: 1px solid #ffffff;
    background: #ffffff
}
.content >>> .ivu-select-selection{
    border: 1px solid #ffffff;
    box-shadow: none
}
.content >>> .select-selection:hover {
    border-color: #ffffff;
    box-shadow: none
}
.collapse-box >>> .ivu-input{
    -webkit-appearance: none;
    -moz-appearance: none;
    -o-appearance: none;
    appearance: none;
}
</style>