<script setup>
import router from '@/router';
import { useCounterStore } from '@/stores/standardStore';
import { reactive, watch, ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import * as XLSX from 'xlsx';
const counter = useCounterStore()

const props = defineProps({
    data: String,
    iData: String
})


//每{{iData}}的结果

const oneDayResult = reactive({})

// N2O直接排放量
// const N2O = reactive(JSON.parse(localStorage.getItem('N2O') || '{ "mN2Oi": null, "Qrbi": null, "TNrbi": null, "TNebi": null, "EFN2O": 0.016, "CN2ON2": 1.57 }'))

// watch(N2O, (newVal) => {
//     localStorage.setItem('N2O', JSON.stringify(newVal))
// }, { deep: true })

const N2O = reactive(counter.N2O)
const N2OCInt = reactive(counter.N2OCInt)
const CH4 = reactive(counter.CH4)
const MCFOptions = reactive(counter.MCFOptions)
const CH4CInt = reactive(counter.CH4CInt)
const CO2 = reactive(counter.CO2)
const CO2Mfj = reactive(counter.CO2Mfj)
const CO2Data = reactive(counter.CO2Data)
const CO2MfjNames = reactive(counter.CO2MfjNames)
const CO2Int = reactive(counter.CO2Int)
const IntC = reactive(counter.IntC)
const EleCInt = reactive(counter.EleCInt)
const EleArea = reactive(counter.EleArea)
const AreaOptions = reactive(counter.AreaOptions)
const HotCInt = reactive(counter.HotCInt)
const NaClO = reactive(counter.NaClO)
const NaClOOptions = reactive(counter.NaClOOptions)
const McgCon = reactive(counter.McgCon)
const McgM = reactive(counter.McgM)
const MatC = reactive(counter.MatC)
const MatCStyle = reactive(counter.MatCStyle)
const MatCMci = reactive(counter.MatCMci)
const MatCInt = reactive(counter.MatCInt)
const MatConNames = reactive(counter.MatConNames)
const MatMNames = reactive(counter.MatMNames)
const IndCInt = reactive(counter.IndCInt)
const CInt = reactive(counter.CInt)
const TotNRemRat = reactive(counter.TotNRemRat)
const TreScaRat = reactive(counter.TreScaRat)
const OxyPolRem = reactive(counter.OxyPolRem)
const WaterOutRat = reactive(counter.WaterOutRat)
const WaterOptions = reactive(counter.WaterOptions)
const OxyConRat = reactive(counter.OxyConRat)
const OxyConRatOptions = reactive(counter.OxyConRatOptions)
const DirCIRat = reactive(counter.DirCIRat)
const UndCIRat = reactive(counter.UndCIRat)
const EvaCI = reactive(counter.EvaCI)
const EvaCIScore = reactive(counter.EvaCIScore)
const LowCScore = reactive(counter.LowCScore)
const LowCStyle = reactive(counter.LowCStyle)
const LowCNames = reactive(counter.LowCNames)
const LowCTotalScore = reactive(counter.LowCTotalScore)
const Level = reactive(counter.Level)
const basicalInfo = reactive(counter.basicalInfo)
const textarealvse = ref(counter.textarealvse)
// const textarealvse = reactive(lvselowC.textarealvse)

console.log('Ngsdfanjlk;njklgfsa2O', N2O);




// N2O直接排放量的计算
watch(
    () => [N2O.Qrbi, N2O.TNrbi, N2O.TNebi, N2O.EFN2O, N2O.CN2ON2],
    ([newQrbi, newTNrbi, newTNebi, newEFN2O, newCN2ON2]) => {
        if (!props.data) {
            ElMessage({
                message: '请先选择日期后再输入',
                type: 'error',
                showClose: true,
                duration: 2000
            })
        }
        N2O.mN2Oi = newQrbi * (newTNrbi - newTNebi) * newEFN2O * newCN2ON2 / 1000
        console.log(N2O.mN2Oi, 'N2O.mN2Oi N2O直接排放量的计算');
    }
)




// N2O直接碳排放强度的计算
watch(
    () => [N2OCInt.fN2O, N2O.mN2Oi, N2O.Qrbi],
    ([newfN2O, newmN2Oi, newQrbi]) => {
        N2OCInt.EN2O = newfN2O * newmN2Oi / newQrbi
        console.log(N2OCInt.EN2O, 'N2OCInt.EN2O N2O直接碳排放强度的计算');
    }
)


//SG的计算
// watch(
//     () => [SG],
//     () => {
//         CH4.SG = SG.Slud * (1 - SG.Water) * 1000
//     },
//     {
//         deep: true
//     }
// )





// CH4直接排放量的计算
watch(
    () => [N2O.Qrbi, CH4.CODrai, CH4.CODeai, CH4.SGSlud, CH4.SGWater, CH4.Pvi, CH4.p, CH4.B0, CH4.MCF, CH4.RCH4i],
    ([newQrbi, newCODrai, newCODeai, newSGSlud, newSGWater, newPvi, newP, newB0, newMCF, newRCH4i]) => {
        CH4.mCH4i = ((newQrbi * (newCODrai - newCODeai) / 1000) - ((newSGSlud * (1 - newSGWater / 100) * 1000) * newPvi * 0.01 * newP)) * newB0 * newMCF - newRCH4i * 0.717
        console.log(newSGSlud, 'newSGSlud');
        console.log(newSGWater, 'newSGWater');
        console.log(newMCF, 'newMCF');

        console.log(CH4.mCH4i, 'CH4.mCH4i');
        if (newCODrai && newCODeai && newSGSlud && newSGWater && newPvi && newP && newB0 && newMCF && newRCH4i) {
            console.log('全部输入完成');
            if (CH4.mCH4i < 0) {
                ElMessage({
                    message: '请修正SGi和Pv,i，尤其应调低Pv,i',
                    type: 'error',
                    showClose: true,
                    duration: 2000
                })
            }
        }
    }
)

// CH4直接碳排放强度
watch(
    () => [CH4.mCH4i],
    ([newmCH4i]) => {
        CH4CInt.ECH4 = CH4CInt.fCH4 * newmCH4i / N2O.Qrbi
        console.log(CH4CInt.ECH4, 'CH4CInt.ECH4     CH4直接碳排放强度');
    }
)


// 化石燃料燃烧CO2直接排放量
watch(
    () => [CO2Mfj, CH4],
    ([newCO2Mfj, newCH4]) => {
        console.log('asfdbhkjlgasfdnjlkasdfgbnjkadfgsbhjlko;');
        if (Object.values(newCO2Mfj).every(value => value !== null)) {
            Object.keys(newCO2Mfj).forEach((key, index) => {
                let temp = 0
                temp = CO2.fc * newCO2Mfj[key] * CO2Data[index]
                CO2.mCO2i += temp
            })
        }
        console.log(CO2.mCO2i, 'CO2直接排放量');

    },
    {
        deep: true
    }
)

// CO2直接排放强度
watch(
    () => [CO2.mCO2i, N2O.Qrbi],
    ([]) => {
        CO2Int.ECO2 = CO2.mCO2i / N2O.Qrbi
        console.log(CO2Int.ECO2, 'CO2Int.ECO2');

    }
)

// 直接碳排放强度
watch(
    () => [N2OCInt.EN2O, CH4CInt.ECH4, CO2Int.ECO2],
    () => {
        IntC.Ed = N2OCInt.EN2O + CH4CInt.ECH4 + CO2Int.ECO2
        console.log(IntC.Ed, 'IntC.Ed');

    }
)

// 电耗碳排放量
watch(
    () => [EleCInt],
    ([newEleCInt]) => {
        EleCInt.MatCMci = newEleCInt.fe * newEleCInt.Wi 
    },
    { deep: true }
)

// 电耗碳排放强度
watch(
    () => [EleCInt],
    ([newEleCInt]) => {
        EleCInt.Ee = EleCInt.MatCMci / N2O.Qrbi
        console.log(EleCInt.Ee, 'EleCInt.Ee');
    },
    { deep: true }
)

// 热耗碳排放量
watch(
    () => [HotCInt],
    ([newHotCInt]) => {
        HotCInt.MatCMci = newHotCInt.fc * newHotCInt.Mhi
        console.log(HotCInt.Eh, 'HotCInt.Eh');
    },
    { deep: true }
)

// 热耗碳排放强度
watch(
    () => [HotCInt],
    ([newHotCInt]) => {
        HotCInt.Eh = HotCInt.MatCMci / N2O.Qrbi
        console.log(HotCInt.Eh, 'HotCInt.Eh');
    },
    { deep: true }
)

// 物耗碳（质量*浓度）
watch(
    () => [McgCon, McgM],
    ([newMcgCon, newMcgM]) => {
        console.log(newMcgCon, newMcgM, 'newMcgCon, newMcgM');
        for (const key in newMcgCon) {
            MatC[key] = (newMcgCon[key] || 0) * (newMcgM[key] || 0) * 0.01
            console.log(MatC[key], 'MatC[key]');
        }
        // if (McgM.CiNaClO !== 0) {
        //     NaClO.ifHave = true
        // } else {
        //     NaClO.ifHave = false
        // }
    },
    { deep: true }
)



// 物耗碳排放量
watch(
    () => [MatC, NaClO,MatCMci],
    () => {
        let temp = 0;
        for (const key in MatCStyle) {
            if (MatCStyle[key] == 0.92) {
                temp += Number(MatCStyle[key] * MatC[key]  / 0.15)
                console.log('用户输了了NaClO');

            } else {
                temp += Number(MatCStyle[key] * MatC[key] )
            }
        }
        // temp += Number(MatCStyle[Jian] * MatC[Jian] * McgCon[Jian])
        // temp += Number(MatCStyle[NaOH] * MatC[NaOH] * McgCon[NaOH])
        // temp += Number(MatCStyle[PAC] * MatC[PAC] * McgCon[PAC])
        // temp += Number(MatCStyle[CH3OH] * MatC[CH3OH] * McgCon[CH3OH])
        // temp += Number(MatCStyle[AlSO4] * MatC[AlSO4] * McgCon[AlSO4])
        // temp += Number(MatCStyle[PAM] * MatC[PAM] * McgCon[PAM])
        // temp += Number(MatCStyle[FeCl3] * MatC[FeCl3] * McgCon[FeCl3])
        // temp += Number(MatCStyle[CaOH2] * MatC[CaOH2] * McgCon[CaOH2])
        // temp += Number(MatCStyle[Otherxvning] * MatC[Otherxvning] * McgCon[Otherxvning])
        // temp += Number(MatCStyle[CiNaClO] * MatC[CiNaClO] * McgCon.CiNaClO / 0.15)
        MatCMci.Mcj = temp                                           
        console.log(MatCMci.Mcj,"MatCMci.Mcj");
        console.log(MatCMci.Mcj, 'MatCMci.Mcj物耗排放量');
    },
    { deep: true }
)

// 物耗碳排放强度（Ec）
watch(
    () => [MatCMci.Mcj],
    () => {
        MatCInt.Ec = MatCMci.Mcj / N2O.Qrbi
        console.log(MatCInt.Ec, 'MatCInt.Ec');

    }
)


// 间接碳排放强度
watch(
    () => [EleCInt.Ee, HotCInt.Eh, MatCInt.Ec],
    () => {
        IndCInt.Ei = EleCInt.Ee + HotCInt.Eh + MatCInt.Ec
        console.log(IndCInt.Ei, 'IndCInt.Ei');

    }
)

// 碳排放强度
watch(
    () => [IntC.Ed, IndCInt.Ei],
    () => {
        CInt.Ef = IntC.Ed + IndCInt.Ei
        console.log('CInt.Ef', CInt.Ef);

    }
)



// 总氮去除率修正系数
watch(
    () => [N2O],
    ([newN2O]) => {
        TotNRemRat.nTN = (N2O.TNrbi - N2O.TNebi) / N2O.TNrbi
        console.log(TotNRemRat.nTN, 'TotNRemRat.nTN');
        if (TotNRemRat.nTN < 0.6) {
            TotNRemRat.k1 = 1.00
        } else if (TotNRemRat.nTN >= 0.6 && TotNRemRat.nTN < 0.65) {
            TotNRemRat.k1 = 0.9
        } else if (TotNRemRat.nTN >= 0.65 && TotNRemRat.nTN < 0.7) {
            TotNRemRat.k1 = 0.75
        } else if (TotNRemRat.nTN >= 0.7 && TotNRemRat.nTN < 0.75) {
            TotNRemRat.k1 = 0.60
        } else if (TotNRemRat.nTN >= 0.75 && TotNRemRat.nTN < 0.8) {
            TotNRemRat.k1 = 0.45
        } else if (TotNRemRat.nTN >= 0.8 && TotNRemRat.nTN < 0.85) {
            TotNRemRat.k1 = 0.30
        } else if (TotNRemRat.nTN >= 0.85 && TotNRemRat.nTN < 0.9) {
            TotNRemRat.k1 = 0.15
        } else if (TotNRemRat.nTN >= 0.9 && TotNRemRat.nTN < 0.95) {
            TotNRemRat.k1 = 0.05
        } else if (TotNRemRat.nTN >= 0.95) {
            TotNRemRat.k1 = 0.00
        }
        console.log(TotNRemRat.k1, 'TotNRemRat.k1');
        console.log('123123123123213');

    },
    { deep: true }
)

// 处理规模修正系数
watch(
    () => [TreScaRat],
    ([newTreScaRat]) => {
        if (newTreScaRat.Qda > 300000) {
            TreScaRat.k2 = 1.10
        } else {
            TreScaRat.k2 = 0.91 + 0.056 * Math.log(newTreScaRat.Qda / 10000)
            console.log(TreScaRat.k2, 'TreScaRat.k2');
        }
    },
    { deep: true }
)

// 耗氧污染物削减量
watch(
    () => [OxyPolRem],
    ([newOxyPolRem]) => {
        OxyPolRem.X = (Number(N2O.Qrbi) * (Number(newOxyPolRem.BODrbi) + 3.5 * Number(N2O.TNrbi)) - Number(newOxyPolRem.Qebi) * (Number(newOxyPolRem.BODebi) + 3.5 * Number(newOxyPolRem.NH3Nebi))) / Number(newOxyPolRem.Qebi)
        console.log(OxyPolRem.X, 'OxyPolRem.X耗氧污染物削减量');
        if (OxyPolRem.X > 500) {
            OxyPolRem.k3 = 0.125
        } else {
            OxyPolRem.k3 = 1.875 - 0.0035 * OxyPolRem.X
        }
        console.log(OxyPolRem.k3, 'OxyPolRem.k3耗氧污染物削减量');

    },
    { deep: true }
)

// 出水排放标准修正系数
watch(
    () => [WaterOutRat],
    ([newWaterOutRat]) => {
        if (newWaterOutRat.CODcr == '>=60') {
            WaterOutRat.k4 = 1.18
        } else if (newWaterOutRat.CODcr == '=50') {
            WaterOutRat.k4 = 1.00
        } else if (newWaterOutRat.CODcr == '=40') {
            WaterOutRat.k4 = 0.82
        } else if (newWaterOutRat.CODcr == '<=30') {
            WaterOutRat.k4 = 0.64
        }
        console.log(WaterOutRat.k4, 'WaterOutRat.k4');
        console.log(newWaterOutRat.CODcr, 'newWaterOutRat.CODcr');

    }, { deep: true }
)

// 臭气控制程度修正系数
watch(
    () => [OxyConRat],
    () => {
        console.log(OxyConRat.k5, 'OxyConRat.k5');

    }, { deep: true }
)


// 直接碳排放修正强度
watch(
    () => [N2OCInt.EN2O, TotNRemRat.k1, CH4CInt.ECH4, CO2Int.ECO2],
    () => {
        DirCIRat.Edc = N2OCInt.EN2O * TotNRemRat.k1 + CH4CInt.ECH4 + CO2Int.ECO2
        console.log(DirCIRat.Edc, 'DirCIRat.Edc');
    }
)

// 间接碳排放修正强度
watch(
    () => [EleCInt.Ee, TreScaRat.k2, OxyConRat.k5, HotCInt.Eh, MatCInt.Ec, OxyPolRem.k3, WaterOutRat.k4],
    () => {
        UndCIRat.Eic = (EleCInt.Ee * TreScaRat.k2 * OxyConRat.k5 + HotCInt.Eh + MatCInt.Ec) * OxyPolRem.k3 * WaterOutRat.k4
        console.log(UndCIRat.Eic, 'UndCIRat.Eic');
    }
)



//只有单位是年的时候才可以

watch(
    () => [props],
    () => {


        if (props.iData == '年' && props.data) {

            // 评价碳排放强度计算
            watch(
                () => [UndCIRat.Eic, DirCIRat.Edc],
                () => {
                    EvaCI.Ep = DirCIRat.Edc + UndCIRat.Eic
                    console.log(EvaCI.Ep, 'EvaCI.Ep');
                },
                { deep: true }
            )
            // 评价碳排放强度分数
            watch(
                () => [EvaCI.Ep],
                () => {
                    if (EvaCI.Ep < 0.164) {
                        EvaCIScore.F1 = 100
                    } else if (EvaCI.Ep >= 0.164 && EvaCI.Ep < 0.451) {
                        EvaCIScore.F1 = 128.64 - 174.3 * EvaCI.Ep
                    } else if (EvaCI.Ep >= 0.451) {
                        EvaCIScore.F1 = 50
                    }
                    console.log(EvaCIScore.F1, 'EvaCIScore.F1');
                })

            // 低碳行为鼓励分数
            watch(
                () => [LowCStyle],
                ([newLowCStyle]) => {
                    if (Object.values(newLowCStyle).every(value => value !== null)) {
                        console.log('不为空');
                        let temp = 0;
                        for (const key in newLowCStyle) {
                            temp += Number(newLowCStyle[key])
                        }
                        LowCScore.F2 = temp;
                    }
                    console.log(LowCScore.F2, 'LowCScore.F2');
                }, { deep: true })

            // 低碳运行评价总分数
            watch(
                () => [LowCScore.F2, EvaCIScore.F1],
                ([newF2, newF1]) => {
                    LowCTotalScore.F = newF2 * 0.2 + newF1 * 0.8
                    console.log(newF2, 'LnewF2');
                    console.log(newF1, 'newF1');

                    console.log(LowCTotalScore.F, 'LowCTotalScore.F');
                })

            // 评价等级
            watch(
                () => [LowCTotalScore.F],
                () => {
                    if (LowCTotalScore.F <= 100 && LowCTotalScore.F >= 85) {
                        Level.Level = '一级'
                    } else if (LowCTotalScore.F >= 75 && LowCTotalScore.F < 85) {
                        Level.Level = '二级'
                    } else if (LowCTotalScore.F >= 60 && LowCTotalScore.F < 75) {
                        Level.Level = '三级'
                    } else {
                        Level.Level = '超出范围'
                    }
                    console.log(Level.Level, 'Level.Level');

                })
        }


    }, { deep: true }
)





// const emit = defineEmits(['pushAllResult'])
const pushAllResult = () => {
    oneDayResult.N2O = N2O.mN2Oi//N2O直接排放量[1]
    oneDayResult.CH4 = CH4.mCH4i//CH4直接排放量[3]
    oneDayResult.CO2 = CO2.mCO2i//CO2直接排放量[5]
    oneDayResult.EleCInt = EleCInt.Ee//电耗碳排放强度[8]
    oneDayResult.HotCInt = HotCInt.Eh//热耗碳排放强度[9]
    oneDayResult.MatCMci = MatCMci.Mcj  //物耗排放量[10]
    oneDayResult.EvaCI = EvaCI.Ep//评价碳排放强度计算[23]
    oneDayResult.EvaCIScore = EvaCIScore.F1//评价碳排放强度分数[24]
    oneDayResult.LowCScore = LowCScore.F2//低碳行为鼓励分数[25]
    oneDayResult.LowCTotalScore = LowCTotalScore.F//低碳运行评价总分数[26]
    oneDayResult.Level = Level.Level//评价等级[27]
    oneDayResult.IntC = IntC.Ed//直接碳排放强度[7]
    oneDayResult.IndCInt = IndCInt.Ei//间接碳排放强度[12]
    oneDayResult.CInt = CInt.Ef//碳排放强度[13]
    oneDayResult.Qrbi = N2O.Qrbi//进水量[0] 很多关于强度的都要用得到
    oneDayResult.DirCIRat = DirCIRat.Edc// 直接碳排放强度[21]
    oneDayResult.UndCIRat = UndCIRat.Eic//间接碳排放修正强度计算//[22]
    oneDayResult.CH4CInt = CH4CInt.ECH4//CH4直接碳排放强度[4]
    oneDayResult.N2OCInt = N2OCInt.EN2O//N2O直接碳排放强度[2]
    oneDayResult.MatCInt = MatCInt.Ec   //物耗碳排放强度[11]
    oneDayResult.CO2Int = CO2Int.ECO2//CO2直接碳排放量[6]
    oneDayResult.TotNRemRatn = TotNRemRat.nTN//总氮去除率[14]
    oneDayResult.TotNRemRatk = TotNRemRat.k1//总氮去除率修正系数[15]
    oneDayResult.TreScaRat = TreScaRat.k2//处理规模修正系数[16]
    oneDayResult.OxyPolRemX = OxyPolRem.X//耗氧污染物削减量X[17]
    oneDayResult.OxyPolRemk = OxyPolRem.k3//耗氧污染物削减量修正系数[18]
    oneDayResult.WaterOutRat = WaterOutRat.k4//出水标准修正系数[19]
    oneDayResult.OxyConRat = OxyConRat.k5//臭气控制程度修正系数[20]
    oneDayResult.basicalInfo = basicalInfo//污水处理厂基本信息
    oneDayResult.textarealvse = textarealvse
    console.log('推送了数据');
    
    counter.mapStandard.set(props.data, oneDayResult)//data是日期
}
const toShowStandard = () => {
    router.push('/showstandard')
}
const N2ORef = ref(null)
const CH4Ref = ref(null)
const EleCIntRef = ref(null)
const HotCIntRef = ref(null)
const McgMRef = ref(null)
const McgConRef = ref(null)
const TreScaRatRef = ref(null)
const OxyPolRemRef = ref(null)
const WaterOutRatRef = ref(null)
const OxyConRatRef = ref(null)
const LowCStyleRef = ref(null)
const NaClORef = ref(null)
// const textarealvse = ref(null)

//看用户是否输入了全部数据，只有输入了全部数据之后才能够保存
const validateAllForm = () => {
    let isN2OValid, isCH4Valid, isEleCIntValid, isHotCIntValid, isMcgMValid, isMcgConValid, isTreScaRatValid, isOxyPolRemValid, isWaterOutRatValid, isOxyConRatValid, isLowCStyleValid, isNaClOValid
    console.log(N2ORef.value,"N2ORef.value");
    console.log(N2ORef,'N2ORef');
    
    if (props.iData == '年') {
        return new Promise((resolve, reject) => {
            Promise.all([
                OxyPolRemRef.value.validate().then(res => isOxyPolRemValid = res).catch(error => { console.log('OxyPolRemRef validate error', error); isOxyPolRemValid = false }),
                WaterOutRatRef.value.validate().then(res => isWaterOutRatValid = res).catch(error => { console.log('WaterOutRatRef validate error', error); isWaterOutRatValid = false }),
                OxyConRatRef.value.validate().then(res => isOxyConRatValid = res).catch(error => { console.log('OxyConRatRef validate error', error); isOxyConRatValid = false }),
                N2ORef.value.validate().then(res => isN2OValid = res).catch(error => { console.log('N2ORef validate error', error); isN2OValid = false }),
                CH4Ref.value.validate().then(res => isCH4Valid = res).catch(error => { console.log('CH4Ref validate error', error); isCH4Valid = false }),
                EleCIntRef.value.validate().then(res => isEleCIntValid = res).catch(error => { console.log('EleCIntRef validate error', error); isEleCIntValid = false }),
                HotCIntRef.value.validate().then(res => isHotCIntValid = res).catch(error => { console.log('HotCIntRef validate error', error); isHotCIntValid = false }),
                TreScaRatRef.value.validate().then(res => isTreScaRatValid = res).catch(error => { console.log('TreScaRatRef validate error', error); isTreScaRatValid = false }),
                OxyPolRemRef.value.validate().then(res => isOxyPolRemValid = res).catch(error => { console.log('OxyPolRemRef validate error', error); isOxyPolRemValid = false }),
                WaterOutRatRef.value.validate().then(res => isWaterOutRatValid = res).catch(error => { console.log('WaterOutRatRef validate error', error); isWaterOutRatValid = false }),
                OxyConRatRef.value.validate().then(res => isOxyConRatValid = res).catch(error => { console.log('OxyConRatRef validate error', error); isOxyConRatValid = false }),
                LowCStyleRef.value.validate().then(res => isLowCStyleValid = res).catch(error => { console.log('LowCStyleRef validate error', error); isLowCStyleValid = false }),
                //只有当所有的 Promise 都resolved时，它才会resolved。如果任何一个 Promise rejected，它也会立即被rejected。
                // Promise 由于某些原因未能成功完成。这通常是由于异步操作中的错误，比如网络请求失败、文件读取错误等。Promise 被拒绝不会中断程序的执行，而是会进入 Promise 的错误处理流程，可以通过 .catch() 方法来捕获和处理。
            ]).then(() => {
                const isAllValid = isN2OValid && isCH4Valid && isEleCIntValid && isHotCIntValid && isTreScaRatValid && isOxyPolRemValid && isWaterOutRatValid && isOxyConRatValid && isLowCStyleValid;
                if (isAllValid) {
                    console.log('数据全部输入');
                    resolve(true);
                } else {
                    console.log('数据没有全部输入');
                    resolve(false);
                }
            })
        });
    }
    else {
        isLowCStyleValid = true
        return new Promise((resolve, reject) => {
            Promise.all([
                N2ORef.value.validate().then(res => isN2OValid = res).catch(error => { console.log('N2ORef validate error', error); isN2OValid = false }),
                CH4Ref.value.validate().then(res => isCH4Valid = res).catch(error => { console.log('CH4Ref validate error', error); isCH4Valid = false }),
                EleCIntRef.value.validate().then(res => isEleCIntValid = res).catch(error => { console.log('EleCIntRef validate error', error); isEleCIntValid = false }),
                HotCIntRef.value.validate().then(res => isHotCIntValid = res).catch(error => { console.log('HotCIntRef validate error', error); isHotCIntValid = false }),
                TreScaRatRef.value.validate().then(res => isTreScaRatValid = res).catch(error => { console.log('TreScaRatRef validate error', error); isTreScaRatValid = false }),
                // OxyPolRemRef.value.validate().then(res => isOxyPolRemValid = res).catch(error => { console.log('OxyPolRemRef validate error', error); isOxyPolRemValid = false }),
                // WaterOutRatRef.value.validate().then(res => isWaterOutRatValid = res).catch(error => { console.log('WaterOutRatRef validate error', error); isWaterOutRatValid = false }),
                // OxyConRatRef.value.validate().then(res => isOxyConRatValid = res).catch(error => { console.log('OxyConRatRef validate error', error); isOxyConRatValid = false }),
            ]).then(() => {
                const isAllValid = isN2OValid && isCH4Valid && isEleCIntValid && isHotCIntValid && isTreScaRatValid && isOxyPolRemValid && isWaterOutRatValid && isOxyConRatValid;
                if (isAllValid) {
                    console.log('数据全部输入');
                    resolve(true);
                } else {
                    console.log('数据没有全部输入');
                    resolve(false);
                }
            })
        });
    }
}


// const fileList = ref([
//     {
//         name: 'element-plus-logo.svg',
//         url: 'https://element-plus.org/images/element-plus-logo.svg',
//     },
//     {
//         name: 'element-plus-logo2.svg',
//         url: 'https://element-plus.org/images/element-plus-logo.svg',
//     },
// ])

// const handleRemove = (file, uploadFiles) => {
//     console.log(file, uploadFiles)
// }

// const handlePreview = (uploadFile) => {
//     console.log(uploadFile)
// }

// const handleExceed = (files, uploadFiles) => {
//     ElMessage.warning(
//         `The limit is 3, you selected ${files.length} files this time, add up to ${files.length + uploadFiles.length
//         } totally`
//     )
// }

// const beforeRemove = (uploadFile, uploadFiles) => {
//     return ElMessageBox.confirm(
//         `Cancel the transfer of ${uploadFile.name} ?`
//     ).then(
//         () => true,
//         () => false
//     )
// }



defineExpose({ pushAllResult, toShowStandard, validateAllForm })



let excelData;
const handleChangeUpload = (file) => {
    console.log('执行了一次');
        
    const types = file.raw.type;//获取上传文件的 MIME 类型，并将其存储在变量 types 中。
    if (types === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || types === 'application/vnd.ms-excel') {
        const fileReader = new FileReader();//创建一个 FileReader 对象，用于读取文件内容。
        // 读取文件
        console.log(file,'file');
        
        console.log(file.raw, 'file.raw');
        fileReader.readAsArrayBuffer(file.raw);//用来读取文件的原始二进制数据，并将其存储为一个ArrayBuffer对象。
        
        // 为 FileReader 对象的 onload 事件定义一个回调函数，该事件在文件读取操作完成(无论是成功还是失败)时触发。
        fileReader.onload = (ev) => {
            try {
                const data = ev.target.result;//获取文件内容
                // console.log(data,'data');//这会是一堆看不懂的乱码

                const workbook = XLSX.read(data, { type: 'binary' });//使用xlsx来读取文件，xlsx是一个处理excel文件的库，指定type为binary，因为文件是以二进制字符串的形式读取的
                console.log(workbook, 'workbook');//workbook包含一大堆乱七八糟的信息   workboos是工作簿的意思

                const sheetName = workbook.SheetNames[0];//获取第一个工作表
                console.log(sheetName, 'sheetName');//sheet1

                const sheet = workbook.Sheets[sheetName];//通过工作表名称获取工作表对象
                console.log(sheet, 'sheet');

                excelData = XLSX.utils.sheet_to_json(sheet);//使用 XLSX.utils.sheet_to_json 方法将工作表转换为 JSON 格式的数据，这通常是一个数组，每个元素代表工作表中的一行。
                console.log(excelData, 'excelData');//将工作表打印出来
                ElMessage.success('文件读取成功 请执行一键导入操作')
                console.log(excelData[3].__EMPTY_2, 'excelData[3]');

            } catch (e) {
                ElMessage.error('文件读取失败')
                console.log(e, 'error');
            }
        };
    }else{
        ElMessage.error('文件格式不正确')
    }
}
//一键输入功能，用于测试后面脚本
const inputAllOneTimes = () => {
    N2O.Qrbi = excelData[3].__EMPTY_6
    N2O.TNrbi = excelData[3].__EMPTY_7
    N2O.TNebi = excelData[3].__EMPTY_8
    CH4.CODeai = excelData[3].__EMPTY_10
    CH4.CODrai = excelData[3].__EMPTY_9
    CH4.Pvi = excelData[3].__EMPTY_11
    CH4.SGSlud = excelData[3].__EMPTY_12
    CH4.SGWater = excelData[3].__EMPTY_13
    CH4.RCH4i = excelData[3].__EMPTY_14
    CH4.MCF = excelData[3].__EMPTY_15
    CO2Mfj.LianJiao = excelData[3].__EMPTY_16
    CO2Mfj.Yan = excelData[3].__EMPTY_17
    CO2Mfj.NoYan = excelData[3].__EMPTY_18
    CO2Mfj.JiaoC = excelData[3].__EMPTY_19
    CO2Mfj.YuanOil = excelData[3].__EMPTY_20
    CO2Mfj.QiOil = excelData[3].__EMPTY_21
    CO2Mfj.MeiOil = excelData[3].__EMPTY_22
    CO2Mfj.ChaiOil = excelData[3].__EMPTY_23
    CO2Mfj.ShiYouQi = excelData[3].__EMPTY_24
    CO2Mfj.GanQi = excelData[3].__EMPTY_25
    CO2Mfj.MeiJiaoOil = excelData[3].__EMPTY_26
    CO2Mfj.TianRanQi = excelData[3].__EMPTY_27
    CO2Mfj.JiaoLuQi = excelData[3].__EMPTY_28
    CO2Mfj.JiaoCQi = excelData[3].__EMPTY_29

    EleCInt.fe = excelData[3].__EMPTY_30
    EleCInt.Wi = excelData[3].__EMPTY_31
    HotCInt.Mhi = excelData[3].__EMPTY_32
    McgCon.Jian = excelData[3].__EMPTY_33
    McgCon.NaOH = excelData[3].__EMPTY_34
    McgCon.PAC = excelData[3].__EMPTY_35
    McgCon.CH3OH = excelData[3].__EMPTY_36
    McgCon.AlSO4 = excelData[3].__EMPTY_37
    McgCon.PAM = excelData[3].__EMPTY_38
    McgCon.FeCl3 = excelData[3].__EMPTY_39
    McgCon.CaOH2 = excelData[3].__EMPTY_40
    McgCon.Otherxvning = excelData[3].__EMPTY_41
    McgCon.CiNaClO = excelData[3].__EMPTY_42
    McgCon.Cl2 = excelData[3].__EMPTY_43
    McgCon.O3 = excelData[3].__EMPTY_44
    McgCon.O2H2O = excelData[3].__EMPTY_45
    McgCon.Otherxiaodu = excelData[3].__EMPTY_46
    McgCon.Otheryao = excelData[3].__EMPTY_47
    McgCon.Cifen = excelData[3].__EMPTY_48
    McgCon.FeSO4 = excelData[3].__EMPTY_49
    McgCon.C2H3NaO2 = excelData[3].__EMPTY_50
    McgCon.NaClO = excelData[3].__EMPTY_51
    McgCon.Hcl = excelData[3].__EMPTY_52


    McgM.Jian = excelData[3].__EMPTY_53 
    McgM.NaOH = excelData[3].__EMPTY_54
    McgM.PAC = excelData[3].__EMPTY_55
    McgM.CH3OH = excelData[3].__EMPTY_56
    McgM.AlSO4 = excelData[3].__EMPTY_57
    McgM.PAM = excelData[3].__EMPTY_58
    McgM.FeCl3 = excelData[3].__EMPTY_59
    McgM.CaOH2 = excelData[3].__EMPTY_60
    McgM.Otherxvning = excelData[3].__EMPTY_61
    McgM.CiNaClO = excelData[3].__EMPTY_62
    McgM.Cl2 = excelData[3].__EMPTY_63
    McgM.O3 = excelData[3].__EMPTY_64
    McgM.O2H2O = excelData[3].__EMPTY_65
    McgM.Otherxiaodu = excelData[3].__EMPTY_66
    McgM.Otheryao = excelData[3].__EMPTY_67
    McgM.Cifen = excelData[3].__EMPTY_68
    McgM.FeSO4 = excelData[3].__EMPTY_69
    McgM.C2H3NaO2 = excelData[3].__EMPTY_70
    McgM.NaClO = excelData[3].__EMPTY_71
    McgM.Hcl = excelData[3].__EMPTY_72


    // TreScaRat.Qda = excelData[3].__EMPTY_73
    // OxyPolRem.BODrbi = excelData[3].__EMPTY_74
    // OxyPolRem.BODebi = excelData[3].__EMPTY_75
    // OxyPolRem.NH3Nebi = excelData[3].__EMPTY_76
    // OxyPolRem.Qebi = excelData[3].__EMPTY_77
    // WaterOutRat.CODcr = excelData[3].__EMPTY_78
    // OxyConRat.k5 = excelData[3].__EMPTY_79
    basicalInfo.areaCenter = excelData[3].__EMPTY_1
    basicalInfo.waterYear = excelData[3].__EMPTY_2
    basicalInfo.handleStyle = excelData[3].__EMPTY_3
    basicalInfo.createdTime = excelData[3].__EMPTY_4
    if (props.iData == '年') {
        TreScaRat.Qda = excelData[3].__EMPTY_73
        OxyPolRem.BODrbi = excelData[3].__EMPTY_74
        OxyPolRem.BODebi = excelData[3].__EMPTY_75
        OxyPolRem.NH3Nebi = excelData[3].__EMPTY_76
        OxyPolRem.Qebi = excelData[3].__EMPTY_77
        WaterOutRat.CODcr = excelData[3].__EMPTY_78
        OxyConRat.k5 = excelData[3].__EMPTY_79
        LowCStyle.DeslagEva = excelData[3].__EMPTY_84
        LowCStyle.DeslagChange = excelData[3].__EMPTY_85
        LowCStyle.PumpEva = excelData[3].__EMPTY_86
        LowCStyle.PunpChange = excelData[3].__EMPTY_87
        LowCStyle.MixEva = excelData[3].__EMPTY_88
        LowCStyle.MixChange = excelData[3].__EMPTY_89
        LowCStyle.AeraEva = excelData[3].__EMPTY_90
        LowCStyle.AeraChange = excelData[3].__EMPTY_91
        LowCStyle.SludEva = excelData[3].__EMPTY_92
        LowCStyle.SludChange = excelData[3].__EMPTY_93
        LowCStyle.ProductionEva = excelData[3].__EMPTY_94
        LowCStyle.PreEva = excelData[3].__EMPTY_95
        LowCStyle.OneEva = excelData[3].__EMPTY_96
        LowCStyle.TwoEva = excelData[3].__EMPTY_97
        LowCStyle.DeepEva = excelData[3].__EMPTY_98
        LowCStyle.DeoEva = excelData[3].__EMPTY_99
        LowCStyle.SludEleEva = excelData[3].__EMPTY_100
        LowCStyle.AeraEleEva = excelData[3].__EMPTY_101
        LowCStyle.SelectChe = excelData[3].__EMPTY_102
        LowCStyle.OptPoint = excelData[3].__EMPTY_103
        LowCStyle.SetDrug = excelData[3].__EMPTY_104
        LowCStyle.TimeSRT = excelData[3].__EMPTY_105
        LowCStyle.TimeRate = excelData[3].__EMPTY_106
        LowCStyle.SetLowC = excelData[3].__EMPTY_107
        LowCStyle.SludStable = excelData[3].__EMPTY_108
        LowCStyle.CH4Use = excelData[3].__EMPTY_109
        LowCStyle.LightEle = excelData[3].__EMPTY_110
        LowCStyle.SludWaterPump = excelData[3].__EMPTY_111
        LowCStyle.LocalTest = excelData[3].__EMPTY_112
        LowCStyle.LowCReport = excelData[3].__EMPTY_113
    }
}

</script>
<template>
    <keep-alive>

        <div class="flex flex-col ml-4">
            <div class="flex justify-around mt-10">
                <el-upload :on-change="handleChangeUpload">
                    <el-button type="primary">上传文件</el-button>
                </el-upload>

                <el-button @click="inputAllOneTimes" type="primary">一键导入</el-button>
            </div>

            <!-- 污水处理厂基本信息 -->
            <div class="mt-10">
                <p style="font-weight: bold; font-size: 20px; color: black;">污水处理厂基本信息</p>
                <el-form :model="basicalInfo" class="flex flex-start flex-wrap gap-4 mt-3" ref="LowCStyleRef">
                    <div class="flex">
                        <div class="w-[180px]">隶属区域中心</div>
                        <el-form-item prop="areaCenter" :rules="[{ required: true, message: 'areaCenter is required' }]">
                            <el-input v-model="basicalInfo.areaCenter" style="width: 300px; height:50px;"
                                placeholder="areaCenter" />
                        </el-form-item>
                    </div>
                    <div class="flex">
                        <div class="w-[180px]">处理规模（万吨/天）</div>
                        <el-form-item prop="waterYear" :rules="[{ required: true, message: 'waterYear is required' }]">
                            <el-input v-model="basicalInfo.waterYear" style="width: 300px; height:50px;"
                                placeholder="waterYear" />
                        </el-form-item>
                    </div>
                    <div class="flex">
                        <div class="w-[180px]">处理工艺</div>
                        <el-form-item prop="handleStyle" :rules="[{ required: true, message: 'handleStyle is required' }]">
                            <el-input v-model="basicalInfo.handleStyle" style="width: 300px; height:50px;"
                                placeholder="handleStyle" />
                        </el-form-item>
                    </div>
                    <div class="flex">
                        <div class="w-[180px]">建厂时间</div>
                        <el-form-item prop="createdTime" :rules="[{ required: true, message: 'createdTime is required' }]">
                            <el-input v-model="basicalInfo.createdTime" style="width: 300px; height:50px;"
                                placeholder="createdTime" />
                        </el-form-item>
                    </div>

                </el-form>
            </div>

            <div class="mt-10">
                <!-- <el-card shadow="hover"> -->
                <p style="font-weight: bold; font-size: 20px; color: black;">N<sub>2</sub>O直接排放量</p>
                <el-form :model="N2O" class="flex flex-start flex-wrap gap-4 mt-3" ref="N2ORef">
                    <div class="flex">
                        <div class="w-[180px]">𝑄<sub>rb,𝑖</sub>—污水生物处理单元第 i {{ iData }}进水水量，m<sup>3</sup></div>
                        <el-form-item prop="Qrbi" :rules="[{ required: true, message: 'Qrbi is required' }]">
                            <el-input v-model="N2O.Qrbi" style="width: 300px; height:50px;" placeholder="Qrbi" />
                        </el-form-item>
                    </div>
                    <div class="flex">
                        <div class="w-[180px]">𝑇𝑁<sub>rb.𝑖</sub>—— 污水生物处理单元第 i {{ iData }}平均进水TN浓度，mg/L</div>
                        <el-form-item prop="TNrbi" :rules="[{ required: true, message: 'TNrbi is required' }]">
                            <el-input v-model="N2O.TNrbi" style="width: 300px; height:50px;" placeholder="TNrbi" />
                        </el-form-item>
                    </div>
                    <div class="flex">
                        <div class="w-[180px]">𝑇𝑁<sub>eb,𝑖</sub>—— 污水生物处理单元第 i {{ iData }}平均出水 TN 浓度，mg/L</div>
                        <el-form-item prop="TNebi" :rules="[{ required: true, message: 'TNebi is required' }]">
                            <el-input v-model="N2O.TNebi" style="width: 300px; height:50px;" placeholder="TNebi" />
                        </el-form-item>
                    </div>
                    <div class="flex">
                        <div class="w-[180px]">𝐸𝐹<sub>N<sub>2</sub>O</sub> —— N<sub>2</sub>O 排放因子，取值为 0.016
                            kgN<sub>2</sub>O-N/kgTN</div>

                        <el-form-item prop="EFN2O" :rules="[{ required: true, message: 'EFN2O is required' }]">
                            <el-input v-model="N2O.EFN2O" style="width: 300px; height:50px;" placeholder="EFN2O" />
                        </el-form-item>
                    </div>
                    <div class="flex">
                        <div class="w-[180px]">𝐶<sub>N<sub>2</sub>O/N<sub>2</sub></sub>——
                            N<sub>2</sub>O/N<sub>2</sub>分子量之比，取值为 44/28</div>
                        <el-form-item prop="CN2ON2" :rules="[{ required: true, message: 'CN2ON2 is required' }]">
                            <el-input v-model="N2O.CN2ON2" style="width: 300px; height:50px;" placeholder="CN2ON2" />
                        </el-form-item>
                    </div>
                </el-form>
                <!-- </el-card> -->

            </div>

            <!-- N2O直接碳排放强度 -->
            <!-- <div class="mt-10">
            <p style="font-weight: bold; font-size: 20px; color: black;">N2O直接碳排放强度</p>
            <el-form :model="N2OCInt" class="flex flex-start flex-wrap gap-4 mt-3"  ref="N2OCIntRef">
                <el-form-item prop="fN2O" :rules="[{ required: true, message: 'fN2O is required' }]">
                    <el-input v-model="N2OCInt.fN2O" style="width: 300px; height:50px;" placeholder="fN2O" readonly
                        :disabled="true" />
                </el-form-item>
                <el-form-item>
                    <el-input v-model="N2O.mN2Oi" style="width: 300px; height:50px;" placeholder="mN2Oi" />
                </el-form-item>
                <el-form-item>
                    <el-input v-model="N2O.Qrbi" style="width: 300px; height:50px;" placeholder="Qrbi" />
                </el-form-item>
            </el-form>
        </div> -->

            <!-- CH4直接排放量 -->
            <div class="mt-10">
                <p style="font-weight: bold; font-size: 20px; color: black;">CH4直接排放量</p>
                <el-form :model="CH4" class="flex flex-start flex-wrap gap-4 mt-3" ref="CH4Ref">
                    <div class="flex">

                        <div class="w-[180px]">𝑄ra,𝑖
                            —— 污水处理厂第 i {{ iData }}进水水量，m<sup>3</sup>；</div>
                        <el-form-item>
                            <el-input v-model="N2O.Qrbi" style="width: 300px; height:50px;" placeholder="Qrbi" />
                        </el-form-item>
                    </div>
                    <div class="flex">

                        <div class="w-[180px]">𝐶𝑂𝐷ra,𝑖
                            —— 污水处理厂第 i {{ iData }}平均进水 CODCr浓度，mg/L；</div>
                        <el-form-item prop="CODrai" :rules="[{ required: true, message: 'CODrai is required' }]">
                            <el-input v-model="CH4.CODrai" style="width: 300px; height:50px;" placeholder="CODrai" />
                        </el-form-item>
                    </div>
                    <div class="flex">

                        <div class="w-[180px]">𝐶𝑂𝐷ea,𝑖
                            —— 污水处理厂第 i {{ iData }}平均出水 CODCr浓度，mg/L；</div>
                        <el-form-item prop="CODeai" :rules="[{ required: true, message: 'CODeai is required' }]">
                            <el-input v-model="CH4.CODeai" style="width: 300px; height:50px;" placeholder="CODeai" />
                        </el-form-item>
                    </div>
                    <div class="flex">

                        <div class="w-[180px]">污泥量,t</div>
                        <el-form-item prop="SGSlud" :rules="[{ required: true, message: 'SGSlud is required' }]">
                            <el-input v-model="CH4.SGSlud" style="width: 300px; height:50px;" placeholder="SGSlud" />
                        </el-form-item>
                    </div>
                    <div class="flex">

                        <div class="w-[180px]">含水率,%（80％填80即可）</div>
                        <el-form-item prop="SGWater" :rules="[{ required: true, message: 'SGWater is required' }]">
                            <el-input v-model="CH4.SGWater" style="width: 300px; height:50px;" placeholder="SGWater" />
                        </el-form-item>
                    </div>
                    <div class="flex">

                        <div class="w-[180px]">𝑃v,𝑖
                            —— 污水处理厂第 i {{ iData }}干污泥的有机分，%；</div>
                        <el-form-item prop="Pvi" :rules="[{ required: true, message: 'Pvi is required' }]">
                            <el-input v-model="CH4.Pvi" style="width: 300px; height:50px;" placeholder="Pvi" />
                        </el-form-item>
                    </div>
                    <div class="flex">

                        <div class="w-[180px]">𝑅CH4,
                            𝑖—— 污水处理厂第 i {{ iData }} CH4回收体积，m³；</div>
                        <el-form-item prop="RCH4i" :rules="[{ required: true, message: 'RCH4i is required' }]">
                            <el-input v-model="CH4.RCH4i" style="width: 300px; height:50px;" placeholder="RCH4i" />
                        </el-form-item>
                    </div>
                    <div class="flex">

                        <div class="w-[180px]">𝑀𝐶𝐹 —— 污水处理过程 CH4修正因子。</div>
                        <el-form-item prop="MCF" :rules="[{ required: true, message: 'MCF is required' }]">
                            <el-select v-model="CH4.MCF" placeholder="𝑀𝐶𝐹 —— 污水处理过程 CH4修正因子。" size="large"
                                style="width: 300px">
                                <el-option v-for="item in MCFOptions" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="flex">

                        <div class="w-[180px]">𝐵0
                            —— 厌氧过程降解单位 CODCr时 CH4的产率系数，取值为 0.25 kgCH4/kgCODCr；</div>
                        <el-form-item prop="B0" :rules="[{ required: true, message: 'B0 is required' }]">
                            <el-input v-model="CH4.B0" style="width: 300px; height:50px;" placeholder="B0" />
                        </el-form-item>
                    </div>
                    <div class="flex">

                        <div class="w-[180px]">𝜌𝑆
                            —— 污泥中的有机物与 CODCr的转化系数，取值为 1.42 kgCODCr/kgDS；</div>
                        <el-form-item prop="p" :rules="[{ required: true, message: 'p is required' }]">
                            <el-input v-model="CH4.p" style="width: 300px; height:50px;" placeholder="p" />
                        </el-form-item>
                    </div>
                </el-form>
            </div>


            <!-- 第四行CH4直接碳排放强度 -->
            <!-- <div class="mt-10">
            <p style="font-weight: bold; font-size: 20px; color: black;">CH4直接碳排放强度</p>
            <el-form :model="CH4CInt" class="flex flex-start flex-wrap gap-4 mt-3"  ref="CH4Ref">
                <el-form-item prop="fCH4" :rules="[{ required: true, message: 'fCH4 is required' }]">
                    <el-input v-model="CH4CInt.fCH4" style="width: 300px; height:50px;" placeholder="fCH4" />
                </el-form-item>
                <el-form-item>
                    <el-input v-model="CH4.mCH4i" style="width: 300px; height:50px;" placeholder="mN2Oi" />
                </el-form-item>
                <el-form-item>
                    <el-input v-model="N2O.Qrbi" style="width: 300px; height:50px;" placeholder="Qrbi" />
                </el-form-item>
            </el-form>
        </div> -->

            <!-- 第五行化石燃料燃烧 CO2直接排放量  -->
            <!-- <div class="mt-10">
            <p style="font-weight: bold; font-size: 20px; color: black;">化石燃料燃烧CO2直接排放量</p>
            <el-form :model="CO2" class="flex flex-start flex-wrap gap-4 mt-3"  ref="CH4Ref">
                <el-form-item prop="fc" :rules="[{ required: true, message: 'fc is required' }]">
                    <el-input v-model="CO2.fc" style="width: 300px; height:50px;" placeholder="fc" />
                </el-form-item>
                <el-form-item prop="Mfj" :rules="[{ required: true, message: 'Mfj is required' }]">
                    <el-input v-model="CO2.Mfj" style="width: 300px; height:50px;" placeholder="Mfj" />
                </el-form-item>
            </el-form>
        </div> -->
            <!-- 化石燃料燃烧CO2直接排放量  -->
            <div class="mt-10">
                <p style="font-weight: bold; font-size: 20px; color: black;">化石燃料燃烧CO2直接排放量</p>
                <el-form :model="CO2Mfj" class="flex flex-start flex-wrap gap-4 mt-3" ref="CO2MfjRef">
                    <div class="flex" v-for="(value, key, index) in CO2Mfj">
                        <div class="w-[180px]">{{ CO2MfjNames[index] }}</div>
                        <el-form-item :key="key" :prop="key"
                            :rules="[{ required: true, message: `${key} is required` }]">
                            <el-input v-model="CO2Mfj[key]" style="width: 300px; height:50px;" :placeholder="key" />
                        </el-form-item>
                    </div>
                </el-form>
            </div>

            <!-- CO2直接排放强度 -->
            <!-- <div class="mt-10">
            <p style="font-weight: bold; font-size: 20px; color: black;">CO2直接排放强度</p>
            <el-form :model="CO2Int" class="flex flex-start flex-wrap gap-4 mt-3"  ref="CH4Ref">
                <el-form-item prop="mCO2i" :rules="[{ required: true, message: 'mCO2i is required' }]">
                    <el-input v-model="CO2Int.mCO2i" style="width: 300px; height:50px;" placeholder="mCO2i" />
                </el-form-item>
                <el-form-item prop="Qrbi" :rules="[{ required: true, message: 'Qrbi is required' }]">
                    <el-input v-model="CO2Int.Qrbi" style="width: 300px; height:50px;" placeholder="Qrbi" />
                </el-form-item>
            </el-form>
        </div> -->

            <!-- 直接碳排放强度 -->
            <!-- <div class="mt-10">
            <p style="font-weight: bold; font-size: 20px; color: black;">直接碳排放强度</p>
            <el-form :model="IntC" class="flex flex-start flex-wrap gap-4 mt-3"  ref="CH4Ref">
                <el-form-item prop="Ed" :rules="[{ required: true, message: 'Ed is required' }]">
                    <el-input v-model="IntC.Ed" style="width: 300px; height:50px;" placeholder="Ed" />
                </el-form-item>
                <el-form-item prop="EN2O" :rules="[{ required: true, message: 'EN2O is required' }]">
                    <el-input v-model="IntC.EN2O" style="width: 300px; height:50px;" placeholder="EN2O" />
                </el-form-item>
                <el-form-item prop="ECH4" :rules="[{ required: true, message: 'ECH4 is required' }]">
                    <el-input v-model="IntC.ECH4" style="width: 300px; height:50px;" placeholder="ECH4" />
                </el-form-item>
                <el-form-item prop="ECO2" :rules="[{ required: true, message: 'ECO2 is required' }]">
                    <el-input v-model="IntC.ECO2" style="width: 300px; height:50px;" placeholder="ECO2" />
                </el-form-item>
            </el-form>
        </div> -->




            <!-- 电耗碳排放强度 -->
            <div class="mt-10">
                <p style="font-weight: bold; font-size: 20px; color: black;">电耗碳排放强度</p>

                <el-form :model="EleCInt" class="flex flex-start flex-wrap gap-4 mt-3" ref="EleCIntRef">
                    <div class="flex">

                        <div class="w-[180px]">请您选择污水厂的所属区域</div>
                        <el-form-item prop="fe" :rules="[{ required: true, message: 'fe is required' }]">
                            <el-select v-model="EleCInt.fe" placeholder="选择污水厂所属区域" size="large" style="width: 300px">
                                <el-option v-for="item in AreaOptions" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="flex">

                        <div class="w-[180px]">𝑊𝑖
                            —— 第 i {{ iData }}用于生产运行的外购电量，kW·h；</div>
                        <el-form-item prop="Wi" :rules="[{ required: true, message: 'Wi is required' }]">
                            <el-input v-model="EleCInt.Wi" style="width: 300px; height:50px;" placeholder="Wi" />
                        </el-form-item>
                    </div>
                    <div class="flex">

                        <div class="w-[180px]">𝑄ra,𝑖
                            —— 污水处理厂第 i {{ iData }}进水水量，m<sup>3</sup>。</div>
                        <el-form-item>
                            <el-input v-model="N2O.Qrbi" style="width: 300px; height:50px;" placeholder="Qrbi" />
                        </el-form-item>
                    </div>
                </el-form>
            </div>


            <!-- 热耗碳排放强度 -->
            <div class="mt-10">
                <p style="font-weight: bold; font-size: 20px; color: black;">热耗碳排放强度</p>
                <el-form :model="HotCInt" class="flex flex-start flex-wrap gap-4 mt-3" ref="HotCIntRef">
                    <div class="flex">

                        <div class="w-[180px]">𝑓c
                            —— 标准煤 CO2排放因子，取值为 2.7725 kgCO2/kg 标准煤；</div>
                        <el-form-item prop="fc" :rules="[{ required: true, message: 'fc is required' }]">
                            <el-input v-model="HotCInt.fc" style="width: 300px; height:50px;" placeholder="fc" />
                        </el-form-item>
                    </div>
                    <div class="flex">

                        <div class="w-[180px]">𝑀h,𝑖
                            —— 第 i {{ iData }}用于污水处理运行的外购热量，按标准煤计算，kg 标准煤；</div>
                        <el-form-item prop="Mhi" :rules="[{ required: true, message: 'Mhi is required' }]">
                            <el-input v-model="HotCInt.Mhi" style="width: 300px; height:50px;" placeholder="Mhi" />
                        </el-form-item>
                    </div>
                    <div class="flex">

                        <div class="w-[180px]">污水处理厂第 i {{ iData }}进水水量，m<sup>3</sup>。</div>

                        <el-form-item>
                            <el-input v-model="N2O.Qrbi" style="width: 300px; height:50px;" placeholder="Qrbi" />
                        </el-form-item>
                    </div>
                </el-form>
            </div>

            <!-- 物耗碳排放量药剂质量 -->
            <div class="mt-10">
                <p style="font-weight: bold; font-size: 20px; color: black;">物耗碳排放量药剂质量（kg）及浓度（10%填10）</p>
                <div class="flex">
                    <el-form :model="McgM" class="flex flex-start flex-wrap gap-4 mt-3" ref="McgMRef">
                        <div class="flex" v-for="(value, key, index) in McgM">
                            <div class="w-[180px] mr-10">{{ MatMNames[index] }}</div>
                            <el-form-item class="mr-10" :key="key" :prop="key"
                                :rules="[{ required: true, message: `${key} is required` }]">
                                <el-input v-model="McgM[key]" style="width: 300px; height:50px;" :placeholder="key" />
                            </el-form-item>
                            <div class="w-[180px] mr-10">{{ MatConNames[index] }}</div>
                            <el-form-item :key="key" :prop="key"
                                :rules="[{ required: true, message: `${key} is required` }]">
                                <el-input v-model="McgCon[key]" style="width: 300px; height:50px;" :placeholder="key" />
                            </el-form-item>
                        </div>
                    </el-form>
                </div>
                <!-- <el-form :model="NaClO" class="flex flex-start flex-wrap gap-4 mt-3" ref="NaClORef" v-if="NaClO.ifHave">
                    <div class="flex">
                        <div class="w-[180px] mr-10">选择您的次氯酸钠浓度</div>
                        <el-form-item prop="Con" :rules="[{ required: true, message: 'Con is required' }]">
                            <el-select v-model="NaClO.Con" placeholder="次氯酸钠浓度" size="large"
                                style="width: 300px ;height:50px">
                                <el-option v-for="item in NaClOOptions" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </el-form-item>
                    </div>
                </el-form> -->
            </div>


            <!-- 物耗碳排放量药剂浓度 -->
            <!-- <div class="mt-10">
                <p style="font-weight: bold; font-size: 20px; color: black;">物耗碳排放量药剂浓度(如10%，填10)</p>
                <el-form :model="McgCon" class="flex flex-start flex-wrap gap-4 mt-3" ref="McgConRef">
                    <div class="flex" v-for="(value, key, index) in McgCon">
                        
                    </div>
                </el-form>
            </div> -->

            <!-- 物耗碳排放量 -->
            <!-- <div class="mt-10">
            <p style="font-weight: bold; font-size: 20px; color: black;">物耗碳排放量</p>
            <el-form :model="MatC" class="flex flex-start flex-wrap gap-4 mt-3"  ref="CH4Ref">
                <el-form-item v-for="(value, key) in MatC" :key="key" :prop="key"
                    :rules="[{ required: true, message: `${key} is required` }]">
                    <el-input v-model="MatC[key]" style="width: 300px; height:50px;" :placeholder="key" />
                </el-form-item>
            </el-form>
        </div> -->

            <!-- 物耗碳排放强度 -->
            <!-- <div class="mt-10">
            <p style="font-weight: bold; font-size: 20px; color: black;">物耗碳排放强度</p>
            <el-form class="flex flex-start flex-wrap gap-4 mt-3"  ref="CH4Ref">
                <el-form-item>
                    <el-input v-model="MatC.Mcj" style="width: 300px; height:50px;" placeholder="Mcj" />
                </el-form-item>
                <el-form-item>
                    <el-input v-model="N2O.Qrbi" style="width: 300px; height:50px;" placeholder="Qrbi" />
                </el-form-item>
            </el-form>
        </div> -->

            <!-- 间接碳排放强度 -->
            <!-- <div class="mt-10">
            <p style="font-weight: bold; font-size: 20px; color: black;">间接碳排放强度</p>
            <el-form :model="IndCInt" class="flex flex-start flex-wrap gap-4 mt-3"  ref="CH4Ref">
                <el-form-item prop="Ei" :rules="[{ required: true, message: 'Ei is required' }]">
                    <el-input v-model="IndCInt.Ei" style="width: 300px; height:50px;" placeholder="Ei" />
                </el-form-item>
                <el-form-item prop="Ee" :rules="[{ required: true, message: 'Ee is required' }]">
                    <el-input v-model="IndCInt.Ee" style="width: 300px; height:50px;" placeholder="Ee" />
                </el-form-item>
                <el-form-item prop="Eh" :rules="[{ required: true, message: 'Eh is required' }]">
                    <el-input v-model="IndCInt.Eh" style="width: 300px; height:50px;" placeholder="Eh" />
                </el-form-item>
                <el-form-item prop="Ec" :rules="[{ required: true, message: 'Ec is required' }]">
                    <el-input v-model="IndCInt.Ec" style="width: 300px; height:50px;" placeholder="Ec" />
                </el-form-item>
            </el-form>
        </div> -->

            <!-- 碳排放强度 -->
            <!-- <div class="mt-10">
            <p style="font-weight: bold; font-size: 20px; color: black;">碳排放强度</p>
            <el-form :model="CInt" class="flex flex-start flex-wrap gap-4 mt-3"  ref="CH4Ref">
                <el-form-item prop="Ef" :rules="[{ required: true, message: 'Ef is required' }]">
                    <el-input v-model="CInt.Ef" style="width: 300px; height:50px;" placeholder="Ef" />
                </el-form-item>
                <el-form-item prop="Ed" :rules="[{ required: true, message: 'Ed is required' }]">
                    <el-input v-model="CInt.Ed" style="width: 300px; height:50px;" placeholder="Ed" />
                </el-form-item>
                <el-form-item prop="Ei" :rules="[{ required: true, message: 'Ei is required' }]">
                    <el-input v-model="CInt.Ei" style="width: 300px; height:50px;" placeholder="Ei" />
                </el-form-item>
            </el-form>
        </div> -->
            <!-- 总氮去除率修正系数 -->
            <!-- <div class="mt-10">
            <p style="font-weight: bold; font-size: 20px; color: black;">总氮去除率修正系数</p>
            <el-form :model="TotNRemRat" class="flex flex-start flex-wrap gap-4 mt-3"  ref="CH4Ref">
                <el-form-item prop="TNrbi" :rules="[{ required: true, message: 'TNrbi is required' }]">
                    <el-input v-model="TotNRemRat.TNrbi" style="width: 300px; height:50px;" placeholder="TNrbi" />
                </el-form-item>
                <el-form-item prop="TNebi" :rules="[{ required: true, message: 'TNebi is required' }]">
                    <el-input v-model="TotNRemRat.TNebi" style="width: 300px; height:50px;" placeholder="TNebi" />
                </el-form-item>
            </el-form>
        </div> -->


            <!-- 处理规模修正系数 -->
            <div class="mt-10" v-if="iData === '年'">
                <p style="font-weight: bold; font-size: 20px; color: black;">处理规模修正系数</p>
                <el-form :model="TreScaRat" class="flex flex-start flex-wrap gap-4 mt-3" ref="TreScaRatRef">
                    <div class="flex">
                        <div class="w-[180px]">处理规模——Qda（m<sup>3</sup>/d）</div>
                        <el-form-item prop="Qda" :rules="[{ required: true, message: 'Qda is required' }]">
                            <el-input v-model="TreScaRat.Qda" style="width: 300px; height:50px;" placeholder="Qda" />
                        </el-form-item>
                    </div>
                </el-form>
            </div>

            <!-- 耗氧污染物削减量修正系数 -->
            <!-- <div class="mt-10">
            <p style="font-weight: bold; font-size: 20px; color: black;">耗氧污染物削减量修正系数</p>
            <el-form :model="OxyPolRemRat" class="flex flex-start flex-wrap gap-4 mt-3"  ref="CH4Ref">
                <el-form-item prop="k3" :rules="[{ required: true, message: 'k3 is required' }]">
                    <el-input v-model="OxyPolRemRat.k3" style="width: 300px; height:50px;" placeholder="k3" />
                </el-form-item>
                <el-form-item prop="X" :rules="[{ required: true, message: 'X is required' }]">
                    <el-input v-model="OxyPolRemRat.X" style="width: 300px; height:50px;" placeholder="X" />
                </el-form-item>
            </el-form>
        </div> -->

            <!-- 耗氧污染物削减量 -->
            <div class="mt-10" v-if="iData === '年'">
                <p style="font-weight: bold; font-size: 20px; color: black;">耗氧污染物削减量</p>
                <el-form :model="OxyPolRem" class="flex flex-start flex-wrap gap-4 mt-3" ref="OxyPolRemRef">
                    <!-- <el-form-item prop="X" :rules="[{ required: true, message: 'X is required' }]">
                    <el-input v-model="OxyPolRem.X" style="width: 300px; height:50px;" placeholder="X" />
                </el-form-item> -->

                    <div class="flex">
                        <div class="w-[180px]">𝐵𝑂𝐷rb,𝑖
                            —— 污水生物处理单元第 i {{ iData }}平均进水 BOD5浓度，mg/L；</div>
                        <el-form-item prop="BODrbi" :rules="[{ required: true, message: 'BODrbi is required' }]">
                            <el-input v-model="OxyPolRem.BODrbi" style="width: 300px; height:50px;"
                                placeholder="BODrbi" />
                        </el-form-item>
                    </div>

                    <div class="flex">
                        <div class="w-[180px]">𝐵𝑂𝐷eb,𝑖
                            —— 污水生物处理单元第 i {{ iData }}平均出水 BOD5浓度，mg/L；</div>
                        <el-form-item prop="BODebi" :rules="[{ required: true, message: 'BODebi is required' }]">
                            <el-input v-model="OxyPolRem.BODebi" style="width: 300px; height:50px;"
                                placeholder="BODebi" />
                        </el-form-item>
                    </div>

                    <div class="flex">
                        <div class="w-[180px]">NH3-Neb,i —— 污水生物处理单元第 i {{ iData }}平均出水 NH3-N 浓度，mg/L；</div>
                        <el-form-item prop="NH3Nebi" :rules="[{ required: true, message: 'NH3Nebi is required' }]">
                            <el-input v-model="OxyPolRem.NH3Nebi" style="width: 300px; height:50px;"
                                placeholder="NH3Nebi" />
                        </el-form-item>
                    </div>

                    <div class="flex">
                        <div class="w-[180px]">𝑄eb,𝑖
                            —— 污水生物处理单元第 i {{ iData }}出水水量，m<sup>3</sup>。</div>
                        <el-form-item prop="Qebi" :rules="[{ required: true, message: 'Qebi is required' }]">
                            <el-input v-model="OxyPolRem.Qebi" style="width: 300px; height:50px;" placeholder="Qebi" />
                        </el-form-item>
                    </div>

                </el-form>
            </div>

            <!-- 出水排放标准修正系数 -->
            <div class="mt-10" v-if="iData === '年'">
                <p style="font-weight: bold; font-size: 20px; color: black;">出水排放标准修正系数</p>
                <el-form :model="WaterOutRat" class="flex flex-start flex-wrap gap-4 mt-3" ref="WaterOutRatRef">
                    <div class="w-[180px]">本厂所执行的排放标准：规定的CODcr浓度限值</div>
                    <el-form-item prop="CODcr" :rules="[{ required: true, message: 'WaterOutRat is required' }]">
                        <el-select v-model="WaterOutRat.CODcr" placeholder="CODcr浓度限值" size="large"
                            style="width: 240px">
                            <el-option v-for="item in WaterOptions" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </el-form-item>
                </el-form>

            </div>




            <!-- 臭气控制程度修正系数 -->
            <div class="mt-10" v-if="iData === '年'">
                <p style="font-weight: bold; font-size: 20px; color: black;">臭气控制程度修正系数</p>
                <el-form :model="OxyConRat" class="flex flex-start flex-wrap gap-4 mt-3" ref="OxyConRatRef">
                    <div class="w-[180px]">除臭方式</div>
                    <el-form-item prop="k5" :rules="[{ required: true, message: 'k5 is required' }]">
                        <el-select v-model="OxyConRat.k5" placeholder="除臭方式" size="large" style="width: 240px">
                            <el-option v-for="item in OxyConRatOptions" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </el-form-item>
                </el-form>

            </div>



            <!-- 低碳行为鼓励分数 -->
            <div class="mt-10" v-if="iData === '年'">
                <p style="font-weight: bold; font-size: 20px; color: black;">低碳行为鼓励分数</p>
                <el-form :model="LowCStyle" class="flex flex-start flex-wrap gap-4 mt-3" ref="LowCStyleRef">
                    <!-- v-for对于数组(item,index) item是当前项，index是当前项的下标 -->
                    <!-- v-for对于对象(value,key) value是值，key是键 -->
                    <div class="flex" v-for="(value, key, index) in LowCStyle">
                        <div class="w-[180px]">{{ LowCNames[index] }}</div>
                        <el-form-item :key="key" :prop="key"
                            :rules="[{ required: true, message: `${key} is required` }]">
                            <el-input v-model="LowCStyle[key]" style="width: 300px; height:50px;"
                                :placeholder="LowCNames[index]" />
                        </el-form-item>
                    </div>
                </el-form>
            </div>
            <div class="flex flex-col">
                <p style="font-weight: bold; font-size: 20px; color: black;">采取了哪些绿色低碳行为，简单输入：</p>
                <el-input type="textarea" :rows="6" placeholder="绿色低碳行为" v-model="textarealvse" style="width: 800px;"> </el-input>
            </div>

            <!-- 污水处理厂基本信息
            <div class="mt-10">
                <p style="font-weight: bold; font-size: 20px; color: black;">污水处理厂基本信息</p>
                <el-form :model="basicalInfo" class="flex flex-start flex-wrap gap-4 mt-3" ref="LowCStyleRef">
                    <div class="flex">
                        <div class="w-[180px]">隶属区域中心</div>
                        <el-form-item prop="areaCenter" :rules="[{ required: true, message: 'areaCenter is required' }]">
                            <el-input v-model="basicalInfo.areaCenter" style="width: 300px; height:50px;"
                                placeholder="areaCenter" />
                        </el-form-item>
                    </div>
                    <div class="flex">
                        <div class="w-[180px]">年进水水量</div>
                        <el-form-item prop="waterYear" :rules="[{ required: true, message: 'waterYear is required' }]">
                            <el-input v-model="basicalInfo.waterYear" style="width: 300px; height:50px;"
                                placeholder="waterYear" />
                        </el-form-item>
                    </div>
                    <div class="flex">
                        <div class="w-[180px]">处理工艺</div>
                        <el-form-item prop="handleStyle" :rules="[{ required: true, message: 'handleStyle is required' }]">
                            <el-input v-model="basicalInfo.handleStyle" style="width: 300px; height:50px;"
                                placeholder="handleStyle" />
                        </el-form-item>
                    </div>
                    <div class="flex">
                        <div class="w-[180px]">建厂时间</div>
                        <el-form-item prop="createdTime" :rules="[{ required: true, message: 'createdTime is required' }]">
                            <el-input v-model="basicalInfo.createdTime" style="width: 300px; height:50px;"
                                placeholder="createdTime" />
                        </el-form-item>
                    </div>

                </el-form>
            </div> -->


        </div>
    </keep-alive>

</template>