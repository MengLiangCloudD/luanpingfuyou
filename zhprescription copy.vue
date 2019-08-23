<template>
    <div class="prescription-page">
        <div class="rowwrapper">
            <span class="info-title">
                <span>患者姓名:</span>
            </span>
            <Input v-model='form.name' disabled   />
        </div>
        <div class="rowwrapper">
            <span class="info-title">
                <span>患者卡号:</span>
            </span>
            <Input v-model='form.cardno' disabled   />
        </div>
        <div class="rowwrapper">
            <span class="info-title">
                <span>就诊科室:</span>
            </span>
            <Input v-model='form.depname' disabled    />
        </div>
        <div class="rowwrapper"> 
            <span class="info-title">
                <span>就诊医生:</span>
            </span>
            <Input v-model='form.docname' disabled />
        </div>
        <div class="rowwrapper">
            <span class="info-title">
                <span>医嘱类别:</span>
            </span>
            <Input  v-model='form.orderclass' disabled  />
        </div>
        <div class="rowwrapper">
            <span class="info-title">
                <span>总费用:</span>
            </span>
            <Input  v-model='form.sumcharges' disabled  />
        </div>
        <div class="add-btn" @click="showdrugmodal">
            请添加药品
        </div>
        <div class="add-btn add-btns" @click="searchCombination">
            请添加组合
        </div>
        <div class="drug-tip" v-if=" form.outs ==undefined || form.outs.length <= 0">
            <div>
                请添加药品
            </div>
        </div>
        <div  v-if=" form.outs !==undefined && form.outs.length > 0">
            <div class="rowwrapper" v-for="(item,index) in form.outs" :key="index">
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
            <div>
            <div class="drug-item-info">
                <div class="drug-fun">
                    <span class="lititle">
                        用法：
                    </span>
                    <Select 
                        v-model="east.administretion" 
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
                        v-model="east.frequency" 
                        label-in-value 
                        >
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
                        <span>
                            服用次数：
                        </span>
                    </span>
                    <Select 
                        v-model="east.freq" 
                        label-in-value 
                        >
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
                        剂数：
                    </span>
                    <Input  v-model="east.repetition" type="number"  @on-blur.prevent="inputLoseFocus"/>
                    <span class="unit">
                        剂
                    </span>
                </div>
            </div>
            <!-- <div class="drug-item-info">
                <div class="drug-fun">
                    <span class="lititle">
                        用药天数：
                    </span>
                    <Input v-model="east.abidance" type="text" disabled/>
                    <span class="unit">
                        天
                    </span>
                </div>
            </div> -->
            </div>
            <div>
                <div :style="{opacity: opacity}" @touchstart='touchstart' @touchend='touchend'  @click="toinsertprescribe"   class="primarybtn">提交</div>
            </div>
        </div>
        <Modal 
        v-model="isshowdrugs"
            fullscreen
            title="药品详情">
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
                            <Input   v-model="item.dosAge" type="number"/>
                            <span class="unit">
                                {{item.dosAgeUnits}}
                            </span>
                        </div>
                    </div>
                    <div class="drug-item-info">
                        <div class="drug-fun">
                            <span class="lititle">
                                单价：
                            </span>
                            <Input v-model="item.price" type="text" disabled/>
                            <span class="unit">
                                元
                            </span>
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
                <Input v-model='drugName' @on-change="dealsearchDrug"/>
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
            v-model="modal11"
            fullscreen
            title="选择药品组合">
            <div class="search-box-wrapper">
                <div class="search-box" @click="demo()">
                <Input v-model='drugNamees'  disabled  placeholder="选择药品组合"/>
                </div>
                <div class="search-yplist box" v-if="searchdrugses !==undefined || searchdrugses.length > 0">
                    <div   v-for="(item,index) in searchdrugses" :key="index" >
                        <div class="search-ypnameitem " @click="dealsearchDrugses(item)">
                            <div class="ypname">{{item.title}}</div>
                            <!-- <div class="ypinventory">{{item.inventory}}</div> -->
                        </div>
                    </div>
                </div>
                <div class="search-tip" v-if="searchdrugses ===undefined || searchdrugses.length <= 0">
                    没有搜索到该药品
                </div>
            </div>
        </Modal>
        <Modal
            v-model="isshowtip"
            @on-ok='deletoutsitem'
            title="提示">
            请确认是否删除该药品！
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
                isfetchdrugs:false,
                isinsertprescribe:false,
                opacity:1,
                isshowtip:false,
                deldrugindex:false,
                isshowall:false,
                currentdrugindex:-1,
                isshowdrugs:false,
                isshowloading:false,//显示加载动画
                modal11:false,
                searchdrugs:[],//存储查到药品
                searchdrugses:[],//存储查询到的药品组合
                drugNamees:'',
                defaultchannel:'',
                channel:[],//用药途径
                frequency:[],//用药频次
                modal1:false ,
                drugName:"",//搜索药品的名字
                searchdruglist:[],//存放搜索到的药品
                east:{
                    administretion:'水煎服',
                    frequency:'',
                    freq:"",
                    repetition:'',
                    abidance:""
                },
                form:{
                    visitno:'',//就诊序号
                    clinicno:'',//门诊号
                    name:'',//患者名字
                    cardno:'',//卡号
                    orderby:'',//就诊科室编码
                    depname:'',//就诊科室名字
                    docname:'',//医生名字
                    doccode:'',//医生编码
                    // tradeno:'',//订单号
                    openid:'',//openid
                    starttime:'',//开始时间
                    nizhen:'',//拟诊
                    itemclass:'B',
                    orderclass:'B',
                    sumcharges:'',
                    outs:[]
               },
               procjectid:'',//处方编码
               doctorno:''//医生编码
            }
        },
        mounted(){
                this.initdata()
                this.getcurrentdayrecord()
                this.init()
        },
        methods:{
            initdata(){
                this.isfetchdrugs=false
                this.isinsertprescribe=false
                this.opacity=1
                this.isshowtip=false
                this.deldrugindex=false
                this.isshowall=false
                this.currentdrugindex=-1
                this.isshowdrugs=false
                this.isshowloading=false//显示加载动画
                this.searchdrugs=[]//存储查到药品
                this.searchdrugses=[];//存储查到的药品组合
                this.defaultchannel=''
                this.channel=[]//用药途径
                this.frequency=[]//用药频次
                this.modal1=false 
                this.drugName=""//搜索药品的名字
                this.searchdruglist=[]//存放搜索到的药品

                this.east.administretion='水煎服'
                this.east.frequency=''
                this.east.freq=""
                this.east.repetition=''
                this.east.abidance=""

                this.form.visitno=''//就诊序号
                this.form.clinicno=''//门诊号
                this.form.name=''//患者名字
                this.form.cardno=''//卡号
                this.form.orderby=''//就诊科室编码
                this.form.depname=''//就诊科室名字
                this.form.docname=''//医生名字
                this.form.doccode=''//医生编码
                // this.form.tradeno=''//订单号
                this.form.openid='',//openid
                this.form.starttime=''//开始时间
                this.form.nizhen=''//拟诊
                this.form.itemclass='B'
                this.form.orderclass='B'
                this.form.sumcharges=''
                this.form.outs=[]
            },
            //弹出键盘问题
            inputLoseFocus() {
                setTimeout(() => {
                window.scrollTo(0, 0);
                }, 100);
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
                                _this.form.nizhen=data.data[0].diagdesc
                            }
                            
                        },
                        error: function(data) {
                            // reject(data)
                        }
                    })
            },
            toinsertprescribe(){
                this.isinsertprescribe=true
            },
            touchstart(){
                this.opacity=0.5
            },
            touchend(){
                this.opacity=1
            },
            deletoutsitem(){
                this.form.outs.splice(this.deldrugindex,1)
                let drugs=this.form.outs
                let sum=0
                for(var i=0;i<drugs.length;i++){
                    sum+=parseInt(drugs[i].charges*100)/100
                }
                this.form.sumcharges=sum
            },
            isdeletitem(index){
                this.deldrugindex=index
                this.isshowtip=true
            },
            editdrugdetail(index){
                if(index=='-1'){
                    this.isshowall=true
                }else{
                    this.isshowall=false
                    this.currentdrugindex=index
                }
                this.isshowdrugs=true
            },
            topath(){
                
            },
            //计算单个药品的总价（在选择药品时）
            sumprice(){
                let freq
                if(this.east.frequency=='一日一次'){
                    freq=1
                }else if(this.east.frequency=='一日二次'){
                    freq=2
                }else if(this.east.frequency=='一日三次'){
                    freq=3
                }else if(this.east.frequency=='一日四次'){
                    freq=4
                }else if(this.east.frequency=='一日五次'){
                    freq=5
                }else if(this.east.frequency=='一日六次'){
                    freq=6
                }

                let ffreq
                if(this.east.freq=='一日一次'){
                    ffreq=1
                }else if(this.east.freq=='一日二次'){
                    ffreq=2
                }else if(this.east.freq=='一日三次'){
                    ffreq=3
                }else if(this.east.freq=='一日四次'){
                    ffreq=4
                }else if(this.east.freq=='一日五次'){
                    ffreq=5
                }else if(this.east.freq=='一日六次'){
                    ffreq=6
                }
                for(let i=0;i<this.form.outs.length;i++){
                    this.form.outs[i].charges=this.east.repetition*parseInt(this.form.outs[i].dosAge)*this.form.outs[i].price
                    this.form.outs[i].costs=this.east.repetition*parseInt(this.form.outs[i].dosAge)*this.form.outs[i].price
                    this.form.outs[i].amount=parseInt(this.form.outs[i].dosAge)*this.east.repetition
                    let days
                    days=Math.ceil(this.east.repetition*ffreq/freq)
                    this.east.abidance=days
                    Object.assign(this.form.outs[i],this.east)
                }
                let drugs=this.form.outs


                let sum=0
                for(var i=0;i<drugs.length;i++){
                    sum+=parseInt(drugs[i].charges*100)/100
                }
                this.form.sumcharges=sum
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
            insertprescribe(){
                this.sumprice()
                //保存处方
                let _this=this
                //检验药品信息填写完整
                // let checkresult=_this.checkouts(_this.form.outs)
                // if(!checkresult){
                //     return
                // }

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
                // obj.tradeno=_this.form.tradeno//挂号的订单号
                obj.openid=_this.form.openid//用户openid
                obj.depname=_this.form.depname//科室名称
                obj.starttime=_this.form.starttime//挂号的时间
                obj.nizhen=_this.form.nizhen//拟诊
                let checkresult=this.checkouts(this.form.outs)
                if(!checkresult){
                    return
                }
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
                            _this.isshowloading=false
                            _this.$Message.error('开方失败')
                        }
                    },
                    error: function(data) {
                        _this.isshowloading=false
                        _this.$Message.error('请求失败')
                    }
                });
                
            },
            getfirmid(data){
                let _this=this
                //获取公司标识
                let itemspec=data.drugspec
                let itemcode=data.ypcode
                let url=_this.$store.getters.getUrl+'prescription/specification.do'
                return new Promise((resolve,reject)=>{
                    $.ajax({
                        url: url,
                        type: "post",
                        dataType: "json",
                        async: false,
                        data:{itemcode,itemspec},
                        success: function(data) {
                            resolve(data)
                        },
                        error: function(data) {
                            reject(data)
                        }
                    });
                })
            },
            async adddrug1(item){
                let drugitem={
                        drugCode:'',//药品编码
                        drugName:'',//药品名称（显示）
                        drugSpec:'',//药品规格（显示）
                        firmId:'',//厂家标识
                        units:'',//药品单位
                        dispensary:'',//药局名称
                        dispensarySub:'',//子药局
                        price:'',//药房进价

                        dosAgeUnits:'',//用量单位等价于药品单位（显示）
                        dosAge:null,//一次用量（显示）
                        administretion:'',//用药途径(显示)
                        frequency:'',//用药频次
                        repetition:1,//剂数代表西药

                        amount:'',//数量（显示）
                        abidance:'',//用药天数(用药天数)
                        charges:'',//实收费用应该收取的费用（显示）
                        costs:'',//总费用
                        orderNo:'1',//医嘱组别先写死为1
                        subOrderNo:'1',//子医嘱组别先写死为1
                        freqDetail:'医嘱说明',//医嘱说明
                        freq:''
                }
                drugitem.drugCode=item.ypcode//药品编码
                drugitem.drugName=item.ypname//药品名称（显示）
                drugitem.drugSpec=item.drugspec//药品规格（显示）
                drugitem.units=item.unit//药品单位
                drugitem.dispensary=item.storagecode//药局名称
                drugitem.dispensarySub=item.substorage//子药局

                //处理药品价格为.01这种格式的数据
                if(item.ypprice.toString().indexOf('.')===0){
                    drugitem.price='0'+item.ypprice//药品单价
                }else{
                    drugitem.price=item.ypprice//药品单价
                }

                const firmIdresult=await this.getfirmid(item)
                drugitem.firmId=firmIdresult[0].firm_id
                drugitem.drugSpec=firmIdresult[0].drug_spec+firmIdresult[0].drug_supplier_id//药品规格（显示）

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
                        dispensary:'',//药局名称
                        dispensarySub:'',//子药局
                        price:'',//药房进价
                        //===================================查询药品获取的参数=================================
                        amount:'',//数量（显示）
                        abidance:'',//用药天数(用药天数)
                        dosAge:null,//一次用量（显示）
                        dosAgeUnits:'',//用量单位等价于药品单位（显示）
                        administretion:'',//用药途径(显示)
                        frequency:'',//用药频次
                        charges:0,//实收费用应该收取的费用（显示）
                        //先写死的数据
                        costs:0,//总费用
                        orderNo:'1',//医嘱组别先写死为1
                        subOrderNo:'1',//子医嘱组别先写死为1
                        freqDetail:'医嘱说明',//医嘱说明
                        repetition:1,//剂数代表西药
                        freq:''
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
                    this.isshowdrugs=true
                    this.isshowall=false
                    this.currentdrugindex=arr.length-1
                    this.modal1=false;
                },100)
            },
            showdrugmodal(){
                this.modal1=true
                // setTimeout(()=>{
                    if(!this.isfetchdrugs){
                     this.isshowloading=true
                    }
                // },100)
            },
            async init(){
                //数据清空
                this.getpatientinfo()
                //查询到药品
                const searchresult=await this.searchDrug()
                this.searchdrugs=searchresult;
                //查询到组合药品
                // const searchresultes=await this.searchCombination()
                // this.searchdrugses=searchresultes;
                //获取用药途径
                const channel=await this.fetchchannel()
                this.dealfetchchannel(channel)
                //获取用药频次
                const frequency=await this.fetchfrequency()
                this.dealfetchfrequency(frequency)
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
                return new Promise((resolve,reject)=>{
                    $.ajax({
                        url: url,
                        type: "post",
                        dataType: "json",
                        async: true,
                        data:'',
                        success: function(data) {
                            resolve(data.data)
                        },
                        error: function(data) {
                            reject(data)
                        }
                    });
                })
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
                return new Promise((resolve,reject)=>{
                    $.ajax({
                        url: url,
                        type: "post",
                        dataType: "json",
                        async: true,
                        data:'',
                        success: function(data) {
                            resolve(data.data)
                        },
                        error: function(data) {
                            reject(data)
                        }
                    });
                })
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
            searchDrug(){
                let _this=this
                let url=_this.$store.getters.getUrl+'prescription/chinesemedicine.do'
                return new Promise((resolve,reject)=>{
                    $.ajax({
                    url: url,
                    type: "post",
                    dataType: "json",
                    async: true,
                    data:'',
                    success: function(data) {
                        _this.isshowloading=false
                        _this.isfetchdrugs=true
                        let arr=[]
                        for(var i=0;i<data.length;i++){
                            if(data[i].inventory!=='0'){
                                arr.push(data[i])
                            }
                        }
                        resolve(arr);
                    },
                    error: function(data) {
                        reject(data)
                        }
                    });
                })
            },
            demo(){
                 $(".box").css("display","block");
            },
            dealsearchDrugses(data){
                this.drugNamees=data.title;
                this.procjectid= data.treat_project_id;
                this.doctorno = data.creator;
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
                        dispensary:'',//药局名称
                        dispensarySub:'',//子药局
                        price:'',//药房进价
                        //===================================查询药品获取的参数=================================
                        amount:'',//数量（显示）
                        abidance:'',//用药天数(用药天数)
                        dosAge:null,//一次用量（显示）
                        dosAgeUnits:'',//用量单位等价于药品单位（显示）
                        administretion:'',//用药途径(显示)
                        frequency:'',//用药频次
                        charges:0,//实收费用应该收取的费用（显示）
                        //先写死的数据
                        costs:0,//总费用
                        orderNo:'1',//医嘱组别先写死为1
                        subOrderNo:'1',//子医嘱组别先写死为1
                        freqDetail:'医嘱说明',//医嘱说明
                        repetition:1,//剂数代表西药
                        freq:''
                };
                this.east.administretion=  data.pcusename;
                this.east.frequency = data.pccname;
                var _this = this;
                var procjectid = data.treat_project_id;
                var doctorno =data.creator;
                var url  = _this.$store.getters.getUrl+'prescription/getChineseMedicine.do';
                var list = _this.searchdrugs;
                var frequency= data.pccname;
                $.ajax({
                    url: url,
                    type: "post",
                    dataType: "json",
                    async: true,
                    data:{procjectid:procjectid,doctorno:doctorno},
                    success:function(data){
                        let arr=[]
                    for(var i = 0;i<data.data.length;i++){
                        for(let j=0;j<list.length;j++){
                            if(data.data[i].cdrug_code==list[j].ypcode){
                                let item=list[j]
                                item.dosAge=data.data[i].dosage;
                                item.frequency=frequency;
                                 item.firmId = data.data[i].firm_id;
                                arr.push(item);
                                
                            }
                        }
                    }
                        for (var i = 0; i < arr.length; i++) {
                            for (var j =i+1; j <arr.length; ) {
                                if (arr[i].ypcode == arr[j].ypcode ) { //通过id属性进行匹配；
                                   arr.splice(j, 1); //去除重复的对象；
                                }else {
                                   j++;
                                }
                            }
                       }
                    for(let i=0;i<arr.length;i++){
                        _this.adddruges(arr[i])
                    }
                        
                    },
                    error(data){

                    }
                })
                this.modal11=false;
                 $(".box").css("display","none");
                  $(".add-btns").css("display","none");
            },
             //把药品添加到form的outs里
            adddruges(data){
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
                        dispensary:'',//药局名称
                        dispensarySub:'',//子药局
                        price:'',//药房进价
                        //===================================查询药品获取的参数=================================
                        amount:'',//数量（显示）
                        abidance:'',//用药天数(用药天数)
                        dosAge:null,//一次用量（显示）
                        dosAgeUnits:'',//用量单位等价于药品单位（显示）
                        administretion:'',//用药途径(显示)
                        frequency:'',//用药频次
                        charges:0,//实收费用应该收取的费用（显示）
                        //先写死的数据
                        costs:0,//总费用
                        orderNo:'1',//医嘱组别先写死为1
                        subOrderNo:'1',//子医嘱组别先写死为1
                        freqDetail:'医嘱说明',//医嘱说明
                        repetition:1,//剂数代表西药
                        freq:''
                }
                drugitem.drugCode=data.ypcode//药品编码
                drugitem.drugName=data.ypname//药品名称（显示）
                drugitem.drugSpec=data.drugspec//药品规格（显示）
                // drugitem.firmId='YS000211'//厂家标识(先传假数据)原先的字
                drugitem.units=data.unit//药品单位
                drugitem.dosAge=data.dosAge;
                drugitem.dispensary=data.storagecode//药局名称
                drugitem.dispensarySub=data.substorage//子药局
                drugitem.frequency=data.frequency;
                drugitem.firmId=data.firmId;
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
                this.form.outs.push(drugitem);
                let arr=this.form.outs
                this.form.outs=[]
                // setTimeout(()=>{
                    if(arr.length===1){
                        this.currentindex='0'
                    }else{
                        this.currentindex=arr.length-1+''
                    }
                    this.form.outs=arr
                    // this.isshowdrugs=true
                    this.isshowall=false
                    this.currentdrugindex=arr.length-1
                    this.modal1=false;
                // },100)
            },
            // 查询组合药品
            searchCombination(){
                let _this=this;
                let url=_this.$store.getters.getUrl+'prescription/getMakeUpPrescribe.do'
                let departcode =localStorage.getItem('yspatientinfo').hosdepcode;
                let doctorno = localStorage.getItem('yspatientinfo').hosdoccode;
                    $.ajax({
                    url: url,
                    type: "post",
                    dataType: "json",
                    // async: true,
                    data:{
                        departcode:'100109',
                        doctorno:'000WGC'
                    },
                    success: function(data) {
                        if(data.status==1){
                            _this.modal11=true;
                            _this.searchdrugses=data.data;
                        }
                        
                    },
                    error: function(data) {
                        }
                    });
            },
            //获取患者信息
            getpatientinfo(){
                let patientinfo=localStorage.getItem('yspatientinfo')
                let data=JSON.parse(patientinfo)
                this.form.name=data.name
                this.form.cardno=data.patientid
                this.form.orderby=data.registerdept
                this.form.depname=data.hosdepname
                this.form.docname=data.hosdocname
                this.form.doccode=data.doctor
                // this.form.tradeno=data.tradeno
                this.form.openid=data.openid
                this.form.starttime=data.starttime
                this.form.visitno=data.visitno
                this.form.clinicno=data.clinicno
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
.prescription-page{
    height: 100%;
    display: flex;
    flex-direction: column;
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
    color: rgb(0, 187, 187)
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
    /* font-size: 16px; */
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
/* .drug-item-info{
    display: flex;
    align-items: center;
    margin-bottom: 2px;
    border: 1px solid #dcdee2;
    height: 46px;
    line-height: 46px;
    padding-left: 10px;
    border-radius: 5px;
    padding-right: 5px;
} */
.drug-fun{
    flex: 1;
    padding: 5px;
    padding-right: 10px;
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
.drug-fun >>> .ivu-input{
    -webkit-appearance: none;
    -moz-appearance: none;
    -o-appearance: none;
    appearance: none;
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
.box{
    display: none;
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
.prescription-page >>> .ivu-input{
    border: 1px solid #ffffff;
    background: #ffffff
}
.prescription-page >>> .ivu-select-selection{
    border: 1px solid #ffffff;
    box-shadow: none
}
.prescription-page >>> .select-selection:hover {
    border-color: #ffffff;
    box-shadow: none
}
.prescription-page >>> .ivu-input{
    -webkit-appearance: none;
    -moz-appearance: none;
    -o-appearance: none;
    appearance: none;
}
</style>