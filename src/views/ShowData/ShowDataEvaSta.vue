<script setup>
import * as echarts from 'echarts';
import { onMounted, reactive } from 'vue';
import { useEvaStaStore } from '@/stores/evastaStore';
import { ref } from 'vue'
import router from '@/router';
import '@/assets/font/iconfont.css'
import '@/assets/font/demo.css'
import '@/assets/font/iconfont.js'
import requests from '@/assets/requests'
import { ElMessage } from 'element-plus';

const counter = useEvaStaStore()


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
  router.push('/inputevasta')
}


// // 这两个数据需要做持久化存储
// //存放OnDayResult的对象  这个对象里面有很多的数组
const ManyDayResultObj = {
  OCEw_fCO2m:[],//2.1化石源碳矿化产生的碳排放量
  OCEw_eCO2m:[],//2.2外加碳源矿化产生的化石源CO2碳排放量
  OCEw_CH4m:[],//有实测是3  没实测是4
  OCEw_N2Om:[],//2.4 N2O碳排放当量
  OCEw_ban:[],//2.5 污水处理阶段生化反应年度碳排放量（直接排放）
  OCEw_ecm:[],//3.1 电力消耗产生的碳排放量
  //3.2 用于污水处理阶段的锅炉、热蒸汽生产、设备运转等固定式能源燃料消耗产生的碳排放量，以及外购热源等非电力能源消耗折合的碳排放量（即热耗）
  OCEw_fcm:[],//[8]
  //  3.3.3  污水处理阶段药剂消耗产生的碳排放量  3.3药剂消耗产生的碳排放量
  OCEw_ccm:[],
  OCEw_rean:[],//[7][9][8][10] 3.4 污水处理阶段能源和药剂消耗产生的碳排放量（间接排放）
  OCEs_CH4adm:[],// 4.2污泥厌氧消化沼气收集管路的无意泄露与火炬不充分燃烧的排放
  OCE_Biogas_N2O:[],
  OCEs_CH4afm:[], //4.4-1  4.4污泥好氧发酵过程生化反应的碳排放
  OCEs_N2Oafm:[],//4.4-2
  OCEs_fCO2incm:[],//4.5污泥干化焚烧或协同焚烧-化石源碳被氧化产生的CO2碳排放
  OCEs_CH4incm:[],//4.6污泥干化焚烧或协同焚烧-不完全燃烧产生的CH4和N2O
  OCEs_N2Oincm:[],//4.6-2
  OCEs_fCO2incmCop:[],
  OCEs_CH4incmCop:[],
  OCEs_N2OincmCop:[],
  OCEs_ban:[],// 4.8污泥处理生化反应的碳排放总量
  OCEw_ecmCopy:[],
  OCEw_ccmCopy:[],
  OCEw_fcmCopy:[],
  OCEs_rean:[],
  OCA_hpm:[],//5.1热泵技术回收污水中热量的替碳量
  OCA_pvm:[],//5.2光伏发电替碳量
  OCA_wsm:[],//5.3再生水利用替碳量
  OCA_adm:[],//5.4污泥厌氧消化沼气利用的替碳量
  OCA_incm:[],// 5.5污泥干化焚烧或热解处理过程的替碳量
  OCA_landm:[],//5.6污泥经过厌氧、好氧或碳化处理后的替碳量
  OCA_an:[],//5.8 污水厂替碳量
  OCE_oman:[],//6.运维阶段的年度碳排放量
  OCE_csAdd:[],//7.1建设阶段的碳排放量
  OCE_csRem:[],//7.1拆除阶段的碳排放量
  OCE_lcom:[],//7.2全生命周期运维阶段的碳排放量
  OCEs_dCH4lfan:[],//7.3污泥处置阶段的碳排放量（污泥填埋专用）
  OCEs_dCH4landan:[],// 4.4.2-1   7.4污泥土地利用后分解产生的CH4和N2O排放
  OCEs_dN2Olandan:[],// 4.4.2-2
  OCEsd_ecr:[],// 4.4.2-2
  OCEsd_fcr:[],// 4.4.2-2
  //7.5污泥填埋的能源消耗碳排放电力部分套用3.1章节；非电力部分套用3.2章节的计算代码
  CEs_dtransran:[],//7.6污泥及其产物运输至处置地点产生的碳排放量
  CEs_dan:[], // 7.7污泥处置阶段的碳排放量
  OCE_exN2Oan:[], // 7.8污水排入受纳水体的延伸阶段碳排放量
  OCE_lc:[], //【36】【37】【38】【45】【46】
  OCE_Ioman:[], //8.1运维阶段年度碳排放强度
  OCE_IomanX:[], //8.2年度污染物削减碳排放强度
  Xan:[],//[49]
  OCR_oman:[],// 5.3.1 污水厂运维阶段碳减排量  
  OCR_Ioman:[],//5.3.2  评估年度相对于基准年度的碳减排强度  
  OCR_IomanX:[],//5.3.3  评估年度相对于基准年度的污染物削减碳减排强度  
  OCE_Iomang:[],//8.4 评估年度相对于行业同类平均水平的碳排放强度目标差
  OCB_stan:[],//8.5碳排放贡献度  
  OCE_Ilc:[],//9.1 全生命周期碳排放强度
  OX:[],//6.2.2-2
  OCE_IlcX:[],//6.2.2-1
  //9.3评估年度相对于行业同类平均水平的碳排放强度目标差
  OCE_Ilcg:[],
  OCB_lcst:[],//9.4全生命周期的各处理阶段的碳排放贡献度
  basicalInfo:[],
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

    ManyDayResultObj[AData].push(OneDayResult[AData]);
    console.log(ManyDayResultObj[AData], 'ManyDayResultObj[AData]');
    console.log('执行了下面');//12 次
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

// 雷达图
onMounted(() => {
  const cakeDom = cakeRef.value
  const cakeChart = echarts.init(cakeDom)
  const option = {
  //   legend: {
  //     data: ['基准年', 'i年'],
  //     bottom: 10,
  //   },
  //   radar: {
  //     indicator: [
  //       { name: 'N2O碳排放强度', max: 6500 },
  //       { name: '甲烷碳排放强度', max: 16000 },
  //       { name: '二氧化碳排放强度', max: 30000 },
  //       { name: '电耗碳排放强度', max: 38000 },
  //       { name: '药耗碳排放强度', max: 52000 },
  //       { name: '能耗排放强度', max: 25000 }
  //     ],
  //     radius: '50%',
  //     axisName: {
  //       color: '#666',
  //       fontSize: 12,
  //       padding: [0, 0, 10, 0]
  //     }
  //   },
  //   series: [
  //     {
  //       name: '基准年',
  //       type: 'radar',
  //       data: [
  //         {
  //           value: [4200, 3000, 20000, 35000, 50000, 18000],
  //           name: '基准年'
  //         },
  //         {
  //           value: [5000, 14000, 28000, 26000, 42000, 21000],
  //           name: 'i年'
  //         }
  //       ]
  //     }
  //   ]
  series: [
    {
      name:'碳排放强度贡献表',
      type: 'pie',
      data: [
        {
          value: ManyDayResultObj.OCEw_N2Om[0],
          name: 'N2O'
        },
        {
          value: ManyDayResultObj.OCEw_CH4m[0],
          name: 'CH4'
        },
        {
          value: ManyDayResultObj.OCEw_eCO2m[0] + ManyDayResultObj.OCEw_fCO2m[0],
          name: 'CO2'
        },
        {
          value: ManyDayResultObj.OCEw_ecm[0],
          name: '电耗'
        },
        {
          value: ManyDayResultObj.OCEw_fcm[0],
          name: '热耗'
        },
        {
          value: ManyDayResultObj.OCEw_ccm[0],
          name: '物耗'
        }
      ]
    }
  ]
  };
  option && cakeChart.setOption(option)
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
      数据1:Number(ManyDayResultObj.OCEw_fCO2m[i]).toFixed(3),//[1]
      数据2:Number(ManyDayResultObj.OCEw_eCO2m[i]).toFixed(3),//[2]
      数据3or数据4:Number(ManyDayResultObj.OCEw_CH4m[i]).toFixed(3),//[3]or[4]
      数据5:Number(ManyDayResultObj.OCEw_N2Om[i]).toFixed(3),//[5]
      数据6:Number(ManyDayResultObj.OCEw_ban[i]).toFixed(3),//[6]
      数据7:Number(ManyDayResultObj.OCEw_ecm[i]).toFixed(3),//[7]
      数据8:Number(ManyDayResultObj.OCEw_fcm[i]).toFixed(8),//[8]
      数据9:Number(ManyDayResultObj.OCEw_ccm[i]).toFixed(8),//[9]
      数据10:Number(ManyDayResultObj.OCEw_rean[i]).toFixed(3),//[10]
      数据11:Number(ManyDayResultObj.OCEs_CH4adm[i]).toFixed(3),//[11]
      数据12:Number(ManyDayResultObj.OCE_Biogas_N2O[i]).toFixed(3),//[12]
      数据13:Number(ManyDayResultObj.OCEs_CH4afm[i]).toFixed(3),//[13]
      数据14:Number(ManyDayResultObj.OCEs_N2Oafm[i]).toFixed(3),//[14]
      数据15:Number(ManyDayResultObj.OCEs_fCO2incm[i]).toFixed(3),//[15]
      数据16:Number(ManyDayResultObj.OCEs_CH4incm[i]).toFixed(3),//[16]
      数据17:Number(ManyDayResultObj.OCEs_N2Oincm[i]).toFixed(3),//[17]
      数据18:Number(ManyDayResultObj.OCEs_fCO2incmCop[i]).toFixed(3),//[18]
      数据19:Number(ManyDayResultObj.OCEs_CH4incmCop[i]).toFixed(3),//[19]
      数据20:Number(ManyDayResultObj.OCEs_N2OincmCop[i]).toFixed(3),//[20]
      数据21:Number(ManyDayResultObj.OCEs_ban[i]).toFixed(3),//[21]
      数据22:Number(ManyDayResultObj.OCEw_ecmCopy[i]).toFixed(3),//[22]
      数据23:Number(ManyDayResultObj.OCEw_ccmCopy[i]).toFixed(3),//[23]
      数据24:Number(ManyDayResultObj.OCEw_fcmCopy[i]).toFixed(3),//[24]
      数据25:Number(ManyDayResultObj.OCEs_rean[i]).toFixed(3),//[25]
      数据26:Number(ManyDayResultObj.OCA_hpm[i]).toFixed(3),//[26]
      数据27:Number(ManyDayResultObj.OCA_pvm[i]).toFixed(3),//[27]
      数据28:Number(ManyDayResultObj.OCA_wsm[i]).toFixed(3),//[28]
      数据29:Number(ManyDayResultObj.OCA_adm[i]).toFixed(3),//[29]
      数据30:Number(ManyDayResultObj.OCA_incm[i]).toFixed(3),//[30]
      数据31:Number(ManyDayResultObj.OCA_landm[i]).toFixed(3),//[31]
      // $32:Number(ManyDayResultObj.OCA_incm[i]).toFixed(3),//[32]
      数据33:Number(ManyDayResultObj.OCA_an[i]).toFixed(3),//[33]
      数据34:0,//[34]
      数据35:Number(ManyDayResultObj.OCE_oman[i]).toFixed(3),//[35]
      数据36:Number(ManyDayResultObj.OCE_csAdd[i]).toFixed(3),//[36]
      数据37:Number(ManyDayResultObj.OCE_csRem[i]).toFixed(3),//[37]
      数据38:Number(ManyDayResultObj.OCE_lcom[i]).toFixed(3),//[38]
      数据39:Number(ManyDayResultObj.OCEs_dCH4lfan[i]).toFixed(3),//[39]
      数据40:Number(ManyDayResultObj.OCEs_dCH4landan[i]).toFixed(3),//[40]
      数据41:Number(ManyDayResultObj.OCEs_dN2Olandan[i]).toFixed(3),//[41]
      数据42:Number(ManyDayResultObj.OCEsd_ecr[i]).toFixed(3),//[42]
      数据43:Number(ManyDayResultObj.OCEsd_fcr[i]).toFixed(3),//[43]
      数据44:Number(ManyDayResultObj.CEs_dtransran[i]).toFixed(3),//[44]
      数据45:Number(ManyDayResultObj.CEs_dan[i]).toFixed(3),//[45]
      数据46:Number(ManyDayResultObj.OCE_exN2Oan[i]).toFixed(3),//[46]
      数据47:Number(ManyDayResultObj.OCE_lc[i]).toFixed(3),//[47]
      数据48:Number(ManyDayResultObj.OCE_Ioman[i]).toFixed(3),//[48]
      数据49:Number(ManyDayResultObj.Xan[i]).toFixed(3),//[49]
      数据50:Number(ManyDayResultObj.OCE_IomanX[i]).toFixed(6),//[50]
      数据51:Number(ManyDayResultObj.OCR_oman[i]).toFixed(3),//[51]
      数据52:Number(ManyDayResultObj.OCR_Ioman[i]).toFixed(3),//[52]
      数据53:Number(ManyDayResultObj.OCR_IomanX[i]).toFixed(3),//[53]
      数据54:Number(ManyDayResultObj.OCE_Iomang[i]).toFixed(3),//[54]
      数据55:Number(ManyDayResultObj.OCE_Ilc[i]).toFixed(3),//[55]
      数据56:Number(ManyDayResultObj.OX[i]).toFixed(3),//[56]
      数据57:Number(ManyDayResultObj.OCE_IlcX[i]).toFixed(3),//[57]
      数据58:Number(ManyDayResultObj.OCE_Ilcg[i]).toFixed(3),//[58]
    });
  }
  console.log(ManyDayResultObj.OCEw_eCO2m[0],'ManyDayResultObj.OCEw_fCO2m[i]');
  
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
  link.download = "污水厂碳减排评估.xls";
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
    <!-- <div className="
            bg-white
            border-b-2
            border-gray-300
            p-4
            font-bold
            text-2xl
            text-center
            top-0
            z-10
        ">
        城镇污水处理厂碳减排评估标准

    </div> -->
    <!-- <div class="flex flex-col mt-[20px] h-[90vh]">
        <div class="flex justify-around mt-[50px] flex-1"> -->
            <!-- 数据总览 -->
            <!-- <div class="flex flex-col rounded-lg flex-1 mr-10 ml-16 shadow-md">
                <div class="flex ml-4 mt-4 ">
                    <div class="w-[3px] h-[18px] bg-sky-500 rounded-md mr-4 mt-1"></div>
                    <div>数据总览</div>
                </div>
                <div class="flex flex-row flex-wrap mt-3 ml-4 flex-1">
                    <div class="flex w-1/2 h-[60px]">
                        <svg class="icon svg-icon h-8 w-8" aria-hidden="true">
                            <use xlink:href="#icon-a-shipinduomeiti"></use>
                        </svg>
                        <div class="flex flex-col ml-5">
                            <div>直接碳排放当量：</div>
                            <div class="text-2xl font-bold">{{ (totalDataValue.totalIntCValue *
                                totalDataValue.totalQrbiValue).toFixed(2) }}
                            </div>
                        </div>
                    </div>
                    <div class="flex w-1/2 h-[60px]">
                        <svg class="icon svg-icon h-8 w-8" aria-hidden="true">
                            <use xlink:href="#icon-a-shipinduomeiti"></use>
                        </svg>
                        <div class="flex flex-col ml-5">
                            <div>间接碳排放总量：</div>
                            <div class="text-2xl font-bold">{{ (totalDataValue.totalIndCIntValue *
                                totalDataValue.totalQrbiValue).toFixed(2) }}
                            </div>
                        </div>
                    </div>
                    <div class="flex w-1/2 h-[60px]">
                        <svg class="icon svg-icon h-8 w-8" aria-hidden="true">
                            <use xlink:href="#icon-a-shipinduomeiti"></use>
                        </svg>
                        <div class="flex flex-col ml-5">
                            <div>总碳排放量：</div>
                            <div class="text-2xl font-bold">{{ (totalDataValue.totalCIntValue *
                                totalDataValue.totalQrbiValue).toFixed(2) }}
                            </div>
                        </div>
                    </div>
                    <div class="flex w-1/2 h-[60px]">
                        <svg class="icon svg-icon h-8 w-8" aria-hidden="true">
                            <use xlink:href="#icon-a-shipinduomeiti"></use>
                        </svg>
                        <div class="flex flex-col ml-5">
                            <div>直接碳排放强度：</div>
                            <div class="text-2xl font-bold">{{ Number(totalDataValue.totalIntCValue /
                                (ManyDayResultObj.N2O.length ===
                                    0 ? 1 : ManyDayResultObj.N2O.length)).toFixed(2)
                                }}</div>
                        </div>
                    </div>
                    <div class="flex w-1/2 h-[60px]">
                        <svg class="icon svg-icon h-8 w-8" aria-hidden="true">
                            <use xlink:href="#icon-a-shipinduomeiti"></use>
                        </svg>
                        <div class="flex flex-col ml-5">
                            <div>间接碳排放强度：</div>
                            <div class="text-2xl font-bold">{{ (totalDataValue.totalIndCIntValue /
                                (ManyDayResultObj.N2O.length === 0
                                    ?
                                1 : ManyDayResultObj.N2O.length)).toFixed(2) }}</div>
                        </div>
                    </div>
                    <div class="flex w-1/2 h-[60px]">
                        <svg class="icon svg-icon h-8 w-8" aria-hidden="true">
                            <use xlink:href="#icon-a-shipinduomeiti"></use>
                        </svg>
                        <div class="flex flex-col ml-5">
                            <div>总碳排放强度：</div>
                            <div class="text-2xl font-bold">{{ (totalDataValue.totalCIntValue /
                                (ManyDayResultObj.N2O.length === 0 ? 1
                                : ManyDayResultObj.N2O.length)).toFixed(2) }}</div>
                        </div>
                    </div>
                </div>
            </div> -->
            <!-- 饼图 -->
            <!-- <div class="flex-1 rounded-lg  mx-2 shadow-md" ref="cakeRef"></div> -->
            <!-- 折线图 -->
            <!-- <div class="flex-1 rounded-lg  ml-10 mr-16 shadow-md" ref="CIntRef"
                v-show="ManyDayResultObj.CInt.length >= 2">
            </div>
            <div class="flex-1 rounded-lg  ml-10 mr-16 shadow-md" v-show="ManyDayResultObj.CInt.length < 2">
                <div class="flex flex-col items-center mt-10 h-1/2"> -->
                    <!-- <p class="text-xl font-bold">数据不足连成折线</p> -->
                    <!-- <div class="text-4xl font-bold flex-1">CInt的值为：</div>
                    <div class="text-2xl flex-1">{{ ManyDayResultObj.CInt[0] && ManyDayResultObj.CInt[0].toFixed(2) }}
                    </div>
                </div>
            </div>
        </div>

        <div class=" flex justify-around mt-[50px] flex-1"> -->
            <!-- 评价结果 -->
            <!-- <div class="flex-1 flex rounded-lg flex-col mr-10 ml-16 shadow-md">
                <div class="flex ml-4 mt-4">
                    <div class="w-[3px] h-[18px] bg-sky-500 rounded-md mr-4 mt-1"></div>
                    <div>评价结果</div>
                </div>
                <div class="flex flex-1 flex-wrap justify-between ml-6">
                    <div class="w-1/2 mb-2">
                        <div class="text-gray-600">评价碳排放强度:</div>
                        <div class="text-2xl font-bold">
                            {{ (ManyDayResultObj.EvaCI[0] === undefined
                                || ManyDayResultObj.EvaCI[0] === null) ? '未评分' :
                                Number(ManyDayResultObj.EvaCI[0]).toFixed(2) }}
                        </div>
                    </div>
                    <div class="w-1/2 mb-2">
                        <div class="text-gray-600">评价碳排放得分:</div>
                        <div class="text-2xl font-bold">
                            {{ (ManyDayResultObj.EvaCIScore[0] === undefined
                                || ManyDayResultObj.EvaCIScore[0] === null) ? '未评分' :
                                Number(ManyDayResultObj.EvaCIScore[0]).toFixed(2) }}
                        </div>
                    </div>
                    <div class="w-1/2 mb-2">
                        <div class="text-gray-600">低碳鼓励行为总分:</div>
                        <div class="text-2xl font-bold">
                            {{ (ManyDayResultObj.LowCScore[0] ===
                                undefined || ManyDayResultObj.LowCScore[0] === null) ? '未评分' :
                                Number(ManyDayResultObj.LowCScore[0]).toFixed(2) }}
                        </div>
                    </div>
                    <div class="w-1/2 mb-2">
                        <div class="text-gray-600">加权总得分:</div>
                        <div class="text-2xl font-bold">
                            {{ (ManyDayResultObj.LowCTotalScore[0] ===
                                undefined || ManyDayResultObj.LowCTotalScore[0] === null) ? '未评分' :
                                Number(ManyDayResultObj.LowCTotalScore[0]).toFixed(2) }}
                        </div>
                    </div>
                    <div class="w-full mb-2">
                        <div class="text-gray-600">属于第几级:</div>
                        <div class="text-2xl font-bold">
                            {{ (ManyDayResultObj.Level[0] === undefined
                                || ManyDayResultObj.Level[0] === null) ? '未评级' :
                                ManyDayResultObj.Level[0]
                            }}
                        </div>
                    </div>
                </div>
            </div> -->
            <!-- 动态 -->
            <!-- <div class="flex-1 rounded-lg  mx-2 shadow-md">
                <div class="flex ml-4 mt-4">
                    <div class="w-[3px] h-[18px] bg-sky-500 rounded-md mr-4 mt-1"></div>
                    <div>动态</div>
                </div>
                <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
                    <el-table-column prop="name" label="Name" width="80" />
                    <el-table-column prop="date" label="Date" width="80" />
                    <el-table-column prop="address" label="Address" />
                </el-table>
            </div> -->
            <!-- 快速操作 -->
            <!-- <div class="flex-1 rounded-lg  ml-10 mr-16 shadow-md">
                <div class="flex ml-4 mt-4">
                    <div class="w-[3px] h-[18px] bg-sky-500 rounded-md mr-4 mt-1"></div>
                    <div>快速操作</div>
                </div>
                <div class="flex justify-around mt-[50px]">
                    <div class="flex flex-col h-[100px] cursor-pointer" @click="toSelect">
                        <svg class="icon svg-icon h-14 w-14" aria-hidden="true">
                            <use xlink:href="#icon-a-duankouduomeiti"></use>
                        </svg>
                        <div>回到首页</div>
                    </div>
                    <div class="flex flex-col h-[100px] cursor-pointer" @click="toInputStandard">
                        <svg class="icon svg-icon h-14 w-14" aria-hidden="true">
                            <use xlink:href="#icon-a-vrxunixianshiduomeiti"></use>
                        </svg>
                        <div>快速录入</div>
                    </div>
                    <div class="flex flex-col h-[100px] cursor-pointer" @click="toChangeData">
                        <svg class="icon svg-icon h-14 w-14" aria-hidden="true">
                            <use xlink:href="#icon-a-sduanziduankouduomeiti"></use>
                        </svg>
                        <div>修改数据</div>
                    </div>
                    <div class="flex flex-col h-[100px] cursor-pointer" @click="derFile">
                        <svg class="icon svg-icon h-14 w-14" aria-hidden="true">
                            <use xlink:href="#icon-a-huandengpianpptyanshijiaoxue"></use>
                        </svg>
                        <div>导出数据</div>
                    </div>
                </div>

                <el-dialog v-model="dialogFormVisible" title="请先登录" width="500">
                    <el-form :model="form">
                        <el-form-item label="账号" :label-width="formLabelWidth">
                            <el-input v-model="form.userId" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="密码" :label-width="formLabelWidth">
                            <el-input v-model="form.password" autocomplete="off" type="password" />
                        </el-form-item>
                    </el-form>
                    <template #footer>
                        <div class="dialog-footer">
                            <el-button @click="cancelLogin">取消</el-button>
                            <el-button type="primary" @click="confirmLogin">
                                确定
                            </el-button>
                        </div>
                    </template>
                </el-dialog>

            </div> -->
        <!-- </div>
    </div> -->

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
            污水厂碳减排评价
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
        <div class="text-center p-1 mt-1">趋势</div>
      </div>
    </div>
    <div class="flex flex-row flex-1 mb-4">
      <el-card style="box-shadow: 5px 5px 5px rgb(55,159,84,0.6);" class="flex ml-4 basis-1/4 text-base font-medium" :body-style="{ display: 'flex', width: '100%', flexDirection: 'column' }">
        <div class="flex flex-1">隶属区域中心：{{ ManyDayResultObj.basicalInfo[0]?.areaCenter || '暂无数据' }}</div>
        <div class="flex flex-1">年进水水量：{{ ManyDayResultObj.basicalInfo[0]?.waterYear || '暂无数据' }}</div>
        <div class="flex flex-1">处理工艺：{{ ManyDayResultObj.basicalInfo[0]?.handleStyle || '暂无数据' }}</div>
        <div class="flex flex-1">建厂时间：{{ ManyDayResultObj.basicalInfo[0]?.createdTime || '暂无数据' }}</div>
        <div class="flex flex-1">采用评价：城镇污水处理厂碳减排处理标准</div>
      </el-card>
      <el-card style="box-shadow: 5px 5px 5px rgb(55,159,84,0.6);" class="flex flex-row mr-4 ml-4 basis-1/2 text-base font-medium" :body-style="{ display: 'flex', width: '100%' }">
        <div class="flex flex-col flex-1">
          <div class="flex flex-1">碳排放总量:{{ (ManyDayResultObj.OCE_oman[0] === undefined
            || ManyDayResultObj.OCE_oman[0] === null) ? '无数据' :
            Number(ManyDayResultObj.OCE_oman[0]).toFixed(2) /*[35]*/}}</div>
          <div class="flex flex-1">碳排放强度:{{ (ManyDayResultObj.OCE_Ioman[0] ===
            undefined || ManyDayResultObj.OCE_Ioman[0] === null) ? '无数据' :
            Number(ManyDayResultObj.OCE_Ioman[0]).toFixed(2) /*[48]*/}}</div>
          <div class="flex flex-1">行业平均水平:{{ (ManyDayResultObj.OCE_Ioman[0] ===
            undefined || ManyDayResultObj.OCE_Ioman[0] === null) ? '无数据' :
            Number(ManyDayResultObj.OCE_Ioman[0]).toFixed(2) /*[48]*/}}</div>
          <div class="flex flex-1">与行业平均水平差值:{{ (ManyDayResultObj.OCE_Iomang[0] ===
            undefined || ManyDayResultObj.OCE_Iomang[0] === null) ? '无数据' :
            Number(ManyDayResultObj.OCE_Iomang[0]).toFixed(2) /*[54]*/}}</div>
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
        <div class="text-red-600 text-8xl flex items-center justify-center flex-1 w-full">{{ (ManyDayResultObj.OCE_Iomang[0] > 0 )
           ? '高' :((ManyDayResultObj.OCE_Iomang[0] == 0 ) ? '持平' : '优')
          }}</div>
      </el-card>
      <el-card style="box-shadow: 5px 5px 5px rgb(55,159,84,0.6);" class="flex flex-row mr-4 ml-4 basis-1/4 text-base font-medium" :body-style="{ display: 'flex', width: '100%' }">
        <div class="flex flex-col flex-1">
          <!-- <div class="flex flex-1">二氧化碳(投加碳源)碳排放当量 :  {{ (ManyDayResultObj.OCEw_fCO2m[0] === undefined
            || ManyDayResultObj.OCEw_fCO2m[0] === null) ? '无数据' :
            Number(ManyDayResultObj.OCEw_fCO2m[0]).toFixed(2) /*[1]*/}}</div>
          <div class="flex flex-1">二氧化碳(化石源)碳排放当量 :  {{ (ManyDayResultObj.OCEw_eCO2m[0] ===
            undefined || ManyDayResultObj.OCEw_eCO2m[0] === null) ? '无数据' :
            Number(ManyDayResultObj.OCEw_eCO2m[0]).toFixed(2) /*[2]*/}}</div> -->
          <div class="flex flex-1">二氧化碳直接碳排放当量 :  {{ (ManyDayResultObj.OCEw_fCO2m[0] + ManyDayResultObj.OCEw_eCO2m[0] ===
            undefined || ManyDayResultObj.OCEw_fCO2m[0] + ManyDayResultObj.OCEw_eCO2m[0] === null) ? '无数据' :
            Number(ManyDayResultObj.OCEw_fCO2m[0] + ManyDayResultObj.OCEw_eCO2m[0]).toFixed(2) /*[1]+[2]*/}}</div>
          <div class="flex flex-1">甲烷直接碳排放当量 :  {{ (ManyDayResultObj.OCEw_CH4m[0] ===
            undefined || ManyDayResultObj.OCEw_CH4m[0] === null) ? '无数据' :
            Number(ManyDayResultObj.OCEw_CH4m[0]).toFixed(2) /*[3or4]*/}}</div>
          <div class="flex flex-1">氧化亚氮直接碳排放当量 :  {{ (ManyDayResultObj.OCEw_N2Om[0] ===
            undefined || ManyDayResultObj.OCEw_N2Om[0] === null) ? '无数据' :
            Number(ManyDayResultObj.OCEw_N2Om[0]).toFixed(2) /*[5]*/}}</div>
          <div class="flex flex-1">电耗间接碳排放当量 :  {{ (ManyDayResultObj.OCEw_ecm[0] ===
            undefined || ManyDayResultObj.OCEw_ecm[0] === null) ? '无数据' :
            Number(ManyDayResultObj.OCEw_ecm[0]).toFixed(2) /*[7]*/}}</div>
          <div class="flex flex-1">热耗间接碳排放当量 :  {{ (ManyDayResultObj.OCEw_fcm[0] ===
            undefined || ManyDayResultObj.OCEw_fcm[0] === null) ? '无数据' :
            Number(ManyDayResultObj.OCEw_fcm[0]).toFixed(2) /*[8]*/}}</div>
          <div class="flex flex-1">药耗间接碳排放当量 :  {{ (ManyDayResultObj.OCEw_ccm[0] ===
            undefined || ManyDayResultObj.OCEw_ccm[0] === null) ? '无数据' :
            Number(ManyDayResultObj.OCEw_ccm[0]).toFixed(2) /*[9]*/}}</div>
          <div class="flex flex-1">替碳量 :  {{ (ManyDayResultObj.OCA_an[0] ===
            undefined || ManyDayResultObj.OCA_an[0] === null) ? '无数据' :
            Number(ManyDayResultObj.OCA_an[0]).toFixed(2) /*[33]*/}}</div>
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
        <div class="w-full h-5/6" ref="cakeRef">
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

<style></style>
