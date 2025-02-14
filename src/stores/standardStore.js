import { ref, reactive, handleError } from 'vue'
import { defineStore } from 'pinia'
import requests from '@/assets/requests'
export const useCounterStore = defineStore('counter', () => {

  // // fe获取信息
  // const fegetInfo = () => {
  //   requests({
  //     url: '/api/fegetInfo',
  //     method: 'post',
  //   }).then((res) => {
  //     feModelData[0].address = res[0].content
  //     feModelData[1].address = res[1].content
  //     feModelData[2].address = res[2].content
  //     feModelData[3].address = res[3].content
  //     feModelData[4].address = res[4].content
  //     feModelData[5].address = res[5].content
  //   }).catch((err) => {
  //     console.log(err);
  //   })
  // }

  // // fc获取信息
  // const fcgetInfo = () => {
  //   requests({
  //     url: '/api/fcgetInfo',
  //     method: 'post',
  //   }).then((res) => {
  //     fcModelData[0].address = res[0].content
  //     fcModelData[1].address = res[1].content
  //     fcModelData[2].address = res[2].content
  //     fcModelData[3].address = res[3].content
  //     fcModelData[4].address = res[4].content
  //     fcModelData[5].address = res[5].content
  //     fcModelData[6].address = res[6].content
  //     fcModelData[7].address = res[7].content
  //     fcModelData[8].address = res[8].content
  //     fcModelData[9].address = res[9].content
  //     fcModelData[10].address = res[10].content
  //     fcModelData[11].address = res[11].content
  //     fcModelData[12].address = res[12].content
  //     fcModelData[13].address = res[13].content
  //     fcModelData[14].address = res[14].content
  //     fcModelData[15].address = res[15].content
  //   }).catch((err) => {
  //     console.log(err);
  //   })
  // }


  // 评价等级

  const ifShow = ref(true)

  //建立一个映射，键是日期，值是oneDayResult
  const mapStandard = new Map()
  const mapEvaSta = new Map()
  const mapFingerpost = new Map()



  // N2O直接排放量
  const N2O = reactive({
    mN2Oi: null,
    Qrbi: null,
    TNrbi: null,
    TNebi: null,
    EFN2O: 0.016,
    CN2ON2: 1.57
  })



  //N2O直接碳排放强度
  const N2OCInt = reactive({
    EN2O: null,
    t: null,
    fN2O: 265,
    mN2Oi: null,
    Qrbi: null
  })
  // CH4直接排放量
  const CH4 = reactive({
    mCH4i: null,
    Qrbi: null,
    CODrai: null,
    CODeai: null,
    SGSlud: null,
    SGWater: null,
    Pvi: null,
    p: 1.42,
    B0: 0.25,
    MCF: null,
    RCH4i: null,
  })
  // 污水处理过程CH4修正因子。  即CH4.MCF
  const MCFOptions = [
    {
      value: 0.003,
      label: '初沉池正常刮泥排泥、厌氧和缺氧区充分混合搅拌、曝气池好氧区曝气均匀时，各构筑物内无污泥淤积'
    },
    {
      value: 0.03,
      label: '存在初沉池刮泥排泥不正常、厌氧或缺氧区搅拌不充分、曝气池好氧区曝气不均匀等状况时，构筑物内存在污泥淤积'
    }
  ]


  //CH4直接碳排放强度
  const CH4CInt = reactive({
    ECH4: null,
    fCH4: 28,
    mCH4i: null,
    Qrbi: null
  })
  //  化石燃料燃烧CO2直接排放量
  const CO2 = reactive({
    mCO2i: null,
    fc: 2.7725,
    Mfj: null,
    j: null,
    l: null
  })
  const CO2Mfj = reactive({
    LianJiao: 0,
    Yan: 0,
    NoYan: 0,
    JiaoC: 0,
    YuanOil: 0,
    QiOil: 0,
    MeiOil: 0,
    ChaiOil: 0,
    ShiYouQi: 0,
    GanQi: 0,
    MeiJiaoOil: 0,
    TianRanQi: 0,
    JiaoLuQi: 0,
    JiaoCQi: 0,
  })
  const CO2Data = [
    103398,
    103398,
    107098,
    19498,
    73739,
    69739,
    72339,
    74539,
    63267,
    57767,
    89498,
    56267,
    44567,
    10867
  ]
  const CO2MfjNames = [
    '炼焦煤',
    '烟煤',
    '无烟煤',
    '焦炭',
    '原油',
    '汽油',
    '煤油',
    '柴油',
    '液化石油气',
    '炼厂千气',
    '煤焦油',
    '天然气',
    '焦炉煤气',
    '焦炭制气'
  ]
  // CO2直接排放强度
  const CO2Int = reactive({
    ECO2: null,
    mCO2i: null,
    Qrbi: null
  })


  // 直接碳排放强度
  const IntC = reactive({
    Ed: null,
    EN2O: null,
    ECH4: null,
    ECO2: null
  })


  // 电耗碳排放强度
  const EleCInt = reactive({
    Ee: null,
    fe: null,
    Wi: null,
    Qrbi: null,
    MatCMci: null
  })

  // 各地区对应的电耗碳排放因子fe
  const EleArea = reactive({
    HuaBei: 0.9419,
    DongBei: 1.0826,
    HuaDong: 0.7921,
    HuaZhong: 0.8587,
    XiBei: 0.8922,
    NanFang: 0.8042
  })



  // 电耗碳排放因子fe的各种地区
  const AreaOptions = [
    {
      value: EleArea.HuaBei,
      label: '华北区域电网(北京市、天津市、河北省、山东省、山西省、内蒙古自治区)',
    },
    {
      value: EleArea.DongBei,
      label: '东北区域电网(辽宁省、吉林省、黑龙江省、内蒙古自治区)',
    },
    {
      value: EleArea.HuaDong,
      label: '华东区域电网(上海市、江苏省、浙江省、安徽省、福建省)',
    },
    {
      value: EleArea.HuaZhong,
      label: '华中区域电网(河南省、湖北省、湖南省、江西省、四川省、重庆市)',
    },
    {
      value: EleArea.XiBei,
      label: '西北区域电网(陕西省、甘肃省、青海省、宁夏回族自治区、新疆维吾尔自治区)',
    },
    {
      value: EleArea.NanFang,
      label: '南方区域电网(广东省、广西壮族自治区、云南省、贵州省、海南省)',
    }
  ]
  // 热耗碳排放强度
  const HotCInt = reactive({
    Eh: null,
    fc: 2.7725,
    Mhi: null,
    Qrbi: null,
    MatCMci: null
  })


  // NaClO浓度 以及是否出现选择框
  const NaClO = reactive({
    ifHave: false,
    Con: null
  })

  // 次氯酸钠浓度
  const NaClOOptions = [
    {
      value: 1,
      label: '15%NaClO',
    },
    {
      value: 2 / 3,
      label: '10%NaClO',
    },
    {
      value: 1 / 150,
      label: '0.1%NaClO',
    }
  ]


  // 药剂浓度
  const McgCon = reactive({
    Jian: 0,
    NaOH: 0,
    PAC: 0,
    CH3OH: 0,
    AlSO4: 0,
    PAM: 0,
    FeCl3: 0,
    CaOH2: 0,
    Otherxvning: 0,
    CiNaClO: 0,
    Cl2: 0,
    O3: 0,
    O2H2O: 0,
    Otherxiaodu: 0,
    Otheryao: 0,
    Cifen: 0,
    FeSO4: 0,
    C2H3NaO2: 0,
    NaClO: 0,
    Hcl: 0,
  })
  // 药剂质量
  const McgM = reactive({
    Jian: 0,
    NaOH: 0,
    PAC: 0,
    CH3OH: 0,
    AlSO4: 0,
    PAM: 0,
    FeCl3: 0,
    CaOH2: 0,
    Otherxvning: 0,
    CiNaClO: 0,
    Cl2: 0,
    O3: 0,
    O2H2O: 0,
    Otherxiaodu: 0,
    Otheryao: 0,
    Cifen: 0,
    FeSO4: 0,
    C2H3NaO2: 0,
    NaClO: 0,
    Hcl: 0,
  })
  // （质量*浓度） 
  const MatC = reactive({
    Jian: 0,
    NaOH: 0,
    PAC: 0,
    CH3OH: 0,
    AlSO4: 0,
    PAM: 0,
    FeCl3: 0,
    CaOH2: 0,
    Otherxvning: 0,
    CiNaClO: 0,
    Cl2: 0,
    O3: 0,
    O2H2O: 0,
    Otherxiaodu: 0,
    Otheryao: 0,
    Cifen: 0,
    FeSO4: 0,
    C2H3NaO2: 0,
    NaClO: 0,
    Hcl: 0
  })
  // 物耗碳排放量的各种排放因子
  const MatCStyle = reactive({
    Jian: 1.74,
    NaOH: 1.12,
    PAC: 1.62,
    CH3OH: 1.54,
    AlSO4: 0.5,
    PAM: 1.5,
    FeCl3: 2.71,
    CaOH2: 0.68,
    Otherxvning: 2.5,
    CiNaClO: 0.92,
    Cl2: 2,
    O3: 8.01,
    O2H2O: 1.14,
    Otherxiaodu: 1.4,
    Otheryao: 1.6,
    Cifen: 0.0081,
    FeSO4: 0.23,
    C2H3NaO2: 2.9,
    NaClO: 5.11,
    Hcl: 1.2
  })
  // 物耗碳排放量
  const MatCMci = reactive({
    Mcj: null
  })

  // 物耗碳排放强度
  const MatCInt = reactive({
    Ec: null,
    Mcj: null,
    Qrbi: null
  })

  //各种化学药剂的名称
  const MatMNames = [
    '碱度（质量）',
    '氢氧化钠（50% in H2O）（质量）',
    '聚合氯化铝（PAC）（质量）',
    '甲醇（质量）',
    '硫酸铝（质量）',
    '聚丙烯酰胺（PAM）（质量）',
    '六水三氯化铁（质量）',
    '石灰（质量）',
    '其他絮凝剂（质量）',
    '次氯酸钠（质量）',
    '液氯（质量）',
    '臭氧（液）（质量）',
    '双氧水（50% in H2O）（质量）',
    '其他消毒剂（质量）',
    '其他药剂（质量）',
    '磁粉（质量）',
    '硫酸铁（质量）',
    '乙酸钠（质量）',
    '氯酸钠（质量）',
    '盐酸（质量）'
  ]



  const MatConNames = [
    '碱度（浓度）',
    '氢氧化钠（50% in H2O）（浓度）',
    '聚合氯化铝（PAC）（浓度）',
    '甲醇（浓度）',
    '硫酸铝（浓度）',
    '聚丙烯酰胺（PAM）（浓度）',
    '六水三氯化铁（浓度）',
    '石灰（浓度）',
    '其他絮凝剂（浓度）',
    '次氯酸钠（浓度）',
    '液氯（浓度）',
    '臭氧（液）（浓度）',
    '双氧水（50% in H2O）（浓度）',
    '其他消毒剂（浓度）',
    '其他药剂（浓度）',
    '磁粉（浓度）',
    '硫酸铁（浓度）',
    '乙酸钠（浓度）',
    '氯酸钠（浓度）',
    '盐酸（浓度）'
  ]

  // 间接碳排放强度
  const IndCInt = reactive({
    Ei: null,
    Ee: null,
    Eh: null,
    Ec: null
  })
  // 碳排放强度
  const CInt = reactive({
    Ef: null,
    Ed: null,
    Ei: null
  })

  //  总氮去除率修正系数
  const TotNRemRat = reactive({
    k1: null,
    nTN: null,
    t: null,
    TNrbi: null,
    TNebi: null
  })

  // 处理规模修正系数
  const TreScaRat = reactive({
    k2: null,
    Qrbi: null,
    Qda: null
  })


  // 耗氧污染物削减量X  耗氧污染物削减量修正系数k3
  const OxyPolRem = reactive({
    k3: null,
    X: null,
    t: null,
    BODrbi: null,
    BODebi: null,
    TKNrbi: null,
    NH3Nebi: null,
    Qrbi: null,
    Qebi: null
  })

  // 出水排放标准修正系数
  const WaterOutRat = reactive({
    k4: null,
    CODcr: null,
  })
  // 出水排放标准修正系数选择项
  const WaterOptions = [
    {
      value: '>=60',
      label: '>=60(低于一级 A)',
    },
    {
      value: '=50',
      label: '=50(一级 A)',
    },
    {
      value: '=40',
      label: '=40(高于一级 A)',
    },
    {
      value: '<=30',
      label: '<=30(高于一级 A)',
    }
  ]
  // 臭气控制程度修正系数
  const OxyConRat = reactive({
    k5: null
  })
  // 臭气控制程度修正系数选项
  const OxyConRatOptions = [
    {
      value: 1.00,
      label: '无除臭',
    },
    {
      value: 0.95,
      label: '部分除臭',
    },
    {
      value: 0.90,
      label: '加盖',
    },
    {
      value: 0.79,
      label: '地下室',
    }
  ]
  // 直接碳排放修正强度
  const DirCIRat = reactive({
    Edc: null,
    EN2O: null,
    k1: null,
    ECH4: null,
    ECO2: null
  })
  // 间接碳排放修正强度计算
  const UndCIRat = reactive({
    Eic: null,
    Ee: null,
    Eh: null,
    Ec: null,
    k2: null,
    k3: null,
    k4: null,
    k5: null
  })
  // 评价碳排放强度计算
  const EvaCI = reactive({
    Ep: null,
    Edc: null,
    Eic: null
  })
  // 评价碳排放强度分数
  const EvaCIScore = reactive({
    F1: null,
    Ep: null
  })
  // 低碳行为鼓励分数
  const LowCScore = reactive({
    F2: null,
    Sq: null,
    n: null
  })

  // 低碳行为鼓励分数的各种类型
  const LowCStyle = reactive({
    DeslagEva: null,
    DeslagChange: null,
    PumpEva: null,
    PunpChange: null,
    MixEva: null,
    MixChange: null,
    AeraEva: null,//曝气
    AeraChange: null,
    SludEva: null,//污泥
    SludChange: null,
    ProductionEva: null,
    DeslagEva: null,
    PreEva: null,
    OneEva: null,
    TwoEva: null,
    DeepEva: null,
    DeoEva: null,//除臭
    SludEleEva: null,//污泥用电
    DeslagEva: null,
    AeraEleEva: null,//曝气用电
    SelectChe: null,
    OptPoint: null,//优化投加点
    SetDrug: null,
    TimeSRT: null,
    TimeRate: null,
    SetLowC: null,
    SludStable: null,
    CH4Use: null,
    LightEle: null,
    SludWaterPump: null,
    LocalTest: null,
    LowCReport: null,
  })


  // 各种低碳行为的名称
  const LowCNames = [
    '除渣除砂设备效率评估(满分:3)',
    '除渣除砂设备改造(满分:7)',
    '泵组效率评估(满分:2)',
    '泵组改造(满分:5)',
    '混合搅拌设备效率评估(满分:1)',
    '混合搅拌设备改造(满分:3)',
    '曝气系统效率评估(满分:3)',
    '曝气系统改造(满分:7)',
    '污泥脱水系统效率评估(满分:1)',
    '污泥脱水系统改造(满分:3)',
    '生产用电和生活用电单独计量(满分:2)',
    '预处理单元用电单独计量与评估(满分:1)',
    '一级处理单元用电单独计量与评估(满分:1)',
    '二级处理单元用电单独计量与评估(满分:1)',
    '深度处理单元用电单独计量与评估(满分:1)',
    '除臭系统用电单独计量与评估(满分:1)',
    '污泥处理单元用电单独计量与评估(满分:1)',
    '曝气系统用电单独计量(满分:3)',
    '通过实验优选化学药剂种类(满分:2)',
    '优化投加点(满分:1)',
    '设置精准加药控制系统(满分:2)',
    '定期校核并调整SRT(满分:5)',
    '定期校核并调整回流比(满分:3)',
    '建设低碳信息管理系统(满分:6)',
    '采用厌氧消化或高温好氧发酵实现污泥稳定化(满分:8)',
    '沼气回收与利用(满分:6)',
    '光伏发电(满分:5)',
    '污水源热泵(满分:5)',
    '开展 CH4、N2O 现场监测并形成监测报告(满分:5)',
    '按照本标准开展低碳运行自评价并形成年度低碳运行评价报告(满分:6)'
  ]
  // 低碳运行评价总分数
  const LowCTotalScore = reactive({
    F: null,
    F1: null,
    F2: null,
    x1: null,
    x2: null
  })

  // 评价等级
  const Level = reactive({
    Level: null
  })

  const nowDay = ref('')
  const iData = ref('')

  const basicalInfo = reactive({
    areaCenter: null,//隶属区域中心
    waterYear: null,// 年进水水量
    handleStyle: null,//处理工艺
    createdTime: null,//建厂时间
    useStandard: null//采用评价
  })

  //展示界面绿色低碳行为
  // const lvselowC = reactive({
  //   textarealvse: null
  // })
  // 绿色低碳行为
  const textarealvse = ref(null)


  return {
    mapStandard, mapEvaSta, mapFingerpost, ifShow, nowDay, iData,
    N2O,
    N2OCInt,
    CH4,
    MCFOptions,
    CH4CInt,
    CO2,
    CO2Mfj,
    CO2Data,
    CO2MfjNames,
    CO2Int,
    IntC,
    EleCInt,
    EleArea,
    AreaOptions,
    HotCInt,
    NaClO,
    NaClOOptions,
    McgCon,
    McgM,
    MatC,
    MatCStyle,
    MatCMci,
    MatCInt,
    MatConNames,
    MatMNames,
    IndCInt,
    CInt,
    TotNRemRat,
    TreScaRat,
    OxyPolRem,
    WaterOutRat,
    WaterOptions,
    OxyConRat,
    OxyConRatOptions,
    DirCIRat,
    UndCIRat,
    EvaCI,
    EvaCIScore,
    LowCScore,
    LowCStyle,
    LowCNames,
    LowCTotalScore,
    Level,
    basicalInfo,
    textarealvse
    //41
  }
})
