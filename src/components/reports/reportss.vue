<template>
    <div class="reportpage">
        <div class="content">
            <div class="title">报告单</div>
            <div class="content-box" v-if="currentdoctor.hosdocname">
                <!-- 当前选中的医生 -->
                <div class="doctor-info"  >
                  <div>
                      <Poptip placement="top-start" width="350">
                         <img class="avatar" src="./../../assets/头像.png" alt="" height="50px;margin-top:20px;" @click="doctorxinxi()" >
                        <div class="api" slot="content">
                          <div  v-for="(item,index) in docxiang" :key="index">
                            <img src="./../../assets/头像.png" alt="" width="50px;" @click="doctorxinxi()" style="vertical-align: top;z-index:999">
                            <div style="vertical-align: top;" class="po">
                              <p><span>医生姓名：</span><span>{{item.name}}</span></p>
                              <p><span>医生编码：</span><span>{{item.username}}</span></p>
                              <p><span>医生职称：</span><span>{{item.title}}</span></p>
                              <p><span>医生职位：</span><span>{{item.job}}</span></p>
                              <p><span>医生简介：</span><span>{{jiajie}}</span></p>
                            </div>
                          </div>
                        </div>
                    </Poptip>
                        
                  </div>
                    <div class="textinfo">
                        <p><span>医生姓名：</span><span>{{currentdoctor.hosdocname}}</span></p>
                        <p><span>医生编号：</span><span>{{currentdoctor.hosdoccode}}</span></p>
                        <p><span>就诊地址：</span><span>{{currentdoctor.position}}</span></p>
                    </div>
                    <div class="selecticon" @click="toggledoctorlist">
                        <img class="iconarrow" src="../../assets/更多.png" alt="" width="40px;" >
                    </div>
                </div>
                <!-- 主要内容 -->
                <div class="main-box">
                    <!-- 患者信息 -->
                    <div class="patient-info" v-show="!isshowdoctorlist">
                        <div class="tabbar-box">
                          <div @click="selecttabtag(0)" :class="{'active':curenttabindex==0}">已缴费订单</div>
                          <div @click="selecttabtag(1)" :class="{'active':curenttabindex==1}">未缴费订单</div>
                        </div>
                        <!-- 推送消息列表 -->
                        <div class="result" v-show="curenttabindex==0&&!isshowdetaile">
                          <div class="result-info-box">
                            <!-- 病历消息推送 -->
                            <div>
                              <div>
                                <div class="title-text">{{recordlist.length>0?"项目名称:":""}}</div>
                                <div class="content-text">{{recordlist.length>0?"诊断":""}}</div>
                              </div>
                              <div>
                                <div class="title-text">{{recordlist.length>0?"诊断信息:":""}}</div>
                                <div class="content-text overflow-text" style="">{{recordlist.length>0?recordlist[recordlist.length-1].diagdesc:""}}</div>                               
                              </div>
                            </div>
                            <!-- 检查推送消息 -->
                            <div>
                              <div>
                                <div class="title-text">{{paychecklist.length>0?"项目名称:":""}}</div>
                                <div class="content-text">{{paychecklist.length>0?paychecklist[paychecklist.length-1].itemname:""}}</div>
                              </div>
                              <div>
                                <div class="title-text">{{paychecklist.length>0?"科室位置:":""}}</div>
                                <div class="content-text overflow-text" style="">{{paychecklist.length>0?paychecklist[paychecklist.length-1].position:""}}</div>                               
                              </div>
                            </div>
                            <!-- 化验推送消息 -->
                            <div>
                              <div>
                                <div class="title-text">{{paytestlist.length>0?"项目名称:":""}}</div>
                                <div class="content-text">{{paytestlist.length>0?paytestlist[paytestlist.length-1].itemname:""}}</div>
                              </div>
                              <div>
                                <div class="title-text">{{paytestlist.length>0?"科室位置:":""}}</div>
                                <div class="content-text overflow-text" style="">{{paytestlist.length>0?paytestlist[paytestlist.length-1].position:""}}</div>                               
                              </div>
                            </div>
                            <!-- 处方推送消息 -->
                            <div>
                              <div>
                                <div class="title-text">{{paydrugslist.length>0?"项目名称:":""}}</div>
                                <div class="content-text">{{paydrugslist.length>0?paydrugslist[paydrugslist.length-1].drugname:""}}</div>
                              </div>
                              <div>
                                <div class="title-text">{{paydrugslist.length>0?"科室位置:":""}}</div>
                                <div class="content-text overflow-text" style="">{{paydrugslist.length>0?paydrugslist[paydrugslist.length-1].position:""}}</div>                               
                              </div>
                            </div>
                            <!-- 治疗消息推送 -->
                            <div>
                              <div>
                                <div class="title-text">{{paycurelist.length>0?"项目名称:":""}}</div>
                                <div class="content-text">{{paycurelist.length>0?paydrugslist[paydrugslist.length-1].drugname:""}}</div>
                              </div>
                              <div>
                                <div class="title-text">{{paycurelist.length>0?"科室位置:":""}}</div>
                                <div class="content-text overflow-text" style="">{{paycurelist.length>0?paycurelist[paycurelist.length-1].position:""}}</div>                               
                              </div>
                            </div>
                            <!-- 住院消息推送 -->
                            <div>
                              <div>
                                <div class="title-text">{{hospitalizedlist.length>0?"项目名称:":""}}</div>
                                <div class="content-text">{{hospitalizedlist.length>0?hospitalizedlist[hospitalizedlist.length-1].drugname:""}}</div>
                              </div>
                              <div>
                                <div class="title-text">{{hospitalizedlist.length>0?"科室位置:":""}}</div>
                                <div class="content-text overflow-text" style="">{{hospitalizedlist.length>0?hospitalizedlist[hospitalizedlist.length-1].position:""}}</div>                               
                              </div>
                            </div>
                          </div>
                          <div class="item-list">
                            <div @click="showdetail(item,index)" v-for="(item,index) in itemlist" :key="index"><p>{{item}}</p></div>
                          </div>
                        </div>
                        <!-- 未缴费信息 -->
                        <div class="checklist" v-show="curenttabindex==1" v-if="unpayobj.inspect.length!=0||unpayobj.cure.length!=0||unpayobj.assay.length!=0||unpayobj.drug.length!=0||unpayobj.sundry.length!=0">
                          <Collapse v-model="Collapsevalue">
                            <Panel name="1" v-if="unpayobj.inspect">
                              <span style="font-weight:900;">检查处方({{querylength("inspect")}})</span>
                              <div slot="content">
                                  <div  class="text" v-for="(item,index) in unpayobj.inspect" :key="index" v-show="item.Doctor==currentdoctor.hosdocname">
                                      <p>
                                        <span class="text-title">流水单号</span>
                                        <span class="text-info">{{item.RecipeID}}</span>
                                      </p>
                                      <p>
                                        <span class="text-title">就诊日期</span>
                                        <span class="text-info">{{item.RecipeDate}}</span>
                                      </p>
                                      <p>
                                        <span class="text-title">就诊科室</span>
                                        <span class="text-info">{{item.Dept}}</span>
                                      </p>
                                      <p>
                                        <span class="text-title">就诊医生</span>
                                        <span class="text-info">{{item.Doctor}}</span>
                                      </p>
                                      <p>
                                        <span class="text-title">处方描述</span>
                                        <span class="text-info">{{item.RecipeMsg}}</span>
                                      </p>
                                      <p>
                                        <span class="text-title">总费用</span>
                                        <span style="color:red;font-size:18px" v-if="item.TotalFee!='0.01'">￥{{item.TotalFee}}</span>
                                        <span style="color:red;font-size:18px" v-if="item.TotalFee=='0.01'">免费</span>
                                      </p>
                                  </div>
                              </div>
                            </Panel>
                            <Panel name="2" v-if="unpayobj.cure">
                              <span style="font-weight:900;">治疗处方({{querylength("cure")}})</span>
                              <div slot="content">
                                  <div  class="text" v-for="(item,index) in unpayobj.cure" :key="index" v-show="item.Doctor==currentdoctor.hosdocname">
                                      <p>
                                        <span class="text-title">流水单号</span>
                                        <span class="text-info">{{item.RecipeID}}</span>
                                      </p>
                                      <p>
                                        <span class="text-title">就诊日期</span>
                                        <span class="text-info">{{item.RecipeDate}}</span>
                                      </p>
                                      <p>
                                        <span class="text-title">就诊科室</span>
                                        <span class="text-info">{{item.Dept}}</span>
                                      </p>
                                      <p>
                                        <span class="text-title">就诊医生</span>
                                        <span class="text-info">{{item.Doctor}}</span>
                                      </p>
                                      <p>
                                        <span class="text-title">处方描述</span>
                                        <span class="text-info">{{item.RecipeMsg}}</span>
                                      </p>
                                      <p>
                                        <span class="text-title">总费用</span>
                                        <span style="color:red;font-size:18px" v-if="item.TotalFee!='0.01'">￥{{item.TotalFee}}</span>
                                        <span style="color:red;font-size:18px" v-if="item.TotalFee=='0.01'">免费</span>
                                      </p>
                                  </div>
                              </div>
                            </Panel>
                            <Panel name="3" v-if="unpayobj.assay">
                              <span style="font-weight:900;">化验处方({{querylength("assay")}})</span>
                              <div slot="content">
                                  <div  class="text" v-for="(item,index) in unpayobj.assay" :key="index" v-show="item.Doctor==currentdoctor.hosdocname">
                                      <p>
                                        <span class="text-title">流水单号</span>
                                        <span class="text-info">{{item.RecipeID}}</span>
                                      </p>
                                      <p>
                                        <span class="text-title">就诊日期</span>
                                        <span class="text-info">{{item.RecipeDate}}</span>
                                      </p>
                                      <p>
                                        <span class="text-title">就诊科室</span>
                                        <span class="text-info">{{item.Dept}}</span>
                                      </p>
                                      <p>
                                        <span class="text-title">就诊医生</span>
                                        <span class="text-info">{{item.Doctor}}</span>
                                      </p>
                                      <p>
                                        <span class="text-title">处方描述</span>
                                        <span class="text-info">{{item.RecipeMsg}}</span>
                                      </p>
                                      <p>
                                        <span class="text-title">总费用</span>
                                        <span style="color:red;font-size:18px" v-if="item.TotalFee!='0.01'">￥{{item.TotalFee}}</span>
                                        <span style="color:red;font-size:18px" v-if="item.TotalFee=='0.01'">免费</span>
                                      </p>
                                  </div>
                              </div>
                            </Panel>
                            <Panel name="4" v-if="unpayobj.drug">
                              <span style="font-weight:900;">药品处方({{querylength("drug")}})</span>
                              <div slot="content">
                                  <div  class="text" v-for="(item,index) in unpayobj.drug" :key="index" v-show="item.Doctor==currentdoctor.hosdocname">
                                      <p>
                                        <span class="text-title">流水单号</span>
                                        <span class="text-info">{{item.RecipeID}}</span>
                                      </p>
                                      <p>
                                        <span class="text-title">就诊日期</span>
                                        <span class="text-info">{{item.RecipeDate}}</span>
                                      </p>
                                      <p>
                                        <span class="text-title">就诊科室</span>
                                        <span class="text-info">{{item.Dept}}</span>
                                      </p>
                                      <p>
                                        <span class="text-title">就诊医生</span>
                                        <span class="text-info">{{item.Doctor}}</span>
                                      </p>
                                      <p>
                                        <span class="text-title">处方描述</span>
                                        <span class="text-info">{{item.RecipeMsg}}</span>
                                      </p>
                                      <p>
                                        <span class="text-title">总费用</span>
                                        <span style="color:red;font-size:18px" v-if="item.TotalFee!='0.01'">￥{{item.TotalFee}}</span>
                                        <span style="color:red;font-size:18px" v-if="item.TotalFee=='0.01'">免费</span>
                                      </p>
                                  </div>
                              </div>
                            </Panel>
                            <Panel name="5" v-if="unpayobj.sundry">
                              <span style="font-weight:900;">杂费处方({{querylength("sundry")}})</span>
                              <div slot="content">
                                  <div  class="text" v-for="(item,index) in unpayobj.sundry" :key="index" v-show="item.Doctor==currentdoctor.hosdocname">
                                      <p>
                                        <span class="text-title">流水单号</span>
                                        <span class="text-info">{{item.RecipeID}}</span>
                                      </p>
                                      <p>
                                        <span class="text-title">就诊日期</span>
                                        <span class="text-info">{{item.RecipeDate}}</span>
                                      </p>
                                      <p>
                                        <span class="text-title">就诊科室</span>
                                        <span class="text-info">{{item.Dept}}</span>
                                      </p>
                                      <p>
                                        <span class="text-title">就诊医生</span>
                                        <span class="text-info">{{item.Doctor}}</span>
                                      </p>
                                      <p>
                                        <span class="text-title">处方描述</span>
                                        <span class="text-info">{{item.RecipeMsg}}</span>
                                      </p>
                                      <p>
                                        <span class="text-title">总费用</span>
                                        <span style="color:red;font-size:18px" v-if="item.TotalFee!='0.01'">￥{{item.TotalFee}}</span>
                                        <span style="color:red;font-size:18px" v-if="item.TotalFee=='0.01'">免费</span>
                                      </p>
                                  </div>
                              </div>
                            </Panel>
                          </Collapse>
                          <div class="submit-box">
                            <div class="payfee">合计 ￥{{payFee}}</div>
                            <button class="submitbtn" @click="submit">结算</button>
                          </div>
                        </div>
                        <!-- 已缴费详情 -->
                        <div class="checkdetail" v-show="curenttabindex==0&&isshowdetaile">
                          <div class="checkdetail-info-box" >
                            <div class="records" v-show="activeindex==0">
                              <div class="record-item" v-for="(item,index) in recordlist" :key="index">
                                  <p v-if="item.visitdate!==undefined">
                                      <span class="item-title">就诊时间：</span>
                                      <span class="item-content">{{/\d{4}-\d{1,2}-\d{1,2}/g.exec(datatrans(item.visitdate))[0]}}</span>
                                  </p>
                                  <p v-if="item.visitno!==undefined">
                                      <span class="item-title">就诊序号：</span>
                                      <span class="item-content">{{item.visitno}}</span>
                                  </p>
                                  <p v-if="item.cardno!==undefined">
                                      <span class="item-title">患者卡号：</span>
                                      <span class="item-content">{{item.cardno}}</span>
                                  </p>
                                  <p v-if="item.doctor!==undefined">
                                      <span class="item-title">医生姓名：</span>
                                      <span class="item-content">{{item.doctor}}</span>
                                  </p>
                                  <p v-if="item.doctorno!==undefined">
                                      <span class="item-title">医生编码：</span>
                                      <span class="item-content">{{item.doctorno}}</span>
                                  </p>
                                  <p v-if="item.diagdesc!==undefined">
                                      <span class="item-title">诊断结果：</span>
                                      <span class="item-content">{{item.diagdesc}}</span>
                                  </p>
                                  <p v-if="item.illnessdesc!==undefined">
                                      <span class="item-title">医生主诉：</span>
                                      <span class="item-content">{{item.illnessdesc}}</span>
                                  </p>
                                  <p v-if="item.advice!==undefined">
                                      <span class="item-title">医生建议：</span>
                                      <span class="item-content">{{item.advice}}</span>
                                  </p>
                                  <p v-if="item.memo!==undefined">
                                      <span class="item-title">医生备注：</span>
                                      <span class="item-content">{{item.memo}}</span>
                                  </p>
                                  <p v-if="item.maternity!==undefined"> 
                                      <span class="item-title">婚孕历史：</span>
                                      <span class="item-content">{{item.maternity}}</span>
                                  </p>
                                  <p v-if="item.menses!==undefined"> 
                                    <span class="item-title">月经历史：</span>
                                    <span class="item-content">{{item.menses}}</span>
                                  </p>
                                  <p v-if="item.anamnesis!==undefined"> 
                                    <span class="item-title">既往病史：</span>
                                    <span class="item-content">{{item.anamnesis}}</span>
                                  </p>
                                  <p v-if="item.individual!==undefined||item.individual!=='null'"> 
                                    <span class="item-title">个人病史：</span>
                                    <span class="item-content">{{item.individual}}</span>
                                  </p>
                                  <p v-if="item.familyill!==undefined||item.familyill!=='null'"> 
                                    <span class="item-title">家族病史：</span>
                                    <span class="item-content">{{item.familyill}}</span>
                                  </p>
                                  <p v-if="item.medhistory!==undefined||item.medhistory!=='null'"> 
                                    <span class="item-title">现在病史：</span>
                                    <span class="item-content">{{item.medhistory}}</span>
                                  </p>
                                  <p v-if="item.marrital!==undefined">
                                    <span class="item-title">婚姻历史：</span>
                                    <span class="item-content">{{item.marrital}}</span>
                                  </p>
                              </div>
                            </div>
                            <div class="check-detail" v-show="activeindex==1">
                              <div class="data-null" v-show="daelpaychecklist.length==0">暂无数据</div>
                              <div v-for="(items,index) in daelpaychecklist" :key="index">
                                    <p>
                                      <span class="item-title">处方类型：</span>
                                      <span class="item-content">检查处方</span>
                                    </p>
                                    <p>
                                      <span class="item-title">就诊序号：</span>
                                      <span class="item-content">{{items.list[0].visitno}}</span>
                                    </p>  
                                    <p>
                                      <span class="item-title">就诊时间：</span>
                                      <span class="item-content">{{formatDate(new Date(items.list[0].visitdate))}}</span>
                                    </p>
                                    <p>
                                      <span class="item-title">检查地址：</span>
                                      <span class="item-content">{{items.list[0].position}}</span>
                                    </p> 
                                    <p>
                                      <span class="item-title">项目详情：</span>
                                      <span class="item-content" style="color:blue" @click="showdetaillist('check',items.list)">查看></span>
                                    </p>
                                    <p>
                                      <span class="item-title">合计金额：</span>
                                      <span class="item-content" style="color:red;font-size:18px;">￥{{sumprice(items.list)}}</span>
                                    </p>
                              </div>
                            </div>
                            <div class="check-detail" v-show="activeindex==2">
                              <div class="data-null" v-if="daelpaytestlist.length==0">暂无数据</div>
                              <div v-for="(items,index) in daelpaytestlist" :key="index">
                                    <p>
                                      <span class="item-title">处方类型：</span>
                                      <span class="item-content">化验处方</span>
                                    </p>
                                    <p>
                                      <span class="item-title">就诊序号：</span>
                                      <span class="item-content">{{items.list[0].visitno}}</span>
                                    </p>  
                                    <p>
                                      <span class="item-title">就诊时间：</span>
                                      <span class="item-content">{{formatDate(new Date(items.list[0].visitdate))}}</span>
                                    </p>
                                    <p>
                                      <span class="item-title">化验地址：</span>
                                      <span class="item-content">{{items.list[0].position}}</span>
                                    </p> 
                                    <p>
                                      <span class="item-title">项目详情：</span>
                                      <span class="item-content" style="color:blue" @click="showdetaillist('test',items.list)">查看></span>
                                    </p>
                                    <p>
                                      <span class="item-title">合计金额：</span>
                                      <span class="item-content" style="color:red;font-size:18px;">￥{{sumprice(items.list)}}</span>
                                    </p>
                              </div>
                            </div>
                            <div class="check-detail" v-show="activeindex==3">
                              <div class="data-null" v-show="daelpaydruglist.length==0">暂无数据</div>
                              <div v-for="(items,index) in daelpaydruglist" :key="index">
                                    <p>
                                      <span class="item-title">处方类型：</span>
                                      <span class="item-content">药品处方</span>
                                    </p>
                                    <p>
                                      <span class="item-title">就诊序号：</span>
                                      <span class="item-content">{{items.list[0].visitno}}</span>
                                    </p>  
                                    <p>
                                      <span class="item-title">就诊时间：</span>
                                      <span class="item-content">{{formatDate(new Date(items.list[0].visitdate))}}</span>
                                    </p>
                                    <p>
                                      <span class="item-title">取药地址：</span>
                                      <span class="item-content">一楼大厅药房</span>
                                    </p> 
                                    <p>
                                      <span class="item-title">项目详情：</span>
                                      <span class="item-content" style="color:blue" @click="showdetaillist('drug',items.list)">查看></span>
                                    </p>
                                    <p>
                                      <span class="item-title">合计金额：</span>
                                      <span class="item-content" style="color:red;font-size:18px;">￥{{sumprice(items.list)}}</span>
                                    </p>
                              </div>
                            </div>
                            <div class="check-detail" v-show="activeindex==4">
                              <div class="data-null">暂无数据</div>
                            </div>
                            <div class="check-detail" v-show="activeindex==5">
                              <div class="data-null" v-show="hospitalizedlist.length==0">暂无数据</div>
                               <div v-for="(items,index) in hospitalizedlist" :key="index">
                                  <p>
                                      <span>患者姓名：</span>
                                      <span>{{items.name}}</span>
                                  </p>
                                  <p>
                                      <span>患者卡号：</span>
                                      <span>{{items.patient_id}}</span>
                                  </p>
                                  <p>
                                    <span>门诊诊断：</span>
                                    <span style="vertical-align: top; text-overflow:ellipsis;overflow: hidden;white-space: nowrap;" >{{items.diagnosis_desc}}</span>
                                  </p>
                                  <p>
                                    <span>入院科室：</span>
                                    <span>{{items.dept_name}}</span>
                                  </p>
                                  <p>
                                    <span>通知次数：</span>
                                    <span>{{items.notice_id}}</span>
                                  </p>
                                  <p>
                                    <span>详细数据：</span>
                                    <span style="color:blue" @click="mod4click(index)">查看></span>
                                  </p>
                                   <Modal v-model="mod4" fullscreen title="入院信息">
                                      <div class="motel">
                                          <div>
                                              <p>
                                                  <span>患者姓名：</span>
                                                  <span >{{itemes.name}}</span>
                                              </p>
                                          </div>
                                            <div>
                                            <p>
                                                  <span style="text-indent:2rem;">民族：</span>
                                                  <span >{{itemes.nation}}</span>
                                            </p>
                                          </div>
                                          <div>
                                            <p>
                                                  <span>患者性别：</span>
                                                  <span >{{itemes.sex}}</span>
                                            </p>
                                          </div>
                                          <div>
                                                <p>
                                                  <span>出生日期：</span>
                                                  <span>{{datatranst(itemes.date_of_birth)}}</span>
                                              </p>
                                            </div>
                                              <div>
                                                <p>
                                                  <span style="text-indent:1rem;">现住址：</span>
                                                  <span style="vertical-align: top; text-overflow:ellipsis;overflow: hidden;white-space: nowrap;" @click="modddel101()">{{itemes.insurance_aera}}</span>
                                              </p>
                                            </div>
                                          <div>
                                              <p>
                                                  <span>患者卡号：</span>
                                                  <span>{{itemes.patient_id}}</span>
                                              </p>
                                          </div>
                                          <div>
                                              <p>
                                                  <span>电话号码：</span>
                                                  <span>{{itemes.insurance_aera_phone}}</span>
                                              </p>
                                          </div>
                                          <div>
                                              <p >
                                                  <span>身份证号：</span>
                                                  <span >{{itemes.id_no}}</span>
                                              </p>
                                          </div>
                                            <div>
                                                <p >
                                                  <span>婚姻状况：</span>
                                                  <span>{{itemes.marital_status}}</span>
                                              </p>
                                            </div>
                                            <div>
                                                <p>
                                                  <span>医生姓名：</span>
                                                  <span>{{itemes.operator}}</span>
                                                </p>
                                            </div>
                                            <div>
                                                <p >
                                                  <span>门诊诊断：</span>
                                                  <span style="vertical-align: top; text-overflow:ellipsis;overflow: hidden;white-space: nowrap;" @click="modddel1011()">{{itemes.diagnosis_desc}}</span>
                                                </p>
                                            </div>
                                            <div>
                                                <p>
                                                  <span>发病日期：</span>
                                                  <span>{{datatranst(itemes.onset_date)}}</span>
                                                </p>
                                            </div>
                                            <div>
                                                <p>
                                                  <span>入院科室：</span>
                                                  <span>{{itemes.dept_name}}</span>
                                                </p>
                                            </div>
                                            <div>
                                                <p>
                                                  <span>入院日期：</span>
                                                  <span>{{datatranst(itemes.admission_date_time)}}</span>
                                                </p>
                                            </div>
                                              <div>
                                                <p>
                                                  <span>通知次数：</span>
                                                  <span>{{itemes.notice_id}}</span>
                                                </p>
                                            </div>
                                            <div>
                                                <p>
                                                  <span style="text-indent:1rem;">联系人：</span>
                                                  <span>{{items.next_of_kin}}</span>
                                                </p>
                                            </div>
                                            <div>
                                                <p>
                                                  <span>联系人民族：</span>
                                                  <span style="padding-right:14px">{{itemes.next_of_nation}}</span>
                                                </p>
                                            </div>
                                            <div class="a">
                                                <p>
                                                  <span>联系人地址：</span>
                                                  <span style="padding-right:14px;svertical-align: top; text-overflow:ellipsis;overflow: hidden;white-space: nowrap;vertical-align: middle;" @click="modddel10()">{{itemes.next_of_kin_addr}}</span>
                                                </p>
                                            </div>
                                      </div>  
                                  </Modal>
                              </div>
                            </div>
                          </div>
                          <div class="item-list">
                            <div :class="{'activebtn':index==activeindex}" @click="showdetail(item,index)" v-for="(item,index) in itemlist" :key="index"><p>{{item}}</p></div>
                          </div>
                        </div>
                    </div>
                    <!-- 可选医生列表 -->
                    <div class="doctor-list" v-show="isshowdoctorlist">
                      <div v-for="(item,index) in doctorlist" :key="index" @click="selectdoctor(item,index)">
                        <div>
                          <img class="avatar" src="../../assets/头像.png" alt="">
                        </div>
                        <div class="textinfo">
                          <p><span>医生姓名：</span><span>{{item.hosdocname}}</span></p>
                          <p><span>医生编号：</span><span>{{item.hosdoccode}}</span></p>
                          <p><span>就诊地址：</span><span>{{item.position}}</span></p>
                        </div>
                        <div class="icon-box">
                          <div class="icon-w">
                            <div class=" un-icon-n" :class="{'icon-n':currenticonindex==index}">

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
            <div class=" tip" v-if="!currentdoctor.hosdocname">
              今日暂无数据
            </div>
        </div>
        <Modal
            v-model="drugmodel"
            fullscreen 
            title="处方明细"
            >
            <div  class="reports" v-for="(item,index) in paymodellist" :key="index" style="font-size:16px;border-bottom:1px solid #ccc;padding:10px;font-weight: 650;">
              <div  style="text-align: center;font-size:18px;padding:10px 0" >{{item.drugname}}</div>
              <p><span>编码：</span><span>{{item.drugcode}}</span></p>
              <p><span>数量：</span><span>{{item.amount}}</span></p>
              <p><span>规格：</span><span>{{item.drugspec}}</span></p>
              <p><span>单位：</span><span>{{item.units}}</span></p>
              <p><span>用法：</span><span>{{item.administration}}</span></p>
              <p><span>频次：</span><span>{{item.frequency}}</span></p>
              <p><span>总价：</span><span style="color:red;font-size:18px;">￥{{item.costs.toFixed(2)}}</span></p>
            </div>
        </Modal>
        <Modal
            v-model="checkmodel"
            fullscreen 
            title="检查明细"
            >
            <div class="reports" v-for="(item,index) in paymodellist" :key="index" style="font-size:16px;border-bottom:1px solid #ccc;padding:10px;font-weight: 650;">
              <div  style="text-align: center;font-size:18px;padding:10px 0" >{{item.itemname}}</div>
              <p><span>编码：</span><span>{{item.itemcode}}</span></p>
              <p><span>数量：</span><span>{{item.amount}}</span></p>
              <p><span>单价：</span><span style="color:red;font-size:18px;">￥{{item.charges.toFixed(2)}}</span></p>
              <p><span>规格：</span><span>{{item.itemspec}}</span></p>
              <p><span>单位：</span><span>{{item.units}}</span></p>
            </div>
        </Modal>
        <Modal
            v-model="testmodel"
            fullscreen 
            title="化验明细"
            >
            <div class="reports" v-for="(item,index) in paymodellist" :key="index" style="font-size:16px;border-bottom:1px solid #ccc;padding:10px;font-weight: 650;">
              <div  style="text-align: center;font-size:18px;padding:10px 0" >{{item.itemname}}</div>
              <p><span>编码：</span><span>{{item.itemcode}}</span></p>
              <p><span>数量：</span><span>{{item.amount}}</span></p>
              <p><span>单价：</span><span style="color:red;font-size:18px;">￥{{item.charges.toFixed(2)}}</span></p>
              <p><span>规格：</span><span>{{item.itemspec}}</span></p>
              <p><span>单位：</span><span>{{item.units}}</span></p>
            </div>
        </Modal>
        <Modal
            v-model="erromodal"
            title="提示">
            <p>查询挂号医生失败，系统异常!</p>
        </Modal>
        <Modal
            v-model="paymodal"
            title="提示"
            @on-ok="selecttabtag(1)"
            >
            <p>有未缴费订单</p>
        </Modal>
        <Modal
            v-model="nonepaymodel"
            title="提示"
            >
            <p>没有需要缴费的订单！</p>
        </Modal>
        <tabbar  class="tabbar" @freshinit="freshinit"></tabbar>
        <loading v-show="isshowloading" class="loading"></loading>
    </div>
</template>

<script>
import tabbar from "../../common/tabbar";
import loading from "../../common/loading";
import {hidemenu} from "../../common/js/hide"
    export default {
        components: {
                tabbar,
                loading
            },
        data(){
            return{
                nonepaymodel:false,
                setlocaldayarr:[],
                hasfetchVisitRecList:false,
                Collapsevalue:'0',
                paymodellist:[],
                drugmodel:false,
                testmodel:false,
                checkmodel:false,
                activeindex:-1,
                paymodal:false,
                erromodal:false,
                isshowloading:false,
                currentdoctor:{},
                isshowdoctorlist:false,
                currenticonindex:0,
                curenttabindex:0,
                isshowdetaile:false,
                itemlist:['病历','检查','化验','处方','治疗','住院'],
                doctorlist:[],
                paytestlist:[],//已缴费化验订单
                paychecklist:[],//已缴费检查订单
                paydrugslist:[],//已缴费药品订单
                paycurelist:[],//已缴费治疗
                hospitalizedlist:[],//已缴费住院
                daelpaytestlist:[],//处理后的已缴费化验
                daelpaychecklist:[],//处理后的已缴费检查
                daelpaydruglist:[],//处理后的已缴费药品
                recordlist:[],//当天病历
                reportsList:[],//所有未缴费订单
                payFee:0,
                unpayobj:{inspect:[],
                cure:[],
                assay:[],
                drug:[],
                sundry:[]},
                docxiang:[],
                mod4:false,
                itemes:{},
                jiajie:''
            }
        },
    
        methods:{
            async freshinit(num){
              if(num!=0){
                const itemnum=await this.fetchItemsSum(this.currentdoctor)
                //如果itemnum大于0说明有未缴费订单出弹窗
                if(itemnum>0){
                  this.paymodal=true
                  this.hasfetchVisitRecList=false;
                }  
              }
            },
            mod4click(index){
              this.mod4=true;
              this.itemes=this.hospitalizedlist[index];
            },
            datatranst(data) {
              let date = new Date(data);
              var Y = date.getFullYear();
              var m = date.getMonth() + 1;
              var d = date.getDate();
              var H = date.getHours();
              var i = date.getMinutes();
              if (m < 10) {
                m = "0" + m;
              }
              if (d < 10) {
                d = "0" + d;
              }
              if (H < 10) {
                H = "0" + H;
              }
              if (i < 10) {
                i = "0" + i;
              }
              var t = Y + "-" + m + "-" + d ;
              if (t !== "NaN-NaN-NaN- NaN:NaN") {
                return t;
              } else {
                return "";
              }
            },
            submit(){
              var that =this;
              that.isshowloading=true;
              //将费用存到vuex里
                that.$store.commit("setRegprice", that.payFee);
                //把卡号存到vuex
                that.$store.commit("setCardCode",localStorage.getItem("cardno"));
              var url = that.$store.getters.getUrl+ 'prescription/PrescriptionNum.do';
              var obj={};
              //患者卡号
              obj.cardNo=localStorage.getItem("cardno");
              //支付费用
              obj.chargeFee=that.payFee;
              //患者姓名
              obj.name = localStorage.getItem('cardername');;
              //所选中的处方
              obj.prescriptions=JSON.stringify(that.setlocaldayarr);
              obj.fee = that.payFee;
              
              //支付描述
              obj.body='微信处方';
              var object =JSON.stringify(obj)
              localStorage.setItem("obj",object); 
              var arr={};
                arr.cardno =localStorage.getItem("cardno");
                arr.openid = localStorage.getItem("openid");
                arr.fee = that.payFee;
              if(that.setlocaldayarr.length!=0){
                  $.ajax({
                  url: url,
                  type: "post",
                  dataType: "json",
                  // async: false,
                  data: arr ,
                  success:function(data){
                    that.isshowloading = false;
                    if(data.status==1){
                      //localStorage.setItem("tradeno", data.data); //保存订单号
                      localStorage.setItem("tradeno",data.data); //保存订单号
                      localStorage.setItem("body", '微信处方'); //保存订单号
                      that.$router.push("/payment"); 
                    }
                  },
                  error:function(data){
                    that.isshowloading = false;
                  }
                })
              }else if(this.setlocaldayarr.length==0){
                this.isshowloading=false
                that.nonepaymodel=true;
              }
            },
            querylength(type){
              let arr=[]
              if(this.unpayobj[type].length>0){
                for(let i=0;i<this.unpayobj[type].length;i++){
                  if(this.unpayobj[type][i].Doctor==this.currentdoctor.hosdocname){
                    arr.push(this.unpayobj[type][i])
                  }
                }
              }
              return arr.length
            },
            showdetaillist(type,data){
              this.paymodellist=data
              if(type=="check"){
                this.checkmodel=true
              }
              if(type=="test"){
                this.testmodel=true
              }
              if(type=="drug"){
                this.drugmodel=true
              }
            },
            //计算已缴费总价
            sumprice(items){
              let sum=0
              for(let i=0;i<items.length;i++){
                sum+=items[i].costs
              }
              return sum.toFixed(2)
            },
            //转换时间
            formatDate(now) { 
                  var year=now.getFullYear();//取得4位数的年份
                  var month=now.getMonth()+1;  //取得日期中的月份，其中0表示1月，11表示12月
                  var date=now.getDate();      //返回日期月份中的天数（1到31）
                  var hour=now.getHours();     //返回日期中的小时数（0到23）
                  var minute=now.getMinutes(); //返回日期中的分钟数（0到59）
                  var second=now.getSeconds(); //返回日期中的秒数（0到59）
                  return year+"-"+month+"-"+date; 
            },
            datatrans(data) {
              let date = new Date(data);
              var Y = date.getFullYear();
              var m = date.getMonth() + 1;
              var d = date.getDate();
              var H = date.getHours();
              var i = date.getMinutes();
              if (m < 10) {
                m = "0" + m;
              }
              if (d < 10) {
                d = "0" + d;
              }
              if (H < 10) {
                H = "0" + H;
              }
              if (i < 10) {
                i = "0" + i;
              }
              var t = Y + "-" + m + "-" + d + "-" + " " + H + ":" + i;
              if (t !== "NaN-NaN-NaN- NaN:NaN") {
                return t;
              } else {
                return "";
              }
            },
            getdate(doctor){
              let currentDay = new Date();
              //获取当前年份
              let year = currentDay.getFullYear();
              //获取当前月份
              if( currentDay.getMonth() + 1<10){
              var mon = currentDay.getMonth() + 1;
              var month = '0'+mon;
              }else{
                var month = currentDay.getMonth() + 1;
              }
              //获取当天日期
              if( currentDay.getDate()<10){
                var mon =  currentDay.getDate();
                var day = '0'+mon;
              }else{
                var day =currentDay.getDate();
              }
              //当前年月日
              return year + "-" + month + "-" + day;
            },
            async init(doctor){
              
                //获取当天给当前用户看病的医生
               const doctorlistresult= await this.fetchdoctorlist();
               if(doctorlistresult=="0"){
                   this.doctorlist=[]
               }else if(doctorlistresult=="-1"){
                   this.erromodal=true
               }else{
                  // this.dealpaydate("check",this.paychecklist)
                  // this.dealpaydate("test",this.paytestlist)
                  // this.dealpaydate("drug",this.paydrugslist)
                   this.doctorlist=doctorlistresult
                   this.currentdoctor=this.doctorlist[0];
                   for(let i=0;i<doctorlistresult.length;i++){
                     if(localStorage.getItem("hosdoccode")==doctorlistresult[i].hosdoccode){
                       this.currentdoctor=doctorlistresult[i];
                       this.currenticonindex=i
                     }
                   }
                  //  if(doctor){
                  //    this.currentdoctor=doctor
                  //  }
                   const recordlist=await this.fetchdayrecord(this.currentdoctor)
                   this.recordlist=recordlist.data
                   //获取已缴费化验
                    const paytestchecklist=await this.fetchtestchecklist(this.currentdoctor)
                    if(paytestchecklist.status=='1'){
                      for(var i = 0;i<paytestchecklist.data.length;i++){
                        if(paytestchecklist.data[i].itemclass=='C'){
                          this.paytestlist.push(paytestchecklist.data[i]);
                           this.dealpaydate("test",this.paytestlist)
                        }else if(paytestchecklist.data[i].itemclass=='D'){
                           this.paychecklist.push(paytestchecklist.data[i]);
                            this.dealpaydate("check",this.paychecklist);
                        }
                      }
                      // this.paytestlist=paytestlist.data
                      // this.dealpaydate("test",this.paytestlist)
                    }else{
                      this.paytestlist=[]
                      this.daelpaytestlist=[]
                       this.paychecklist=[]
                      this.daelpaychecklist=[]
                    }
                    // //获取已缴费检查
                    // const paychecklist=await this.fetchchecklist(this.currentdoctor)
                    // if(paychecklist.status=='1'){
                    //   this.paychecklist=paychecklist.data
                    //   this.dealpaydate("check",this.paychecklist)
                    // }else{
                    //   this.paychecklist=[]
                    //   this.daelpaychecklist=[]
                    // }
                    //获取已缴费药品
                    const paydrugslist=await this.fetchdrugslist(this.currentdoctor);
                    if(paydrugslist.status=='1'){
                      this.paydrugslist=paydrugslist.data;
                      this.dealpaydate("drug",this.paydrugslist);
                    }else{
                      this.paydrugslist=[];
                      this.daelpaydruglist=[];
                    }
                    // //获取入院信息
                    // const hospitalizedlist=await this.beInHospital(this.currentdoctor)
                    // if(hospitalizedlist.status=='1'){
                    //   // this.hospitalizedlist=hospitalizedlist.data
                    //   // this.dealpaydate("drug",this.hospitalizedlist)
                    // }else{
                    //   // this.paydrugslist=[]
                    //   this.hospitalizedlist=[]
                    // }
                    const itemnum=await this.fetchItemsSum(this.currentdoctor)
                    //如果itemnum大于0说明有未缴费订单出弹窗
                    if(itemnum>0){
                      this.paymodal=true
                    }
               }
            },
            fetchdoctorlist(){
                var that = this;
                var url = that.$store.getters.getUrl + "doctors/getDoctorInfo.do";
                var card =localStorage.getItem("cardno");
                that.isshowloading = true;
                return new Promise((resolve,reject)=>{
                    $.ajax({
                        url: url,
                        type: "post",
                        dataType: "json",
                        async: false,
                        data: {
                        //卡号
                        cardno: card
                        },
                        success: function(data) {
                        that.isshowloading = false;
                        if(data.status==1){
                            resolve(data.data)
                        }else if(data.status==0){
                            resolve("0")
                        }else{
                            resolve("-1") 
                        }
                        //关闭加载动画
                        },
                        error: function(data) {
                        //关闭加载动画
                        that.isshowloading = false;
                        }
                    });
                })
                
            },
            toggledoctorlist(){
              this.isshowdoctorlist=!this.isshowdoctorlist
            },
            selectdoctor(item,index){
              let that=this
              
              this.toggledoctorlist()
              if(item.hosdoccode==this.currentdoctor.hosdoccode){
                localStorage.setItem('hosdoccode',this.currentdoctor.hosdoccode);
                return
              }
              this.currenticonindex=index
              this.currentdoctor=item
              localStorage.setItem('hosdoccode',this.currentdoctor.hosdoccode);
              
              this.isshowloading=true
              setTimeout(function(){
                that.init(item)
              },100)
              this.sumpayfee(this.dayarr)
              
            },
            sumpayfee(data){
              let dayarr=data
              let sum=0
              let arr=[]
              for(let i=0;i<dayarr.length;i++){
                if(dayarr[i].Doctor==this.currentdoctor.hosdocname){
                  sum+=dayarr[i].TotalFee
                  arr.push(dayarr[i])
                }
              }
              this.setlocaldayarr=arr
              sum=parseInt(sum*100)/100
              this.payFee=sum
            },
            async fetchdealunpaydata(){
                let that=this
                const data=await that.fetchVisitRecList();
                this.hasfetchVisitRecList=true
                if(data.ResultCode!==0){
                  that.dealunpaydata(data)
                this.sumpayfee(this.dayarr)
                }
                
            },
            selecttabtag(index){
              this.activeindex=-1
              this.curenttabindex=index
              if(index==0){
                this.isshowdetaile=false
              }
              if(index==1){
                let that=this
                if(!this.hasfetchVisitRecList){
                  this.isshowloading=true
                  setTimeout(function(){
                    that.fetchdealunpaydata()
                  },100)
                }
                
              }
            },
            showdetail(item,index){
              this.isshowdetaile=true
              this.activeindex=index
            },
            fetchItemsSum(item){
              var that = this;
              var url = that.$store.getters.getUrl + "prescription/getItemsSum.do";
              var card =localStorage.getItem("cardno");
              const doctorcode=item.hosdoccode
              that.isshowloading = true;
              return new Promise((resolve,reject)=>{
                  $.ajax({
                      url: url,
                      type: "post",
                      dataType: "json",
                      async: false,
                      data: {
                      //卡号
                      cardno: card,
                      doctorcode
                      },
                      success: function(data) {
                        that.isshowloading = false;
                        resolve(data)
                      },
                      error: function(data) {
                      //关闭加载动画
                      that.isshowloading = false;
                      }
                  });
              })
            },
            fetchtestchecklist(item){
              var that = this;
              var url =that.$store.getters.getUrl + "prescription/getCheckOrChemical.do";
              var cardno =  localStorage.getItem("cardno");
              var billdate =this.getdate() ;
              var doccode=item.hosdoccode;
              //打开加载动画
              that.isshowloading = true;
              return new Promise((resolve,reject)=>{
                $.ajax({
                  url: url,
                  type: "post",
                  dataType: "json",
                  async: false,
                  data: {
                    cardno: cardno,
                    // cardno: patientId
                    billdate:billdate,
                    itemtype:'C,D',
                    type:'day',
                    doccode:doccode
                  },
                  success: function(data) {
                    that.isshowloading = false;
                    resolve(data)
                  },
                  error: function(data){
                    reject(data)
                  }
                });
              })
            },
            fetchchecklist(item){
              var that = this;
              var url =that.$store.getters.getUrl + "prescription/getCheckOrChemical.do";
              var cardno =  localStorage.getItem("cardno");
              var billdate =this.getdate() ;
              var doccode=item.hosdoccode;
              //打开加载动画
              that.isshowloading = true;
              return new Promise((resolve,reject)=>{
                $.ajax({
                  url: url,
                  type: "post",
                  dataType: "json",
                  async: false,
                  data: {
                    cardno: cardno,
                    // cardno: patientId
                    billdate:billdate,
                    itemtype:'D',
                    type:'day',
                    doccode:doccode
                  },
                  success: function(data) {
                    that.isshowloading = false;
                    resolve(data)
                  },
                  error: function(data){
                    reject(data)
                  }
                });
              })
            },
            //药品详情
            fetchdrugslist(item){
              var that = this;
              var url =that.$store.getters.getUrl + "prescription/GetRecipeList.do";
              var patientid = localStorage.getItem("cardno");
              var doccode=item.hosdoccode;
              var visidate =this.getdate();
              that.isshowloading = true;
              return new Promise((resolve,reject)=>{
                $.ajax({
                  url: url,
                  type: "post",
                  dataType: "json",
                  async: false,
                  data:{
                    cardno:patientid,
                    visitdate:visidate,
                    type:'day',
                    doccode:doccode
                  },
                  success(data){
                    resolve(data)
                  },
                  error: function(data){
                    reject(data)
                  }
                })
              })
            },
            //当天病例
            fetchdayrecord(item){
              var that =this;
              var url = that.$store.getters.getUrl + "medicalrecord/getthesamedayoutpmr.do";
              var visitdate = this.getdate();
              var patientid = localStorage.getItem("cardno");
              var doccode= item.hosdoccode;
              //打开加载动画
              that.isshowloading = true;
              return new Promise((resolve,reject)=>{
                $.ajax({
                  url: url,
                  type: "post",
                  dataType: "json",
                  async: false,
                  data: {
                    patientid:patientid,
                    visitdate:visitdate,
                    doccode:doccode
                  },
                  success:function(data){
                    that.isshowloading = false;
                    resolve(data)
                  },
                  error:function(data){
                    reject(data)
                  }
                })
              })
            },
            dealpaydate(type,data){
              let _visitnoarr=[]
              let visitnoarr=[]
              let paylist=[]
              for(let i=0;i<data.length;i++){
                _visitnoarr.push(data[i].visitno)
              }
              for(let i=0;i<_visitnoarr.length;i++){
                if(visitnoarr.indexOf(_visitnoarr[i])==-1){
                  visitnoarr.push(_visitnoarr[i])
                }
              }
              for(let i=0;i<visitnoarr.length;i++){
                paylist.push({visitno:visitnoarr[i],list:[]})
              }
              for(let i=0;i<data.length;i++){
                let index=visitnoarr.indexOf(data[i].visitno)
                paylist[index].list.push(data[i])
              }
              if(type=="check"){
                this.daelpaychecklist=paylist
              }else if(type=="test"){
                this.daelpaytestlist=paylist
              }else{
                this.daelpaydruglist=paylist
              }
            },
            fetchVisitRecList(){
              var that = this;
              var url =that.$store.getters.getUrl + "prescription/GetVisitRecList.do";
              var patientId = localStorage.getItem("cardno");
              //打开加载动画
              that.isshowloading = true;
              return new Promise((resolve,reject)=>{
                $.ajax({
                  url: url,
                  type: "post",
                  dataType: "json",
                  async: false,
                  data: {
                    patientId
                  },
                  success: function(data) {
                    that.isshowloading = false;
                    resolve(data)
                  },
                  error: function(data){
                    reject(data)
                  }
                });
              })
            },
            dealunpaydata(data){
              let arr=[]
              let sum=0
              let dayarr=[]
              let day=this.getdate()
              let unpayobj={
                inspect:[],
                cure:[],
                assay:[],
                drug:[],
                sundry:[]
              }
              if(data.Response.ResultCode==1){
                if(data.Response.Item.length==undefined){
                  arr.push(data.Response.Item)
                }else{
                   arr=data.Response.Item
                }
               
                for(let i=0;i<arr.length;i++){
                   if (/\d{4}-\d{1,2}-\d{1,2}/g.exec(arr[i].RecipeDate)[0]==day) {
                      dayarr.push(arr[i]);
                      if(arr[i].RecipeMsg=='检查'){
                        unpayobj.inspect.push(arr[i]);
                      }else if(arr[i].RecipeMsg=='治疗'){
                        unpayobj.cure.push(arr[i]);
                      }else if(arr[i].RecipeMsg=='化验'){
                        unpayobj.assay.push(arr[i]);
                      }else if(arr[i].RecipeMsg=='西药'||arr[i].RecipeMsg=='中药'){
                        unpayobj.drug.push(arr[i]);
                      }else if(reportsList[i].RecipeMsg=='杂费'){
                        unpayobj.sundry.push(arr[i]);
                      }
                    }
                }
                this.dayarr=dayarr
                this.unpayobj=unpayobj
                
              }
            },
            valipaylist(){
                let that=this
                if(localStorage.getItem("body")=='微信处方'){
                var url = that.$store.getters.getUrl + "prescription/DeletePreOrder.do";
                //订单号
                var tradeno = localStorage.getItem("tradeno");
                $.ajax({
                  url: url,
                  type:'post',
                  dataType:'json',
                  async:true,
                  data:{
                    tradeno:tradeno
                  },
                  success:function(data){
                    
                    if(data>0){
                      localStorage.setItem("body", '');
                      localStorage.setItem("tradeno",''); 
                    }
                  },
                  error:function(data){
                  }
                })
              }
            },
            //获取住院报告
            beInHospital(){
              var that = this;
              var url = that.$store.getters.getUrl + "details/beInHospital.do";
              var cardno  = localStorage.getItem("cardno");
              return new Promise((resolve,reject)=>{
                $.ajax({
                  url: url,
                  type: "post",
                  dataType: "json",
                  // async:false,
                  data: {
                    cardno: '1312231032'
                  },
                  success:function(data){
                    that.isshowloading = false;
                    if(data.status=='1'){
                      resolve(data)
                    }
                  
                  },
                  error:function(data){
                    reject(data)
                  }
                })
              })
            },
            //查看医生详细信息
            doctorxinxi(){
              // $(".zhe").css("display","block");
              var that = this;
              var url = that.$store.getters.getUrl + "doctors/getdoctor.do";
              var doccode=that.currentdoctor.hosdoccode;
              $.ajax({
                url: url,
                type: "post",
                dataType: "json",
                data: {
                  doccode: doccode
                },
                success:function(data){
                  that.isshowloading = false;
                  that.docxiang=data.data;
                  if(data.data[0].expertjob!==undefined){
                    that.jiajie=data.data[0].expertjob;
                  }else{
                    that.jiajie='无'
                  }
                },
                error:function(data){
                }
              })
            },
        },
        mounted(){
          let that=this
          
          this.isshowloading=true
          setTimeout(function(){
            that.valipaylist()
            that.init();
            const requesturl=that.$store.getters.getUrl + "SweepCode.do";
            hidemenu(requesturl);
            // that.doctorxinxi();
          },1000)
          
        }
    }
</script>

<style scoped>
.reportpage{
    height: 100%;
    position: relative;
}
.content{
    height: 100%;
    padding-bottom: 50px;
    overflow: auto;
}
.tip{
  text-align: center;
  font-size: 20px;
  margin-top: 100px;
}
.main-box{

}
.reports p{
  display: flex;
}
.reports p span:nth-child(1){
  flex: 1;
}
/* 医生信息 */
.doctor-info{
    display: flex;
    padding: 7px 0;
    margin: 3px 0;
    border-bottom: 1px solid #ccc;
}
.doctor-info>div{
    align-self: center
}
.avatar{
    height: 15.33333vw;
    margin: 0 10px;
    margin-right: 25px;
}
.textinfo{
    flex: 1;
}
.textinfo p{
    line-height: 20px;
}
.selecticon{
    text-align: right;
    margin: 0 10px;
}
.iconarrow{
    margin-right: 10px;
}
/* 医生列表信息 */
.doctor-list>div{
    display: flex;
    margin: 10px 0;
    border-bottom: 1px solid #ccc;
}
.icon-box{
    align-self: center;
    
}
.icon-w{
  margin-right: 20px;
  height: 20px;
  width: 20px;
  padding: 3px;
  border:1px solid rgb(18,183,245);
  border-radius: 50%;
}
.un-icon-n{
  height: 12px;
  width: 12px;
  background: rgb(255, 255, 255);
  border-radius: 50%;
}
.icon-n{
  height: 12px;
  width: 12px;
  background: rgb(18,183,245);
  border-radius: 50%;
}

/*已缴费订单*/
.tabbar-box{
  display: flex;
}
.tabbar-box>div{
  flex:1;
  text-align: center;
  padding: 10px 0;
}
.tabbar{
    position: absolute;
    bottom: 0;
}
.active{
  color: rgb(18,183,245);
  border-bottom: 2px solid rgb(18,183,245);
}
.title{
    background: rgb(40, 184, 161);
    font-size: 20px;
    color: white;
    padding: 10px 0;
    text-align: center;
}
.po{
  line-height: 2;
  display: inline-block;
  padding-left: 10px;
}
/* 推送消息列表 */
.result{
  display: flex;
  margin: 2px;
}
.result-info-box{
  flex: 1;
  margin-right: 2px;
}
.result-info-box>div{
  width: 100%;
  height: 80px;
  border:1px solid #dcdee2;
  margin-bottom: 2px;
  border-radius: 5px;
}
.result-info-box>div>div{
  width: 100%;
  display: flex;
  line-height: 40px;
  padding: 0 10px;
}
.title-text{
  width: 80px;
}
.content-text{
  flex: 1;
}
.overflow-text{
  height: 40px;
  overflow: hidden;
  /* white-space: nowrap; */
  /* text-overflow: ellipsis; */
}
.item-list{
  width: 50px;
}
.item-list>div{
  height: 80px;
  padding:15px 20px;
  border:1px solid #dcdee2;
  border-radius: 5px;
  margin-bottom: 2px;
}
.item-list>div p{
  line-height: 25px;
}
/* 已缴费详情 */
.checkdetail{
  display: flex;
  margin: 2px;
}
.checkdetail-info-box{
  flex: 1;
  margin-right: 2px;
}
.item-list{
  width: 50px;
}
.item-list>div{
  height: 80px;
  padding:15px 20px;
  border:1px solid #dcdee2;
  border-radius: 5px;
  margin-bottom: 2px;
}
.item-list>div p{
  line-height: 25px;
}
/*  */
.records{

}
.record-item{
  margin:10px 0;
  border-bottom: 1px solid #e8eaec;
}
.record-item p{
  display: flex;
  padding:0 10px 0 20px;
  margin:5px 0;
}
.record-item .item-title{
  font-size: 14px;
  font-weight: bold;
  width: 80px;
}
.record-item .item-content{
  font-size: 14px;
  flex: 1;
}
/* 已缴费检查 */
.check-detail{
  
}
.check-detail>div{
  padding:5px 10px 5px 20px;
  border-bottom: 1px solid #e8eaec;
}
.check-detail>div p{
  display: flex;
  line-height: 25px;
}
.check-detail>div p .item-title{
  font-size: 14px;
  font-weight: bold;
  width: 80px;
  flex: 1;
}
.check-detail>div p .item-content{
  font-size: 14px;
  
}
/* animate */
.activebtn{
  background: rgb(40, 184, 161)
}
.data-null{
  border-bottom: 1px solid rgb(255, 255, 255) !important;
  text-align: center;
  font-size: 20px;
  margin: 50px;
}
/*  */
.text{
  border-bottom: 1px solid #e8eaec;
}
.text p{
  display: flex;
}
.text-title{
  font-size: 16px;
  font-weight: bold;
  flex: 1;
}
.text-info{
  font-size: 16px;
}
/* 支付 */
.submit-box{
  text-align: center;
}
.payfee{
  text-align: center;
  font-size: 16px;
  color: red;
  margin: 10px 0;
}
.submitbtn{
  background: rgb(40, 184, 161);
  width: 200px;
  padding: 10px 10px;
  text-align: center;
  border: unset;
  border-radius: 5px;
  font-size: 16px;
  color: rgb(255, 255, 255)
  
}
</style>