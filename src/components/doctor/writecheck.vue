<template>
    <div class="writecheck-page">
        <div class="content">
            <div class="item-wrapper"> 
                <div class="title-tip">
                    临床诊断:
                </div>
                <Input class="input-item" v-model="form.clindiag"  disabled @on-blur.prevent="inputLoseFocus"/>
            </div>
            <div class="item-wrapper" >
                <div class="title-tip">
                    检查类别:
                </div>
                <Select v-model="form.examclass" @on-change="changeexamclass" >
                    <Option v-for="(item,index) in dealchecklist" :value="item.value" :key="index">{{ item.label }}</Option>
                </Select>
            </div>
            <div class="item-wrapper" v-if="isshowsubclass">
                <div class="title-tip">
                    检查子类:
                </div>
                <Select v-model="form.examsubclass" @on-change="changesubexamclass" clearable >
                    <Option v-for="(item,index) in dealsubchecklist" :value="item.value" :key="index">{{ item.label }}</Option>
                </Select>
            </div>
            <div class="item-wrapper" v-if="!isshowsubclass">
                <div class="title-tip">
                    检查子类:
                </div>
                <Select v-model="skyvalue"  clearable >
                    <Option v-for="(item,index) in testlist" :value="item.value" :key="index">{{ item.label }}</Option>
                </Select>
            </div>
            <div class="item-wrapper">
                <div class="title-tip">
                    执行科室:
                </div>
                <Input class="input-item" v-model="depname" disabled @on-blur.prevent="inputLoseFocus"/>
            </div>
            <div class="item-wrapper">
                <div class="title-tip">
                    申请医生:
                </div>
                <Input class="input-item" v-model="form.reqphysician" disabled @on-blur.prevent="inputLoseFocus"/>
            </div>
            <div class="add-btn" @click="showmodel" v-if="form.examsubclass">
                添加项目
            </div>
            <div class="input-wrapper" v-for="(item,index) in projectname" :key='index'>
                {{item.description}}<div @click="deleteitem(item.description,index)">删除</div>
            </div>
        </div>
        <div>
            <div :style="{opacity: opacity}" @touchstart='touchstart' @touchend='touchend'  @click="tosubmit"  long class="primarybtn">提交</div>
        </div>
        <Modal
            v-model="modal1"
            title="提示">
            提交失败
        </Modal>
        <Modal
            v-model="modal3"
            title="提示">
            信息不全禁止提交
        </Modal>
        <Modal
            v-model="issubmit"
            @on-ok='submit'
            title="提示">
            请确认是否提交
        </Modal>
        <Modal
            v-model="projectmodel"
            fullscreen
            title="检查项目">
            <CheckboxGroup size="large" v-model="dealprojectnamelist" @on-change="changeproject">
                <Checkbox v-for="(item,index) in projectnamelist" :key="index" class="Checkbox" size="large" :label="item.description"></Checkbox>
            </CheckboxGroup>
        </Modal>
        <Modal
            v-model="requestmodel"
            title="提示">
            {{infomsg}}
        </Modal>
        <loading v-show="isshow"></loading>
    </div>
</template>

<script>
    import loading from "../../common/loading"
    export default {
        components:{
            loading
        },
        data(){
            return{
                infomsg:"",
                requestmodel:false,
                testlist:[],
                skyvalue:'',
                isshowsubclass:false,
                modal3:false,
                issubmit:false,
                projectmodel:false,
                isshow:false,
                // tradeno:"",
                modal1:false,
                ishownullmodel:'',
                opacity:"",
                opacity:1,
                inputsize:{ minRows: 6, maxRows: 6 },
                visitdate:"",
                depname:'',
                position:'',//科室地址
                form:{
                    cardno:'',//卡号
                    examsubclass:'',//检查子类
                    examclass:'',//检查类别 
                    clindiag:"",//临床诊断
                    performedby:'',//执行科室编码
                    patientsource:'1',//病人来源(?)
                    reqdatetime:'',//申请日期和时间
                    reqdept:'',//申请科室 
                    reqphysician:'',//申请医生
                    doctoruser:'',//申请医生编号
                    descriptioncode:'',//描述代码(?)
                    projectname:'',//项目名称
                    clinicno:'',//门诊号
                    visitno:''//就诊序号
                },
                projectname:[],//选择的项目名称
                checklist:[],//检查类别
                dealchecklist:[],//处理过后的检查类别数据
                subchecklist:[],//检查子类别
                dealsubchecklist:[],//处理过后的检查子类别数据
                projectnamelist:[],//项目列表
                dealprojectnamelist:[]//渲染列表
            }
        },
        methods:{
            showmodel(){
                this.projectmodel=true
            },
             //弹出键盘问题
            inputLoseFocus() {
                setTimeout(() => {
                window.scrollTo(0, 0);
                }, 100);
            },
            touchstart(){
                this.opacity=0.5
            },
            touchend(){
                this.opacity=1
            },
            insertcheck(data){
                let checkdata=JSON.stringify(data)
                let patientinfo=localStorage.getItem('yspatientinfo')
                let datastring=JSON.parse(patientinfo)
                let username=datastring.name
                let items=this.form.examsubclass
                let openid=datastring.openid
                let _this=this
                let url=_this.$store.getters.getUrl+'check/patientcheckup.do'
               return new Promise((resolve,reject)=>{
                   $.ajax({
                    url: url,
                    type: "post",
                    dataType: "json",
                    async: true,
                    data:{checkdata:checkdata,visitdate:_this.visitdate,username,items,openid,position:this.position},
                    success: function(data) {
                        _this.isshow=false
                        if(data.status=='1'){
                            _this.$Message.info('提交成功！')
                            resolve();
                            window.websocketobj.send(JSON.stringify({cardno:_this.form.cardno,massege:'123'}))
                        }else{
                            _this.modal1=true
                            resolve()
                        }
                    },
                    error: function(data) {
                        _this.isshow=false
                        _this.infomsg="请求发送失败"
                        _this.requestmodel=true
                        reject(data)
                    }
                });
               })
            },
            tosubmit(){
                this.issubmit=true
            },
            async submit(){
                this.isshow=true
                if(this.projectname.length==0){
                    this.isshow=false
                    this.modal3=true
                    return
                }
                // delete this.form.depname
                let arr=[]
                let obj=this.form
                for(let i=0;i<this.projectname.length;i++){
                    obj.descriptioncode=this.projectname[i].description_code
                    obj.projectname=this.projectname[i].description
                    arr.push({
                        cardno:obj.cardno,//卡号
                        examsubclass:obj.examsubclass,//检查子类
                        examclass:obj.examclass,//检查类别 
                        clindiag:obj.clindiag,//临床诊断
                        performedby:obj.performedby,//执行科室编码
                        patientsource:'1',//病人来源(?)
                        reqdatetime:obj.reqdatetime,//申请日期和时间
                        reqdept:obj.reqdept,//申请科室 
                        reqphysician:obj.reqphysician,//申请医生
                        doctoruser:obj.doctoruser,//申请医生编号
                        descriptioncode:obj.descriptioncode,//描述代码(?)
                        projectname:obj.projectname,//项目名称
                        clinicno:obj.clinicno,//门诊号
                        visitno:obj.visitno,//就诊序号
                    })
                }
                await this.insertcheck(arr)
                this.init()
            },
            deleteitem(item,index){
                for(let i=0;i<this.projectname.length;i++){
                    if(this.projectname[i].description==item){
                        this.projectname.splice(index,1)
                    }
                }
                this.dealprojectnamelist.splice(index,1)
            },
            changeproject(value){
                this.projectname=[]
                if(value.length==0){
                    return
                }
                for(let i=0;i<this.projectnamelist.length;i++){
                    for(let j=0;j<value.length;j++){
                        if(this.projectnamelist[i].description==value[j]){
                            this.projectname.push(this.projectnamelist[i])
                        }
                    }
                }
            },
            async changesubexamclass(value){
                //获取项目
                let _this=this
                let examclassname=this.form.examclass
                let examsubclassname=this.form.examsubclass
                const projectnamelistresult= await _this.fetchprojectnamelist(_this.form.examclass,_this.form.examsubclass)
               
                if(projectnamelistresult.status=="1"){
                    _this.isshowsubclass=true
                    _this.projectnamelist=projectnamelistresult.data
                }else if(projectnamelistresult.status==5){
                    _this.infomsg="请求发送失败"
                    _this.requestmodel=true
                }else{
                    _this.infomsg="数据获取失败"
                    _this.requestmodel=true
                }
            },
            topath(){
                this.$router.push('/registeredlist')
            },
            fetchprojectnamelist(examclassname,examsubclassname){
                this.dealprojectnamelist=[]
                this.projectname=[]
                let _this=this
                _this.isshow=true
                return new Promise((resolve,reject)=>{
                    let url=_this.$store.getters.getUrl+'check/getcheckthreeclass.do'
                    $.ajax({
                        url: url,
                        type: "post",
                        dataType: "json",
                        async: false,
                        data:{
                            examclassname,
                            examsubclassname
                        },
                        success: function(data) {
                            _this.isshow=false
                            resolve(data)
                        },
                        error: function(data) {
                            _this.isshow=false
                            let _data={status:5}
                            resolve(_data)
                        }
                    });
                })
            },
            //保存子类
            dealsubcheklist(data){
                let _this=this
                this.subchecklist=data
                let arr=[]
                for(let i=0;i<data.length;i++){
                    let item={
                        value:data[i].exam_subclass_name,
                        label:data[i].exam_subclass_name
                    }
                    arr.push(item)
                }
                _this.dealsubchecklist=[]
                return new Promise((resolve,reject)=>{
                    _this.dealsubchecklist=arr
                    _this.form.examsubclass=_this.dealsubchecklist[0].value
                    resolve()
                })
            },
            //获取子类
            fetchSubchecklit(value){
                let _this=this
                _this.isshow=true
                return new Promise((resolve,reject)=>{
                    let url=_this.$store.getters.getUrl+'check/getsubclass.do'
                    $.ajax({
                        url: url,
                        type: "post",
                        dataType: "json",
                        async: true,
                        data:{classname:value},
                        success: function(data) {
                            //存储子类
                            _this.isshow=true
                            resolve(data)
                        },
                        error: function(data) {
                            _this.isshow=true
                            reject(data)
                        }
                    });
                })
            },
            //获取科室名称
            fetchdepname(deptcode){
                let _this=this
                return new Promise((resolve,reject)=>{
                    let url=_this.$store.getters.getUrl+'check/getdeptname.do'
                    $.ajax({
                        url: url,
                        type: "post",
                        dataType: "json",
                        async: false,
                        data:{deptcode},
                        success: function(data) {
                            resolve(data.data[0]) 
                        },
                        error: function(data) {
                            reject(data)
                        }
                    });
                })
            },
            //选择类别
            async changeexamclass(value){
                this.isshowsubclass=false
                if(!value){
                    return
                }
                let _this=this
                for(let i=0;i<this.checklist.length;i++){
                    if(this.checklist[i].exam_class_name==value){
                        this.form.performedby=this.checklist[i].perform_by
                    }
                }
                const fetchdepnameresult=await _this.fetchdepname(_this.form.performedby)

                _this.depname=fetchdepnameresult.dept_name
                _this.position=fetchdepnameresult.position

                const subcheckresult=await _this.fetchSubchecklit(_this.form.examclass)
                if(subcheckresult.status==5){
                    this.infomsg="请求发送失败"
                    this.requestmodel=true
                    return
                }
                if(subcheckresult.status!="1"){
                    this.infomsg="数据请求失败"
                    this.requestmodel=true
                    return
                }
                await _this.dealsubcheklist(subcheckresult.data)
                
                const projectnamelistresult= await _this.fetchprojectnamelist(_this.form.examclass,_this.form.examsubclass)
                if(projectnamelistresult.status=="1"){
                    _this.isshowsubclass=true
                    _this.projectnamelist=projectnamelistresult.data
                }else if(projectnamelistresult.status==5){
                    _this.infomsg="请求发送失败"
                    _this.requestmodel=true
                }else{
                    _this.infomsg="数据获取失败"
                    _this.requestmodel=true
                }
                
            },
            //处理查询检查类别获取的结果
            dealcheckresult(data){
                this.dealchecklist=[]
                let arr=[]
                for(let i=0;i<data.length;i++){
                    let item={
                        value:data[i].exam_class_name,
                        label:data[i].exam_class_name
                    }
                    arr.push(item)
                }
                return arr
            },
            //获取检查类别
            fetchecklist(){
                let _this=this
                return new Promise((resolve,reject)=>{
                    let url=_this.$store.getters.getUrl+'check/getcheckclass.do'
                    $.ajax({
                        url: url,
                        type: "post",
                        dataType: "json",
                        async: true,
                        data:'',
                        success: function(data) {
                            resolve(data)
                        },
                        error: function(data) {
                            let _data={status:5}
                            resolve(_data)
                        }
                    });
                })
                
            },
            fetchclindiag(){
                let _this=this
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

                return new Promise((resolve,reject)=>{
                    let url=_this.$store.getters.getUrl+'check/getOutpMrDiagDesc.do'
                    _this.isshow=true
                    $.ajax({
                        url: url,
                        type: "post",
                        dataType: "json",
                        async: true,
                        data:{
                            cardno:_this.form.cardno,
                            visitdate,
                            doctorno:_this.form.doctoruser
                        },
                        success: function(data) {
                            _this.isshow=false
                            resolve(data)
                        },
                        error: function(data) {
                            _this.isshow=false
                            let _data={status:5}
                            resolve(_data)
                        }
                    });
                })
            },
            async init(){
                this.visitdate=""
                this.depname=''
                this.form.cardno='',//卡号
                this.form.examsubclass='',//检查子类
                this.form.examclass='',//检查类别 
                this.form.clindiag="",//临床诊断
                this.form.performedby='',//执行科室编码
                this.form.patientsource='1',//病人来源(?)
                this.form.reqdatetime='',//申请日期和时间
                this.form.reqdept='',//申请科室 
                this.form.reqphysician='',//申请医生
                this.form.doctoruser='',//申请医生编号
                this.form.descriptioncode='',//描述代码(?)
                this.form.projectname='',//项目名称
                this.form.clinicno='',//门诊号
                this.form.visitno=''//就诊序号
                this.projectname=[]//选择的项目名称
                this.checklist=[]//检查类别
                this.dealchecklist=[]//处理过后的检查类别数据
                this.subchecklist=[]//检查子类别
                this.dealsubchecklist=[]//处理过后的检查子类别数据
                this.projectnamelist=[]//项目列表
                this.dealprojectnamelist=[]//渲染列表

                let patientinfo=localStorage.getItem('yspatientinfo')
                let data=JSON.parse(patientinfo)
                this.form.reqphysician=data.hosdocname//申请医生
                this.form.doctoruser=data.doctor//申请医生编码
                this.form.reqdept=data.registerdept//申请科室
                this.form.cardno=data.patientid//患者卡号
                this.form.clinicno=data.clinicno
                this.form.visitno=data.visitno
                // this.tradeno=data.tradeno
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
                this.visitdate=y+'-'+m+'-'+d;
                this.form.reqdatetime=y+'-'+m+'-'+d;
                let _this=this
                const fetchclindiagresult=await _this.fetchclindiag()
                if(fetchclindiagresult.status!="1"){
                    _this.infomsg="获取数据失败"
                    _this.requestmodel=true
                    return
                }
                _this.form.clindiag=fetchclindiagresult.data[0].diagdesc
                const checkresult=await _this.fetchecklist()
                if(checkresult.status!="1"){
                    _this.infomsg="获取数据失败"
                    _this.requestmodel=true
                    return
                }
                _this.checklist=checkresult.data
                const dealresult=_this.dealcheckresult(checkresult.data)
                _this.dealchecklist=dealresult
                _this.isshow=false
            }
        },
        mounted(){
            let that=this
            this.isshow=true
            setTimeout(function(){
                that.init()
            },10)
            
        }
    }
</script>

<style scoped>
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
.title-tip{
    width: 80px;
    padding: 15px 0;
}
.text-area{
    align-self:flex-start;
    margin: 10px 0;
}
.input-item{
    margin: 10px 0;
}
.project-name{
    display: block;

}
.Checkbox{
    display: block;
    padding: 8px 0;
}
.primarybtn{
    background: rgb(0,187,187);
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    color: rgb(255,255,255);
}
.add-btn{
    margin-bottom: 2px;
    border: 1px solid #dcdee2;
    height: 46px;
    text-align: center;
    background: rgb(0, 187, 187);
    color: white;
    font-size: 20px;
    line-height: 46px;
    padding-left: 10px;
    border-radius: 5px;
}
.input-wrapper{
    margin-bottom: 2px;
    border: 1px solid #dcdee2;
    height: 46px;
    line-height: 46px;
    padding-left: 10px;
    border-radius: 5px;
    display: flex;
}
.input-wrapper>div{
    flex: 1;
    text-align: right;
    padding-right:10px;
    color:rgb(87,197,247)
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
</style>