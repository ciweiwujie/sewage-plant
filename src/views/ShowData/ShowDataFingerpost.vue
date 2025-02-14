<script setup>
import * as echarts from 'echarts';
import { onMounted, reactive } from 'vue';
import { usefingerpostStore } from '@/stores/fingerpostStore';
import { ref } from 'vue'
import router from '@/router';
import '@/assets/font/iconfont.css'
import '@/assets/font/demo.css'
import '@/assets/font/iconfont.js'
import requests from '@/assets/requests'
import { ElMessage } from 'element-plus';

const counter = usefingerpostStore()



// const tableRowClassName = ({
//   rowIndex,
// }) => {
//   if (rowIndex === 1) {
//     return 'warning-row'
//   } else if (rowIndex === 3) {
//     return 'success-row'
//   }
//   return ''
// }





// 进入首页选择框
const toSelect = () => {
  router.push('/')
}

// 进入输入框
const toInputStandard = () => {
  router.push('/inputfingerpost')
}


// // 这两个数据需要做持久化存储
// //存放OnDayResult的对象  这个对象里面有很多的数组
const ManyDayResultObj = {
  CH4: [],//CH4直接排放量
  CH4Qrbi:[],
  tailWaterCH4:[],
  CH4Total:[],
  CH4C:[],
  N2O:[],
  tailWaterN2O:[],
  N2OTotal:[],
  N2OC:[],
  AllC:[],
  basicalInfo: [], //污水处理厂基本信息
  textarealvse:[],
}


// //存放日期的数组
let ManyDate = []
console.log(counter.mapFingerpost,'fdhiisfdhbjb');

// //将数据从map中用循环的方式取出 。一个key对应一个value。   一个key就是一个日期 ， 一个value就是OneDayResult是一个对象。
counter.mapFingerpost.forEach((OneDayResult, oneDate) => {
  //OneDayResult是一个大的对象，里面有很多数组
  //从OneDayResult中取出每一个数组，放入ManyDayResultObj中
  console.log('执行了上面'); //1次
  console.log(OneDayResult,"OneDayResult");
  
  for (const AData in OneDayResult) {
    console.log('AData', AData);  //AData是各个数组的名字，如N2O直接排放量[1]
    console.log(OneDayResult[AData], 'OneDayResult[AData]');
    console.log(ManyDayResultObj[AData], 'ManyDayResultObj[AData]');

    ManyDayResultObj[AData].push(OneDayResult[AData])
    console.log('执行了下面',OneDayResult[AData]);//12 次
  }
  //把日期放入ManyDate中，并给他排序
  ManyDate.push(oneDate)
  ManyDate.sort((a, b) => new Date(a) - new Date(b))//默认情况下，sort将数组元素转换为字符串，然后按字母顺序进行排序。
});







// // 需要在页面中展示的数据
// const totalDataValue = reactive({
//   totalN2OValue: 0,
//   totalCH4Value: 0,
//   totalCO2Value: 0,
//   totalEleValue: 0,
//   totalHotValue: 0,
//   totalDrugValue: 0,
//   totalIntCValue: 0,
//   totalIndCIntValue: 0,
//   totalCIntValue: 0,
//   totalQrbiValue: 0,
// })
// // 求和
// for (let i = 0; i < ManyDayResultObj.N2O.length; i++) {
//   totalDataValue.totalN2OValue += ManyDayResultObj.N2O[i]
//   totalDataValue.totalCH4Value += ManyDayResultObj.CH4[i]
//   totalDataValue.totalCO2Value += ManyDayResultObj.CO2[i]
//   totalDataValue.totalEleValue += ManyDayResultObj.EleCInt[i]
//   totalDataValue.totalHotValue += ManyDayResultObj.HotCInt[i]
//   totalDataValue.totalDrugValue += ManyDayResultObj.MatCMci[i]
//   totalDataValue.totalIntCValue += ManyDayResultObj.IntC[i]//7
//   totalDataValue.totalIndCIntValue += ManyDayResultObj.IndCInt[i]//12
//   totalDataValue.totalCIntValue += ManyDayResultObj.CInt[i]//13
//   totalDataValue.totalQrbiValue += ManyDayResultObj.Qrbi[i]//进水量
// }



// // 获取dom元素
const foldLineRef = ref(null)
const cakeRef = ref(null)

const textarealvse = ref(null)

// // 折线图
// onMounted(() => {
//   const CIntDom = foldLineRef.value
//   const CIntChart = echarts.init(CIntDom)
//   // 图标的具体信息
//   const option = {
//     // title: {
//     //   text: 'Stacked Line'
//     // },
//     tooltip: {
//       trigger: 'axis'
//     },
//     legend: {
//       data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
//     },
//     grid: {
//       left: '3%',
//       right: '4%',
//       bottom: '3%',
//       containLabel: true
//     },
//     toolbox: {
//       feature: {
//         saveAsImage: {}
//       }
//     },
//     xAxis: {
//       type: 'category',
//       boundaryGap: false,
//       data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
//     },
//     yAxis: {
//       type: 'value'
//     },
//     series: [
//       {
//         name: 'Email',
//         type: 'line',
//         stack: 'Total',
//         data: [120, 132, 101, 134, 90, 230, 210]
//       },
//       {
//         name: 'Union Ads',
//         type: 'line',
//         stack: 'Total',
//         data: [220, 182, 191, 234, 290, 330, 310]
//       },
//       {
//         name: 'Video Ads',
//         type: 'line',
//         stack: 'Total',
//         data: [150, 232, 201, 154, 190, 330, 410]
//       },
//       {
//         name: 'Direct',
//         type: 'line',
//         stack: 'Total',
//         data: [320, 332, 301, 334, 390, 330, 320]
//       },
//       {
//         name: 'Search Engine',
//         type: 'line',
//         stack: 'Total',
//         data: [820, 932, 901, 934, 1290, 1330, 1320]
//       }
//     ]
//   };
//   option && CIntChart.setOption(option)
// })

// // 雷达图
// onMounted(() => {
//   const cakeDom = cakeRef.value
//   const cakeChart = echarts.init(cakeDom)
//   const option = {
//     legend: {
//       data: ['基准年', 'i年'],
//       bottom: 10,
//     },
//     radar: {
//       indicator: [
//         { name: 'N2O碳排放强度', max: 6500 },
//         { name: '甲烷碳排放强度', max: 16000 },
//         { name: '二氧化碳排放强度', max: 30000 },
//         { name: '电耗碳排放强度', max: 38000 },
//         { name: '药耗碳排放强度', max: 52000 },
//         { name: '能耗排放强度', max: 25000 }
//       ],
//       radius: '50%',
//       axisName: {
//         color: '#666',
//         fontSize: 12,
//         padding: [0, 0, 10, 0]
//       }
//     },
//     series: [
//       {
//         name: '基准年',
//         type: 'radar',
//         data: [
//           {
//             value: [4200, 3000, 20000, 35000, 50000, 18000],
//             name: '基准年'
//           },
//           {
//             value: [5000, 14000, 28000, 26000, 42000, 21000],
//             name: 'i年'
//           }
//         ]
//       }
//     ]
//   };
//   option && cakeChart.setOption(option)
// })

// //进入到改变数据界面
// const toChangeData = () => {
//   dialogFormVisible.value = true
//   // router.push('/changedata')
// }
// const dialogFormVisible = ref(false)
// const formLabelWidth = '140px'

// const form = reactive({
//   userId: '',
//   password: ''
// })


// //进入到改变数据页面时候的确认登录框
// const confirmLogin = () => {
//   console.log('confirm');
//   requests({
//     url: '/api/login',
//     method: 'post',
//     data: {
//       userId: form.userId,
//       password: form.password
//     }
//   }).then((res) => {
//     console.log('res', res);
//     if (res == 1) {
//       ElMessage.success('登录成功')
//       dialogFormVisible.value = false
//       router.push('./changedata')
//     } else {
//       ElMessage({
//         message: '账号/密码错误',
//         type: 'error'
//       })
//     }
//   }).catch((err) => {
//     console.log(err, 'err');
//   })
// }
// const cancelLogin = () => {
//   dialogFormVisible.value = false
// }
// 饼图
onMounted(() => {
  // const cakePie = cakeRef.value
  // const cakeChart = echarts.init(cakePie)
  const cakeChart = echarts.init(document.getElementById('Pie'))
  console.log(document.getElementById('Pie') ,"Pie");
  
  const option = {
    series: [
    {
      name:'碳排放当量贡献表',
      type: 'pie',
      data: [
        {
          value: ManyDayResultObj.CH4[0],
          name: 'CH4'
        },
        {
          value: ManyDayResultObj.tailWaterCH4[0],
          name: 'CH4尾水'
        },
        {
          value: ManyDayResultObj.N2O[0],
          name: 'N2O'
        },
        {
          value: ManyDayResultObj.tailWaterN2O[0],
          name: 'N2O尾水'
        }
      ]
    }
  ]
  };
  // option && cakeChart.setOption(option)
  cakeChart.setOption(option)
})

// //将数据导出为excel表格
const derFile = () => {
  console.log('导出了数据');
  let str = "";
  let jsonData = []
  for (let i = 0; i < ManyDate.length; i++) {
    jsonData.push({
      日期: ManyDate[i],
      甲烷排放量ECH4i:Number(ManyDayResultObj.CH4[i]).toFixed(3),//甲烷排放量E甲烷i [1]
      甲烷尾水EtailWateri:Number(ManyDayResultObj.tailWaterCH4[i]).toFixed(3),//甲烷尾水E甲烷尾水i [2]
      甲烷总排放量ECH4Totali:Number(ManyDayResultObj.CH4Total[i]).toFixed(3),//甲烷总排放量E甲烷排放量i [3]
      甲烷碳当量EiCH4C:Number(ManyDayResultObj.CH4C[i]).toFixed(3),//甲烷碳当量E甲烷碳当量i [4]
      氧化亚氮碳排放量EN2Oi:Number(ManyDayResultObj.N2O[i]).toFixed(3),//氧化亚氮排放量E氧化亚氮i [5]
      氧化亚氮尾水排放量EtailWaterN2Oi:Number(ManyDayResultObj.tailWaterN2O[i]).toFixed(3),//氧化亚氮尾水排放量E氧化亚氮i [6]
      氧化亚氮排放总量EN2OTotali:Number(ManyDayResultObj.N2OTotal[i]).toFixed(3),//氧化亚氮排放总量E氧化亚氮总i [7]
      氧化亚氮排放当量EN2OCi:Number(ManyDayResultObj.N2OC[i]).toFixed(3),//氧化亚氮排放当量E氧化亚氮当i [8]
      总碳排放量AllC:Number(ManyDayResultObj.AllC[i]).toFixed(3),//总碳排放量 [9]
    });
  }
  //这里是给str添加表头
  for (let k in jsonData[0]) {
    str += k + ",";
  }//str = "仓库代码,货号,尺码,条码,切货数量,折扣,"
  // 这里是给str加上换行符
  str = str.slice(0, str.length - 1) + "\n";//slice切片， 这个切片的意思是，把最后一个逗号去掉并且加上一个换行符
  console.log(str, 'str');
  // 增加\t为了不让表格显示科学计数法或者其他格式
  // 这里是逐行添加str的内容
  for (let i = 0; i < jsonData.length; i++) {
    for (const item in jsonData[i]) {
      str += `${jsonData[i][item] + "\t"},`;//这里会显示在第二行，这里str加上的值的内容
    }
    str += "\n";
  }
  console.log(str, 'str');
  const uri = "data:application/vnd.ms-excel;charset=utf-8,\ufeff" + encodeURIComponent(str);
  // 综合来看，这段代码创建了一个数据 URI，它表示一个 Excel 文件，文件内容由 str 变量提供，并且这个文件使用 UTF-8 编码。这个数据 URI 可以用来在 HTML 中通过 <a href="..."> 创建一个下载链接，或者在 JavaScript 中动态生成并触发下载。
  // 通过创建a标签实现
  const link = document.createElement("a");
  link.href = uri;
  // 对下载的文件命名
  link.download = "大气污染物与温室气体融合排放清单编制技术指南.xls";
  // 如果想在页面加载后自动导航到另一个页面，但又不想让用户看到链接元素，可以使用这种方法。
  // link是一个<a>元素，并且没有被CSS隐藏，那么它会被添加到页面上，并且可能会在页面上显示。
  // 然而，由于紧接着执行了link.click();，这个元素会立即触发点击事件，然后被移除，所以用户可能根本没有机会看到它。
  // document.body.appendChild(link);
  link.click();
  // document.body.removeChild(link);
}



// // 污水处理厂的信息
const sludWaterFactoryTableData = [
  {
    name: '普宁市区污水处理厂',
    time: '2023-10',
    score: '80',
  },
  {
    name: '普宁市区污水处理厂',
    time: '2023-10',
    score: '80',
  },
]





</script>
<template>
  <div class="flex flex-col h-screen">
    <!-- 上面两行 -->
     <!-- <el-button @click="derFile">
      下载
     </el-button> -->
     
     <div class="flex flex-col">
      <div class="flex bg-green-800 h-4 w-full"></div>
      <div class="flex justify-center h-14 w-full">
        <div class="border-b-[56px] border-r-[288px] border-r-green-800 border-b-transparent border-solid w-0 h-0"></div>
        <div class="flex justify-center bg-green-800 w-1/4"> 
          <div class="px-3">
            <img class="h-[40px] w-[40px]" src="/src/images/logo1.png" alt="广东环保">
          </div>
          <div class="ttext-center text-white">
            <p class="text-2xl font-bold">广东环保</p>
            <p class="text-mi font-middle">GDHUANBAO</p>
          </div>
          <div class="text-3xl text-center text-white font-bold pt-2.5 pl-5">
          </div>
        </div>
        <div class="border-b-[56px] border-l-[288px] border-l-green-800 border-b-transparent border-solid w-0 h-0"></div>
      </div>
     
     </div>

    <div class="h-[40px] flex flex-row ml-4 mr-4 mt-2 text-lg font-bold">
      <div class="flex basis-1/4 ml-3">
        <div><img src="/src/images/standardshow2.png" alt="污水排放管" class="h-[30px]"></div>
        <div class="text-center p-1">污水处理厂基本信息</div>
      </div>
      <div class="flex basis-1/2 ml-3">
        <div><img src="/src/images/standardshow3.png" alt="电池" class="h-[30px] pt-2"></div>
        <div class="text-center p-1">关键数据总览</div>
      </div>
      <div class="flex basis-1/4 ml-3">
        <div><img src="/src/images/standardshow4.png" alt="文档" class="h-[38px] pt-2"></div>
        <div class="text-center p-1 mt-1">关键参数</div>
      </div>
    </div>
    <div class="flex flex-row flex-1 mb-4">
      <el-card style="box-shadow: 5px 5px 5px rgb(55,159,84,0.6);" class="flex ml-4 basis-1/4 text-base font-medium" :body-style="{ display: 'flex', width: '100%', flexDirection: 'column' }">
        <div class="flex flex-1">隶属区域中心：{{ ManyDayResultObj.basicalInfo[0]?.areaCenter || '暂无数据' }}</div>
        <div class="flex flex-1">年进水水量：{{ ManyDayResultObj.basicalInfo[0]?.waterYear || '暂无数据' }}</div>
        <div class="flex flex-1">处理工艺：{{ ManyDayResultObj.basicalInfo[0]?.handleStyle || '暂无数据' }}</div>
        <div class="flex flex-1">建厂时间：{{ ManyDayResultObj.basicalInfo[0]?.createdTime || '暂无数据' }}</div>
        <div class="flex flex-1">采用评价：大气污染物与温室气体融合排放清单编制技术指南</div>
      </el-card>
      <el-card style="box-shadow: 5px 5px 5px rgb(55,159,84,0.6);" class="flex flex-row mr-4 ml-4 basis-1/2 text-base font-medium" :body-style="{ display: 'flex', width: '100%' }">
        <div class="flex flex-col flex-1">
          <div class="flex flex-1">甲烷碳排放当量:{{ (ManyDayResultObj.CH4C[0] === undefined
            || ManyDayResultObj.CH4C[0] === null) ? '无数据' :
            Number(ManyDayResultObj.CH4C[0]).toFixed(2) }}</div>
          <div class="flex flex-1">氧化亚氮碳排放当量:{{ (ManyDayResultObj.N2OC[0] ===
            undefined || ManyDayResultObj.N2OC[0] === null) ? '无数据' :
            Number(ManyDayResultObj.N2OC[0]).toFixed(2) }}</div>
          <div class="flex flex-1">直接碳排放当量:{{ (ManyDayResultObj.CH4C[0] + ManyDayResultObj.N2OC[0] ===
            undefined || ManyDayResultObj.CH4C[0] + ManyDayResultObj.N2OC[0] === null) ? '无数据' :
            Number(ManyDayResultObj.CH4C[0] + ManyDayResultObj.N2OC[0]).toFixed(2) }}</div>
          <div class="flex flex-1">直接碳排放强度:{{ (ManyDayResultObj.AllC[0] / ManyDayResultObj.CH4Qrbi[0] ===
            undefined || ManyDayResultObj.AllC[0] / ManyDayResultObj.CH4Qrbi[0] === null)? '无数据' :
            Number(ManyDayResultObj.AllC[0] / ManyDayResultObj.CH4Qrbi[0]).toFixed(2)}}</div>
          
          <!-- <div class="flex flex-col flex-1">
            <div style="color: #aaa; font-size: 0.8rem">
              注：
            </div>
            <div style="color: #aaa; font-size: 0.8rem">
              总分G≥80分为高，表示绿色低碳水平高；
            </div>
            <div style="color: #aaa; font-size: 0.8rem">
              总分60≤G＜80分为中，表示绿色低碳水平中；
            </div>
            <div style="color: #aaa; font-size: 0.8rem">
              总分G＜60分为低，表示绿色低碳水平低。
            </div>
          </div> -->
        </div>
        <!-- <div class="text-red-600 text-8xl flex items-center justify-center flex-1 w-full">{{ (ManyDayResultObj.Level[0]
          === undefined
          || ManyDayResultObj.Level[0] === null) ? '未评级' :
          ManyDayResultObj.Level[0]
          }}</div> -->
      </el-card>
      <el-card style="box-shadow: 5px 5px 5px rgb(55,159,84,0.6);" class="flex flex-row mr-4 ml-4 basis-1/4 text-base font-medium" :body-style="{ display: 'flex', width: '100%' }">
        <div class="flex flex-col flex-1">
          <div class="flex flex-1">甲烷生化阶段碳排放当量:{{ (ManyDayResultObj.CH4[0] === undefined
            || ManyDayResultObj.CH4[0] === null) ? '无数据' :
            Number(ManyDayResultObj.CH4C[0]).toFixed(2) }}</div>
          <div class="flex flex-1">甲烷排入尾水碳排放当量:{{ (ManyDayResultObj.tailWaterCH4[0] ===
            undefined || ManyDayResultObj.tailWaterCH4[0] === null) ? '无数据' :
            Number(ManyDayResultObj.tailWaterCH4[0]).toFixed(2) }}</div>
          <div class="flex flex-1">氧化亚氮生化阶段碳排放当量:{{ (ManyDayResultObj.N2O[0] * 265 ===
            undefined || ManyDayResultObj.N2O[0] * 265 === null) ? '无数据' :
            Number(ManyDayResultObj.N2O[0] * 265).toFixed(2) }}</div>
          <div class="flex flex-1">氧化亚氮排入尾水碳排放当量:{{ (ManyDayResultObj.tailWaterN2O[0]  * 265===
            undefined || ManyDayResultObj.tailWaterN2O[0]  * 265=== null)? '无数据' :
            Number(ManyDayResultObj.tailWaterN2O[0] * 265).toFixed(2)}}</div>
        </div>
      </el-card>
    </div>
    <!-- 下面两行 -->
    <div class="h-[40px] flex flex-row ml-4 mr-4 mt-2 text-lg font-bold">
      <div class="flex basis-1/4 ml-3">
        <div><img src="/src/images/standardshow5.png" alt="污水排放管" class="h-[35px] pt-2"></div>
        <div class="text-center p-1 pt-2">碳排放贡献度对比</div>
      </div>
      <div class="flex basis-1/2 ml-3">
        <div><img src="/src/images/standardshow6.png" alt="污水排放管" class="h-[35px] pt-2"></div>
        <div class="text-center p-1 pt-2">绿色低碳建设情况</div>
      </div>
      <div class="flex basis-1/4 ml-3">
        <div><img src="/src/images/standardshow7.png" alt="污水排放管" class="h-[30px] pt-2"></div>
        <div class="text-center p-1">快捷菜单</div>
      </div>
    </div>
    <div class="flex flex-row flex-1 mb-4 text-mi font-bold">
      <el-card style="box-shadow: 5px 5px 5px rgb(55,159,84,0.6);" class="flex ml-4 basis-1/4" :body-style="{ display: 'flex', width: '100%', height: '100%' }">
        <!-- <div class="w-full h-5/6" ref="cakeRef">
        </div> -->
        <div id="Pie" class="w-full h-5/6" ref="cakeRef">
        </div>
      </el-card>
      <el-card style="box-shadow: 5px 5px 5px rgb(55,159,84,0.6);" :body-style="{padding : '2px' , paddingLeft : '8px'}" class="flex flex-col mr-4 ml-4 basis-1/2" >
        <div class="text-xl">绿色低碳行为:</div>
        <!-- <el-input style="width: 90%; height:260px;" placeholder="绿色低碳行为" /> -->
        <!-- <el-input type="textarea" :rows="12" placeholder="绿色低碳行为" v-model="textarealvse"> </el-input> -->
         <div class="p-2">
          {{ ManyDayResultObj.textarealvse[0] }}
         </div>
        <!-- <input type="text" class="h-64 w-11/12"> -->
      </el-card>
      <el-card style="box-shadow: 5px 5px 5px rgb(55,159,84,0.6);" class="flex mr-4 basis-1/4" :body-style="{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' , width: '100%' ,padding : '6px' }">
        <div>
          <div class="flex flex-row justify-center py-1">
            <div class="flex flex-col h-14" @click="derFile">
              <img src="/src/images/standardshow1.png" alt="文件夹" class="h-14 w-14">
            </div>
            <div class="flex flex-col h-14 px-6" @click="derFile">
              <img src="/src/images/standardshow1.png" alt="文件夹" class="h-14 w-14">
            </div>
            <div class="flex flex-col h-14" @click="derFile">
              <img src="/src/images/standardshow1.png" alt="文件夹" class="h-14 w-14">
            </div>
            <div class="flex flex-col h-14 pl-6" @click="derFile">
              <img src="/src/images/standardshow1.png" alt="文件夹" class="h-14 w-14">
            </div>
          </div>
          <div class="flex flex-col">
            <el-table :data="sludWaterFactoryTableData" border="true" stripe style="width: 100%">
              <el-table-column prop="name" label="污水处理厂名称"/>
              <el-table-column prop="time" label="提交时间" />
              <el-table-column prop="score" label="总得分" />
            </el-table>
          </div>
        </div>
        
        <div class="flex flex-row justify-around">
          <div @click="toSelect" class="cursor-pointer hover:text-blue-500 transition duration-300">回到首页 </div>
          <div @click="toInputStandard" class="cursor-pointer  hover:text-blue-500 transition duration-300 ">回到输入框</div>
        </div>
      </el-card>

    </div>
  </div>
</template>
