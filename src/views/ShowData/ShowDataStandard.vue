<script setup>
import * as echarts from 'echarts';
import { onMounted, reactive } from 'vue';
import { useCounterStore } from '@/stores/standardStore';
import { ref } from 'vue'
import router from '@/router';
import '@/assets/font/iconfont.css'
import '@/assets/font/demo.css'
import '@/assets/font/iconfont.js'
import requests from '@/assets/requests'
import { ElMessage } from 'element-plus';

const counter = useCounterStore()

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
  router.push('/inputstandard')
}


// // 这两个数据需要做持久化存储
// //存放OnDayResult的对象  这个对象里面有很多的数组
const ManyDayResultObj = {
  N2O: [],//N2O直接排放量[1]
  CH4: [],//CH4直接排放量[3]
  CO2: [],//CO2直接排放量[5]
  EleCInt: [],//电耗碳排放强度[8]
  HotCInt: [],//热耗碳排放强度[9]
  MatCMci: [],//物耗排放量[10]
  EvaCI: [],//评价碳排放强度计算[23]
  EvaCIScore: [],//评价碳排放强度分数[24]
  LowCScore: [],//低碳行为鼓励分数[25]
  LowCTotalScore: [],//低碳运行评价总分数[26]
  Level: [],//评价等级[27]
  IntC: [],//直接碳排放强度[7]
  IndCInt: [],//间接碳排放强度[12]
  CInt: [],//碳排放强度[13]
  Qrbi: [],//进水量[0] 很多关于强度的都要用得到
  DirCIRat: [],// 直接碳排放强度[21]
  UndCIRat: [],//间接碳排放修正强度计算//[22]
  CH4CInt: [],//CH4直接碳排放强度[4]
  N2OCInt: [],//N2O直接碳排放强度[2]
  CO2Int: [],//CO2直接碳排放量[6]
  MatCInt: [], //物耗碳排放强度[11]
  TotNRemRatn: [],//总氮去除率[14]
  TotNRemRatk: [],//总氮去除率修正系数[15]
  TreScaRat: [],//处理规模修正系数[16]
  OxyPolRemX: [],//耗氧污染物削减量X[17]
  OxyPolRemk: [],//耗氧污染物削减量修正系数[18]
  WaterOutRat: [],//出水标准修正系数[19]
  OxyConRat: [],//臭气控制程度修正系数[20]
  basicalInfo: [], //污水处理厂基本信息
  textarealvse:[],
}


// //存放日期的数组
let ManyDate = []

// //将数据从map中用循环的方式取出 。一个key对应一个value。   一个key就是一个日期 ， 一个value就是OneDayResult是一个对象。
counter.mapStandard.forEach((OneDayResult, oneDate) => {
  //OneDayResult是一个大的对象，里面有很多数组
  //从OneDayResult中取出每一个数组，放入ManyDayResultObj中
  console.log('执行了上面'); //1次
  for (const AData in OneDayResult) {
    console.log('AData', AData);  //AData是各个数组的名字，如N2O直接排放量[1]
    console.log(OneDayResult[AData], 'OneDayResult[AData]');
    console.log(ManyDayResultObj[AData], 'ManyDayResultObj[AData]');

    ManyDayResultObj[AData].push(OneDayResult[AData])
    console.log('执行了下面');//12 次
  }
  //把日期放入ManyDate中，并给他排序
  ManyDate.push(oneDate)
  ManyDate.sort((a, b) => new Date(a) - new Date(b))//默认情况下，sort将数组元素转换为字符串，然后按字母顺序进行排序。
});







// // 需要在页面中展示的数据
const totalDataValue = reactive({
  totalN2OValue: 0,
  totalCH4Value: 0,
  totalCO2Value: 0,
  totalEleValue: 0,
  totalHotValue: 0,
  totalDrugValue: 0,
  totalIntCValue: 0,
  totalIndCIntValue: 0,
  totalCIntValue: 0,
  totalQrbiValue: 0,
})
// 求和
for (let i = 0; i < ManyDayResultObj.N2O.length; i++) {
  totalDataValue.totalN2OValue += ManyDayResultObj.N2O[i]
  totalDataValue.totalCH4Value += ManyDayResultObj.CH4[i]
  totalDataValue.totalCO2Value += ManyDayResultObj.CO2[i]
  totalDataValue.totalEleValue += ManyDayResultObj.EleCInt[i]
  totalDataValue.totalHotValue += ManyDayResultObj.HotCInt[i]
  totalDataValue.totalDrugValue += ManyDayResultObj.MatCMci[i]
  totalDataValue.totalIntCValue += ManyDayResultObj.IntC[i]//7
  totalDataValue.totalIndCIntValue += ManyDayResultObj.IndCInt[i]//12
  totalDataValue.totalCIntValue += ManyDayResultObj.CInt[i]//13
  totalDataValue.totalQrbiValue += ManyDayResultObj.Qrbi[i]//进水量
}



// // 获取dom元素
const foldLineRef = ref(null)
const cakeRef = ref(null)

const textarealvse = ref(null)

// 折线图
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
// console.log(document.getElementById('Pie') ,"Pie");
// 饼图
onMounted(() => {
  // const cakePie = cakeRef.value
  // const cakeChart = echarts.init(cakePie)
  const cakeChart = echarts.init(document.getElementById('Pie'))
  console.log(document.getElementById('Pie') ,"Pie");
  
  const option = {
    // legend: {
    //   data: ['基准年', 'i年'],
    //   bottom: 10,
    // },
    // radar: {
    //   indicator: [
    //     { name: 'N2O碳排放强度', max: 6500 },
    //     { name: '甲烷碳排放强度', max: 16000 },
    //     { name: '二氧化碳排放强度', max: 30000 },
    //     { name: '电耗碳排放强度', max: 38000 },
    //     { name: '药耗碳排放强度', max: 52000 },
    //     { name: '能耗排放强度', max: 25000 }
    //   ],
    //   radius: '50%',
    //   axisName: {
    //     color: '#666',
    //     fontSize: 12,
    //     padding: [0, 0, 10, 0]
    //   }
    // },
    // series: [
    //   {
    //     name: '基准年',
    //     type: 'radar',
    //     data: [
    //       {
    //         value: [4200, 3000, 20000, 35000, 50000, 18000],
    //         name: '基准年'
    //       },
    //       {
    //         value: [5000, 14000, 28000, 26000, 42000, 21000],
    //         name: 'i年'
    //       }
    //     ]
    //   }
    // ]
    series: [
    {
      name:'碳排放强度贡献表',
      type: 'pie',
      data: [
        {
          value: ManyDayResultObj.N2OCInt[0],
          name: 'N2O'
        },
        {
          value: ManyDayResultObj.CH4CInt[0],
          name: 'CH4'
        },
        {
          value: ManyDayResultObj.CO2Int[0],
          name: 'CO2'
        },
        {
          value: ManyDayResultObj.EleCInt[0],
          name: '电耗'
        },
        {
          value: ManyDayResultObj.HotCInt[0],
          name: '热耗'
        },
        {
          value: ManyDayResultObj.MatCInt[0],
          name: '物耗'
        }
      ]
    }
  ]
  };
  // option && cakeChart.setOption(option)
  cakeChart.setOption(option)
})

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


// //将数据导出为excel表格
const derFile = () => {
  console.log('导出了数据');
  let str = "";
  let jsonData = []
  for (let i = 0; i < ManyDate.length; i++) {
    jsonData.push({
      日期: ManyDate[i],
      进水量Qrbi: Number(ManyDayResultObj.Qrbi[i]).toFixed(3),//进水量[0] 很多关于强度的都要用得到
      N2O直接排放量N2O: Number(ManyDayResultObj.N2O[i]).toFixed(3),//N2O直接排放量[1]
      N2O直接碳排放强度N2OCInt: Number(ManyDayResultObj.N2OCInt[i]).toFixed(3),//N2O直接碳排放强度[2]
      CH4直接排放量CH4: Number(ManyDayResultObj.CH4[i]).toFixed(3),//CH4直接排放量[3]
      CH4直接碳排放强度CH4CInt: Number(ManyDayResultObj.CH4CInt[i]).toFixed(3),//CH4直接碳排放强度[4]
      CO2直接排放量CO2: Number(ManyDayResultObj.CO2[i]).toFixed(3),//CO2直接排放量[5]
      CO2直接碳排放量CO2Int: Number(ManyDayResultObj.CO2Int[i]).toFixed(3),//CO2直接碳排强度[6]
      直接碳排放强度IntC: Number(ManyDayResultObj.IntC[i]).toFixed(3),//直接碳排放强度[7]
      电耗碳排放强度EleCInt: Number(ManyDayResultObj.EleCInt[i]).toFixed(3),//电耗碳排放强度[8]
      热耗碳排放强度HotCInt: Number(ManyDayResultObj.HotCInt[i]).toFixed(3),//热耗碳排放强度[9]
      物耗排放量MatCMci: Number(ManyDayResultObj.MatCMci[i]).toFixed(3),//物耗排放量[10]//
      物耗碳排放强度MatCInt: Number(ManyDayResultObj.MatCInt[i]).toFixed(3), //物耗碳排放强度[11]
      间接碳排放强度IndCInt: Number(ManyDayResultObj.IndCInt[i]).toFixed(3),//间接碳排放强度[12]
      碳排放强度CInt: Number(ManyDayResultObj.CInt[i]).toFixed(3),//碳排放强度[13]
      总氮去除率TotNRemRatn: Number(ManyDayResultObj.TotNRemRatn[i]).toFixed(3),//总氮去除率[14]
      总氮去除率修正系数TotNRemRatk: Number(ManyDayResultObj.TotNRemRatk[i]).toFixed(3),//总氮去除率修正系数[15]  
      处理规模修正系数TreScaRat: Number(ManyDayResultObj.TreScaRat[i]).toFixed(3),//处理规模修正系数[16]
      耗氧污染物削减量XOxyPolRemX: Number(ManyDayResultObj.OxyPolRemX[i]).toFixed(3),//耗氧污染物削减量X[17]
      耗氧污染物削减量修正系数OxyPolRemk: Number(ManyDayResultObj.OxyPolRemk[i]).toFixed(3),//耗氧污染物削减量修正系数[18]
      出水标准修正系数WaterOutRat: Number(ManyDayResultObj.WaterOutRat[i]).toFixed(3),//出水标准修正系数[19]
      臭气控制程度修正系数OxyConRat: Number(ManyDayResultObj.OxyConRat[i]).toFixed(3),//臭气控制程度修正系数[20]
      直接碳排放修正强度DirCIRat: Number(ManyDayResultObj.DirCIRat[i]).toFixed(3),// 直接碳排放修正强度[21]
      间接碳排放修正强度计算UndCIRat: Number(ManyDayResultObj.UndCIRat[i]).toFixed(3),//间接碳排放修正强度计算//[22]
      评价碳排放强度计算EvaCI: Number(ManyDayResultObj.EvaCI[i]).toFixed(3),//评价碳排放强度计算[23]
      评价碳排放强度分数EvaCIScore: Number(ManyDayResultObj.EvaCIScore[i]).toFixed(3),//评价碳排放强度分数[24]
      低碳行为鼓励分数LowCScore: Number(ManyDayResultObj.LowCScore[i]).toFixed(3),//低碳行为鼓励分数[25]
      低碳运行评价总分数LowCTotalScore: Number(ManyDayResultObj.LowCTotalScore[i]).toFixed(3),//低碳运行评价总分数[26]
      直接碳排放量:Number((ManyDayResultObj.N2O[0] * 265 + ManyDayResultObj.CH4[0] * 28 + ManyDayResultObj.CO2[0])).toFixed(3),
      间接碳排放量:Number((ManyDayResultObj.MatCMci[0] + ManyDayResultObj.EleCInt[0] * ManyDayResultObj.Qrbi[0]+ ManyDayResultObj.HotCInt[0] * ManyDayResultObj.Qrbi[0])).toFixed(3),
      总碳排放量:Number((ManyDayResultObj.N2O[0] * 265 + ManyDayResultObj.CH4[0] * 28 + ManyDayResultObj.CO2[0]) + ManyDayResultObj.MatCMci[0] + ManyDayResultObj.EleCInt[0] * ManyDayResultObj.Qrbi[0]+ ManyDayResultObj.HotCInt[0] * ManyDayResultObj.Qrbi[0]).toFixed(3),
      评价等级Level: ManyDayResultObj.Level[i],//评价等级[27]
      
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
  link.download = "绿色标杆污水处理厂评价.xls";
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
        <div class="flex justify-center bg-green-800"> 
          <div class="px-3">
            <img class="h-[40px] w-[40px]" src="/src/images/logo1.png" alt="广东环保">
          </div>
          <div class="ttext-center text-white">
            <p class="text-2xl font-bold">广东环保</p>
            <p class="text-mi font-middle">GDHUANBAO</p>
          </div>
          <div class="text-3xl text-center text-white font-bold pt-2.5 pl-5">
            绿色标杆污水处理厂评价
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
        <div class="flex flex-1">采用评价：污水处理厂低碳运行评价技术规范</div>
      </el-card>
      <el-card style="box-shadow: 5px 5px 5px rgb(55,159,84,0.6);" class="flex flex-row mr-4 ml-4 basis-1/2 text-base font-medium" :body-style="{ display: 'flex', width: '100%' }">
        <div class="flex flex-col flex-1">
          <div class="flex flex-1">评价碳排放得分:{{ (ManyDayResultObj.EvaCIScore[0] === undefined
            || ManyDayResultObj.EvaCIScore[0] === null) ? '未评分' :
            Number(ManyDayResultObj.EvaCIScore[0]).toFixed(2) }}</div>
          <div class="flex flex-1">低碳鼓励行为总分:{{ (ManyDayResultObj.LowCScore[0] ===
            undefined || ManyDayResultObj.LowCScore[0] === null) ? '未评分' :
            Number(ManyDayResultObj.LowCScore[0]).toFixed(2) }}</div>
          <div class="flex flex-1">总得分:{{ (ManyDayResultObj.LowCTotalScore[0] ===
            undefined || ManyDayResultObj.LowCTotalScore[0] === null) ? '未评分' :
            Number(ManyDayResultObj.LowCTotalScore[0]).toFixed(2) }}</div>
          <div class="flex flex-1">基准年等级:</div>
          <div class="flex flex-col flex-1">
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
          </div>
        </div>
        <div class="text-green-600 text-8xl flex items-center justify-center flex-1 w-full">{{ (ManyDayResultObj.Level[0]
          === undefined
          || ManyDayResultObj.Level[0] === null) ? '未评级' :
          ManyDayResultObj.Level[0]
          }}</div>
      </el-card>
      <el-card style="box-shadow: 5px 5px 5px rgb(55,159,84,0.6);" class="flex flex-row mr-4 ml-4 basis-1/4 text-base font-medium" :body-style="{ display: 'flex', width: '100%' }">
        <div class="flex flex-col flex-1">
          <div class="flex flex-1">直接碳排放量:{{ ((ManyDayResultObj.N2O[0] * 265 + ManyDayResultObj.CH4[0] * 28 + ManyDayResultObj.CO2[0]) === undefined
            || (ManyDayResultObj.N2O[0] * 265 + ManyDayResultObj.CH4[0] * 28 + ManyDayResultObj.CO2[0]) === null) ? '无数据' :
            Number((ManyDayResultObj.N2O[0] * 265 + ManyDayResultObj.CH4[0] * 28 + ManyDayResultObj.CO2[0])).toFixed(2) }}kg</div>
          <div class="flex flex-1">直接碳排放强度:{{ (ManyDayResultObj.IntC[0] ===
            undefined || ManyDayResultObj.IntC[0] === null) ? '无数据' :
            Number(ManyDayResultObj.IntC[0]).toFixed(2) }}kg/m<sup>3</sup></div>
          <div class="flex flex-1">间接碳排放量:{{ (ManyDayResultObj.MatCMci[0] + ManyDayResultObj.EleCInt[0] * ManyDayResultObj.Qrbi[0]+ ManyDayResultObj.HotCInt[0] * ManyDayResultObj.Qrbi[0] ===
            undefined || ManyDayResultObj.MatCMci[0] + ManyDayResultObj.EleCInt[0] * ManyDayResultObj.Qrbi[0]+ ManyDayResultObj.HotCInt[0] * ManyDayResultObj.Qrbi[0] === null) ? '无数据' :
            Number(ManyDayResultObj.MatCMci[0] + ManyDayResultObj.EleCInt[0] * ManyDayResultObj.Qrbi[0]+ ManyDayResultObj.HotCInt[0] * ManyDayResultObj.Qrbi[0]).toFixed(2) }}kg</div>
          <div class="flex flex-1">间接碳排放强度:{{ (ManyDayResultObj.IndCInt[0] === undefined
            || ManyDayResultObj.IndCInt[0] === null) ? '无数据' :
            Number(ManyDayResultObj.IndCInt[0]).toFixed(2) }}kg/m<sup>3</sup></div> 
          <div class="flex flex-1">总碳排放量:{{ ((ManyDayResultObj.N2O[0] * 265 + ManyDayResultObj.CH4[0] * 28 + ManyDayResultObj.CO2[0] + ManyDayResultObj.MatCMci[0] + ManyDayResultObj.EleCInt[0] * ManyDayResultObj.Qrbi[0]+ ManyDayResultObj.HotCInt[0] * ManyDayResultObj.Qrbi[0]) ===
            undefined || (ManyDayResultObj.N2O[0] * 265 + ManyDayResultObj.CH4[0] * 28 + ManyDayResultObj.CO2[0] + ManyDayResultObj.MatCMci[0] + ManyDayResultObj.EleCInt[0] * ManyDayResultObj.Qrbi[0]+ ManyDayResultObj.HotCInt[0] * ManyDayResultObj.Qrbi[0]) === null) ? '无数据' :
            Number((ManyDayResultObj.N2O[0] * 265 + ManyDayResultObj.CH4[0] * 28 + ManyDayResultObj.CO2[0] + ManyDayResultObj.MatCMci[0] + ManyDayResultObj.EleCInt[0] * ManyDayResultObj.Qrbi[0]+ ManyDayResultObj.HotCInt[0] * ManyDayResultObj.Qrbi[0])).toFixed(2) }}kg</div>
          <div class="flex flex-1">总碳排放强度:{{ (ManyDayResultObj.CInt[0] ===
            undefined || ManyDayResultObj.CInt[0] === null) ? '无数据' :
            Number(ManyDayResultObj.CInt[0]).toFixed(2) }}kg/m <sup>3</sup></div>
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
