<script setup>
import router from '@/router';
import { ref } from 'vue'
import InputComponents from '@/components/InputStandardComponents.vue'
import { ElMessage } from 'element-plus';
// console.log(nowDay.value,iData.value);
// 上面先执行
// onUpdated(() => {

//        // 这些都是局部变量
//        const start = new Date(day.value[0])
//        counter.startMonth = start.getMonth() + 1  //开始月份
//        counter.startDay = start.getDate() //开始日期
//        const end = new Date(day.value[1])
//        const timeDiff = end.getTime() - start.getTime() // 时间差的毫秒数
//        counter.daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24)) + 1 // 转换成天数
// })

// onUpdated(() => {
//        for (let i = 1; i < counter.daysDiff; i++) {
//               N2OArr[i] = N2O
//               watch(
//                      () => [N2OArr[i].Qrbi, N2OArr[i].TNrbi, N2OArr[i].TNebi, N2OArr[i].EFN2O, N2OArr[i].CN2ON2],
//                      ([newQrbi, newTNrbi, newTNebi, newEFN2O, newCN2ON2]) => {
//                             N2OArr[i].mN2Oi = newQrbi * (newTNrbi - newTNebi) * newEFN2O * newCN2ON2 / 1000
//                      }
//               )
//        }
// })


// 跳转到首页
const toSelect = () => {
       router.push('/')
}



//跳转到展示页面
const toShowPage = () => {
       //只有输入框里面没有数据才能够进入
       //当数据库里面有数据的时候要提醒用户数据库里面有数据
       // if (inputComponentsRef.value.validateAllForm()) {
       //        ElMessage({ type: 'error', message: '请先全部提交' })
       //        console.log('进入失败');

       //        return
       // } else {
       //        console.log('进入成功');

       // }
       // inputComponentsRef.value.validateAllForm().then((res) => {
       //        console.log(res);
       //        if (res) {
       //               // 即表单里数据全都有
       //               inputComponentsRef.value.pushAllResult()//将输入的数据提交
       //               ElMessage.success('当前数据已提交成功')
       //               counter.ifShow = false
       //               nextTick(() => {
       //                      counter.ifShow = true
       //               })
       //        } else {
       //               ElMessage({
       //                      message: '还有数据未输入，请输入',
       //                      type: 'error',
       //                      showClose: true,
       //                      duration: 2000
       //               })
       //               return
       //        }
       // })
       // inputComponentsRef.value.toShowStandard()
       router.push('/showstandard')


       // inputComponentsRef.value.validateAllForm().then((res) => {
       //        console.log(res);
       //        if (res) {
       //               inputComponentsRef.value.pushAllResult()//将输入的数据提交
       //               ElMessage.success('当前数据已提交成功')
       //               counter.ifShow = false
       //               nextTick(() => {
       //                      counter.ifShow = true
       //               })
       //        } else {
       //               ElMessage({
       //                      message: '还有数据未输入，请输入',
       //                      type: 'error',
       //                      showClose: true,
       //                      duration: 2000
       //               })
       //               return
       //        }
       // })




}


// 选择哪一天
const ifDay = ref(false)
const ifMonth = ref(false)
const ifYear = ref(false)
// 当前日/月/年
const nowDay = ref('')
// 第i天/月/年
const iData = ref('')


const handleIfDay = () => {
       ifMonth.value = false;
       ifYear.value = false;
       ifDay.value = true;
       iData.value = '天'
       nowDay.value = ''

}
const handleIfMonth = () => {
       ifDay.value = false;
       ifYear.value = false;
       ifMonth.value = true;
       iData.value = '月'
       nowDay.value = ''

}
const handleIfYear = () => {
       ifDay.value = false;
       ifMonth.value = false;
       ifYear.value = true;
       iData.value = '年'
       nowDay.value = ''
}

const change = () => {
       // inputComponentsRef.value.pushAllResult()
       ElMessage({
              message: `请输入${nowDay.value}的数据`,
              type: 'success',
       })
}

const inputComponentsRef = ref(null)
const submitAll = () => {
       inputComponentsRef.value.validateAllForm().then((res) => {
              console.log(res, 'resresres');
              if (res) {
                     console.log(inputComponentsRef.value.validateAllForm());

                     inputComponentsRef.value.pushAllResult()//将输入的数据提交
                     ElMessage.success('当前数据已提交成功')
                     // counter.ifShow = false
                     // nextTick(() => {
                     //        counter.ifShow = true
                     // })
              } else {
                     console.log('进入失败');

                     // 如果数据全部输入
                     ElMessage({
                            message: '还有数据未输入，请输入',
                            type: 'error',
                            showClose: true,
                            duration: 2000
                     })
                     return
              }
       })
}

console.log(nowDay.value, iData.value);

const toBottom = () => {
       window.scrollTo({
              top: document.body.scrollHeight,
              behavior: "smooth",
       });
}

const toTop = () => {
       window.scrollTo({
              top: 0,
              behavior: "smooth"
       })
}

</script>

<template>

       <div>
              <div class="fixed bottom-0 right-0 mr-5 mb-5">
                     <el-button @click="toTop">
                            回到顶部
                     </el-button>
                     <el-button @click="toBottom">
                            回到底部
                     </el-button>

              </div>
              <!-- 标题 -->
              <div
                     className=" bg-white border-b-2 border-gray-300 p-4 font-bold text-2xl text-center sticky top-0 z-10">
                     污水处理厂低碳运行评价技术规范
              </div>

              <div class="flex justify-around mt-8">
                     <!-- 选择年/月/日 -->
                     <el-card style="width: 250px" shadow="hover">
                            <div class="flex justify-around">
                                   <el-button @click="handleIfYear"
                                          :style="{ backgroundColor: ifYear ? 'skyblue' : '' }">年</el-button>
                                   <el-button @click="handleIfMonth"
                                          :style="{ backgroundColor: ifMonth ? 'skyblue' : '' }">月</el-button>
                                   <el-button @click="handleIfDay"
                                          :style="{ backgroundColor: ifDay ? 'skyblue' : '' }">日</el-button>
                            </div>
                     </el-card>
                     <!-- 选择日期范围 -->
                     <el-card style="width: 280px" shadow="hover" v-if="ifDay || ifMonth || ifYear">
                            <div class="flex justify-center">
                                   <div v-if="ifDay">
                                          <el-date-picker v-model="nowDay" type="date" placeholder="Pick a day"
                                                 format="YYYY/MM/DD" value-format="YYYY-MM-DD" @change="change">
                                          </el-date-picker>
                                   </div>
                                   <div class="block" v-else-if="ifMonth">
                                          <el-date-picker v-model="nowDay" type="month" placeholder="Pick a month"
                                                 format="YYYY/MM" value-format="YYYY-MM" @change="change">
                                          </el-date-picker>
                                   </div>
                                   <div class="block" v-else-if="ifYear">
                                          <el-date-picker v-model="nowDay" type="year" placeholder="Pick a year"
                                                 format="YYYY" value-format="YYYY" @change="change">
                                          </el-date-picker>
                                   </div>
                            </div>
                     </el-card>

              </div>







              <!-- 输入框 -->
              <!-- <InputComponents ref="inputComponentsRef" :data="nowDay" :iData="iData" v-if="counter.ifShow" /> -->
              <InputComponents ref="inputComponentsRef" :data="nowDay" :iData="iData" />
              <!-- 分页 :page-size='counter.daysDiff'是每一页的数量  ：total则是总的数量 -->
              <!-- @current-change 事件会在当前页码变化时触发，handleCurrentChange 是一个在 Vue 组件中的方法，用来处理页码变化时的逻辑。例如，当用户点击下一页时，这个方法会被调用。 -->
              <!-- 
              <div>
                     <el-pagination size="small" background layout="prev, pager, next" :page-size='counter.daysDiff'
                            :total='counter.daysDiff * counter.daysDiff' class="mt-4"
                            @current-change="handleCurrentChange" />
              </div> -->
              <!-- 确认框 -->
              <div class="flex justify-around mt-10 mb-20">
                     <el-button type="primary"
                            class="px-6 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            @click="toSelect">
                            回到首页
                     </el-button>
                     <el-button type="primary"
                            class="px-6 py-2  rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            @click="submitAll">
                            全部提交
                     </el-button>
                     <el-button type="primary"
                            class="px-6 py-2  rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            @click="toShowPage">
                            进入展示界面
                     </el-button>
              </div>
       </div>

</template>
