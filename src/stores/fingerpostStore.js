import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import { collapseEmits } from 'element-plus'
export const usefingerpostStore = defineStore('fingerpostStore', () => {

    // 评价等级

    const ifShow = ref(true)

    //建立一个映射，键是日期，值是oneDayResult
    const mapStandard = new Map()
    const mapEvaSta = new Map()
    const mapFingerpost = new Map()




    // // CH4回收量
    // const CH4Rec = reactive({
    //     WCH4: null,// ——城镇污水处理厂 CH4年回收量，t/a；
    //     RCH4: null// ——城镇污水处理厂城镇污水处理过程中年回收的 CH4体积，m3/a；
    // })


    // //COD 和 TN 去除量
    // const CODTNRem = reactive({
    //     Rj: null,
    //     j: null,
    //     Q: null,
    //     Pinj: null,
    //     Poutj: null,
    // })


    // // 污泥处理量
    // const SludDis = reactive({
    //     SR: null,
    //     SG: null,
    //     SE: null,
    //     Wa: null,
    //     EFs: null,
    //     D: null,
    // })



    // // 回收甲烷（CH4）产生的温室气体减排量
    // const CH4RecPro = reactive({
    //     E1: null,
    //     WCH4: null,
    //     GWPCH4: 21,
    // })


    // //去除 COD 产生的温室气体排放量
    // const CODRemPro = reactive({
    //     E2: null,
    //     RCOD: null,
    //     SG: null,
    //     Ps: null,
    //     WCH4: null,
    //     EFCH4: null,
    //     GWPCH4: 21,
    //     MCF: null,
    //     B0: null
    // })


    // //  ——CH4 排放因子，t CH4/t COD；
    // // const EFCH4 = reactive({
    // //     EFCH4: null,
    // //     MCF: null,
    // //     B0: null
    // // })



    // //  处理污泥产生的温室气体排放量
    // const HandleSludPro = reactive({
    //     E3: null,
    //     SR: null,
    //     Bs: null,
    //     DOCf: null,
    //     MCF: null,
    //     F: null,
    //     CCH4: null
    // })


    // // 去除 TN 产生的 N2O 排放量
    // const TNRemProN2O = reactive({
    //     E4: null,
    //     RTN: null,
    //     EFN2O: null,
    //     CN2O: 44 / 28,
    //     GWPCO2: 310,
    // })


    // // 城镇污水处理消耗电力产生的 CO2排放量
    // const EleCO2Pro = reactive({
    //     E5: null,
    //     EH: null,
    //     EFCO2: null,
    //     GWPCO2: 1,
    // })


    // // 温室气体净减排总量
    // const TotRemCO2 = reactive({
    //     Eg: null,
    //     E1: null,
    //     E2: null,
    //     E3: null,
    //     E4: null,
    //     E5: null
    // })


    // // CH4直接排放量
    // const CH4 = reactive({
    //     mCH4i: null,
    //     Qrbi: null,
    //     CODrai: null,
    //     CODeai: null,
    //     SGSlud: null,
    //     SGWater: null,
    //     Pvi: null,
    //     p: 1.42,
    //     B0: 0.25,
    //     MCF: null,
    //     RCH4i: null,
    // })







    // 以下是新版

    //  2.1生化反应的计算 与CH4直接排放量完全相同
    const CH4 = reactive({
        ECH4i: null,
        Qrbi: null,//1
        CODrai: null,//2
        CODeai: null,//3
        SGSlud: null,//4
        SGWater: null,//5
        Pvi: null,//6
        RCH4i: null,//7
        MCF: 0.0075,//8
        p: 1.42,//9
        B0: 0.25,
    })

    // 2.2CH4尾水排入环境的计算
    const tailWaterCH4 = reactive({
        ECH4TailWateri: null,
        Qebi: null,//10
        CODeai: null,//3
        EFWater: null,//11
        CODcr: null,
    })

    // 2.3甲烷直接排放总量
    const CH4Total = reactive({
        EiCH4Total: null,
        ECH4: null,
        ECH4TailWateri: null,
    })

    //  2.4甲烷直接碳排放当量
    const CH4C = reactive({
        EiCH4C: null,
        fCH4: 28
    })

    //3.1  N2O的直接排放计算
    const N2O = reactive({
        EN2Oi: null,
        Qrbi: null,
        TNrbi: null,//12
        TNebi: null,//13
        EFN2O: 0.016,
        CN2ON2: 1.57
    })

    //3.2  N2O的尾水排入环境的计算
    const tailWaterN2O = reactive({
        EN2OTailWateri: null,
        Qebi: null,
        TNebi: null,
        TNeai: null,
        EFWater: null,//
        // TNOuti: null,
    })



    // 3.3  氧化亚氮总量
    const N2OTotal = reactive({
        EiN2OTotal: null,
        EN2O: null,
        EN2OTailWateri: null,
    })

    // 3.4 氧化亚氮直接碳排放当量
    const N2OC = reactive({
        EiN2OC: null,
        fN2O: 265
    })



    //4.城镇污水厂直接碳排放总量
    const AllC = reactive({
        EAllCi: null
    })

    //5.污水处理厂基本信息
    const basicalInfo = reactive({
        areaCenter: null,//隶属区域中心
        waterYear: null,// 年进水水量
        handleStyle: null,//处理工艺
        createdTime: null,//建厂时间
        useStandard: null//采用评价
      })

    // 6.绿色低碳行为
    const textarealvse = ref(null)

    return {
        mapStandard, ifShow, mapFingerpost,
        // 旧版
        // CH4Rec,//CH4回收量
        // CODTNRem,//COD 和 TN 去除量
        // SludDis,//污泥处理量
        // CH4RecPro,//回收甲烷（CH4）产生的温室气体减排量
        // CODRemPro,//去除 COD 产生的温室气体排放量
        // HandleSludPro,//处理污泥产生的温室气体排放量
        // TNRemProN2O,//去除 TN 产生的 N2O 排放量
        // EleCO2Pro,//城镇污水处理消耗电力产生的 CO2排放量
        // TotRemCO2,//温室气体净减排总量
        // CH4,
        
        // 新版
        CH4,
        tailWaterCH4,
        CH4Total,
        CH4C,
        N2O,
        tailWaterN2O,
        N2OTotal,
        N2OC,
        AllC,
        basicalInfo,
        textarealvse
    }
})
