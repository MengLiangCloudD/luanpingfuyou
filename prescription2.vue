<template>
    <div class="prescription-page">
        <!-- <div class="title" >
            <div @click="topath"  class="title-arrow-icon">
                <Icon  size="20" color="rgb(255,255,255)" type="ios-arrow-back"/>
            </div>
            <p>开处方</p>
        </div> -->
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
            <div class="item-wrapper">
                <span class="title-tip">
                    <span>总费用:</span>
                </span>
                <Input  v-model='form.sumcharges' disabled @on-blur.prevent="inputLoseFocus" />
            </div>
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
                                    {{item.dosAgeUnits}}
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
            v-model="modal1"
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
            v-model="modal3"
            title="提示">
            请正确填写信息
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
                modal3:false,
                isfetchdrugs:false,
                isinsertprescribe:false,
                styleindex:-1,
                isshowtip:false,
                deldrugindex:0,
                currentdrugindex:0,
                isshowall:false,
                isshowdrugs:false,
                opacity:1,
                timestate:false,//控制重复选择药品无限弹窗的状态
                currentindex:'0',//折叠面板当前index
                isshowloading:false,//显示加载动画
                searchdrugs:[],//存储查到药品
                defaultchannel:'',
                channel:[],//用药途径
                frequency:[],//用药频次
                modal1:false ,
                drugName:"",//搜索药品的名字
                searchdruglist:[],//存放搜索到的药品
                form:{
                    name:'',
                    cardno:'',
                    visitno:'',
                    clinicno:'',
                    orderby:'',
                    depname:'',
                    docname:'',
                    doccode:'',
                    sumcharges:'',
                    itemclass:'',
                    orderclass:'',
                    tradeno:'',
                    openid:'',
                    starttime:'',
                    nizhen:'',
                    outs:[]
               }
            }
        },
        mounted(){
            
               this.initdata() 
               this.init()
        },
        methods:{
            init(){
                this.form.orderclass="A"
                this.form.itemclass='A'
                // this.isshowloading=true
                this.getcurrentdayrecord()
                // 搜索药品
                this.searchDrug(this.form.orderclass)
                //获取初始信息
                this.getpatientinfo()
                //获取用药途径
                this.fetchchannel()
                //获取用药频次
                this.fetchfrequency()
            },
            initdata(){
                this.modal3=false
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
                this.currentindex='0'//折叠面板当前index
                this.isshowloading=false//显示加载动画
                this.searchdrugs=[]//存储查到药品
                this.defaultchannel=''
                this.channel=[]//用药途径
                this.frequency=[]//用药频次
                this.modal1=false 
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
                this.form.itemclass=''
                this.form.orderclass=''
                this.form.tradeno=''
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
                // return new Promise((resolve,reject)=>{
                    $.ajax({
                        url: url,
                        type: "post",
                        dataType: "json",
                        async: true,
                        data: { patientid,visitdate,doccode,visitno },
                        success: function(data) {
                            if(data.status==1){
                                _this.form.nizhen=data.data[0].diagdesc;
                            }
                            
                        },
                        error: function(data) {
                            //reject(data)
                        }
                    })
            },
            toinsertprescribe(){
                this.isinsertprescribe=true
            },
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
            //弹出键盘问题
            inputLoseFocus() {
                setTimeout(() => {
                window.scrollTo(0, 0);
                }, 100);
            },
            changefrequency(item){
                this.sumprice(item)
            },
            topath(){
                this.$router.push('/examination')
            },
            //获取患者信息
            getpatientinfo(){
                let patientinfo=localStorage.getItem('yspatientinfo')
                let data=JSON.parse(patientinfo)
                this.form.name=data.name
                this.form.cardno=data.cardno
                this.form.orderby=data.hosdepcode
                this.form.depname=data.hosdepname
                this.form.docname=data.hosdocname
                this.form.doccode=data.hosdoccode
                this.form.tradeno=data.tradeno
                this.form.openid=data.openid
                this.form.starttime=data.starttime
                this.form.visitno=data.visitno
                this.form.clinicno=data.clinicno
            },
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
            //把药品添加到form的outs里
            adddrug(data){
                let _this=this
                //循环已添加药品看药品是否重复 用药品名称去检验
                let state=true
                //查询是否已经有重复的药品
                for(var i=0;i<this.form.outs.length;i++){
                    if(this.form.outs[i].drugName==data.ypname){
                        state=false
                    }
                }
                //点击的药品名称相同，弹提示框并禁止该药品继续添加
                if(!state){
                    //如果timestate为false 把timestate改成true
                    if(!this.timestate){
                        this.timestate=true
                        this.$Message.warning({
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

                //刷新医嘱类别以第一个药品为准
                //设置医嘱类别
                
                // if(this.form.outs.length==0){
                //     let firstdrug=data.ypCode.toString().indexOf('C')
                //     if(firstdrug==0){
                //         this.form.orderclass='C'
                //     }else{
                //         this.form.orderclass="A"
                //     }
                // }else{
                //     let str=this.form.outs[0].drugCode
                //     let firstdrug=str.toString().indexOf('C')
                //     if(firstdrug==0){
                //         this.form.orderclass='C'
                //     }else{
                //         this.form.orderclass="A"
                //     }
                // }

                //如果医嘱类别是西药只能开五个药，如果是中药可以无限开
                if(this.form.orderclass=="A"){
                    if(this.form.outs.length>=5){
                        this.$Message.info('西药只能开五种药品！')
                        return
                    }
                }
                

                let drugitem={
                        /**=====================================获取的药品信息==================================== 
                            inventory: "0", //药品库存（不传）
                            packing: "20mg.*14", //药品包装描述（不传）
                            spec: "20mg.", //药品规格
                            storageCode: "3001", //药局编码（不传）
                            storageName: "药房",//药局名称
                            subStorage: "A01",//子药局
                            unit: "粒", //药品单位
                            venderSign: "YS000211",//厂家标识
                            ypCode: "A9100001CP00", //药品编码
                            ypName: "奥美拉唑胶囊",//药品名称
                            ypPrice: "1.45", //药房单价
                            yplotNum: "14350944" //药品批号（不传）
                        =====================================获取的药品信息==================================== */
                        //==================================查询药品获取的参数===================================
                        drugCode:'',//药品编码
                        drugName:'',//药品名称（显示）
                        drugSpec:'',//药品规格（显示）
                        firmId:'',//厂家标识
                        units:'',//药品单位
                        dispensary:'',//药局名称改成编码
                        dispensarySub:'',//子药局
                        price:'',//药房进价
                        //===================================查询药品获取的参数=================================
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
                // drugitem.firmId='YS000211'//厂家标识(先传假数据)原先的字
                drugitem.units=data.unit//药品单位
                drugitem.dispensary=data.storagecode//药局名称
                drugitem.dispensarySub=data.substorage//子药局

                //处理药品价格为.01这种格式的数据
                if(data.ypprice.toString().indexOf('.')===0){
                    drugitem.price='0'+data.ypprice//药品单价
                }else{
                    drugitem.price=data.ypprice//药品单价
                }
                
                //添加一组属性用来计算天数
                let yppaccount//盒装药品装的药品数量
                let dedosAgeUnits//用量单位去掉单位
                if(data.unit=='盒'){
                    if(data.drugspec.indexOf('*')!=-1){
                        let arr=[]
                        arr=data.drugspec.split('*')
                        for(let i=0;i<arr.length;i++){
                            if(arr[i].indexOf(data.spec)!=-1){
                                dedosAgeUnits=arr[i].split(data.spec)[0]
                                drugitem.dedosAgeUnits=dedosAgeUnits
                                drugitem.dosAgeUnits=arr[i].split(data.spec)[0]+data.spec//用量单位100mg
                            }
                        }
                        yppaccount=parseInt(arr[1])
                        drugitem.yppaccount=yppaccount//每盒的药品数量
                    }
                }else{
                    drugitem.yppaccount=1
                    if(data.drugspec.indexOf('*')!=-1){
                        let arr=data.drugspec.split('*')
                        for(let i=0;i<arr.length;i++){
                            if(arr[i].indexOf(data.spec)!=-1){
                                if(arr[i].indexOf(':')!=-1){
                                    let arr1=arr[i].split(':')
                                    for(let i=0;i<arr1.length;i++){
                                        if(arr1[i].indexOf(data.spec)!=-1){
                                            drugitem.dedosAgeUnits=arr1[i].split(data.spec)[0]
                                            drugitem.dosAgeUnits=arr1[i].split(data.spec)[0]+data.spec
                                        }
                                    }
                                }else{
                                    drugitem.dedosAgeUnits=arr[i].split(data.spec)[0]
                                    drugitem.dosAgeUnits=arr[i].split(data.spec)[0]+data.spec
                                }
                            }
                        }
                    }else if(data.drugspec.indexOf(':')!=-1){
                        let arr=data.drugspec.split(':')
                        for(let i=0;i<arr.length;i++){
                            if(arr[i].indexOf(data.spec)!=-1){
                                drugitem.dedosAgeUnits=arr[i].split(data.spec)[0]
                                drugitem.dosAgeUnits=arr[i].split(data.spec)[0]+data.spec
                            }
                        }
                    }else{
                        drugitem.dedosAgeUnits=data.drugspec.split(data.spec)[0]
                        drugitem.dosAgeUnits=data.drugspec.split(data.spec)[0]+data.spec
                    }
                }
                //获取公司标识
                let itemspec=data.drugspec
                let itemcode=data.ypcode
                let url=_this.$store.getters.getUrl+'prescription/specification.do'
                $.ajax({
                    url: url,
                    type: "post",
                    dataType: "json",
                    async: false,
                    data:{itemcode,itemspec},
                    success: function(data) {
                        //存储子类
                        drugitem.firmId=data[0].firm_id
                        drugitem.drugSpec=data[0].drug_spec+data[0].drug_supplier_id//药品规格（显示）
                    },
                    error: function(data) {
                    }
                });
                this.form.outs.push(drugitem)
                let arr=this.form.outs
                this.form.outs=[]
                setTimeout(()=>{
                    if(arr.length===1){
                        this.currentindex='0'
                    }else{
                        this.currentindex=arr.length-1+''
                    }
                    this.form.outs=arr
                    this.modal1=false;
                    this.isshowall=false
                    this.currentdrugindex=arr.length-1
                    this.isshowdrugs=true
                    this.$emit("scroll")
                },100)

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
                        _this.searchdrugs=data
                        //==========================================筛选出有库存的=======================================//
                        let arr=[]
                        for(var i=0;i<data.length;i++){
                            if(data[i].inventory!=='0'){
                                arr.push(data[i])
                            }
                        }
                        let attarr=[]
                        for(let j=0;j<data.length;j++){
                            if(data[j].unit=="盒"){
                                attarr.push(data[j])
                            }
                            
                        }
                    },
                    error: function(data) {
                        _this.isshowloading=false
                    }
                });
            },
            //显示药品搜索弹窗
            showdrugmodal(){
                
                this.modal1=true
                if(!this.isfetchdrugs){
                    this.isshowloading=true
                }
            },
            //计算单个药品的总价（在选择药品时）
            sumprice(item){
                if(!item.amount||!item.dosAge||!item.frequency){
                    return
                }
                //包装数量÷（每次用量（不足整数，采用用加一发）*频次）=用药天数（取整）
                //amount*10*12/(5*2*3)
                item.charges=item.amount*item.price
                item.costs=item.amount*item.price
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
                // if(item.units=="盒"){
                    let days
                    //item.amount 药品数量
                    //item.yppaccount 药品包装个数
                    //item.dedosAgeUnits 单位用量（数字）
                    let totals=item.amount*item.yppaccount*item.dedosAgeUnits
                    let daycost=Math.ceil(item.dosAge)*item.dedosAgeUnits*freq
                    days=Math.ceil(totals/daycost)
                    item.abidance=days
                // }
                
                let drugs=this.form.outs

                let sum=0
                for(var i=0;i<drugs.length;i++){
                    sum+=parseInt(drugs[i].charges*100)/100
                }

                this.form.sumcharges=sum
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
                // this.frequency=[]
                // for(var i=0;i<data.length;i++){
                //     this.frequency.push({
                //         value:data[i].pccname,
                //         label:data[i].pccname
                //     })
                // }
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
                    this.modal3=true
                    return
                }
                let checkresult=_this.checkouts(_this.form.outs)
                if(!checkresult){
                    return
                }
                
                // for(let i=0;i<_this.form.outs.length;i++){
                //     _this.form.outs[i].drugSpec=_this.form.outs[i].dosAgeUnits
                // }

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
                obj.tradeno=_this.form.tradeno//挂号的订单号
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
                            window.websocketobj.send(JSON.stringify({cardno:_this.form.cardno,massege:'123'}))
                            _this.$Message.info('开方成功')
                            _this.initdata()
                            _this.getcurrentdayrecord()
                            _this.init()
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
    /**
                        let obj={}
                        obj.name='张三'
                        obj.cardno='1212121'
                        obj.clinicno='123456'
                        obj.orderby='儿科'
                        obj.docname='王五'
                        obj.doccode='123'
                        obj.sumcharges='500'
                        obj.itemclass='项目类型'
                        obj.orderclass='A'
                        obj.outs=[]
                        let outsitem={
                            drugCode:'药品编码',
                            drugName:'药品名称',
                            drugSpec:'药品规格',
                            firmId:'厂家标识',
                            units:'单位如：支',
                            amount:'数量',
                            costs:'计价金额',
                            charges:'实收费用',
                            dispensary:'摆药药局',
                            orderNo:'医嘱组别',
                            subOrderNo:'子医嘱组别',
                            dispensarySub:'摆药子药局',
                            abidance:'用药天数',
                            dosAge:'一次用量',
                            dosAgeUnits:'用量单位',
                            freqDetail:'医嘱说明',
                            price:'单价',
                            repetition:'剂数'
                            }
                        obj.outs.push(outsitem)
                    */
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