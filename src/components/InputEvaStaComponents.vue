<script setup>
    import router from '@/router';
    import { useEvaStaStore } from '@/stores/evastaStore';
    import { reactive, watch, ref } from 'vue';
    import { ElMessage, ElMessageBox } from 'element-plus';
    import * as XLSX from 'xlsx';
    const counter = useEvaStaStore()

    const props = defineProps({
        data: String,
        iData: String
    })


    const oneDayResult = reactive({})

    const OCEw_fCO2m = reactive(counter.OCEw_fCO2m)
    const OCEw_eCO2m = reactive(counter.OCEw_eCO2m)
    const OCEw_CH4m = reactive(counter.OCEw_CH4m)
    const OCEw_N2Om = reactive(counter.OCEw_N2Om)
    const OCEw_ban = reactive(counter.OCEw_ban)
    const OCEw_ecm = reactive(counter.OCEw_ecm)
    const OCEw_fcm = reactive(counter.OCEw_fcm)
    const OCEw_ccm = reactive(counter.OCEw_ccm)
    const OCEw_rean = reactive(counter.OCEw_rean)
    const OCEs_CH4adm = reactive(counter.OCEs_CH4adm)
    const OCEs_CH4afm = reactive(counter.OCEs_CH4afm)
    const OCEs_N2Oafm = reactive(counter.OCEs_N2Oafm)
    const OCEs_fCO2incm = reactive(counter.OCEs_fCO2incm)
    const OCEs_CH4incm = reactive(counter.OCEs_CH4incm)
    const OCEs_N2Oincm = reactive(counter.OCEs_N2Oincm)
    const OCEs_ban = reactive(counter.OCEs_ban)
    const OCEs_rean = reactive(counter.OCEs_rean)
    const OCA_hpm = reactive(counter.OCA_hpm)
    const OCA_pvm = reactive(counter.OCA_pvm)
    const OCA_wsm = reactive(counter.OCA_wsm)
    const OCA_adm = reactive(counter.OCA_adm)
    const OCA_incm = reactive(counter.OCA_incm)
    const OCA_landm = reactive(counter.OCA_landm)
    const OCA_an = reactive(counter.OCA_an)
    const OCE_oman = reactive(counter.OCE_oman)
    const OCE_csAdd = reactive(counter.OCE_csAdd)
    const OCE_csRem = reactive(counter.OCE_csRem)
    const OCE_lcom = reactive(counter.OCE_lcom)
    const OCEs_dCH4lfan = reactive(counter.OCEs_dCH4lfan)
    const OCEs_dCH4landan = reactive(counter.OCEs_dCH4landan)
    const OCEs_dN2Olandan = reactive(counter.OCEs_dN2Olandan)
    const CEs_dtransran = reactive(counter.CEs_dtransran)
    const CEs_dan = reactive(counter.CEs_dan)
    const OCE_exN2Oan = reactive(counter.OCE_exN2Oan)
    const OCE_Ioman = reactive(counter.OCE_Ioman)
    const OCE_IomanX = reactive(counter.OCE_IomanX)
    const OCR_oman = reactive(counter.OCR_oman)
    const OCR_Ioman = reactive(counter.OCR_Ioman)
    const OCR_IomanX = reactive(counter.OCR_IomanX)
    const OCE_Iomang = reactive(counter.OCE_Iomang)
    const OCB_stan = reactive(counter.OCB_stan)
    const OCE_Ilc = reactive(counter.OCE_Ilc)
    const OX = reactive(counter.OX)
    const OCE_IlcX = reactive(counter.OCE_IlcX)
    const OCE_Ilcg = reactive(counter.OCE_Ilcg)
    const OCB_lcst = reactive(counter.OCB_lcst)
    // const ifRealTest = reactive(counter.ifRealTest)
    const OEFw_eCO2Options = reactive(counter.OEFw_eCO2Options)
    const AreaOptions = reactive(counter.AreaOptions)
    const A03EF_fcjInput = reactive(counter.A03EF_fcjInput)
    const A03EF_fcjData = reactive(counter.A03EF_fcjData)
    // const A03EF_fcjMfjNames = reactive(counter.A03EF_fcjMfjNames)
    const MatCStyle = reactive(counter.MatCStyle)
    const McgCon = reactive(counter.McgCon)
    const McgM = reactive(counter.McgM)
    const ifJump = reactive(counter.ifJump)
    const ifJumpOptions = reactive(counter.ifJumpOptions)
    const OCE_Biogas_N2O = reactive(counter.OCE_Biogas_N2O)
    const fireStyles = reactive(counter.fireStyles)
    const OCEs_fCO2incmCop = reactive(counter.OCEs_fCO2incmCop)
    const OCEs_CH4incmCop = reactive(counter.OCEs_CH4incmCop)
    const OCEs_N2OincmCop = reactive(counter.OCEs_N2OincmCop)
    const technologyOptions = reactive(counter.technologyOptions)
    const ifEleDurEne = reactive(counter.ifEleDurEne)
    // const A03EF_fcjInputCop = reactive(counter.A03EF_fcjInputCop)
    const A06 = reactive(counter.A06)
    const EF_rpjA07Fc = reactive(counter.EF_rpjA07Fc)
    const MrpA07Input = reactive(counter.MrpA07Input)
    const OCEsd_ecr = reactive(counter.OCEsd_ecr)
    const EFs_skOptions = reactive(counter.EFs_skOptions)
    const EF_exN2OOptions = reactive(counter.EF_exN2OOptions)
    const OCE_lc = reactive(counter.OCE_lc)
    // const baseYear = reactive(counter.baseYear)
    // const evalYear = reactive(counter.evalYear)
    const B01Level = reactive(counter.B01Level)
    const B01Scope = reactive(counter.B01Scope)
    const B01Scale = reactive(counter.B01Scale)
    const B01Value = reactive(counter.B01Value)
    const MatMNames = reactive(counter.MatMNames)
    const MatConNames = reactive(counter.MatConNames)
    const ifRealTestOptions = reactive(counter.ifRealTestOptions)
    const ifEleDurEneOptions = reactive(counter.ifEleDurEneOptions)
    const A03EF_fcjInputCopy = reactive(counter.A03EF_fcjInputCopy)
    const A03EF_fcjInputCopyCopy = reactive(counter.A03EF_fcjInputCopyCopy)
    const McgConCopy = reactive(counter.McgConCopy)
    const McgMCopy = reactive(counter.McgMCopy)
    const OCEw_ecmCopy = reactive(counter.OCEw_ecmCopy)
    const OCEw_fcmCopy = reactive(counter.OCEw_fcmCopy)
    const OCEw_ccmCopy = reactive(counter.OCEw_ccmCopy)
    const ifCompDiff = reactive(counter.ifCompDiff)
    const ifCompDiffOptions = reactive(counter.ifCompDiffOptions)
    const B02Level = reactive(counter.B02Level)
    const B02Scope = reactive(counter.B02Scope)
    const B02Scale = reactive(counter.B02Scale)
    const B02Value = reactive(counter.B02Value)
    const EF_rpjA07Names = reactive(counter.EF_rpjA07Names)
    const OCEsd_fcr = reactive(counter.OCEsd_fcr)
    const OCEsd_fcrA03EF_fcjInput = reactive(counter.OCEsd_fcrA03EF_fcjInput)
    const A03EF_fcjInput55 = reactive(counter.A03EF_fcjInput55)
    const A03EF_fcjInput54 = reactive(counter.A03EF_fcjInput54)
    const ifAllLeaf = reactive(counter.ifAllLeaf)
    const ifAllLeafOptions = reactive(counter.ifAllLeafOptions)

    const basicalInfo = reactive(counter.basicalInfo)
    const textarealvse = ref(counter.textarealvse)



    // 2.1化石源碳矿化产生的碳排放量：
    watch(
        () => [OCEw_fCO2m],
        ([newOCEw_fCO2m]) => {
            OCEw_fCO2m.CEw_fCO2m = Number(newOCEw_fCO2m.Qinm) * (Number(newOCEw_fCO2m.CODinm) - Number(newOCEw_fCO2m.CODoutm)) * Number(newOCEw_fCO2m.EFw_CO2) * Number(newOCEw_fCO2m.FCF) * 0.001 * 0.01
            console.log(OCEw_fCO2m.CEw_fCO2m, 'OCEw_fCO2m.CEw_fCO2m 化石源碳矿化产生的碳排放量* 成功');
            // console.log(Number(newOCEw_fCO2m.Qinm),"Number(newOCEw_fCO2m.Qinm)");
            console.log(Number(newOCEw_fCO2m.CODinm),"Number(newOCEw_fCO2m.CODinm)");
            console.log(Number(newOCEw_fCO2m.CODoutm),"Number(newOCEw_fCO2m.CODoutm)");
            console.log(Number(newOCEw_fCO2m.EFw_CO2),"Number(newOCEw_fCO2m.EFw_CO2)");
            console.log(Number(newOCEw_fCO2m.FCF),"Number(newOCEw_fCO2m.FCF)");
            
        },
        { deep: true }
    )



    // 2.2外加碳源矿化产生的化石源CO2碳排放量：
    watch(
        () => [OCEw_eCO2m],
        ([newOCEw_eCO2m]) => {
            OCEw_eCO2m.CEw_eCO2m = newOCEw_eCO2m.EFw_eCO2 * newOCEw_eCO2m.MemCon * newOCEw_eCO2m.MemM *0.01
            console.log(OCEw_eCO2m.CEw_eCO2m, 'OCEw_eCO2m.CEw_eCO2m 外加碳源矿化产生的化石源CO2碳排放量* 成功');
            console.log();
            
        },
        { deep: true }
    )


    watch(
        () => [OCEw_CH4m],
        ([newOCEw_CH4m]) => {
            console.log(newOCEw_CH4m.ifRealTest, 'newOCEw_CH4m.ifRealTest');
            if (newOCEw_CH4m.ifRealTest) {
                OCEw_CH4m.CEw_CH4m = Number(OCEw_fCO2m.Qinm) * (Number(OCEw_fCO2m.CODinm) - Number(OCEw_fCO2m.CODoutm)) * Number(newOCEw_CH4m.EFw_CH4) * Number(newOCEw_CH4m.fCH4) * 0.001 + (Number(newOCEw_CH4m.MpumpCH4m) + Number(newOCEw_CH4m.MgritCH4m)) * Number(newOCEw_CH4m.fCH4)
                console.log(OCEw_CH4m.CEw_CH4m, 'OCEw_CH4m.CEw_CH4m  可以实测  成功');
            } else {
                OCEw_CH4m.CEw_CH4m = (1 + newOCEw_CH4m.FCH4 * 0.01) * OCEw_fCO2m.Qinm * (OCEw_fCO2m.CODinm - OCEw_fCO2m.CODoutm) * newOCEw_CH4m.EFw_CH4 * newOCEw_CH4m.fCH4 * 0.001
                console.log(OCEw_CH4m.CEw_CH4m, 'OCEw_CH4m.CEw_CH4m  不可实测  成功');
            }
        },
        { deep: true }
    )


    //  2.4 N2O碳排放当量
    watch(
        () => [OCEw_N2Om],
        ([newOCEw_N2Om]) => {
            OCEw_N2Om.CEw_N2Om = OCEw_fCO2m.Qinm * (newOCEw_N2Om.TNinm - newOCEw_N2Om.TNoutm) * newOCEw_N2Om.EFw_N2O * newOCEw_N2Om.transitionRate * newOCEw_N2Om.fN2O * 0.001
            console.log(OCEw_N2Om.CEw_N2Om, 'OCEw_N2Om.CEw_N2Om N2O碳排放当量  成功');
        },
        { deep: true }
    )


    // 3.2.5 污水处理阶段生化反应的年度碳排放量 2.5 污水处理阶段生化反应年度碳排放量（直接排放）
    watch(
        () => [OCEw_fCO2m, OCEw_eCO2m, OCEw_N2Om, OCEw_CH4m],
        ([]) => {
            OCEw_ban.CEw_ban = OCEw_fCO2m.CEw_fCO2m + OCEw_eCO2m.CEw_eCO2m + OCEw_N2Om.CEw_N2Om + OCEw_CH4m.CEw_CH4m
            console.log(OCEw_ban.CEw_ban, 'OCEw_ban.OCEw_ban 污水处理阶段生化反应年度碳排放量（直接排放） 这里的代入的是不可实测的 成功 ');
        },
        { deep: true }
    )


    //  3.3.1  污水处理阶段所运行设备的电力消耗产生的碳排放量   3.1 电力消耗产生的碳排放量
    watch(
        () => [OCEw_ecm],
        ([newOCEw_ecm]) => {
            OCEw_ecm.CEw_ecm = newOCEw_ecm.Eecm * newOCEw_ecm.EF_ecp
            console.log(OCEw_ecm.CEw_ecm, 'OCEw_ecm.CEw_ecm  电力消耗产生的碳排放量  成功');
        },
        { deep: true }
    )


    //  3.3.2 3.2 用于污水处理阶段的锅炉、热蒸汽生产、设备运转等固定式能源燃料消耗产生的碳排放量，以及外购热源等非电力能源消耗折合的碳排放量（即热耗）
    watch(
        () => [A03EF_fcjInput],
        ([]) => {
            OCEw_fcm.CEw_fcm =
                A03EF_fcjInput.LianJiao * A03EF_fcjData[0] +
                A03EF_fcjInput.Yan * A03EF_fcjData[1] +
                A03EF_fcjInput.NoYan * A03EF_fcjData[2] +
                A03EF_fcjInput.JiaoC * A03EF_fcjData[3] +
                A03EF_fcjInput.YuanOil * A03EF_fcjData[4] +
                A03EF_fcjInput.QiOil * A03EF_fcjData[5] +
                A03EF_fcjInput.MeiOil * A03EF_fcjData[6] +
                A03EF_fcjInput.ChaiOil * A03EF_fcjData[7] +
                A03EF_fcjInput.ShiYouQi * A03EF_fcjData[8] +
                A03EF_fcjInput.GanQi * A03EF_fcjData[9] +
                A03EF_fcjInput.MeiJiaoOil * A03EF_fcjData[10] +
                A03EF_fcjInput.TianRanQi * A03EF_fcjData[11] +
                A03EF_fcjInput.JiaoLuQi * A03EF_fcjData[12] +
                A03EF_fcjInput.JiaoCQi * A03EF_fcjData[13] +
                A03EF_fcjInput.other * A03EF_fcjData[14]
            console.log(OCEw_fcm.CEw_fcm, 'OCEw_fcm.CEw_fcm 化石源碳矿化产生的碳排放量  成功');
        },
        { deep: true }
    )


    //  3.3.3  污水处理阶段药剂消耗产生的碳排放量  3.3药剂消耗产生的碳排放量
    watch(
        () => [McgCon, McgM],
        ([]) => {
            if (McgCon.CiNaClO) {
                console.log('进入了if');
                OCEw_ccm.CEw_ccm =
                   ( MatCStyle.Jian * McgCon.Jian * McgM.Jian +
                    MatCStyle.NaOH * McgCon.NaOH * McgM.NaOH +
                    MatCStyle.PAC * McgCon.PAC * McgM.PAC * 27 / 174.45 +
                    MatCStyle.CH3OH * McgCon.CH3OH * McgM.CH3OH +
                    MatCStyle.AlSO4 * McgCon.AlSO4 * McgM.AlSO4 +
                    MatCStyle.PAM * McgCon.PAM * McgM.PAM +
                    MatCStyle.FeCl3 * McgCon.FeCl3 * McgM.FeCl3 * 56 / 162.5 +
                    MatCStyle.CaOH2 * McgCon.CaOH2 * McgM.CaOH2 +
                    MatCStyle.Otherxvning * McgCon.Otherxvning * McgM.Otherxvning +
                    MatCStyle.CiNaClO * McgCon.CiNaClO * McgM.CiNaClO / 0.15 +
                    MatCStyle.Cl2 * McgCon.Cl2 * McgM.Cl2 +
                    MatCStyle.O3 * McgCon.O3 * McgM.O3 +
                    MatCStyle.O2H2O * McgCon.O2H2O * McgM.O2H2O +
                    MatCStyle.Otherxiaodu * McgCon.Otherxiaodu * McgM.Otherxiaodu +
                    MatCStyle.Otheryao * McgCon.Otheryao * McgM.Otheryao +
                    MatCStyle.Cifen * McgCon.Cifen * McgM.Cifen +
                    MatCStyle.FeSO4 * McgCon.FeSO4 * McgM.FeSO4 * 56 / 400 +
                    MatCStyle.C2H3NaO2 * McgCon.C2H3NaO2 * McgM.C2H3NaO2 ) * 0.01
                console.log(OCEw_ccm.CEw_ccm, 'OCEw_ccm.CEw_ccm 化石源碳矿化产生的碳排放量  次氯酸钠浓度不为15%');
            } else {
                console.log('进入了else');

                OCEw_ccm.CEw_ccm =
                ( MatCStyle.Jian * McgCon.Jian * McgM.Jian +
                    MatCStyle.NaOH * McgCon.NaOH * McgM.NaOH +
                    MatCStyle.PAC * McgCon.PAC * McgM.PAC * 27 / 174.45 +
                    MatCStyle.CH3OH * McgCon.CH3OH * McgM.CH3OH +
                    MatCStyle.AlSO4 * McgCon.AlSO4 * McgM.AlSO4 +
                    MatCStyle.PAM * McgCon.PAM * McgM.PAM +
                    MatCStyle.FeCl3 * McgCon.FeCl3 * McgM.FeCl3 * 56 / 162.5 +
                    MatCStyle.CaOH2 * McgCon.CaOH2 * McgM.CaOH2 +
                    MatCStyle.Otherxvning * McgCon.Otherxvning * McgM.Otherxvning +
                    MatCStyle.CiNaClO  * McgM.CiNaClO * 0.15 +
                    MatCStyle.Cl2 * McgCon.Cl2 * McgM.Cl2 +
                    MatCStyle.O3 * McgCon.O3 * McgM.O3 +
                    MatCStyle.O2H2O * McgCon.O2H2O * McgM.O2H2O +
                    MatCStyle.Otherxiaodu * McgCon.Otherxiaodu * McgM.Otherxiaodu +
                    MatCStyle.Otheryao * McgCon.Otheryao * McgM.Otheryao +
                    MatCStyle.Cifen * McgCon.Cifen * McgM.Cifen +
                    MatCStyle.FeSO4 * McgCon.FeSO4 * McgM.FeSO4 * 56 / 400 +
                    MatCStyle.C2H3NaO2 * McgCon.C2H3NaO2 * McgM.C2H3NaO2 ) * 0.01
                console.log(OCEw_ccm.CEw_ccm, 'OCEw_ccm.CEw_ccm 化石源碳矿化产生的碳排放量  浓度15%');
            }


        },
        { deep: true }
    )


    //  3.3.4 污水处理阶段能源和药剂消耗产生的碳排放量   3.4 污水处理阶段能源和药剂消耗产生的碳排放量（间接排放）
    watch(
        () => [OCEw_ecm, OCEw_fcm, OCEw_ccm],
        ([]) => {
            OCEw_rean.CEw_rean = OCEw_ecm.CEw_ecm + OCEw_fcm.CEw_fcm + OCEw_ccm.CEw_ccm
            console.log(OCEw_rean.CEw_rean, 'OCEw_rean.CEw_rean 化石源碳矿化产生的碳排放量  成功');
        },
        { deep: true }
    )


    // 3.4.1 污泥浓缩脱水过程的生化反应碳排放量可忽略不计   
    //  4.1污泥浓缩脱水过程的碳排放量可忽略不计（大部分用户都可能选择此项，选择此项后后面的计算过程将不再进行）
    watch(
        () => [OCEw_fCO2m],
        ([newOCEw_fCO2m]) => {

        },
        { deep: true }
    )


    //   3.4.2  污泥厌氧消化沼气收集管路无意泄露的 CH4或沼气火炬燃烧不充分导致的碳排放CO2排放当量 
    //  4.2污泥厌氧消化沼气收集管路的无意泄露与火炬不充分燃烧的排放
    watch(
        () => [OCEs_CH4adm],
        ([newOCEs_CH4adm]) => {
            OCEs_CH4adm.CEs_CH4adm = newOCEs_CH4adm.Vbiogasm * newOCEs_CH4adm.PCH4 * 0.01 * newOCEs_CH4adm.F * 0.01 * OCEs_CH4adm.transitionMol * OCEs_CH4adm.fCH4
            console.log(OCEs_CH4adm.CEs_CH4adm, 'OCEs_CH4adm.CEs_CH4adm 成功');
        },
        { deep: true }
    )


    //  3.4.3  单独处理污泥厌氧消化过程产生的沼液时,可根据沼液量与TN 浓度按本标准第3.2.4条规定计算  
    //  4.3污泥厌氧消化过程产生沼液的N2O排放
    watch(
        () => [OCE_Biogas_N2O],
        ([newOCE_Biogas_N2O]) => {
            OCE_Biogas_N2O.CE_Biogas_N2O = newOCE_Biogas_N2O.QBiogasm * (newOCE_Biogas_N2O.TNinm - newOCE_Biogas_N2O.TNoutm) * newOCE_Biogas_N2O.EFw_N2O * OCE_Biogas_N2O.rate * OCE_Biogas_N2O.fN2O * 0.001
            console.log(OCE_Biogas_N2O.CE_Biogas_N2O, 'OCE_Biogas_N2O.CE_Biogas_N2O 成功');
        },
        { deep: true }
    )


    //  3.4.4  污泥好氧发酵过程生化反应的碳排放包括 CH4 和 N2O,CO2排放当量宜按下列公式计算  
    //3.4.4-1
    watch(
        () => [OCEs_CH4afm],
        ([newOCEs_CH4afm]) => {
            OCEs_CH4afm.CEs_CH4afm = newOCEs_CH4afm.EFs_CH4af * 0.001 * newOCEs_CH4afm.fCH4 * (newOCEs_CH4afm.MssmSlud * 1000 * (1 - newOCEs_CH4afm.MssmWater * 0.01))
            console.log(OCEs_CH4afm.CEs_CH4afm, 'OCEs_CH4afm.CEs_CH4afm 成功');
        },
        { deep: true }
    )


    //3.4.4-2
    watch(
        () => [OCEs_N2Oafm],
        ([newOCEs_N2Oafm]) => {
            OCEs_N2Oafm.CEs_N2Oafm = newOCEs_N2Oafm.EFs_N2Oaf * 0.001 * OCEs_N2Oafm.fN2O * (OCEs_CH4afm.MssmSlud * 1000 * (1 - OCEs_CH4afm.MssmWater * 0.01))
            console.log(OCEs_N2Oafm.CEs_N2Oafm, 'OCEs_N2Oafm.CEs_N2Oafm 成功');

        },
        { deep: true }
    )


    // 3.4.5 在污泥干化焚烧或协同焚烧过程,化石源碳被氧化产生的化石源CO2碳排放量 
    //  4.5污泥干化焚烧或协同焚烧-化石源碳被氧化产生的CO2碳排放
    watch(
        () => [OCEs_fCO2incm],
        ([newOCEs_fCO2incm]) => {

            OCEs_fCO2incm.CEs_fCO2incm = (OCEs_CH4afm.MssmSlud * 1000 * (1 - OCEs_CH4afm.MssmWater * 0.01)) * newOCEs_fCO2incm.CF * 0.01 * OCEs_fCO2incm.FCF * 0.01 * OCEs_fCO2incm.rate
            console.log(OCEs_fCO2incm.CEs_fCO2incm, 'OCEs_fCO2incm.CEs_fCO2incm 成功');
        },
        { deep: true }
    )


    //  3.4.6-1
    watch(
        () => [OCEs_CH4incm,OCEs_CH4afm],
        () => {
            OCEs_CH4incm.CEs_CH4incm = OCEs_CH4afm.MssmSlud * 1000 * (1 - OCEs_CH4afm.MssmWater * 0.01) * OCEs_CH4incm.EFs_CH4inc * OCEs_CH4incm.fCH4 * 0.001
            console.log(OCEs_CH4incm.CEs_CH4incm, 'OCEs_CH4incm.CEs_CH4incm  成功');
        },
        { deep: true }
    )


    //3.4.6-2
    watch(
        () => [OCEs_N2Oincm,OCEs_CH4afm],
        ([]) => {
            OCEs_N2Oincm.CEs_N2Oincm = OCEs_CH4afm.MssmSlud * 1000 * (1 - OCEs_CH4afm.MssmWater * 0.01) * OCEs_N2Oincm.EFs_N2Oinc * OCEs_N2Oincm.fN2O * 0.001
            console.log(OCEs_N2Oincm.CEs_N2Oincm, 'OCEs_N2Oincm.CEs_N2Oincm  成功测试');

        },
        { deep: true }
    )


    //3.4.7 01        即3.4.5的公式
    watch(
        () => [OCEs_fCO2incmCop],
        ([newOCEs_fCO2incmCop]) => {
            OCEs_fCO2incmCop.CEs_fCO2incm = OCEs_fCO2incmCop.MssmSlud * 1000 * (1 - OCEs_fCO2incmCop.MssmWater * 0.01) * OCEs_fCO2incmCop.CF * OCEs_fCO2incmCop.FCF * 0.01 * 0.001
            // console.log(OCEs_fCO2incmCop.MssmSlud,"OCEs_fCO2incmCop.MssmSlud  1145");
            // console.log(OCEs_fCO2incmCop.MssmWater,"OCEs_fCO2incmCop.MssmWater  1145");
            // console.log(OCEs_fCO2incmCop.CF,"OCEs_fCO2incmCop.CF  1145");
            // console.log(OCEs_fCO2incmCop.CF,"OCEs_fCO2incmCop.FCF  1145");
            console.log(OCEs_fCO2incmCop.CEs_fCO2incm, 'OCEs_fCO2incmCop.CEs_fCO2incm 成功测试 ');

        },
        { deep: true }
    )

    //3.4.7 02        即3.4.6-1的公式
    watch(
        () => [OCEs_CH4incmCop,OCEs_fCO2incmCop],
        () => {
            OCEs_CH4incmCop.CEs_CH4incm = OCEs_fCO2incmCop.MssmSlud * 1000 * (1 - OCEs_fCO2incmCop.MssmWater * 0.01) * OCEs_CH4incmCop.EFs_CH4inc * OCEs_CH4incmCop.fCH4 * 0.001
            console.log(OCEs_fCO2incmCop.MssmSlud,"OCEs_fCO2incmCop.MssmSlud  1145");
            console.log(OCEs_fCO2incmCop.MssmWater,"OCEs_fCO2incmCop.MssmWater  1145");
            console.log(OCEs_CH4incmCop.EFs_CH4inc,"OCEs_CH4incmCop.EFs_CH4inc  1145");
            console.log(OCEs_CH4incmCop.fCH4,"OCEs_CH4incmCop.fCH4  1145");
            console.log(OCEs_CH4incmCop.CEs_CH4incm, 'OCEs_CH4incmCop.CEs_CH4incm 1145 成功测试');
        },
        { deep: true }
    )

    //3.4.7 03        即3.4.6-2的公式
    watch(
        () => [OCEs_N2OincmCop,OCEs_fCO2incmCop],
        () => {
            OCEs_N2OincmCop.CEs_N2Oincm = OCEs_fCO2incmCop.MssmSlud * 1000 * (1 - OCEs_fCO2incmCop.MssmWater * 0.01) * OCEs_N2OincmCop.EFs_N2Oinc * OCEs_N2OincmCop.fN2O * 0.001
            console.log(OCEs_N2OincmCop.CEs_N2Oincm, 'OCEs_N2OincmCop.CEs_N2Oincm 成功测试');
        },
        { deep: true }
    )

    //3.4.8    4.8
    watch(
        () => [OCEs_ban,OCEs_CH4adm,OCE_Biogas_N2O,OCEs_CH4afm,OCEs_N2Oafm,OCEs_fCO2incm,OCEs_CH4incm,OCEs_N2Oincm,OCEs_fCO2incmCop,OCEs_CH4incmCop,OCEs_N2OincmCop],
        ([]) => {
            console.log(OCEs_CH4incmCop.CEs_CH4incm,"OCEs_CH4incmCop.CEs_CH4incm 34819");
            OCEs_ban.CEs_ban = OCEs_CH4adm.CEs_CH4adm + OCE_Biogas_N2O.CE_Biogas_N2O + OCEs_CH4afm.CEs_CH4afm + OCEs_N2Oafm.CEs_N2Oafm + OCEs_fCO2incm.CEs_fCO2incm + OCEs_CH4incm.CEs_CH4incm + OCEs_N2Oincm.CEs_N2Oincm + OCEs_fCO2incmCop.CEs_fCO2incm + OCEs_CH4incmCop.CEs_CH4incm + OCEs_N2OincmCop.CEs_N2Oincm
            console.log(OCEs_CH4adm.CEs_CH4adm,"OCEs_CH4adm.CEs_CH4adm 34811");
            console.log(OCE_Biogas_N2O.CE_Biogas_N2O,"OCE_Biogas_N2O.CE_Biogas_N2O 34812");
            console.log(OCEs_CH4afm.CEs_CH4afm,"OCEs_CH4afm.CEs_CH4afm 34813");
            console.log(OCEs_N2Oafm.CEs_N2Oafm,"OCEs_N2Oafm.CEs_N2Oafm 34814");
            console.log(OCEs_fCO2incm.CEs_fCO2incm,"OCEs_fCO2incm.CEs_fCO2incm 34815");
            console.log(OCEs_CH4incm.CEs_CH4incm,"OCEs_CH4incm.CEs_CH4incm 34816");
            console.log(OCEs_N2Oincm.CEs_N2Oincm,"OCEs_N2Oincm.CEs_N2Oincm 34817");
            console.log(OCEs_fCO2incmCop.CEs_fCO2incm,"OCEs_fCO2incmCop.CEs_fCO2incmm 34818");
            console.log(OCEs_CH4incmCop.CEs_CH4incm,"OCEs_CH4incmCop.CEs_CH4incm 34819");
            console.log(OCEs_N2OincmCop.CEs_N2Oincm,"OCEs_N2OincmCop.CEs_N2Oincm 34820");
            console.log(OCEs_ban.CEs_ban, 'OCEs_ban.CEs_ban 34821');
        },
        { deep: true }
    )

    //3.5.4    4.9
    // watch(
    //     () => [],
    //     ([]) => {
    //         OCEs_ban.CEs_ban = OCEs_CH4adm.CEs_CH4adm + OCE_Biogas_N2O.CE_Biogas_N2O + OCEs_CH4afm.CEs_CH4afm + OCEs_N2Oafm.CEs_N2Oafm + OCEs_fCO2incm.CEs_fCO2incm + OCEs_CH4incm.CEs_CH4incm + OCEs_N2Oincm.CEs_N2Oincm + OCEs_fCO2incmCop.CEs_fCO2incmCop + OCEs_CH4incmCop.CEs_CH4incmCop + OCEs_N2OincmCop.CEs_N2OincmCop
    //         console.log(OCEs_ban.CEs_ban, 'OCEs_ban.CEs_ban');
    //     },
    //     { deep: true }
    // )


    //  3.3.1  污水处理阶段所运行设备的电力消耗产生的碳排放量   3.1 电力消耗产生的碳排放量  COPY
    watch(
        () => [OCEw_ecmCopy],
        ([newOCEw_ecm]) => {
            OCEw_ecmCopy.CEw_ecm = newOCEw_ecm.Eecm * newOCEw_ecm.EF_ecp
            console.log(OCEw_ecmCopy.CEw_ecm, 'OCEw_ecmCopy.CEw_ecm  电力消耗产生的碳排放量  成功');
        },
        { deep: true }
    )



    //  3.3.2 3.2 用于污水处理阶段的锅炉、热蒸汽生产、设备运转等固定式能源燃料消耗产生的碳排放量，以及外购热源等非电力能源消耗折合的碳排放量（即热耗） COPY
    watch(
        () => [A03EF_fcjInput],
        ([]) => {
            OCEw_fcmCopy.CEw_fcm =
                A03EF_fcjInputCopy.LianJiao * A03EF_fcjData[0] +
                A03EF_fcjInputCopy.Yan * A03EF_fcjData[1] +
                A03EF_fcjInputCopy.NoYan * A03EF_fcjData[2] +
                A03EF_fcjInputCopy.JiaoC * A03EF_fcjData[3] +
                A03EF_fcjInputCopy.YuanOil * A03EF_fcjData[4] +
                A03EF_fcjInputCopy.QiOil * A03EF_fcjData[5] +
                A03EF_fcjInputCopy.MeiOil * A03EF_fcjData[6] +
                A03EF_fcjInputCopy.ChaiOil * A03EF_fcjData[7] +
                A03EF_fcjInputCopy.ShiYouQi * A03EF_fcjData[8] +
                A03EF_fcjInputCopy.GanQi * A03EF_fcjData[9] +
                A03EF_fcjInputCopy.MeiJiaoOil * A03EF_fcjData[10] +
                A03EF_fcjInputCopy.TianRanQi * A03EF_fcjData[11] +
                A03EF_fcjInputCopy.JiaoLuQi * A03EF_fcjData[12] +
                A03EF_fcjInputCopy.JiaoCQi * A03EF_fcjData[13] +
                A03EF_fcjInputCopy.other * A03EF_fcjData[14]
            console.log(OCEw_fcmCopy.CEw_fcm, 'OCEw_fcm.CEw_fcm 化石源碳矿化产生的碳排放量  成功');
        },
        { deep: true }
    )



    //  3.3.3  污水处理阶段药剂消耗产生的碳排放量  3.3药剂消耗产生的碳排放量 COPY
    watch(
        () => [McgConCopy, McgMCopy],
        ([]) => {
            
                OCEw_ccmCopy.CEw_ccm =
                    (MatCStyle.Jian * McgConCopy.Jian * McgMCopy.Jian +
                    MatCStyle.NaOH * McgConCopy.NaOH * McgMCopy.NaOH +
                    MatCStyle.PAC * McgConCopy.PAC * McgMCopy.PAC * 27 / 174.45 +
                    MatCStyle.CH3OH * McgConCopy.CH3OH * McgMCopy.CH3OH +
                    MatCStyle.AlSO4 * McgConCopy.AlSO4 * McgMCopy.AlSO4 +
                    MatCStyle.PAM * McgConCopy.PAM * McgMCopy.PAM +
                    MatCStyle.FeCl3 * McgConCopy.FeCl3 * McgMCopy.FeCl3 * 56 / 162.5 +
                    MatCStyle.CaOH2 * McgConCopy.CaOH2 * McgMCopy.CaOH2 +
                    MatCStyle.Otherxvning * McgConCopy.Otherxvning * McgMCopy.Otherxvning +
                    MatCStyle.CiNaClO * McgConCopy.CiNaClO * McgMCopy.CiNaClO / 0.15  +
                    MatCStyle.Cl2 * McgConCopy.Cl2 * McgMCopy.Cl2 +
                    MatCStyle.O3 * McgConCopy.O3 * McgMCopy.O3 +
                    MatCStyle.O2H2O * McgConCopy.O2H2O * McgMCopy.O2H2O +
                    MatCStyle.Otherxiaodu * McgConCopy.Otherxiaodu * McgMCopy.Otherxiaodu +
                    MatCStyle.Otheryao * McgConCopy.Otheryao * McgMCopy.Otheryao +
                    MatCStyle.Cifen * McgConCopy.Cifen * McgMCopy.Cifen +
                    MatCStyle.FeSO4 * McgConCopy.FeSO4 * McgMCopy.FeSO4 * 56 / 400 +
                    MatCStyle.C2H3NaO2 * McgConCopy.C2H3NaO2 * McgMCopy.C2H3NaO2)*0.01
                console.log(OCEw_ccmCopy.CEw_ccm, 'OCEw_ccmCopy.CEw_ccm 化石源碳矿化产生的碳排放量  次氯酸钠浓度不为15%  Copy');
            // if (McgConCopy.CiNaClO) {
            //     console.log('进入了ifCopy');
            // } else {
            //     console.log('进入了else');

            //     OCEw_ccmCopy.CEw_ccm =
            //         MatCStyle.Jian * McgConCopy.Jian * McgMCopy.Jian +
            //         MatCStyle.NaOH * McgConCopy.NaOH * McgMCopy.NaOH +
            //         MatCStyle.PAC * McgConCopy.PAC * McgMCopy.PAC +
            //         MatCStyle.CH3OH * McgConCopy.CH3OH * McgMCopy.CH3OH +
            //         MatCStyle.AlSO4 * McgConCopy.AlSO4 * McgMCopy.AlSO4 +
            //         MatCStyle.PAM * McgConCopy.PAM * McgMCopy.PAM +
            //         MatCStyle.FeCl3 * McgConCopy.FeCl3 * McgMCopy.FeCl3 +
            //         MatCStyle.CaOH2 * McgConCopy.CaOH2 * McgMCopy.CaOH2 +
            //         MatCStyle.Otherxvning * McgConCopy.Otherxvning * McgMCopy.Otherxvning +
            //         MatCStyle.CiNaClO * McgConCopy.CiNaClO * McgMCopy.CiNaClO +
            //         MatCStyle.Cl2 * McgConCopy.Cl2 * McgMCopy.Cl2 +
            //         MatCStyle.O3 * McgConCopy.O3 * McgMCopy.O3 +
            //         MatCStyle.O2H2O * McgConCopy.O2H2O * McgMCopy.O2H2O +
            //         MatCStyle.Otherxiaodu * McgConCopy.Otherxiaodu * McgMCopy.Otherxiaodu +
            //         MatCStyle.Otheryao * McgConCopy.Otheryao * McgMCopy.Otheryao +
            //         MatCStyle.Cifen * McgConCopy.Cifen * McgMCopy.Cifen +
            //         MatCStyle.FeSO4 * McgConCopy.FeSO4 * McgMCopy.FeSO4 +
            //         MatCStyle.C2H3NaO2 * McgConCopy.C2H3NaO2 * McgMCopy.C2H3NaO2
            //     console.log(OCEw_ccmCopy.CEw_ccm, 'OCEw_ccmCopy.CEw_ccm 化石源碳矿化产生的碳排放量  浓度15%  Copy');
            // }


        },
        { deep: true }
    )


    // 3.6.1采用热泵技术回收利用污水中蕴含的热能时,相应的替碳量    5.1热泵技术回收污水中热量的替碳量   与3.2共用一套计算逻辑与代码
    watch(
        () => [OCA_hpm],
        ([]) => {
            OCA_hpm.CA_hpm =
                A03EF_fcjInputCopyCopy.LianJiao * EF_fcjData[0] +
                A03EF_fcjInputCopyCopy.Yan * EF_fcjData[1] +
                A03EF_fcjInputCopyCopy.NoYan * EF_fcjData[2] +
                A03EF_fcjInputCopyCopy.JiaoC * EF_fcjData[3] +
                A03EF_fcjInputCopyCopy.YuanOil * EF_fcjData[4] +
                A03EF_fcjInputCopyCopy.QiOil * EF_fcjData[5] +
                A03EF_fcjInputCopyCopy.MeiOil * EF_fcjData[6] +
                A03EF_fcjInputCopyCopy.ChaiOil * EF_fcjData[7] +
                A03EF_fcjInputCopyCopy.ShiYouQi * EF_fcjData[8] +
                A03EF_fcjInputCopyCopy.GanQi * EF_fcjData[9] +
                A03EF_fcjInputCopyCopy.MeiJiaoOil * EF_fcjData[10] +
                A03EF_fcjInputCopyCopy.TianRanQi * EF_fcjData[11] +
                A03EF_fcjInputCopyCopy.JiaoLuQi * EF_fcjData[12] +
                A03EF_fcjInputCopyCopy.JiaoCQi * EF_fcjData[13] +
                A03EF_fcjInputCopyCopy.other * EF_fcjData[14]
            console.log(OCA_hpm.CA_hpm, 'OCA_hpm.CA_hpm 化石源碳矿化产生的碳排放量');
        },
        { deep: true }
    )






    // 3.6.2  采用光伏发电的厂区应使用光伏企业提供的厂内发电量,相应的替碳量   5.2光伏发电替碳量
    watch(
        () => [OCA_pvm],
        ([newOCA_pvm]) => {
            OCA_pvm.CA_pvm = newOCA_pvm.Epvm * newOCA_pvm.EF_ecp
            console.log(OCA_pvm.CA_pvm, 'OCA_pvm.CA_pvm');

        },
        { deep: true }
    )




    //  3.6.3 再生水回用的替碳量宜按替代的商业供水的取水 生产和输送的碳排放量   5.3再生水利用替碳量
    watch(
        () => [OCA_wsm],
        ([newOCA_wsm]) => {
            OCA_wsm.CA_wsm = newOCA_wsm.Qwsm * (newOCA_wsm.EIitj + newOCA_wsm.EIspj - newOCA_wsm.EIwsj) * newOCA_wsm.EF_ecp * newOCA_wsm.CEIws
            console.log(OCA_wsm.CA_wsm, 'OCA_wsm.CA_wsm 再生水利用替碳量');
        },
        { deep: true }
    )


    //  5.4污泥厌氧消化沼气利用的替碳量
    watch(
        () => [A03EF_fcjInput54, OCA_adm],
        ([newA03EF_fcjInput54, newOCA_adm]) => {
            OCA_adm.CA_adm =
                newOCA_adm.Hadm * (newA03EF_fcjInput54.LianJiao * A03EF_fcjData[0] +
                    newA03EF_fcjInput54.Yan * A03EF_fcjData[1] +
                    newA03EF_fcjInput54.NoYan * A03EF_fcjData[2] +
                    newA03EF_fcjInput54.JiaoC * A03EF_fcjData[3] +
                    newA03EF_fcjInput54.YuanOil * A03EF_fcjData[4] +
                    newA03EF_fcjInput54.QiOil * A03EF_fcjData[5] +
                    newA03EF_fcjInput54.MeiOil * A03EF_fcjData[6] +
                    newA03EF_fcjInput54.ChaiOil * A03EF_fcjData[7] +
                    newA03EF_fcjInput54.ShiYouQi * A03EF_fcjData[8] +
                    newA03EF_fcjInput54.GanQi * A03EF_fcjData[9] +
                    newA03EF_fcjInput54.MeiJiaoOil * A03EF_fcjData[10] +
                    newA03EF_fcjInput54.TianRanQi * A03EF_fcjData[11] +
                    newA03EF_fcjInput54.JiaoLuQi * A03EF_fcjData[12] +
                    newA03EF_fcjInput54.JiaoCQi * A03EF_fcjData[13] +
                    newA03EF_fcjInput54.other * A03EF_fcjData[14])
                + (newOCA_adm.Eadm * newOCA_adm.EF_ecp) + newOCA_adm.Vngm * OCA_adm.EF_fcng
            console.log(OCA_adm.CA_adm, 'OCEw_fcm.CA_adm 化石源碳矿化产生的碳排放量  成功');
        },
        { deep: true }
    )



    //  5.5  污泥干化焚烧或热解处理过程的替碳量
    watch(
        () => [A03EF_fcjInput, OCA_incm],
        ([newA03EF_fcjInput, newOCA_incm]) => {
            newOCA_incm.EF_fcj = (A03EF_fcjInput55.LianJiao * A03EF_fcjData[0] +
                    A03EF_fcjInput55.Yan * A03EF_fcjData[1] +
                    A03EF_fcjInput55.NoYan * A03EF_fcjData[2] +
                    A03EF_fcjInput55.JiaoC * A03EF_fcjData[3] +
                    A03EF_fcjInput55.YuanOil * A03EF_fcjData[4] +
                    A03EF_fcjInput55.QiOil * A03EF_fcjData[5] +
                    A03EF_fcjInput55.MeiOil * A03EF_fcjData[6] +
                    A03EF_fcjInput55.ChaiOil * A03EF_fcjData[7] +
                    A03EF_fcjInput55.ShiYouQi * A03EF_fcjData[8] +
                    A03EF_fcjInput55.GanQi * A03EF_fcjData[9] +
                    A03EF_fcjInput55.MeiJiaoOil * A03EF_fcjData[10] +
                    A03EF_fcjInput55.TianRanQi * A03EF_fcjData[11] +
                    A03EF_fcjInput55.JiaoLuQi * A03EF_fcjData[12] +
                    A03EF_fcjInput55.JiaoCQi * A03EF_fcjData[13] +
                    A03EF_fcjInput55.other * A03EF_fcjData[14])
            OCA_incm.CA_incm =(newOCA_incm.Eincm * newOCA_incm.EF_ecp) + (newOCA_incm.Hadm * newOCA_incm.EF_fcj)
            console.log(newOCA_incm.Eincm,"newOCA_incm.Eincm");
            console.log(newOCA_incm.EF_ecp,"newOCA_incm.EF_ecp");
            console.log(newOCA_incm.Hadm,"newOCA_incm.Hadm");
            console.log(newOCA_incm.EF_fcj,"newOCA_incm.EF_fcj");
            
                
                // +
                // (newOCA_incm.Eecm * newOCA_incm.EF_ecp)
            console.log(OCA_incm.CA_incm, 'OCEw_fcm.CA_incm 化石源碳矿化产生的碳排放量  成功');
        },
        { deep: true }
    )


    // 3.6.6 污泥经过厌氧 好氧或碳化处理后 ,产生的替碳量  5.6污泥经过厌氧、好氧或碳化处理后的替碳量
    watch(
        () => [OCA_landm],
        ([newOCA_landm]) => {
            OCA_landm.CA_landm = (newOCA_landm.PN * newOCA_landm.wN * newOCA_landm.EF_NFERT + newOCA_landm.Ppo * newOCA_landm.wpo * newOCA_landm.EF_PFERT) * (newOCA_landm.MssmSlud * 1000 * (1 - newOCA_landm.MssmWater))
            console.log(OCA_landm.CA_landm, 'OCA_landm.CA_landm 污泥经过厌氧、好氧或碳化处理后的替碳量');
        },
        { deep: true }
    )




    // 3.6.8 污水厂替碳量     5.8 污水厂替碳量  
    watch(
        () => [],
        ([]) => {
            OCA_an.CA_an = OCA_landm.CA_landm + OCA_incm.CA_incm + OCA_adm.CA_adm + OCA_wsm.CA_wsm + OCA_pvm.CA_pvm + OCA_hpm.CA_hpm
            console.log(OCA_an.CA_an, 'OCA_an.CA_an 污水厂替碳量');
        },
        { deep: true }
    )



    // 3.7.1 污水厂运维阶段的年度碳排放量     6.运维阶段的年度碳排放量  （[34]默认为0）    
    watch(
        () => [OCE_oman,OCEw_ban,OCEw_rean,OCEs_ban,OCEs_rean,OCA_an],
        ([]) => {
            OCE_oman.CE_oman = OCEw_ban.CEw_ban + OCEw_rean.CEw_rean + OCEs_ban.CEs_ban + OCEs_rean.CEs_rean - OCA_an.CA_an - OCE_oman.CSan
            console.log(OCEw_ban.CEw_ban,"OCEw_ban.CEw_ban");
            console.log(OCEw_rean.CEw_rean,"OCEw_rean.CEw_rean");
            console.log(OCEs_ban.CEs_ban,"OCEs_ban.CEs_ban");
            console.log(OCEs_rean.CEs_rean,"OCEs_rean.CEs_rean");
            
            console.log(OCE_oman.CE_oman,"OCE_oman.CE_oman");

        },
        { deep: true }
    )



    //   4.2.2污水厂拆除阶段的碳排放量   7.1拆除阶段的碳排放量
    watch(
        () => [OCE_csRem],
        ([]) => {
            OCE_csRem.CE_csRem = 1.2 * 1000 * OCE_csRem.Y
            console.log(OCE_csRem.CE_csRem, 'OCE_csRem.CE_csRem 污水厂拆除阶段的碳排放量');

        },
        { deep: true }
    )



    //   4.2.2污水厂建设阶段的碳排放量   7.1建设阶段的碳排放量
    watch(
        () => [OCE_csAdd],
        ([]) => {
            OCE_csAdd.CE_csRem = 1.2 * 1000 * OCE_csAdd.Y
            console.log(OCE_csAdd.CE_csRem, 'OCE_csAdd.CE_csRem 污水厂建设阶段的碳排放量');

        },
        { deep: true }
    )




    //  4.3.1 污水厂全生命周期运维阶段碳排放量   7.2全生命周期运维阶段的碳排放量
    watch(
        () => [OCE_lcom],
        ([newOCE_lcom]) => {
            OCE_lcom.CE_lcom = newOCE_lcom.T1 * (newOCE_lcom.CEoman +
                (EF_rpjA07Fc.hotRolCSmaSte * MrpA07Input.hotRolCSmaSte +
                    EF_rpjA07Fc.hotRolCMidSte * MrpA07Input.hotRolCMidSte +
                    EF_rpjA07Fc.hotRolCMidPla * MrpA07Input.hotRolCMidPla +
                    EF_rpjA07Fc.hotRolCHSte * MrpA07Input.hotRolCHSte +
                    EF_rpjA07Fc.hotRolCWidSte * MrpA07Input.hotRolCWidSte +
                    EF_rpjA07Fc.hotRolCBar * MrpA07Input.hotRolCBar +
                    EF_rpjA07Fc.hotRolCSti * MrpA07Input.hotRolCSti +
                    EF_rpjA07Fc.sawhPipe * MrpA07Input.sawhPipe +
                    EF_rpjA07Fc.welStrSeaStePip * MrpA07Input.welStrSeaStePip +
                    EF_rpjA07Fc.hotRolCNoSte * MrpA07Input.hotRolCNoSte +
                    EF_rpjA07Fc.cuOne * MrpA07Input.cuOne +
                    EF_rpjA07Fc.polFoaTub * MrpA07Input.polFoaTub +
                    EF_rpjA07Fc.rigFoaPolBoa * MrpA07Input.rigFoaPolBoa +
                    EF_rpjA07Fc.OrdPol * MrpA07Input.OrdPol +
                    EF_rpjA07Fc.higPol * MrpA07Input.higPol +
                    EF_rpjA07Fc.lowPol * MrpA07Input.lowPol)
                / newOCE_lcom.T2)
            console.log(OCE_lcom.CE_lcom, 'OCE_lcom.CE_lcom 污水厂全生命周期运维阶段碳排放量');

        },
        { deep: true }
    )




    //4.4.1   脱水污泥填埋或与生活垃圾混合填埋后  7.3污泥处置阶段的碳排放量（污泥填埋专用）
    watch(
        () => [OCEs_dCH4lfan],
        ([newOCEs_dCH4lfan]) => {
            OCEs_dCH4lfan.CEs_dCH4lfan = newOCEs_dCH4lfan.MCF * newOCEs_dCH4lfan.transitionSlud * (newOCEs_dCH4lfan.MssmSlud * 1000 * (1 - newOCEs_dCH4lfan.MssmWater))
            console.log(OCEs_dCH4lfan.CEs_dCH4lfan, 'OCEs_dCH4lfan.CEs_dCH4lfan 脱水污泥填埋或与生活垃圾混合填埋后');

        },
        { deep: true }
    )




    // 4.4.2 污泥土地利用后分解产生的CH4、N2O排放的 CO2 当量  7.4污泥土地利用后分解产生的CH4和N2O排放
    // 4.4.2-1
    watch(
        () => [OCEs_dCH4landan],
        ([newOCEs_dCH4landan]) => {
            OCEs_dCH4landan.CEs_dCH4landan = newOCEs_dCH4landan.EFs_dCH4land * newOCEs_dCH4landan.fCH4 * (newOCEs_dCH4landan.MssmSlud * 1000 * (1 - newOCEs_dCH4landan.MssmWater))
            console.log(OCEs_dCH4landan.CEs_dCH4landan, 'OCEs_dCH4landan.CEs_dCH4landan 污泥土地利用后分解产生的CH4、N2O排放的 CO2 当量');

        },
        { deep: true }
    )
    //4.4.2-2
    watch(
        () => [OCEs_dN2Olandan],
        ([newOCEs_dN2Olandan]) => {
            OCEs_dN2Olandan.CEs_dN2Olandan = newOCEs_dN2Olandan.EFs_dN2Oland * newOCEs_dN2Olandan.fN2O * (newOCEs_dN2Olandan.MssmSlud * 1000 * (1 - newOCEs_dN2Olandan.MssmWater))
            console.log(newOCEs_dN2Olandan.EFs_dN2Oland,"newOCEs_dN2Olandan.EFs_dN2Oland");
            console.log(newOCEs_dN2Olandan.fCH4,"newOCEs_dN2Olandan.fCH4");
            
            console.log(OCEs_dN2Olandan.CEs_dN2Olandan, 'OCEs_dN2Olandan.CEs_dN2Olandan 污泥土地利用后分解产生的CH4、N2O排放的 CO2 当量');
        },
        { deep: true }
    )






    //  7.5  电力部分
    watch(
        () => [OCEsd_ecr],
        ([newOCEsd_ecr]) => {
            OCEsd_ecr.CEw_ecm = newOCEsd_ecr.Eecm * newOCEsd_ecr.EF_ecp
            console.log(OCEsd_ecr.CEw_ecm, 'OCEsd_ecr.CEw_ecm  电力消耗产生的碳排放量  成功');
        },
        { deep: true }
    )


    //  7.5  非电力部分
    watch(
        () => [OCEsd_fcrA03EF_fcjInput],
        ([]) => {
            OCEsd_fcr.CEw_fcm =
                OCEsd_fcrA03EF_fcjInput.LianJiao * A03EF_fcjData[0] +
                OCEsd_fcrA03EF_fcjInput.Yan * A03EF_fcjData[1] +
                OCEsd_fcrA03EF_fcjInput.NoYan * A03EF_fcjData[2] +
                OCEsd_fcrA03EF_fcjInput.JiaoC * A03EF_fcjData[3] +
                OCEsd_fcrA03EF_fcjInput.YuanOil * A03EF_fcjData[4] +
                OCEsd_fcrA03EF_fcjInput.QiOil * A03EF_fcjData[5] +
                OCEsd_fcrA03EF_fcjInput.MeiOil * A03EF_fcjData[6] +
                OCEsd_fcrA03EF_fcjInput.ChaiOil * A03EF_fcjData[7] +
                OCEsd_fcrA03EF_fcjInput.ShiYouQi * A03EF_fcjData[8] +
                OCEsd_fcrA03EF_fcjInput.GanQi * A03EF_fcjData[9] +
                OCEsd_fcrA03EF_fcjInput.MeiJiaoOil * A03EF_fcjData[10] +
                OCEsd_fcrA03EF_fcjInput.TianRanQi * A03EF_fcjData[11] +
                OCEsd_fcrA03EF_fcjInput.JiaoLuQi * A03EF_fcjData[12] +
                OCEsd_fcrA03EF_fcjInput.JiaoCQi * A03EF_fcjData[13] +
                OCEsd_fcrA03EF_fcjInput.other * A03EF_fcjData[14]
            console.log(OCEsd_fcr.CEw_fcm, 'OCEsd_fcr.CEw_fcm 化石源碳矿化产生的碳排放量  成功');
        },
        { deep: true }
    )










    // 4.4.4 污泥及其处理产物运输至处置地点CEs_dtransran产生的碳排放量  7.6污泥及其产物运输至处置地点产生的碳排放量
    watch(
        () => [CEs_dtransran],
        ([newCEs_dtransran]) => {
            CEs_dtransran.CEs_dtransran = newCEs_dtransran.Lssrk * newCEs_dtransran.EFs_sk * (newCEs_dtransran.MssmSlud * 1000 * (1 - newCEs_dtransran.MssmWater)) * 0.001
            console.log(CEs_dtransran.CEs_dtransran, 'CEs_dtransran.CEs_dtransran 污泥及其处理产物运输至处置地点产生的碳排放量');

        },
        { deep: true }
    )



    //  4.4.5  污泥处置阶段的碳排放量       7.7污泥处置阶段的碳排放量
    watch(
        () => [CEs_dan],
        ([newCEs_dan]) => {
            // CEs_dan.CEs_dan = 
        },
        { deep: true }
    )



    //  4.5.1 污水排放入受纳水体的延伸阶段碳排放量    7.8污水排入受纳水体的延伸阶段碳排放量
    watch(
        () => [OCE_exN2Oan],
        ([newOCE_exN2Oan]) => {
            OCE_exN2Oan.CE_exN2Oan = newOCE_exN2Oan.EF_exN2O * newOCE_exN2Oan.transition * newOCE_exN2Oan.fN2O
        },
        { deep: true }
    )



    //  4.6.1 污水厂全生命周期碳排放量       7.9全生命周期碳排放量  代入参数：【36】【37】【38】【45】【46】
    watch(
        () => [],
        ([]) => {
            OCE_lc.CE_lc = OCE_lc.T1 * OCE_csAdd.CE_csAdd * OCE_csRem.CE_csRem * OCE_lcom.CE_lcom * CEs_dan.CEs_dan * OCE_exN2Oan.CE_exN2Oan
            console.log(OCE_lc.CE_lc, 'OCE_lc.CE_lc 污水厂全生命周期碳排放量  还有问题正在测试');

        },
        { deep: true }
    )



    //  5.2.1  污水厂运维阶段的年度碳排放强度   8.1运维阶段年度碳排放强度
    watch(
        () => [OCE_Ioman,OCE_oman,OCEw_fCO2m],
        ([newOCE_Ioman]) => {
            OCE_Ioman.CE_Ioman = OCE_oman.CE_oman / OCEw_fCO2m.Qinm
            console.log(OCE_Ioman.CE_Ioman, 'OCE_Ioman.CE_Ioman 污水厂运维阶段的年度碳排放强度');
        },
        { deep: true }
    )





    //  5.2.2  污水厂运维阶段的年度污染物削减碳排放强度   8.2年度污染物削减碳排放强度
    watch(
        () => [OCE_IomanX],
        ([newOCE_IomanX]) => {
            OCE_IomanX.Xan = OCEw_fCO2m.Qinm * ((OCEw_fCO2m.CODinm - OCEw_fCO2m.CODoutm) + 3.5 * (newOCE_IomanX.NH3Ninan - newOCE_IomanX.NH3Noutan) )* 0.001
            
            console.log(OCEw_fCO2m.Qinm,"OCEw_fCO2m.Qinm 49-1");
            console.log(OCEw_fCO2m.CODinm,"OCEw_fCO2m.CODinm 49-2");
            console.log(OCEw_fCO2m.CODoutm,"OCEw_fCO2m.CODoutm 49-3");
            console.log(newOCE_IomanX.NH3Ninan,"newOCE_IomanX.NH3Ninan 49-4");
            console.log(newOCE_IomanX.NH3Noutan,"newOCE_IomanX.NH3Noutan 49-5");
            console.log(OCE_IomanX.Xan, 'OCE_IomanX.Xan 49污水厂全生命周期碳排放量  还有问题正在测试');
        },
        { deep: true }
    )
    watch(
        () => [OCE_IomanX],
        ([newOCE_IomanX]) => {
            OCE_IomanX.CE_IomanX = OCE_oman.CE_oman / OCE_IomanX.Xan
            console.log(OCE_IomanX.CE_IomanX, 'OCE_IomanX.CE_IomanX 污水厂全生命周期碳排放量  还有问题正在测试');
            console.log(OCE_oman.CE_oman,"OCE_oman.CE_oman 35")
            console.log(OCE_IomanX.Xan,"OCE_IomanX.Xan 49");
            console.log(OCE_IomanX.CE_IomanX,"OCE_IomanX.CE_IomanX 50");
            
        },
        { deep: true }
    )



    //8.3运维阶段碳减排量与碳减排强度 
    // 5.3.1   
    watch(
        () => [OCR_oman],
        ([newOCR_oman]) => {
            OCR_oman.CR_oman = newOCR_oman.CE_omvy - newOCR_oman.CE_omby
            // console.log(OCR_oman.CR_oman, 'OCR_oman.CR_oman5.3.1 51');
            // console.log(newOCR_oman.CE_omvy , 'newOCR_oman.CE_omvy  51');
            // console.log(newOCR_oman.CE_omby, 'newOCR_oman.CE_omby 51');

        },
        { deep: true }
    )


    // 5.3.2
    watch(
        () => [OCR_Ioman],
        ([newOCR_Ioman]) => {
            OCR_Ioman.CR_Ioman = newOCR_Ioman.CE_Iomvy - newOCR_Ioman.CE_Iomby
            console.log(OCR_Ioman.CR_Ioman, 'OCR_Ioman.CR_Ioman5.3.2 52');

        },
        { deep: true }
    )


    // 5.3.3
    watch(
        () => [OCR_IomanX],
        ([newOCR_IomanX]) => {
            OCR_IomanX.CR_IomanX = newOCR_IomanX.CE_IomvyX - newOCR_IomanX.CE_IombyX
            console.log(OCR_IomanX.CR_IomanX, 'OCR_IomanX.CR_IomanX5.3.3 53');

        },
        { deep: true }
    )


    //   5.4.1 待评估污水厂运维年度相对于行业同类平均水平的碳排放强度目标差  8.4评估年度相对于行业同类平均水平的碳排放强度目标差
    watch(
        () => [OCE_Iomang],
        ([newOCE_Iomang]) => {
            console.log('进入了watch');

            if (newOCE_Iomang.level && newOCE_Iomang.scale && newOCE_Iomang.scope) {
                console.log('进入了if');

                newOCE_Iomang.CE_Iomav = B01Value[newOCE_Iomang.level - 1][newOCE_Iomang.scale - 1][newOCE_Iomang.scope - 1]
                if (!newOCE_Iomang.CE_Iomav) {
                    ElMessage({
                        message: '没有该种情况,请重新选择',
                        type: 'error',
                        showClose: true,
                        duration: 2000
                    })
                    newOCE_Iomang.level = null
                    newOCE_Iomang.scale = null
                    newOCE_Iomang.scope = null
                    return
                } else {
                    console.log(newOCE_Iomang.CE_Iomav, '测试测试测试');
                    OCE_Iomang.CE_Iomang = newOCE_Iomang.CE_Iomvy - newOCE_Iomang.CE_Iomav
                }
            }
        },
        { deep: true }
    )







    // 5.4.2   污水厂各处理阶段的碳排放贡献度  8.5碳排放贡献度    
    watch(
        () => [],
        ([]) => {

        },
        { deep: true }
    )





    //  6.2.1 污水厂全生命周期碳排放强度   9.1 全生命周期碳排放强度
    watch(
        () => [OCE_Ilc],
        ([newOCE_Ilc]) => {
            OCE_Ilc.CE_Ilc = OCE_lc.CE_lc / newOCE_Ilc.T * newOCE_Ilc.Qin
            console.log(OCE_Ilc.CE_Ilc, 'OCE_Ilc.CE_Ilc 污水厂全生命周期碳排放强度');

        },
        { deep: true }
    )




    //  6.2.2   污水厂去除单位耗氧污染物量对应的全生命周期碳排放量   9.2 去除单位耗氧污染物对应的全生命周期碳排放量
    // 6.2.2-2
    watch(
        () => [],
        ([]) => {
            OX.X = OX.Qinlc * ((OX.CODinlc - OX.CODoutlc) + 3.5 * (OX.NH3Ninlc - OX.NH3Noutlc) * 0.001)
            console.log(OX.X, 'OX.X 污水厂全生命周期碳排放强度');
        },
        { deep: true }
    )
    //6.2.2-1
    watch(
        () => [],
        ([]) => {
            OCE_IlcX.CE_IlcX = OCE_IlcX.CE_lc / (OCE_IlcX.T * OX.X)
            console.log(OCE_IlcX.CE_IlcX, 'OCE_IlcX.CE_IlcX 污水厂全生命周期碳排放强度');
        },
        { deep: true }
    )






    //  6.3.1 待评估污水厂相对于行业同类平均水平的全生命周期碳排放强度   9.3评估年度相对于行业同类平均水平的碳排放强度目标差
    watch(
        () => [OCE_Ilcg],
        ([newOCE_Ilcg]) => {
            if (newOCE_Ilcg.level && newOCE_Ilcg.scale && newOCE_Ilcg.scope) {
                newOCE_Ilcg.CE_Iomav = B02Value[newOCE_Ilcg.level - 1][newOCE_Ilcg.scale - 1][newOCE_Ilcg.scope - 1]
                if (!newOCE_Ilcg.CE_Iomav) {
                    ElMessage({
                        message: '没有该种情况,请重新选择',
                        type: 'error',
                        showClose: true,
                        duration: 2000
                    })
                    newOCE_Ilcg.level = null
                    newOCE_Ilcg.scale = null
                    newOCE_Ilcg.scope = null
                    return
                }
            }
            OCE_Ilcg.CE_Ilcg = OCE_Ilc.CE_Ilc - newOCE_Ilcg.CE_Ilcav
        },
        { deep: true }
    )




    // 暂时没想好要不要做，沟通一下再确定
    //  6.3.2 污水厂全生命周期碳排放节点分析基于各处理阶段的碳排放贡献度   9.4全生命周期的各处理阶段的碳排放贡献度
    // watch(
    //     () => [],
    //     ([]) => {

    //     },
    //     { deep: true }
    // )












    const pushAllResult = () => {
        oneDayResult.OCEw_fCO2m = OCEw_fCO2m.CEw_fCO2m//N2O直接排放量[1]
        oneDayResult.OCEw_eCO2m = OCEw_eCO2m.CEw_eCO2m
        oneDayResult.OCEw_CH4m = OCEw_CH4m.CEw_CH4m
        oneDayResult.OCEw_N2Om = OCEw_N2Om.CEw_N2Om
        oneDayResult.OCEw_ban = OCEw_ban.CEw_ban
        oneDayResult.OCEw_ecm = OCEw_ecm.CEw_ecm
        oneDayResult.OCEw_fcm = OCEw_fcm.CEw_fcm
        oneDayResult.OCEw_ccm = OCEw_ccm.CEw_ccm
        oneDayResult.OCEw_rean = OCEw_rean.CEw_rean
        oneDayResult.OCEs_CH4adm = OCEs_CH4adm.CEs_CH4adm
        oneDayResult.OCEs_CH4afm = OCEs_CH4afm.CEs_CH4afm
        oneDayResult.OCEs_N2Oafm = OCEs_N2Oafm.CEs_N2Oafm
        oneDayResult.OCEs_fCO2incm = OCEs_fCO2incm.CEs_fCO2incm
        oneDayResult.OCEs_CH4incm = OCEs_CH4incm.CEs_CH4incm
        oneDayResult.OCEs_N2Oincm = OCEs_N2Oincm.CEs_N2Oincm
        oneDayResult.OCEs_fCO2incmCop = OCEs_fCO2incmCop.CEs_fCO2incm
        oneDayResult.OCEs_CH4incmCop = OCEs_CH4incmCop.CEs_CH4incm
        oneDayResult.OCEs_N2OincmCop = OCEs_N2OincmCop.CEs_N2Oincm
        
        oneDayResult.OCEs_ban = OCEs_ban.CEs_ban
        oneDayResult.OCEw_ecmCopy = OCEw_ecmCopy.CEw_ecm
        oneDayResult.OCEw_ccmCopy = OCEw_ccmCopy.CEw_ccm
        oneDayResult.OCEw_fcmCopy = OCEw_fcmCopy.CEw_fcm
        oneDayResult.OCEs_rean = OCEs_rean.CEs_rean
        oneDayResult.OCA_hpm = OCA_hpm.CA_hpm
        oneDayResult.OCA_pvm = OCA_pvm.CA_pvm
        oneDayResult.OCA_wsm = OCA_wsm.CA_wsm
        oneDayResult.OCA_adm = OCA_adm.CA_adm
        oneDayResult.OCA_incm = OCA_incm.CA_incm
        oneDayResult.OCA_landm = OCA_landm.CA_landm
        oneDayResult.OCA_an = OCA_an.CA_an
        oneDayResult.OCE_oman = OCE_oman.CE_oman
        oneDayResult.OCE_csAdd = OCE_csAdd.CE_csAdd
        oneDayResult.OCE_csRem = OCE_csRem.CE_csRem
        oneDayResult.OCE_lcom = OCE_lcom.CE_lcom
        oneDayResult.OCEs_dCH4lfan = OCEs_dCH4lfan.CEs_dCH4lfan
        oneDayResult.OCEs_dCH4landan = OCEs_dCH4landan.CEs_dCH4landan
        oneDayResult.OCEs_dN2Olandan = OCEs_dN2Olandan.CEs_dN2Olandan
        oneDayResult.OCEsd_ecr = OCEsd_ecr.CEw_ecm
        oneDayResult.OCEsd_fcr = OCEsd_fcr.CEw_fcm
        oneDayResult.CEs_dtransran = CEs_dtransran.CEs_dtransran
        oneDayResult.CEs_dan = CEs_dan.CEs_dan
        oneDayResult.OCE_exN2Oan = OCE_exN2Oan.CE_exN2Oan
        oneDayResult.OCE_lc = OCE_lc.CE_lc
        oneDayResult.OCE_Ioman = OCE_Ioman.CE_Ioman
        oneDayResult.OCE_IomanX = OCE_IomanX.CE_IomanX
        oneDayResult.Xan = OCE_IomanX.Xan
        oneDayResult.OCR_oman = OCR_oman.CR_oman
        oneDayResult.OCR_Ioman = OCR_Ioman.CR_Ioman
        oneDayResult.OCR_IomanX = OCR_IomanX.CR_IomanX
        oneDayResult.OCE_Iomang = OCE_Iomang.CE_Imang
        oneDayResult.OCB_stan = OCB_stan.CB_usan
        oneDayResult.OCE_Ilc = OCE_Ilc.CE_Ilc
        oneDayResult.OX = OX.OX
        oneDayResult.OCE_IlcX = OCE_IlcX.CE_IlcX
        oneDayResult.OCE_Ilcg = OCE_Ilcg.CE_Ilcg
        oneDayResult.OCB_lcst = OCB_lcst.CB_LCst
        oneDayResult.OCE_Biogas_N2O = OCE_Biogas_N2O.CE_Biogas_N2O
        oneDayResult.basicalInfo = basicalInfo//污水处理厂基本信息
        oneDayResult.textarealvse = textarealvse//污水处理厂基本信息
        counter.mapStandard.set(props.data, oneDayResult)//data是日期
    }
    const toShowStandard = () => {
        router.push('/showstandard')
    }
    const LowCStyleRef = ref(null)
    const OCE_Biogas_N2ORef = ref(null)
    const CH4Ref = ref(null)
    const EleCIntRef = ref(null)
    const HotCIntRef = ref(null)
    const McgMRef = ref(null)
    const McgConRef = ref(null)
    const TreScaRatRef = ref(null)
    const OxyPolRemRef = ref(null)
    const WaterOutRatRef = ref(null)
    const OxyConRatRef = ref(null)
    const NaClORef = ref(null)



    //表单校验
    // //看用户是否输入了全部数据，只有输入了全部数据之后才能够保存
    const validateAllForm = () => {
        let isN2OValid, isCH4Valid, isEleCIntValid, isHotCIntValid, isMcgMValid, isMcgConValid, isTreScaRatValid, isOxyPolRemValid, isWaterOutRatValid, isOxyConRatValid, isLowCStyleValid, isNaClOValid
        console.log(OCE_Biogas_N2ORef.value,'OCE_Biogas_N2ORef.value');
        console.log(OCE_Biogas_N2ORef,'OCE_Biogas_N2ORef');
        console.log(CH4Ref,'CH4Ref');
        
        return new Promise((resolve, reject) => {
            Promise.all([
                LowCStyleRef.value.validate().then(res => isN2OValid = res).catch(error => { console.log('LowCStyleRef validate error', error); isN2OValid = false }),
                // CH4Ref.value.validate().then(res => isCH4Valid = res).catch(error => { console.log('CH4Ref validate error', error); isCH4Valid = false }),
                // EleCIntRef.value.validate().then(res => isEleCIntValid = res).catch(error => { console.log('EleCIntRef validate error', error); isEleCIntValid = false }),
                // HotCIntRef.value.validate().then(res => isHotCIntValid = res).catch(error => { console.log('HotCIntRef validate error', error); isHotCIntValid = false }),
                // // McgMRef.value.validate().then(res => isMcgMValid = res).catch(error => { console.log('MgcMRef validate error', error); isMcgMValid = false }),
                // // McgConRef.value.validate().then(res => isMcgConValid = res).catch(error => { console.log('MgcConRef validate error', error); isMcgConValid = false }),
                // TreScaRatRef.value.validate().then(res => isTreScaRatValid = res).catch(error => { console.log('TreScaRatRef validate error', error); isTreScaRatValid = false }),
                // OxyPolRemRef.value.validate().then(res => isOxyPolRemValid = res).catch(error => { console.log('OxyPolRemRef validate error', error); isOxyPolRemValid = false }),
                // WaterOutRatRef.value.validate().then(res => isWaterOutRatValid = res).catch(error => { console.log('WaterOutRatRef validate error', error); isWaterOutRatValid = false }),
                // OxyConRatRef.value.validate().then(res => isOxyConRatValid = res).catch(error => { console.log('OxyConRatRef validate error', error); isOxyConRatValid = false }),
                //只有当所有的 Promise 都resolved时，它才会resolved。如果任何一个 Promise rejected，它也会立即被rejected。
                // Promise 由于某些原因未能成功完成。这通常是由于异步操作中的错误，比如网络请求失败、文件读取错误等。Promise 被拒绝不会中断程序的执行，而是会进入 Promise 的错误处理流程，可以通过 .catch() 方法来捕获和处理。
            ]).then((res) => {
                const isAllValid = isN2OValid 
                if (isAllValid) {
                    console.log('数据全部输入');
                    resolve(true);
                } else {
                    console.log('数据没有全部输入');
                    resolve(false);
                }
            }).catch((err)=>{
                console.log('err catch',err);
                
            })
        })
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
        const types = file.raw.type;//获取上传文件的 MIME 类型，并将其存储在变量 types 中。
        if (types === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || types === 'application/vnd.ms-excel') {
            const fileReader = new FileReader();//创建一个 FileReader 对象，用于读取文件内容。
            // 读取文件
            fileReader.readAsArrayBuffer(file.raw);
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
                } catch (e) {
                    ElMessage.error('文件读取失败')
                    console.log(e, 'error');
                }
            };
        }
    }
    //一键输入功能，用于测试后面脚本
    const inputAllOneTimes = () => {
        basicalInfo.areaCenter = excelData[2].__EMPTY_1
        basicalInfo.waterYear = excelData[2].__EMPTY_2
        basicalInfo.handleStyle = excelData[2].__EMPTY_3
        basicalInfo.createdTime = excelData[2].__EMPTY_4
        // N2O.Qrbi = excelData[0].Qrbi
        // N2O.TNrbi = 30
        OCEw_fCO2m.Qinm = excelData[2].__EMPTY_5
        OCEw_fCO2m.CODinm = excelData[2].__EMPTY_6
        OCEw_fCO2m.CODoutm = excelData[2].__EMPTY_7
        OCEw_eCO2m.MemCon = excelData[2].__EMPTY_8
        OCEw_eCO2m.MemM = excelData[2].__EMPTY_9
        OCEw_eCO2m.EFw_eCO2 = excelData[2].__EMPTY_10
        OCEw_CH4m.ifRealTest = excelData[2].__EMPTY_11
        OCEw_CH4m.MpumpCH4m = excelData[2].__EMPTY_12
        OCEw_CH4m.MgritCH4m = excelData[2].__EMPTY_13
        OCEw_N2Om.TNinm = excelData[2].__EMPTY_15
        OCEw_N2Om.TNoutm = excelData[2].__EMPTY_16
        // OCEw_CH4m.ifRealTest = false
        OCEw_ecm.EF_ecp = excelData[2].__EMPTY_17
        OCEw_ecm.Eecm = excelData[2].__EMPTY_18

        //A03EF
        A03EF_fcjInput.LianJiao = excelData[2].__EMPTY_19
        A03EF_fcjInput.Yan = excelData[2].__EMPTY_20
        A03EF_fcjInput.NoYan = excelData[2].__EMPTY_21
        A03EF_fcjInput.JiaoC = excelData[2].__EMPTY_22
        A03EF_fcjInput.YuanOil = excelData[2].__EMPTY_23
        A03EF_fcjInput.QiOil = excelData[2].__EMPTY_24
        A03EF_fcjInput.MeiOil = excelData[2].__EMPTY_25
        A03EF_fcjInput.ChaiOil = excelData[2].__EMPTY_26
        A03EF_fcjInput.ShiYouQi = excelData[2].__EMPTY_27
        A03EF_fcjInput.GanQi = excelData[2].__EMPTY_28
        A03EF_fcjInput.MeiJiaoOil = excelData[2].__EMPTY_29
        A03EF_fcjInput.TianRanQi = excelData[2].__EMPTY_30
        A03EF_fcjInput.JiaoLuQi = excelData[2].__EMPTY_31
        A03EF_fcjInput.JiaoCQi = excelData[2].__EMPTY_32
        A03EF_fcjInput.other = excelData[2].__EMPTY_33

        McgCon.Jian = excelData[2].__EMPTY_35
        McgM.Jian = excelData[2].__EMPTY_34
        McgCon.NaOH = excelData[2].__EMPTY_37
        McgM.NaOH = excelData[2].__EMPTY_36
        McgCon.PAC = excelData[2].__EMPTY_39
        McgM.PAC = excelData[2].__EMPTY_38
        McgCon.CH3OH = excelData[2].__EMPTY_41
        McgM.CH3OH = excelData[2].__EMPTY_40
        McgCon.AlSO4 = excelData[2].__EMPTY_43
        McgM.AlSO4 = excelData[2].__EMPTY_42
        McgCon.PAM = excelData[2].__EMPTY_45
        McgM.PAM = excelData[2].__EMPTY_44
        McgCon.FeCl3 = excelData[2].__EMPTY_47
        McgM.FeCl3 = excelData[2].__EMPTY_46
        McgCon.CaOH2 = excelData[2].__EMPTY_49
        McgM.CaOH2 = excelData[2].__EMPTY_48
        McgCon.Otherxvning = excelData[2].__EMPTY_51
        McgM.Otherxvning = excelData[2].__EMPTY_50
        McgCon.CiNaClO = excelData[2].__EMPTY_53
        McgM.CiNaClO = excelData[2].__EMPTY_52
        McgCon.Cl2 = excelData[2].__EMPTY_55
        McgM.Cl2 = excelData[2].__EMPTY_54
        McgCon.O3 = excelData[2].__EMPTY_57
        McgM.O3 = excelData[2].__EMPTY_56
        McgCon.O2H2O = excelData[2].__EMPTY_59
        McgM.O2H2O = excelData[2].__EMPTY_58
        McgCon.Otherxiaodu = excelData[2].__EMPTY_61
        McgM.Otherxiaodu = excelData[2].__EMPTY_60
        McgCon.Otheryao = excelData[2].__EMPTY_63
        McgM.Otheryao = excelData[2].__EMPTY_62
        McgCon.Cifen = excelData[2].__EMPTY_65
        McgM.Cifen = excelData[2].__EMPTY_64
        McgCon.FeSO4 = excelData[2].__EMPTY_67
        McgM.FeSO4 = excelData[2].__EMPTY_66
        McgCon.C2H3NaO2 = excelData[2].__EMPTY_69
        McgM.C2H3NaO2 = excelData[2].__EMPTY_68
        //4.1
        OCEs_ban.optionValue = excelData[2].__EMPTY_70
        ifJump.ifJump = excelData[2].__EMPTY_71
        OCEs_CH4adm.Vbiogasm = excelData[2].__EMPTY_72
        OCEs_CH4adm.PCH4 = excelData[2].__EMPTY_73
        OCE_Biogas_N2O.TNinm = excelData[2].__EMPTY_74
        OCE_Biogas_N2O.TNoutm = excelData[2].__EMPTY_75
        OCE_Biogas_N2O.QBiogasm = excelData[2].__EMPTY_76
        OCE_Biogas_N2O.EFw_N2O = excelData[2].__EMPTY_77
        OCEs_CH4afm.MssmSlud = excelData[2].__EMPTY_78
        OCEs_CH4afm.MssmWater = excelData[2].__EMPTY_79
        OCEs_CH4afm.EFs_CH4af = excelData[2].__EMPTY_80
        OCEs_N2Oafm.EFs_N2Oaf = 0
        OCEs_fCO2incm.CF = excelData[2].__EMPTY_81
        OCEs_CH4incmCop.EFs_CH4inc = excelData[2].__EMPTY_82
        OCEs_fCO2incmCop.CF = excelData[2].__EMPTY_83
        OCEs_fCO2incmCop.MssmSlud = excelData[2].__EMPTY_84
        OCEs_fCO2incmCop.MssmWater = excelData[2].__EMPTY_85
        OCEs_CH4incmCop.MssmSlud = excelData[2].__EMPTY_87
        OCEs_CH4incmCop.MssmWater = excelData[2].__EMPTY_88
        OCEs_N2OincmCop.MssmSlud = excelData[2].__EMPTY_90
        OCEs_N2OincmCop.MssmWater = excelData[2].__EMPTY_91
        ifEleDurEne.ifHave = excelData[2].__EMPTY_92
        ifEleDurEne.ifHave = false
        // 5.1
        A03EF_fcjInputCopyCopy.LianJiao = excelData[2].__EMPTY_93
        A03EF_fcjInputCopyCopy.Yan = excelData[2].__EMPTY_94
        A03EF_fcjInputCopyCopy.NoYan = excelData[2].__EMPTY_95
        A03EF_fcjInputCopyCopy.JiaoC = excelData[2].__EMPTY_96
        A03EF_fcjInputCopyCopy.YuanOil = excelData[2].__EMPTY_97
        A03EF_fcjInputCopyCopy.QiOil = excelData[2].__EMPTY_98
        A03EF_fcjInputCopyCopy.MeiOil = excelData[2].__EMPTY_99
        A03EF_fcjInputCopyCopy.ChaiOil = excelData[2].__EMPTY_100
        A03EF_fcjInputCopyCopy.ShiYouQi = excelData[2].__EMPTY_101
        A03EF_fcjInputCopyCopy.GanQi = excelData[2].__EMPTY_102
        A03EF_fcjInputCopyCopy.MeiJiaoOil = excelData[2].__EMPTY_103
        A03EF_fcjInputCopyCopy.TianRanQi = excelData[2].__EMPTY_104
        A03EF_fcjInputCopyCopy.JiaoLuQi = excelData[2].__EMPTY_105
        A03EF_fcjInputCopyCopy.JiaoCQi = excelData[2].__EMPTY_106
        A03EF_fcjInputCopyCopy.other = excelData[2].__EMPTY_107
        // 5.2
        OCA_pvm.Epvm = excelData[2].__EMPTY_108
        OCA_pvm.EF_ecp = excelData[2].__EMPTY_109
        // 5.3
        OCA_wsm.Qwsm = excelData[2].__EMPTY_110
        OCA_wsm.EF_ecp = 0.5271
        OCA_wsm.CEIws = excelData[2].__EMPTY_111

        // 5.4
        OCA_adm.Eadm = excelData[2].__EMPTY_112
        OCA_adm.Hadm = excelData[2].__EMPTY_113
        OCA_adm.Vngm = excelData[2].__EMPTY_114
        OCA_adm.EF_ecp = excelData[2].__EMPTY_115
        A03EF_fcjInput54.LianJiao = excelData[2].__EMPTY_116
        A03EF_fcjInput54.Yan = excelData[2].__EMPTY_117
        A03EF_fcjInput54.NoYan = excelData[2].__EMPTY_118
        A03EF_fcjInput54.JiaoC = excelData[2].__EMPTY_119
        A03EF_fcjInput54.YuanOil = excelData[2].__EMPTY_120
        A03EF_fcjInput54.QiOil = excelData[2].__EMPTY_121
        A03EF_fcjInput54.MeiOil = excelData[2].__EMPTY_122
        A03EF_fcjInput54.ChaiOil = excelData[2].__EMPTY_123
        A03EF_fcjInput54.ShiYouQi = excelData[2].__EMPTY_124
        A03EF_fcjInput54.GanQi = excelData[2].__EMPTY_125
        A03EF_fcjInput54.MeiJiaoOil = excelData[2].__EMPTY_126
        A03EF_fcjInput54.TianRanQi = excelData[2].__EMPTY_127
        A03EF_fcjInput54.JiaoLuQi = excelData[2].__EMPTY_128
        A03EF_fcjInput54.JiaoCQi = excelData[2].__EMPTY_129
        A03EF_fcjInput54.other = excelData[2].__EMPTY_130


        //5.5
        OCA_incm.Eincm = excelData[2].__EMPTY_131
        OCA_incm.Hadm = excelData[2].__EMPTY_132
        OCA_incm.EF_ecp = excelData[2].__EMPTY_133
        A03EF_fcjInput55.LianJiao = excelData[2].__EMPTY_134
        A03EF_fcjInput55.Yan = excelData[2].__EMPTY_135
        A03EF_fcjInput55.NoYan = excelData[2].__EMPTY_136
        A03EF_fcjInput55.JiaoC = excelData[2].__EMPTY_137
        A03EF_fcjInput55.YuanOil = excelData[2].__EMPTY_138
        A03EF_fcjInput55.QiOil = excelData[2].__EMPTY_139
        A03EF_fcjInput55.MeiOil = excelData[2].__EMPTY_140
        A03EF_fcjInput55.ChaiOil = excelData[2].__EMPTY_141
        A03EF_fcjInput55.ShiYouQi = excelData[2].__EMPTY_142
        A03EF_fcjInput55.GanQi = excelData[2].__EMPTY_143
        A03EF_fcjInput55.MeiJiaoOil = excelData[2].__EMPTY_144
        A03EF_fcjInput55.TianRanQi = excelData[2].__EMPTY_145
        A03EF_fcjInput55.JiaoLuQi = excelData[2].__EMPTY_146
        A03EF_fcjInput55.JiaoCQi = excelData[2].__EMPTY_147
        A03EF_fcjInput55.other = excelData[2].__EMPTY_148

        //5.6
        OCA_landm.MssmSlud = excelData[2].__EMPTY_149
        OCA_landm.MssmWater = excelData[2].__EMPTY_150


        // 7.1
        OCE_csAdd.Y = excelData[2].__EMPTY_151
        OCE_csRem.Y = excelData[2].__EMPTY_152

        // 7.2
        OCE_lcom.T1 = excelData[2].__EMPTY_153
        OCE_lcom.T2 = excelData[2].__EMPTY_154
        MrpA07Input.hotRolCSmaSte = excelData[2].__EMPTY_155
        MrpA07Input.hotRolCMidSte = excelData[2].__EMPTY_156
        MrpA07Input.hotRolCMidPla = excelData[2].__EMPTY_157
        MrpA07Input.hotRolCHSte = excelData[2].__EMPTY_158
        MrpA07Input.hotRolCWidSte = excelData[2].__EMPTY_159
        MrpA07Input.hotRolCBar = excelData[2].__EMPTY_160
        MrpA07Input.hotRolCSti = excelData[2].__EMPTY_161
        MrpA07Input.sawhPipe = excelData[2].__EMPTY_162
        MrpA07Input.welStrSeaStePip = excelData[2].__EMPTY_163
        MrpA07Input.hotRolCNoSte = excelData[2].__EMPTY_164
        MrpA07Input.cuOne = excelData[2].__EMPTY_165
        MrpA07Input.polFoaTub = excelData[2].__EMPTY_166
        MrpA07Input.rigFoaPolBoa = excelData[2].__EMPTY_167
        MrpA07Input.OrdPol = excelData[2].__EMPTY_168
        MrpA07Input.higPol = excelData[2].__EMPTY_169
        MrpA07Input.lowPol = excelData[2].__EMPTY_170

        // 7.3
        OCEs_dCH4lfan.MssmSlud = excelData[2].__EMPTY_171
        OCEs_dCH4lfan.MssmWater = excelData[2].__EMPTY_172

        // 7.4-1
        OCEs_dCH4landan.MssmSlud = excelData[2].__EMPTY_173
        OCEs_dCH4landan.MssmWater = excelData[2].__EMPTY_174
        // 7.4-2
        OCEs_dN2Olandan.MssmSlud = excelData[2].__EMPTY_175
        OCEs_dN2Olandan.MssmWater = excelData[2].__EMPTY_176


        // 7.5 电力部分
        OCEsd_ecr.Eecm = excelData[2].__EMPTY_177
        OCEsd_ecr.EF_ecp = excelData[2].__EMPTY_178

        // 7.5非电力部分
        OCEsd_fcrA03EF_fcjInput.LianJiao = excelData[2].__EMPTY_179
        OCEsd_fcrA03EF_fcjInput.Yan = excelData[2].__EMPTY_180
        OCEsd_fcrA03EF_fcjInput.NoYan = excelData[2].__EMPTY_181
        OCEsd_fcrA03EF_fcjInput.JiaoC = excelData[2].__EMPTY_182
        OCEsd_fcrA03EF_fcjInput.YuanOil = excelData[2].__EMPTY_183
        OCEsd_fcrA03EF_fcjInput.QiOil = excelData[2].__EMPTY_184
        OCEsd_fcrA03EF_fcjInput.MeiOil = excelData[2].__EMPTY_185
        OCEsd_fcrA03EF_fcjInput.ChaiOil = excelData[2].__EMPTY_186
        OCEsd_fcrA03EF_fcjInput.ShiYouQi = excelData[2].__EMPTY_187
        OCEsd_fcrA03EF_fcjInput.GanQi = excelData[2].__EMPTY_188
        OCEsd_fcrA03EF_fcjInput.MeiJiaoOil = excelData[2].__EMPTY_189
        OCEsd_fcrA03EF_fcjInput.TianRanQi = excelData[2].__EMPTY_190
        OCEsd_fcrA03EF_fcjInput.JiaoLuQi = excelData[2].__EMPTY_191
        OCEsd_fcrA03EF_fcjInput.JiaoCQi = excelData[2].__EMPTY_192
        OCEsd_fcrA03EF_fcjInput.other = excelData[2].__EMPTY_193



        // 7.6
        CEs_dtransran.MssmSlud = excelData[2].__EMPTY_194
        CEs_dtransran.MssmWater = excelData[2].__EMPTY_195
        CEs_dtransran.Lssrk = excelData[2].__EMPTY_196
        CEs_dtransran.EFs_sk = excelData[2].__EMPTY_197

        // 7.8
        OCE_exN2Oan.EF_exN2O = excelData[2].__EMPTY_198

        //8.1
        OCE_lc.T1 = excelData[2].__EMPTY_199

        // 8.2
        OCE_IomanX.NH3Ninan = excelData[2].__EMPTY_200
        OCE_IomanX.NH3Noutan = excelData[2].__EMPTY_201

        // 8.3
        ifCompDiff.ifCompDiff = excelData[2].__EMPTY_202

        // 8.4
        // OCE_Iomang.level = excelData[2].__EMPTY_203
        // OCE_Iomang.scale = excelData[2].__EMPTY_204
        // OCE_Iomang.scope = excelData[2].__EMPTY_205


        // 9.1
        OCE_Ilc.T = excelData[2].__EMPTY_206
        OCE_Ilc.Qin = excelData[2].__EMPTY_207

        // 9.2
        OX.CODinlc = excelData[2].__EMPTY_208
        OX.CODoutlc = excelData[2].__EMPTY_209
        OX.NH3Ninlc = excelData[2].__EMPTY_210
        OX.NH3Noutlc = excelData[2].__EMPTY_211

        OCE_IlcX.CE_lc = excelData[2].__EMPTY_212
        OCE_IlcX.T = excelData[2].__EMPTY_213

        // 4.3Copy
        OCEw_ecmCopy.EF_ecp = excelData[8].__EMPTY_92
        OCEw_ecmCopy.Eecm = excelData[8].__EMPTY_93

        // 4.3Copy
        A03EF_fcjInputCopy.LianJiao = excelData[8].__EMPTY_94
        A03EF_fcjInputCopy.Yan = excelData[8].__EMPTY_95
        A03EF_fcjInputCopy.NoYan = excelData[8].__EMPTY_96
        A03EF_fcjInputCopy.JiaoC = excelData[8].__EMPTY_97
        A03EF_fcjInputCopy.YuanOil = excelData[8].__EMPTY_98
        A03EF_fcjInputCopy.QiOil = excelData[8].__EMPTY_99
        A03EF_fcjInputCopy.MeiOil = excelData[8].__EMPTY_100
        A03EF_fcjInputCopy.ChaiOil = excelData[8].__EMPTY_101
        A03EF_fcjInputCopy.ShiYouQi = excelData[8].__EMPTY_102
        A03EF_fcjInputCopy.GanQi = excelData[8].__EMPTY_103
        A03EF_fcjInputCopy.MeiJiaoOil = excelData[8].__EMPTY_104
        A03EF_fcjInputCopy.TianRanQi = excelData[8].__EMPTY_105
        A03EF_fcjInputCopy.JiaoLuQi = excelData[8].__EMPTY_106
        A03EF_fcjInputCopy.JiaoCQi = excelData[8].__EMPTY_107
        A03EF_fcjInputCopy.other = excelData[8].__EMPTY_108

        //4.3Copy
        McgConCopy.Jian = excelData[8].__EMPTY_110
        McgMCopy.Jian = excelData[8].__EMPTY_109
        McgConCopy.NaOH = excelData[8].__EMPTY_112
        McgMCopy.NaOH = excelData[8].__EMPTY_111
        McgConCopy.PAC = excelData[8].__EMPTY_114
        McgMCopy.PAC = excelData[8].__EMPTY_113
        McgConCopy.CH3OH = excelData[8].__EMPTY_116
        McgMCopy.CH3OH = excelData[8].__EMPTY_115
        McgConCopy.AlSO4 = excelData[8].__EMPTY_118
        McgMCopy.AlSO4 = excelData[8].__EMPTY_117
        McgConCopy.PAM = excelData[8].__EMPTY_120
        McgMCopy.PAM = excelData[8].__EMPTY_119
        McgConCopy.FeCl3 = excelData[8].__EMPTY_122
        McgMCopy.FeCl3 = excelData[8].__EMPTY_121
        McgConCopy.CaOH2 = excelData[8].__EMPTY_124
        McgMCopy.CaOH2 = excelData[8].__EMPTY_123
        McgConCopy.Otherxvning = excelData[8].__EMPTY_126
        McgMCopy.Otherxvning = excelData[8].__EMPTY_125
        McgConCopy.CiNaClO = excelData[8].__EMPTY_128
        McgMCopy.CiNaClO = excelData[8].__EMPTY_127
        McgConCopy.Cl2 = excelData[8].__EMPTY_130
        McgMCopy.Cl2 = excelData[8].__EMPTY_129
        McgConCopy.O3 = excelData[8].__EMPTY_132
        McgMCopy.O3 = excelData[8].__EMPTY_131
        McgConCopy.O2H2O = excelData[8].__EMPTY_134
        McgMCopy.O2H2O = excelData[8].__EMPTY_133
        McgConCopy.Otherxiaodu = excelData[8].__EMPTY_136
        McgMCopy.Otherxiaodu = excelData[8].__EMPTY_135
        McgConCopy.Otheryao = excelData[8].__EMPTY_138
        McgMCopy.Otheryao = excelData[8].__EMPTY_137
        McgConCopy.Cifen = excelData[8].__EMPTY_140
        McgMCopy.Cifen = excelData[8].__EMPTY_139
        McgConCopy.FeSO4 = excelData[8].__EMPTY_142
        McgMCopy.FeSO4 = excelData[8].__EMPTY_141
        McgConCopy.C2H3NaO2 = excelData[8].__EMPTY_144
        McgMCopy.C2H3NaO2 = excelData[8].__EMPTY_143

        // 8.4-5.3.1
        OCR_oman.CE_omvy = excelData[8].__EMPTY_202
        OCR_oman.CE_omby = excelData[8].__EMPTY_203
        // 8.4-5.3.2
        OCR_Ioman.CE_Iomvy = excelData[8].__EMPTY_204
        OCR_Ioman.CE_Iomby = excelData[8].__EMPTY_205
        // 8.4-5.3.3
        OCR_IomanX.CE_IomvyX = excelData[8].__EMPTY_206
        OCR_IomanX.CE_IombyX = excelData[8].__EMPTY_207
    }


</script>
<template>


    <div class="flex justify-around mt-10">
        <el-upload :on-change="handleChangeUpload">
            <el-button type="primary">上传文件</el-button>
        </el-upload>
        <el-button @click="inputAllOneTimes" type="primary">一键导入</el-button>
    </div>

    <div class="flex">
        <div class="w-[180px]">选择计算阶段</div>
        <el-select v-model="ifAllLeaf.ifAllLeaf" placeholder="计算阶段" size="large"
            style="width: 300px;height:60px;margin-top:20px;">
            <el-option v-for="item in ifAllLeafOptions" :key="item.value" :label="item.label"
                :value="item.value" />
        </el-select>
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

    <!--    3.2.1化石源碳矿化产生的碳排放量宜按下式计算      2.1化石源碳矿化产生的碳排放量  -->
    <div class="mt-10">
        <p style="font-weight: bold; font-size: 20px; color: black;"> 2.1化石源碳矿化产生的碳排放量 </p>
        <el-form :model="OCEw_fCO2m" class="flex flex-start flex-wrap gap-4 mt-3" ref="OCEw_fCO2mRef">
            <div class="flex">
                <div class="w-[180px]">Qin,m —第 m天的进水量 (m3 /d)</div>
                <el-form-item prop="Qinm" :rules="[{ required: true, message: 'Qinm is required' }]">
                    <el-input v-model="OCEw_fCO2m.Qinm" style="width: 300px; height:50px;" placeholder="Qinm" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">CODin,m —第 m天的平均进水 coD浓度(mg/L)</div>
                <el-form-item prop="CODinm" :rules="[{ required: true, message: 'CODinm is required' }]">
                    <el-input v-model="OCEw_fCO2m.CODinm" style="width: 300px; height:50px;" placeholder="CODinm" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">CODOut,m —第 m天的平均出水 coD浓度(mg/L)</div>
                <el-form-item prop="CODoutm" :rules="[{ required: true, message: 'CODoutm is required' }]">
                    <el-input v-model="OCEw_fCO2m.CODoutm" style="width: 300px; height:50px;" placeholder="CODoutm" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">EFw—CO2—污水处理阶段生化反应产生的co2当量的排放因子(kgco2 -eq/kgcoD)(取值范围0.366~0.560) ;</div>
                <el-form-item prop="EFw_CO2" :rules="[{ required: true, message: 'EFw_CO2 is required' }]">
                    <el-input v-model="OCEw_fCO2m.EFw_CO2" style="width: 300px; height:50px;" placeholder="EFw_CO2" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">FCF—集中式水厂进水化石源有机物比例(%)(取值在5%-20%之间);</div>
                <el-form-item prop="FCF" :rules="[{ required: true, message: 'FCF is required' }]">
                    <el-input v-model="OCEw_fCO2m.FCF" style="width: 300px; height:50px;" placeholder="FCF" />
                </el-form-item>
            </div>
        </el-form>
    </div>



    <!--    3.2.2外加碳源矿化产生的化石源CO2碳排放量宜按下式计算   2.2外加碳源矿化产生的化石源CO2碳排放量-->
    <div class="flex flex-col mt-10">
        <p style="font-weight: bold; font-size: 20px; color: black;"> 2.2外加碳源矿化产生的化石源CO2碳排放量</p>
        <el-form :model="OCEw_eCO2m" class="flex flex-start flex-wrap gap-4 mt-3" ref="OCEw_eCO2mRef">
            <div class="flex">
                <div class="w-[180px]">Me,m — 第 m 天的外加碳源的平均用量的浓度</div>
                <el-form-item prop="MemCon" :rules="[{ required: true, message: 'MemCon is required' }]">
                    <el-input v-model="OCEw_eCO2m.MemCon" style="width: 300px; height:50px;" placeholder="MemCon" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">Me,m — 第 m 天的外加碳源的平均用量的质量</div>
                <el-form-item prop="MemM" :rules="[{ required: true, message: 'MemM is required' }]">
                    <el-input v-model="OCEw_eCO2m.MemM" style="width: 300px; height:50px;" placeholder="MemM" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">EFw—eCO2 — 污水处理阶段外加碳源的化石源co2当量排放因子(kgco2 -eq/kg)</div>
                <el-select v-model="OCEw_eCO2m.EFw_eCO2" placeholder="𝑀𝐶𝐹 —— 污水处理过程 CH4修正因子。" size="large"
                    style="width: 300px;height:60px;margin-top:20px;">
                    <el-option v-for="item in OEFw_eCO2Options" :key="item.value" :label="item.label"
                        :value="item.value" />
                </el-select>
            </div>
        </el-form>
    </div>



    <!--  3.2.3 污水收集提升和处理阶段排放的CH4和CO2当量   2.3 甲烷碳排放当量     分为可实测和不可实测 -->
    <div class="mt-10">
        <p style="font-weight: bold; font-size: 20px; color: black;">2.3 甲烷碳排放当量 </p>
        <el-form :model="OCEw_CH4m" class="flex flex-start flex-wrap gap-4 mt-3" ref="OCEw_CH4mRef">
            <div class="flex">
                <div class="w-[180px]">是否可以实测</div>
                <el-select v-model="OCEw_CH4m.ifRealTest" placeholder="是否可以实测" size="large"
                    style="width: 300px;height:60px;margin-top:20px;">
                    <el-option v-for="item in ifRealTestOptions" :key="item.value" :label="item.label"
                        :value="item.value" />
                </el-select>
            </div>
            <div class="flex">
                <div class="w-[180px]">fCH4 — CH4的全球变暖潜能 </div>
                <el-form-item prop="fCH4" :rules="[{ required: true, message: 'fCH4 is required' }]">
                    <el-input v-model="OCEw_CH4m.fCH4" style="width: 300px; height:50px;" placeholder="fCH4" />
                </el-form-item>
            </div>
            <div class="flex" v-if="OCEw_CH4m.ifRealTest">
                <div class="w-[180px]">Mpump—CH4 ,m — 第 m天提 升 泵站 逸 散 的 CH4 量 (kg/d) ;</div>
                <el-form-item prop="MpumpCH4m" :rules="[{ required: true, message: 'MpumpCH4m is required' }]">
                    <el-input v-model="OCEw_CH4m.MpumpCH4m" style="width: 300px; height:50px;"
                        placeholder="MpumpCH4m" />
                </el-form-item>
            </div>
            <div class="flex" v-if="OCEw_CH4m.ifRealTest">
                <div class="w-[180px]">Mgrit—CH4 ,m — 第 m天沉 砂 池逸 散 的 CH4 量(kg/d) ; </div>
                <el-form-item prop="MgritCH4m" :rules="[{ required: true, message: 'MgritCH4m is required' }]">
                    <el-input v-model="OCEw_CH4m.MgritCH4m" style="width: 300px; height:50px;"
                        placeholder="MgritCH4m" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">FCH4 — 提升泵站和沉砂池逸散的CH4量占生化反应过程排放总量的百分比(取值在10.25%-26.19%)</div>
                <el-form-item prop="FCH4" :rules="[{ required: true, message: 'FCH4 is required' }]">
                    <el-input v-model="OCEw_CH4m.FCH4" style="width: 300px; height:50px;" placeholder="FCH4" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">EFw_CH4 — 污水处理阶段C4的排放因子(kgCH4/kgCOD);可实测,没有实测条件的常规推荐值宜为（0.004-0.0075）
                </div>
                <el-form-item prop="EFw_CH4" :rules="[{ required: true, message: 'EFw_CH4 is required' }]">
                    <el-input v-model="OCEw_CH4m.EFw_CH4" style="width: 300px; height:50px;" placeholder="EFw_CH4" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">Qin,m —第 m天的进水量 (m3 /d)</div>
                <el-form-item prop="Qinm">
                    <el-input v-model="OCEw_fCO2m.Qinm" style="width: 300px; height:50px;" placeholder="Qinm" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">CODin,m —第 m天的平均进水 coD浓度(mg/L)</div>
                <el-form-item prop="CODinm">
                    <el-input v-model="OCEw_fCO2m.CODinm" style="width: 300px; height:50px;" placeholder="CODinm" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">CODOut,m —第 m天的平均出水 coD浓度(mg/L)</div>
                <el-form-item prop="CODoutm">
                    <el-input v-model="OCEw_fCO2m.CODoutm" style="width: 300px; height:50px;" placeholder="CODoutm" />
                </el-form-item>
            </div>
        </el-form>
    </div>


    <!-- 3.2.4  污水生物处理脱氮过程排放的 N2O 的CO2当量    2.4 N2O碳排放当量 -->
    <div class="mt-10">
        <p style="font-weight: bold; font-size: 20px; color: black;"> 2.4 N2O碳排放当量</p>
        <el-form :model="OCEw_N2Om" class="flex flex-start flex-wrap gap-4 mt-3" ref="EleCIntRef">
            <div class="flex">
                <div class="w-[180px]">TNin, m —第 m 天的平均进水 TN浓度(mg/L) ; </div>
                <el-form-item prop="TNinm" :rules="[{ required: true, message: 'TNinm is required' }]">
                    <el-input v-model="OCEw_N2Om.TNinm" style="width: 300px; height:50px;" placeholder="TNinm" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">TN Out,m —第 m 天的平均出水 TN浓度(mg/L) ;</div>
                <el-form-item prop="TNoutm" :rules="[{ required: true, message: 'TNoutm is required' }]">
                    <el-input v-model="OCEw_N2Om.TNoutm" style="width: 300px; height:50px;" placeholder="TNoutm" />
                </el-form-item>
            </div>
        </el-form>
    </div>




    <!--   3.3.1  污水处理阶段所运行设备的电力消耗产生的碳排放量   3.1 电力消耗产生的碳排放量 -->
    <div class="mt-10">
        <p style="font-weight: bold; font-size: 20px; color: black;"> 3.1 电力消耗产生的碳排放量</p>
        <el-form :model="OCEw_ecm" class="flex flex-start flex-wrap gap-4 mt-3" ref="EleCIntRef">
            <div class="flex">
                <div class="w-[180px]">请您选择污水厂的所属区域</div>
                <el-form-item prop="EF_ecp" :rules="[{ required: true, message: 'EF_ecp is required' }]">
                    <el-select v-model="OCEw_ecm.EF_ecp" placeholder="选择污水厂所属区域" size="large" style="width: 300px">
                        <el-option v-for="item in AreaOptions" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">Eec ,m — 污水处理阶段第 m天的耗电量(kw ●h/d) ;</div>
                <el-form-item prop="Eecm" :rules="[{ required: true, message: 'Eecm is required' }]">
                    <el-input v-model="OCEw_ecm.Eecm" style="width: 300px; height:50px;" placeholder="Eecm" />
                </el-form-item>
            </div>
        </el-form>
    </div>



    <!-- 3.2热耗碳排放强度 -->
    <div class="mt-10">
        <p style="font-weight: bold; font-size: 20px; color: black;">3.2热耗碳排放强度</p>
        <el-form :model="A03EF_fcjInput" class="flex flex-start flex-wrap gap-4 mt-3" ref="OCEw_fcmRef">
            <div class="flex">
                <div class="w-[180px]">炼焦煤</div>
                <el-form-item prop="LianJiao" :rules="[{ required: true, message: 'LianJiao is required' }]">
                    <el-input v-model="A03EF_fcjInput.LianJiao" style="width: 300px; height:50px;"
                        placeholder="LianJiao" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">烟煤</div>
                <el-form-item prop="Yan" :rules="[{ required: true, message: 'Yan is required' }]">
                    <el-input v-model="A03EF_fcjInput.Yan" style="width: 300px; height:50px;" placeholder="Yan" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">无烟煤</div>
                <el-form-item prop="NoYan" :rules="[{ required: true, message: 'NoYan is required' }]">
                    <el-input v-model="A03EF_fcjInput.NoYan" style="width: 300px; height:50px;" placeholder="NoYan" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">焦炭</div>
                <el-form-item prop="JiaoC" :rules="[{ required: true, message: 'JiaoC is required' }]">
                    <el-input v-model="A03EF_fcjInput.JiaoC" style="width: 300px; height:50px;" placeholder="JiaoC" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">原油</div>
                <el-form-item prop="YuanOil" :rules="[{ required: true, message: 'YuanOil is required' }]">
                    <el-input v-model="A03EF_fcjInput.YuanOil" style="width: 300px; height:50px;"
                        placeholder="YuanOil" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">汽油</div>
                <el-form-item prop="QiOil" :rules="[{ required: true, message: 'QiOil is required' }]">
                    <el-input v-model="A03EF_fcjInput.QiOil" style="width: 300px; height:50px;" placeholder="QiOil" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">煤油</div>
                <el-form-item prop="MeiOil" :rules="[{ required: true, message: 'MeiOil is required' }]">
                    <el-input v-model="A03EF_fcjInput.MeiOil" style="width: 300px; height:50px;" placeholder="MeiOil" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">柴油</div>
                <el-form-item prop="ChaiOil" :rules="[{ required: true, message: 'ChaiOil is required' }]">
                    <el-input v-model="A03EF_fcjInput.ChaiOil" style="width: 300px; height:50px;"
                        placeholder="ChaiOil" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">液化石油气</div>
                <el-form-item prop="ShiYouQi" :rules="[{ required: true, message: 'ShiYouQi is required' }]">
                    <el-input v-model="A03EF_fcjInput.ShiYouQi" style="width: 300px; height:50px;"
                        placeholder="ShiYouQi" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">炼厂千气</div>
                <el-form-item prop="GanQi" :rules="[{ required: true, message: 'GanQi is required' }]">
                    <el-input v-model="A03EF_fcjInput.GanQi" style="width: 300px; height:50px;" placeholder="GanQi" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">煤焦油</div>
                <el-form-item prop="MeiJiaoOil" :rules="[{ required: true, message: 'MeiJiaoOil is required' }]">
                    <el-input v-model="A03EF_fcjInput.MeiJiaoOil" style="width: 300px; height:50px;"
                        placeholder="MeiJiaoOil" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">天然气</div>
                <el-form-item prop="TianRanQi" :rules="[{ required: true, message: 'TianRanQi is required' }]">
                    <el-input v-model="A03EF_fcjInput.TianRanQi" style="width: 300px; height:50px;"
                        placeholder="TianRanQi" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">焦炉煤气</div>
                <el-form-item prop="JiaoLuQi" :rules="[{ required: true, message: 'JiaoLuQi is required' }]">
                    <el-input v-model="A03EF_fcjInput.JiaoLuQi" style="width: 300px; height:50px;"
                        placeholder="JiaoLuQi" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">焦炭制气</div>
                <el-form-item prop="JiaoCQi" :rules="[{ required: true, message: 'JiaoCQi is required' }]">
                    <el-input v-model="A03EF_fcjInput.JiaoCQi" style="width: 300px; height:50px;"
                        placeholder="JiaoCQi" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">热蒸汽等其他外购买力</div>
                <el-form-item prop="other" :rules="[{ required: true, message: 'other is required' }]">
                    <el-input v-model="A03EF_fcjInput.other" style="width: 300px; height:50px;" placeholder="other" />
                </el-form-item>
            </div>
        </el-form>
    </div>

    <!-- 3.3物耗碳排放量药剂质量（药耗） -->
    <div class="mt-10">
        <p style="font-weight: bold; font-size: 20px; color: black;">3.3物耗碳排放量药剂质量（药耗）</p>
        <div class="flex">
            <el-form :model="McgM" class="flex flex-start flex-wrap gap-4 mt-3" ref="McgMRef">
                <div class="flex" v-for="(value, key, index) in McgM">
                    <div class="w-[180px] mr-10">{{ MatMNames[index] }}</div>
                    <el-form-item class="mr-10" :key="key" :prop="key"
                        :rules="[{ required: true, message: `${key} is required` }]">
                        <el-input v-model="McgM[key]" style="width: 300px; height:50px;" :placeholder="key" />
                    </el-form-item>
                    <div class="w-[180px] mr-10">{{ MatConNames[index] }}</div>
                    <el-form-item :key="key" :prop="key" :rules="[{ required: true, message: `${key} is required` }]">
                        <el-input v-model="McgCon[key]" style="width: 300px; height:50px;" :placeholder="key" />
                    </el-form-item>
                </div>
            </el-form>
        </div>
    </div>

    <!-- 3.4 -->
    <!-- 代入参数：【7】、【8】【9】 -->


    <!-- 选择计算哪一组 -->
    <div class="mt-10">
        <p style="font-weight: bold; font-size: 20px; color: black;"> -----选择计算哪一组(4.1-4.7)</p>
        <el-form :model="OCEs_ban">
            <el-select v-model="OCEs_ban.optionValue" placeholder="选择计算哪一组" size="large" style="width: 300px">
                <el-option v-for="item in technologyOptions" :key="item.value" :label="item.label"
                    :value="item.value" />
            </el-select>
        </el-form>
    </div>


    <!-- 4.1污泥浓缩脱水过程的碳排放量可忽略不计（大部分用户都可能选择此项，选择此项后后面的计算过程将不再进行） -->
    <div class="mt-10" v-if="OCEs_ban.optionValue == 0">
        <p style="font-weight: bold; font-size: 20px; color: black;">4.1污泥浓缩脱水过程的碳排放量</p>
        <el-form :model="ifJump">
            <div class="w-[180px]"></div>
            <el-select v-model="ifJump.ifJump" placeholder="是否忽略不计" size="large" style="width: 300px">
                <el-option v-for="item in ifJumpOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </el-form>
    </div>


    <!-- 4.2污泥厌氧消化沼气收集管路的无意泄露与火炬不充分燃烧的排放 -->
    <div class="mt-10" v-if="OCEs_ban.optionValue == 1">
        <p style="font-weight: bold; font-size: 20px; color: black;"> 4.2污泥厌氧消化沼气收集管路的无意泄露与火炬不充分燃烧的排放</p>
        <el-form :model="OCEs_CH4adm" class="flex flex-start flex-wrap gap-4 mt-3" ref="OCEs_CH4admRef">
            <div class="flex">
                <div class="w-[180px]">vbiogas,m — 第 m天沼气产量 (m3/d) ;</div>
                <el-form-item prop="Vbiogasm" :rules="[{ required: true, message: 'Vbiogasm is required' }]">
                    <el-input v-model="OCEs_CH4adm.Vbiogasm" style="width: 300px; height:50px;"
                        placeholder="Vbiogasm" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">PCH4 — 沼气中 CH4 的质量分数( %) ;</div>
                <el-form-item prop="PCH4" :rules="[{ required: true, message: 'PCH4 is required' }]">
                    <el-input v-model="OCEs_CH4adm.PCH4" style="width: 300px; height:50px;" placeholder="PCH4" />
                </el-form-item>
            </div>
        </el-form>
    </div>


    <!-- 4.3污泥厌氧消化过程产生沼液的N2O排放 -->
    <div class="mt-10" v-if="OCEs_ban.optionValue == 1" ref="CH4Ref">
        <p style="font-weight: bold; font-size: 20px; color: black;">4.3污泥厌氧消化过程产生沼液的N2O排放</p>
        <el-form :model="OCE_Biogas_N2O" class="flex flex-start flex-wrap gap-4 mt-3">
            <div class="flex">
                <div class="w-[180px]">TNin, m —第 m 天的平均进水 TN浓度(mg/L) ; </div>
                <el-form-item prop="TNinm" :rules="[{ required: true, message: 'TNinm is required' }]">
                    <el-input v-model="OCE_Biogas_N2O.TNinm" style="width: 300px; height:50px;" placeholder="TNinm" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">TN Out,m —第 m 天的平均出水 TN浓度(mg/L) ;</div>
                <el-form-item prop="TNoutm" :rules="[{ required: true, message: 'TNoutm is required' }]">
                    <el-input v-model="OCE_Biogas_N2O.TNoutm" style="width: 300px; height:50px;" placeholder="TNoutm" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">QBiogasm —第 m 天的进水量(m3 /d) ;</div>
                <el-form-item prop="QBiogasm" :rules="[{ required: true, message: 'QBiogasm is required' }]">
                    <el-input v-model="OCE_Biogas_N2O.QBiogasm" style="width: 300px; height:50px;"
                        placeholder="QBiogasm" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">EFw—N2O —污水处理阶段 N2 O 的排放因子(kgN2 O-N/ kg N) ;</div>
                <el-form-item prop="EFw_N2O" :rules="[{ required: true, message: 'EFw_N2O is required' }]">
                    <el-input v-model="OCE_Biogas_N2O.EFw_N2O" style="width: 300px; height:50px;"
                        placeholder="EFw_N2O" />
                </el-form-item>
            </div>
        </el-form>
    </div>




    <!--  4.4污泥好氧发酵过程生化反应的碳排放 -->
    <div class="mt-10" v-if="OCEs_ban.optionValue == 2">
        <p style="font-weight: bold; font-size: 20px; color: black;"> 4.4污泥好氧发酵过程生化反应的碳排放</p>
        <el-form :model="OCEs_CH4afm" class="flex flex-start flex-wrap gap-4 mt-3" ref="OCEs_CH4afmRef">
            <div class="flex">
                <div class="w-[180px]">MS,m — 第 m天污泥处理好氧发酵量(kg干污泥/d) ;</div>
                <el-form-item prop="MssmSlud" :rules="[{ required: true, message: 'MssmSlud is required' }]">
                    <el-input v-model="OCEs_CH4afm.MssmSlud" style="width: 300px; height:50px;"
                        placeholder="MssmSlud" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">MS,m — 第 m天污泥处理好氧发酵量(kg干污泥/d) ;</div>
                <el-form-item prop="MssmWater" :rules="[{ required: true, message: 'MssmWater is required' }]">
                    <el-input v-model="OCEs_CH4afm.MssmWater" style="width: 300px; height:50px;"
                        placeholder="MssmWater" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">EFS—CH4 ,af — 污泥处理阶段污泥好氧发酵过程 CH4 的排
                    放因子 (gCH4 /kg干污泥) ;</div>
                <el-form-item prop="EFs_CH4af" :rules="[{ required: true, message: 'EFs_CH4af is required' }]">
                    <el-input v-model="OCEs_CH4afm.EFs_CH4af" style="width: 300px; height:50px;"
                        placeholder="EFs_CH4af" />
                </el-form-item>
            </div>
        </el-form>
    </div>


    <!--3.4.5  4.5污泥干化焚烧或协同焚烧-化石源碳被氧化产生的CO2碳排放 -->
    <div class="mt-10" v-if="OCEs_ban.optionValue == 3">
        <p style="font-weight: bold; font-size: 20px; color: black;"> 4.5污泥干化焚烧或协同焚烧-化石源碳被氧化产生的CO2碳排放</p>
        <el-form :model="OCEs_fCO2incm" class="flex flex-start flex-wrap gap-4 mt-3" ref="OCEs_fCO2incmRef">
            <div class="flex">
                <div class="w-[180px]">CF — 污泥干物质中含碳比例(%) ;</div>
                <el-form-item prop="CF" :rules="[{ required: true, message: 'CF is required' }]">
                    <el-input v-model="OCEs_fCO2incm.CF" style="width: 300px; height:50px;" placeholder="CF" />
                </el-form-item>
            </div>
        </el-form>
    </div>



    <!--  4.6污泥干化焚烧或协同焚烧-不完全燃烧产生的CH4和N2O   -->
    <!-- 3.4.6-1  [16]  -->
    <div class="mt-10" v-if="OCEs_ban.optionValue == 3">
        <p style="font-weight: bold; font-size: 20px; color: black;">4.6EFS—CH4,inc—污泥处理阶段污泥焚烧过程CH4的排放因子(kgCH4/t干污泥)</p>
        <el-form :model="OCEs_CH4incm">
            <div class="w-[180px]"></div>
            <el-select v-model="OCEs_CH4incm.EFs_CH4inc" placeholder="选择连续燃烧类型" size="large" style="width: 300px">
                <el-option v-for="item in fireStyles" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </el-form>
    </div>
    <!-- 3.4.6-2  [17] -->
    <!-- <div class="mt-10" v-if="OCEs_ban.optionValue == 3">
        <p style="font-weight: bold; font-size: 20px; color: black;">EF S—N2O,inc — 污泥处理阶段 污泥焚 烧过程 N2 O 的排 放 因子(kgN2
            O/t干污泥 ) ;可实测 ,无实测值 时可采用 0.99kg N2 O/t干污泥;</p>
        <el-form :model="OCEs_N2Oincm">
            <el-select v-model="OCEs_N2Oincm.EFs_N2Oinc" placeholder="选择连续燃烧类型" size="large" style="width: 300px">
                <el-option v-for="item in fireStyles" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </el-form>
    </div> -->





    <!--    4.7污泥热解碳化或气化过程生化反应的碳排放计算 [18] -->
    <!-- 3.4.5的公式  不同的参数  [18]-->
    <div class="mt-10" v-if="OCEs_ban.optionValue == 4">
        <p style="font-weight: bold; font-size: 20px; color: black;"> 4.7污泥热解碳化或气化过程生化反应的碳排放计算 [18]</p>
        <el-form :model="OCEs_fCO2incmCop" class="flex flex-start flex-wrap gap-4 mt-3" ref="OCEs_fCO2incmCopRef">
            <div class="flex">
                <div class="w-[180px]">𝑓c
                    —— 标准煤 CO2排放因子，取值为 2.7725 kgCO2/kg 标准煤；</div>
                <el-form-item prop="CF" :rules="[{ required: true, message: 'CF is required' }]">
                    <el-input v-model="OCEs_fCO2incmCop.CF" style="width: 300px; height:50px;" placeholder="CF" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">MssmSlud；</div>
                <el-form-item prop="MssmSlud" :rules="[{ required: true, message: 'MssmSlud is required' }]">
                    <el-input v-model="OCEs_fCO2incmCop.MssmSlud" style="width: 300px; height:50px;"
                        placeholder="MssmSlud" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">MssmWater</div>
                <el-form-item prop="MssmWater" :rules="[{ required: true, message: 'MssmWater is required' }]">
                    <el-input v-model="OCEs_fCO2incmCop.MssmWater" style="width: 300px; height:50px;"
                        placeholder="MssmWater" />
                </el-form-item>
            </div>
        </el-form>
    </div>

    <!-- 3.4.6-1 的公式 不同的参数[19] -->
    <div class="mt-10" v-if="OCEs_ban.optionValue == 4">
        <p style="font-weight: bold; font-size: 20px; color: black;"> 4.7污泥干化焚烧或协同焚烧-不完全燃烧产生的CH4 </p>
        <el-form :model="OCEs_CH4incmCop" class="flex flex-start flex-wrap gap-4 mt-3" ref="OCEs_fCO2incmCopRef">
            <div class="flex">
                <div class="w-[180px]">选择连续燃烧类型</div>
                <el-select v-model="OCEs_CH4incmCop.EFs_CH4inc" placeholder="选择连续燃烧类型" size="large"
                    style="width: 300px">
                    <el-option v-for="item in fireStyles" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </div>
            <div class="flex">
                <div class="w-[180px]">MssmSlud；</div>
                <el-form-item prop="MssmSlud" :rules="[{ required: true, message: 'MssmSlud is required' }]">
                    <el-input v-model="OCEs_CH4incmCop.MssmSlud" style="width: 300px; height:50px;"
                        placeholder="MssmSlud" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">MssmWater</div>
                <el-form-item prop="MssmWater" :rules="[{ required: true, message: 'MssmWater is required' }]">
                    <el-input v-model="OCEs_CH4incmCop.MssmWater" style="width: 300px; height:50px;"
                        placeholder="MssmWater" />
                </el-form-item>
            </div>
        </el-form>

    </div>

    <!-- 3.4.6-2 的公式 不同的参数 [20] -->
    <div class="mt-10" v-if="OCEs_ban.optionValue == 4">
        <p style="font-weight: bold; font-size: 20px; color: black;"> 4.8污泥干化焚烧或协同焚烧-不完全燃烧产生的N2O </p>
        <el-form :model="OCEs_N2OincmCop" class="flex flex-start flex-wrap gap-4 mt-3" ref="OCEs_fCO2incmCopRef">
            <div class="flex">
                <div class="w-[180px]">选择连续燃烧类型</div>
                <el-select v-model="OCEs_N2OincmCop.EFs_N2Oinc" placeholder="选择连续燃烧类型" size="large"
                    style="width: 300px">
                    <el-option v-for="item in fireStyles" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </div>

            <div class="flex">
                <div class="w-[180px]">MssmSlud；</div>
                <el-form-item prop="MssmSlud" :rules="[{ required: true, message: 'MssmSlud is required' }]">
                    <el-input v-model="OCEs_N2OincmCop.MssmSlud" style="width: 300px; height:50px;"
                        placeholder="MssmSlud" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">MssmWater</div>
                <el-form-item prop="MssmWater" :rules="[{ required: true, message: 'MssmWater is required' }]">
                    <el-input v-model="OCEs_N2OincmCop.MssmWater" style="width: 300px; height:50px;"
                        placeholder="MssmWater" />
                </el-form-item>
            </div>
        </el-form>
    </div>







    <!-- ---4.9选择是否计算 -->
    <div class="mt-10">
        <p style="font-weight: bold; font-size: 20px; color: black;"> 4.9污泥处理阶段能源和药剂消耗产生的碳排放量</p>
        <el-form :model="ifEleDurEne">
            <el-select v-model="ifEleDurEne.ifHave" placeholder="是否对污泥处理厂/区分别计算电耗、药耗与能耗" size="large"
                style="width: 300px">
                <el-option v-for="item in ifEleDurEneOptions" :key="item.value" :label="item.label"
                    :value="item.value" />
            </el-select>
        </el-form>
    </div>
    <!--   3.3.1copy  污水处理阶段所运行设备的电力消耗产生的碳排放量  4.9 电力消耗产生的碳排放量 -->
    <div class="mt-10" v-if="ifEleDurEne.ifHave">
        <p style="font-weight: bold; font-size: 20px; color: black;"> 4.9copy3 电力消耗产生的碳排放量</p>
        <el-form :model="OCEw_ecmCopy" class="flex flex-start flex-wrap gap-4 mt-3" ref="EleCIntRef">
            <div class="flex">
                <div class="w-[180px]">请您选择污水厂的所属区域</div>
                <el-form-item prop="EF_ecp" :rules="[{ required: true, message: 'EF_ecp is required' }]">
                    <el-select v-model="OCEw_ecmCopy.EF_ecp" placeholder="选择污水厂所属区域" size="large" style="width: 300px">
                        <el-option v-for="item in AreaOptions" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">Eec ,m — 污水处理阶段第 m天的耗电量(kw ●h/d) ;</div>
                <el-form-item prop="Eecm" :rules="[{ required: true, message: 'Eecm is required' }]">
                    <el-input v-model="OCEw_ecmCopy.Eecm" style="width: 300px; height:50px;" placeholder="Eecm" />
                </el-form-item>
            </div>
        </el-form>
    </div>



    <!-- 3.2copy   4.9热耗碳排放强度 -->
    <div class="mt-10" v-if="ifEleDurEne.ifHave">
        <p style="font-weight: bold; font-size: 20px; color: black;">4.9copy3热耗碳排放强度</p>
        <el-form :model="A03EF_fcjInputCopy" class="flex flex-start flex-wrap gap-4 mt-3" ref="OCEw_fcmRef">
            <div class="flex">
                <div class="w-[180px]">炼焦煤</div>
                <el-form-item prop="LianJiao" :rules="[{ required: true, message: 'LianJiao is required' }]">
                    <el-input v-model="A03EF_fcjInputCopy.LianJiao" style="width: 300px; height:50px;"
                        placeholder="LianJiao" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">烟煤</div>
                <el-form-item prop="Yan" :rules="[{ required: true, message: 'Yan is required' }]">
                    <el-input v-model="A03EF_fcjInputCopy.Yan" style="width: 300px; height:50px;" placeholder="Yan" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">无烟煤</div>
                <el-form-item prop="NoYan" :rules="[{ required: true, message: 'NoYan is required' }]">
                    <el-input v-model="A03EF_fcjInputCopy.NoYan" style="width: 300px; height:50px;"
                        placeholder="NoYan" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">焦炭</div>
                <el-form-item prop="JiaoC" :rules="[{ required: true, message: 'JiaoC is required' }]">
                    <el-input v-model="A03EF_fcjInputCopy.JiaoC" style="width: 300px; height:50px;"
                        placeholder="JiaoC" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">原油</div>
                <el-form-item prop="YuanOil" :rules="[{ required: true, message: 'YuanOil is required' }]">
                    <el-input v-model="A03EF_fcjInputCopy.YuanOil" style="width: 300px; height:50px;"
                        placeholder="YuanOil" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">汽油</div>
                <el-form-item prop="QiOil" :rules="[{ required: true, message: 'QiOil is required' }]">
                    <el-input v-model="A03EF_fcjInputCopy.QiOil" style="width: 300px; height:50px;"
                        placeholder="QiOil" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">煤油</div>
                <el-form-item prop="MeiOil" :rules="[{ required: true, message: 'MeiOil is required' }]">
                    <el-input v-model="A03EF_fcjInputCopy.MeiOil" style="width: 300px; height:50px;"
                        placeholder="MeiOil" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">柴油</div>
                <el-form-item prop="ChaiOil" :rules="[{ required: true, message: 'ChaiOil is required' }]">
                    <el-input v-model="A03EF_fcjInputCopy.ChaiOil" style="width: 300px; height:50px;"
                        placeholder="ChaiOil" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">液化石油气</div>
                <el-form-item prop="ShiYouQi" :rules="[{ required: true, message: 'ShiYouQi is required' }]">
                    <el-input v-model="A03EF_fcjInputCopy.ShiYouQi" style="width: 300px; height:50px;"
                        placeholder="ShiYouQi" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">炼厂千气</div>
                <el-form-item prop="GanQi" :rules="[{ required: true, message: 'GanQi is required' }]">
                    <el-input v-model="A03EF_fcjInputCopy.GanQi" style="width: 300px; height:50px;"
                        placeholder="GanQi" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">煤焦油</div>
                <el-form-item prop="MeiJiaoOil" :rules="[{ required: true, message: 'MeiJiaoOil is required' }]">
                    <el-input v-model="A03EF_fcjInputCopy.MeiJiaoOil" style="width: 300px; height:50px;"
                        placeholder="MeiJiaoOil" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">天然气</div>
                <el-form-item prop="TianRanQi" :rules="[{ required: true, message: 'TianRanQi is required' }]">
                    <el-input v-model="A03EF_fcjInputCopy.TianRanQi" style="width: 300px; height:50px;"
                        placeholder="TianRanQi" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">焦炉煤气</div>
                <el-form-item prop="JiaoLuQi" :rules="[{ required: true, message: 'JiaoLuQi is required' }]">
                    <el-input v-model="A03EF_fcjInputCopy.JiaoLuQi" style="width: 300px; height:50px;"
                        placeholder="JiaoLuQi" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">焦炭制气</div>
                <el-form-item prop="JiaoCQi" :rules="[{ required: true, message: 'JiaoCQi is required' }]">
                    <el-input v-model="A03EF_fcjInputCopy.JiaoCQi" style="width: 300px; height:50px;"
                        placeholder="JiaoCQi" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">热蒸汽等其他外购买力</div>
                <el-form-item prop="other" :rules="[{ required: true, message: 'other is required' }]">
                    <el-input v-model="A03EF_fcjInputCopy.other" style="width: 300px; height:50px;"
                        placeholder="other" />
                </el-form-item>
            </div>

        </el-form>
    </div>

    <!-- 3.3copy   4.9物耗碳排放量药剂质量（药耗） -->
    <div class="mt-10" v-if="ifEleDurEne.ifHave">
        <p style="font-weight: bold; font-size: 20px; color: black;">4.9copy3物耗碳排放量药剂质量（药耗）</p>
        <div class="flex">
            <el-form :model="McgMCopy" class="flex flex-start flex-wrap gap-4 mt-3" ref="McgMRef">
                <div class="flex" v-for="(value, key, index) in McgMCopy">
                    <div class="w-[180px] mr-10">{{ MatMNames[index] }}</div>
                    <el-form-item class="mr-10" :key="key" :prop="key"
                        :rules="[{ required: true, message: `${key} is required` }]">
                        <el-input v-model="McgMCopy[key]" style="width: 300px; height:50px;" :placeholder="key" />
                    </el-form-item>
                    <div class="w-[180px] mr-10">{{ MatConNames[index] }}</div>
                    <el-form-item :key="key" :prop="key" :rules="[{ required: true, message: `${key} is required` }]">
                        <el-input v-model="McgConCopy[key]" style="width: 300px; height:50px;" :placeholder="key" />
                    </el-form-item>
                </div>
            </el-form>
        </div>
    </div>


    <!-- 5.1 -->

    <!--5.1热泵技术回收污水中热量的替碳量 -->
    <div class="mt-10">
        <p style="font-weight: bold; font-size: 20px; color: black;">5.1热泵技术回收污水中热量的替碳量</p>
        <el-form :model="A03EF_fcjInputCopyCopy" class="flex flex-start flex-wrap gap-4 mt-3" ref="OCEw_fcmRef">
            <div class="flex">
                <div class="w-[180px]">炼焦煤</div>
                <el-form-item prop="LianJiao" :rules="[{ required: true, message: 'LianJiao is required' }]">
                    <el-input v-model="A03EF_fcjInputCopyCopy.LianJiao" style="width: 300px; height:50px;"
                        placeholder="LianJiao" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">烟煤</div>
                <el-form-item prop="Yan" :rules="[{ required: true, message: 'Yan is required' }]">
                    <el-input v-model="A03EF_fcjInputCopyCopy.Yan" style="width: 300px; height:50px;"
                        placeholder="Yan" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">无烟煤</div>
                <el-form-item prop="NoYan" :rules="[{ required: true, message: 'NoYan is required' }]">
                    <el-input v-model="A03EF_fcjInputCopyCopy.NoYan" style="width: 300px; height:50px;"
                        placeholder="NoYan" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">焦炭</div>
                <el-form-item prop="JiaoC" :rules="[{ required: true, message: 'JiaoC is required' }]">
                    <el-input v-model="A03EF_fcjInputCopyCopy.JiaoC" style="width: 300px; height:50px;"
                        placeholder="JiaoC" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">原油</div>
                <el-form-item prop="YuanOil" :rules="[{ required: true, message: 'YuanOil is required' }]">
                    <el-input v-model="A03EF_fcjInputCopyCopy.YuanOil" style="width: 300px; height:50px;"
                        placeholder="YuanOil" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">汽油</div>
                <el-form-item prop="QiOil" :rules="[{ required: true, message: 'QiOil is required' }]">
                    <el-input v-model="A03EF_fcjInputCopyCopy.QiOil" style="width: 300px; height:50px;"
                        placeholder="QiOil" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">煤油</div>
                <el-form-item prop="MeiOil" :rules="[{ required: true, message: 'MeiOil is required' }]">
                    <el-input v-model="A03EF_fcjInputCopyCopy.MeiOil" style="width: 300px; height:50px;"
                        placeholder="MeiOil" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">柴油</div>
                <el-form-item prop="ChaiOil" :rules="[{ required: true, message: 'ChaiOil is required' }]">
                    <el-input v-model="A03EF_fcjInputCopyCopy.ChaiOil" style="width: 300px; height:50px;"
                        placeholder="ChaiOil" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">液化石油气</div>
                <el-form-item prop="ShiYouQi" :rules="[{ required: true, message: 'ShiYouQi is required' }]">
                    <el-input v-model="A03EF_fcjInputCopyCopy.ShiYouQi" style="width: 300px; height:50px;"
                        placeholder="ShiYouQi" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">炼厂千气</div>
                <el-form-item prop="GanQi" :rules="[{ required: true, message: 'GanQi is required' }]">
                    <el-input v-model="A03EF_fcjInputCopyCopy.GanQi" style="width: 300px; height:50px;"
                        placeholder="GanQi" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">煤焦油</div>
                <el-form-item prop="MeiJiaoOil" :rules="[{ required: true, message: 'MeiJiaoOil is required' }]">
                    <el-input v-model="A03EF_fcjInputCopyCopy.MeiJiaoOil" style="width: 300px; height:50px;"
                        placeholder="MeiJiaoOil" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">天然气</div>
                <el-form-item prop="TianRanQi" :rules="[{ required: true, message: 'TianRanQi is required' }]">
                    <el-input v-model="A03EF_fcjInputCopyCopy.TianRanQi" style="width: 300px; height:50px;"
                        placeholder="TianRanQi" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">焦炉煤气</div>
                <el-form-item prop="JiaoLuQi" :rules="[{ required: true, message: 'JiaoLuQi is required' }]">
                    <el-input v-model="A03EF_fcjInputCopyCopy.JiaoLuQi" style="width: 300px; height:50px;"
                        placeholder="JiaoLuQi" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">焦炭制气</div>
                <el-form-item prop="JiaoCQi" :rules="[{ required: true, message: 'JiaoCQi is required' }]">
                    <el-input v-model="A03EF_fcjInputCopyCopy.JiaoCQi" style="width: 300px; height:50px;"
                        placeholder="JiaoCQi" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">热蒸汽等其他外购买力</div>
                <el-form-item prop="other" :rules="[{ required: true, message: 'other is required' }]">
                    <el-input v-model="A03EF_fcjInputCopyCopy.other" style="width: 300px; height:50px;"
                        placeholder="other" />
                </el-form-item>
            </div>

        </el-form>
    </div>

















    <!-- 5.2光伏发电替碳量  -->
    <div class="mt-10">
        <p style="font-weight: bold; font-size: 20px; color: black;">5.2光伏发电替碳量</p>
        <el-form :model="OCA_pvm" class="flex flex-start flex-wrap gap-4 mt-3" ref="OCA_pvmRef">
            <div class="flex">
                <div class="w-[180px]">Epv, m —第 m天污水厂光伏发电量(kw ● h/d) ;</div>
                <el-form-item prop="Epvm" :rules="[{ required: true, message: 'Epvm is required' }]">
                    <el-input v-model="OCA_pvm.Epvm" style="width: 300px; height:50px;" placeholder="Epvm" />
                </el-form-item>
            </div>
            <el-select v-model="OCA_pvm.EF_ecp" placeholder="CEIws — 回用水替代的供水生 产过程 的碳排 放强度 (kg Co2-eq/m3)" size="large"
                style="width: 300px">
                <el-option v-for="item in AreaOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </el-form>
    </div>


    <!--  5.3再生水利用替碳量 -->
    <div class="mt-10">
        <p style="font-weight: bold; font-size: 20px; color: black;"> 5.3再生水利用替碳量</p>
        <el-form :model="OCA_wsm" class="flex flex-start flex-wrap gap-4 mt-3" ref="OCA_wsmRef">
            <div class="flex">
                <div class="w-[180px]">Qws,m — 第 m 天回用水供应量(m3 /d) ;</div>
                <el-form-item prop="Qwsm" :rules="[{ required: true, message: 'Qwsm is required' }]">
                    <el-input v-model="OCA_wsm.Qwsm" style="width: 300px; height:50px;" placeholder="Qwsm" />
                </el-form-item>
                <div class="w-[180px]">CEIws — 回用水替代的供水生 产过程 的碳排 放强度 (kg Co2-eq/m3)</div>
                <el-select v-model="OCA_wsm.CEIws" placeholder="CEIws — 回用水替代的供水生 产过程 的碳排 放强度 (kg Co2-eq/m3)"
                    size="large" style="width: 300px">
                    <el-option v-for="item in A06" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </div>
        </el-form>
    </div>





    <!--  5.4污泥厌氧消化沼气利用的替碳量 -->
    <div class="mt-10">
        <p style="font-weight: bold; font-size: 20px; color: black;"> 5.4污泥厌氧消化沼气利用的替碳量 </p>
        <el-form :model="OCA_adm" class="flex flex-start flex-wrap gap-4 mt-3" ref="OCA_admRef">
            <div class="flex">
                <div class="w-[180px]">Ead , m —第 m天污泥厌氧消化沼气发电量(kw ● h/d) ;</div>
                <el-form-item prop="Eadm" :rules="[{ required: true, message: 'Eadm is required' }]">
                    <el-input v-model="OCA_adm.Eadm" style="width: 300px; height:50px;" placeholder="Eadm" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">Had , m —第 m 天 污 泥 厌 氧 消 化 沼 气 富 余 热 能 利 用 量 (TJ/d) ;</div>
                <el-form-item prop="Hadm" :rules="[{ required: true, message: 'Hadm is required' }]">
                    <el-input v-model="OCA_adm.Hadm" style="width: 300px; height:50px;" placeholder="Hadm" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">vng, m —第 m天沼气提纯并网的天然气量(m3 CH4/d) ; </div>
                <el-form-item prop="Vngm" :rules="[{ required: true, message: 'Vngm is required' }]">
                    <el-input v-model="OCA_adm.Vngm" style="width: 300px; height:50px;" placeholder="Vngm" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">请您选择污水厂的所属区域</div>
                <el-form-item prop="EF_ecp" :rules="[{ required: true, message: 'EF_ecp is required' }]">
                    <el-select v-model="OCA_adm.EF_ecp" placeholder="选择污水厂所属区域" size="large" style="width: 300px">
                        <el-option v-for="item in AreaOptions" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </el-form-item>
            </div>
        </el-form>
        <p style="font-weight: bold; font-size: 20px; color: black;">5.4 热耗碳排放强度</p>
        <el-form :model="A03EF_fcjInput54" class="flex flex-start flex-wrap gap-4 mt-3" ref="OCEw_fcmRef">
            <div class="flex">
                <div class="w-[180px]">炼焦煤</div>
                <el-form-item prop="LianJiao" :rules="[{ required: true, message: 'LianJiao is required' }]">
                    <el-input v-model="A03EF_fcjInput54.LianJiao" style="width: 300px; height:50px;"
                        placeholder="LianJiao" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">烟煤</div>
                <el-form-item prop="Yan" :rules="[{ required: true, message: 'Yan is required' }]">
                    <el-input v-model="A03EF_fcjInput54.Yan" style="width: 300px; height:50px;" placeholder="Yan" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">无烟煤</div>
                <el-form-item prop="NoYan" :rules="[{ required: true, message: 'NoYan is required' }]">
                    <el-input v-model="A03EF_fcjInput54.NoYan" style="width: 300px; height:50px;" placeholder="NoYan" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">焦炭</div>
                <el-form-item prop="JiaoC" :rules="[{ required: true, message: 'JiaoC is required' }]">
                    <el-input v-model="A03EF_fcjInput54.JiaoC" style="width: 300px; height:50px;" placeholder="JiaoC" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">原油</div>
                <el-form-item prop="YuanOil" :rules="[{ required: true, message: 'YuanOil is required' }]">
                    <el-input v-model="A03EF_fcjInput54.YuanOil" style="width: 300px; height:50px;"
                        placeholder="YuanOil" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">汽油</div>
                <el-form-item prop="QiOil" :rules="[{ required: true, message: 'QiOil is required' }]">
                    <el-input v-model="A03EF_fcjInput54.QiOil" style="width: 300px; height:50px;" placeholder="QiOil" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">煤油</div>
                <el-form-item prop="MeiOil" :rules="[{ required: true, message: 'MeiOil is required' }]">
                    <el-input v-model="A03EF_fcjInput54.MeiOil" style="width: 300px; height:50px;"
                        placeholder="MeiOil" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">柴油</div>
                <el-form-item prop="ChaiOil" :rules="[{ required: true, message: 'ChaiOil is required' }]">
                    <el-input v-model="A03EF_fcjInput54.ChaiOil" style="width: 300px; height:50px;"
                        placeholder="ChaiOil" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">液化石油气</div>
                <el-form-item prop="ShiYouQi" :rules="[{ required: true, message: 'ShiYouQi is required' }]">
                    <el-input v-model="A03EF_fcjInput54.ShiYouQi" style="width: 300px; height:50px;"
                        placeholder="ShiYouQi" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">炼厂千气</div>
                <el-form-item prop="GanQi" :rules="[{ required: true, message: 'GanQi is required' }]">
                    <el-input v-model="A03EF_fcjInput54.GanQi" style="width: 300px; height:50px;" placeholder="GanQi" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">煤焦油</div>
                <el-form-item prop="MeiJiaoOil" :rules="[{ required: true, message: 'MeiJiaoOil is required' }]">
                    <el-input v-model="A03EF_fcjInput54.MeiJiaoOil" style="width: 300px; height:50px;"
                        placeholder="MeiJiaoOil" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">天然气</div>
                <el-form-item prop="TianRanQi" :rules="[{ required: true, message: 'TianRanQi is required' }]">
                    <el-input v-model="A03EF_fcjInput54.TianRanQi" style="width: 300px; height:50px;"
                        placeholder="TianRanQi" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">焦炉煤气</div>
                <el-form-item prop="JiaoLuQi" :rules="[{ required: true, message: 'JiaoLuQi is required' }]">
                    <el-input v-model="A03EF_fcjInput54.JiaoLuQi" style="width: 300px; height:50px;"
                        placeholder="JiaoLuQi" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">焦炭制气</div>
                <el-form-item prop="JiaoCQi" :rules="[{ required: true, message: 'JiaoCQi is required' }]">
                    <el-input v-model="A03EF_fcjInput54.JiaoCQi" style="width: 300px; height:50px;"
                        placeholder="JiaoCQi" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">热蒸汽等其他外购买力</div>
                <el-form-item prop="other" :rules="[{ required: true, message: 'other is required' }]">
                    <el-input v-model="A03EF_fcjInput54.other" style="width: 300px; height:50px;" placeholder="other" />
                </el-form-item>
            </div>
        </el-form>
    </div>





    <!--  5.5污泥干化焚烧或热解处理过程的替碳量 -->
    <div class="mt-10">
        <p style="font-weight: bold; font-size: 20px; color: black;">5.5污泥干化焚烧或热解处理过程的替碳量</p>
        <el-form :model="OCA_incm" class="flex flex-start flex-wrap gap-4 mt-3" ref="OCA_incmRef">
            <div class="flex">
                <div class="w-[180px]">Einc,m — 第 m 天污 泥焚 烧 或热 解 的电 力 利用 量 (kw ● h/d) ;</div>
                <el-form-item prop="Eincm" :rules="[{ required: true, message: 'Eincm is required' }]">
                    <el-input v-model="OCA_incm.Eincm" style="width: 300px; height:50px;" placeholder="Eincm" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">Had ,m — 第 m 天污泥焚烧或热解热能利用量(TJ/d) ;</div>
                <el-form-item prop="Hadm" :rules="[{ required: true, message: 'Hadm is required' }]">
                    <el-input v-model="OCA_incm.Hadm" style="width: 300px; height:50px;" placeholder="Hadm" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">请您选择污水厂的所属区域</div>
                <el-form-item prop="EF_ecp" :rules="[{ required: true, message: 'EF_ecp is required' }]">
                    <el-select v-model="OCA_incm.EF_ecp" placeholder="选择污水厂所属区域" size="large" style="width: 300px">
                        <el-option v-for="item in AreaOptions" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </el-form-item>
            </div>
        </el-form>
        <!-- 同3.2的选择框，但是要改变数据 -->
        <p style="font-weight: bold; font-size: 20px; color: black;">5.5-1热耗碳排放强度</p>
        <el-form :model="A03EF_fcjInput55" class="flex flex-start flex-wrap gap-4 mt-3" ref="OCEw_fcmRef">
            <div class="flex">
                <div class="w-[180px]">炼焦煤</div>
                <el-form-item prop="LianJiao" :rules="[{ required: true, message: 'LianJiao is required' }]">
                    <el-input v-model="A03EF_fcjInput55.LianJiao" style="width: 300px; height:50px;"
                        placeholder="LianJiao" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">烟煤</div>
                <el-form-item prop="Yan" :rules="[{ required: true, message: 'Yan is required' }]">
                    <el-input v-model="A03EF_fcjInput55.Yan" style="width: 300px; height:50px;" placeholder="Yan" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">无烟煤</div>
                <el-form-item prop="NoYan" :rules="[{ required: true, message: 'NoYan is required' }]">
                    <el-input v-model="A03EF_fcjInput55.NoYan" style="width: 300px; height:50px;" placeholder="NoYan" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">焦炭</div>
                <el-form-item prop="JiaoC" :rules="[{ required: true, message: 'JiaoC is required' }]">
                    <el-input v-model="A03EF_fcjInput55.JiaoC" style="width: 300px; height:50px;" placeholder="JiaoC" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">原油</div>
                <el-form-item prop="YuanOil" :rules="[{ required: true, message: 'YuanOil is required' }]">
                    <el-input v-model="A03EF_fcjInput55.YuanOil" style="width: 300px; height:50px;"
                        placeholder="YuanOil" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">汽油</div>
                <el-form-item prop="QiOil" :rules="[{ required: true, message: 'QiOil is required' }]">
                    <el-input v-model="A03EF_fcjInput55.QiOil" style="width: 300px; height:50px;" placeholder="QiOil" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">煤油</div>
                <el-form-item prop="MeiOil" :rules="[{ required: true, message: 'MeiOil is required' }]">
                    <el-input v-model="A03EF_fcjInput55.MeiOil" style="width: 300px; height:50px;"
                        placeholder="MeiOil" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">柴油</div>
                <el-form-item prop="ChaiOil" :rules="[{ required: true, message: 'ChaiOil is required' }]">
                    <el-input v-model="A03EF_fcjInput55.ChaiOil" style="width: 300px; height:50px;"
                        placeholder="ChaiOil" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">液化石油气</div>
                <el-form-item prop="ShiYouQi" :rules="[{ required: true, message: 'ShiYouQi is required' }]">
                    <el-input v-model="A03EF_fcjInput55.ShiYouQi" style="width: 300px; height:50px;"
                        placeholder="ShiYouQi" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">炼厂千气</div>
                <el-form-item prop="GanQi" :rules="[{ required: true, message: 'GanQi is required' }]">
                    <el-input v-model="A03EF_fcjInput55.GanQi" style="width: 300px; height:50px;" placeholder="GanQi" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">煤焦油</div>
                <el-form-item prop="MeiJiaoOil" :rules="[{ required: true, message: 'MeiJiaoOil is required' }]">
                    <el-input v-model="A03EF_fcjInput55.MeiJiaoOil" style="width: 300px; height:50px;"
                        placeholder="MeiJiaoOil" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">天然气</div>
                <el-form-item prop="TianRanQi" :rules="[{ required: true, message: 'TianRanQi is required' }]">
                    <el-input v-model="A03EF_fcjInput55.TianRanQi" style="width: 300px; height:50px;"
                        placeholder="TianRanQi" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">焦炉煤气</div>
                <el-form-item prop="JiaoLuQi" :rules="[{ required: true, message: 'JiaoLuQi is required' }]">
                    <el-input v-model="A03EF_fcjInput55.JiaoLuQi" style="width: 300px; height:50px;"
                        placeholder="JiaoLuQi" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">焦炭制气</div>
                <el-form-item prop="JiaoCQi" :rules="[{ required: true, message: 'JiaoCQi is required' }]">
                    <el-input v-model="A03EF_fcjInput55.JiaoCQi" style="width: 300px; height:50px;"
                        placeholder="JiaoCQi" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">热蒸汽等其他外购买力</div>
                <el-form-item prop="other" :rules="[{ required: true, message: 'other is required' }]">
                    <el-input v-model="A03EF_fcjInput55.other" style="width: 300px; height:50px;" placeholder="other" />
                </el-form-item>
            </div>
        </el-form>
    </div>


    <!-- 5.6污泥经过厌氧、好氧或碳化处理后的替碳量 -->
    <div class="mt-10">
        <p style="font-weight: bold; font-size: 20px; color: black;">5.6污泥经过厌氧、好氧或碳化处理后的替碳量 </p>
        <el-form :model="OCA_landm" class="flex flex-start flex-wrap gap-4 mt-3" ref="CEs_dtransranRef">
            <div class="flex">
                <div class="w-[180px]">MssmSlud</div>
                <el-form-item prop="MssmSlud" :rules="[{ required: true, message: 'MssmSlud is required' }]">
                    <el-input v-model="OCA_landm.MssmSlud" style="width: 300px; height:50px;" placeholder="MssmSlud" />
                </el-form-item>
                <div class="w-[180px]">MssmWater</div>
                <el-form-item prop="MssmWater" :rules="[{ required: true, message: 'MssmWater is required' }]">
                    <el-input v-model="OCA_landm.MssmWater" style="width: 300px; height:50px;"
                        placeholder="MssmWater" />
                </el-form-item>
            </div>
        </el-form>
    </div>




    <!--  7.1建设阶段的碳排放量 -->
    <div class="mt-10" v-if="ifAllLeaf.ifAllLeaf">
        <p style="font-weight: bold; font-size: 20px; color: black;"> 7.1建设阶段的碳排放量</p>
        <el-form :model="OCE_csAdd" class="flex flex-start flex-wrap gap-4 mt-3" ref="OCE_csAddRef">
            <div class="flex">
                <div class="w-[180px]">Y —污水厂规划建设的投资总额 (万元 ) , 不含征地费。</div>
                <el-form-item prop="Y" :rules="[{ required: true, message: 'Y is required' }]">
                    <el-input v-model="OCE_csAdd.Y" style="width: 300px; height:50px;" placeholder="Y" />
                </el-form-item>
            </div>
        </el-form>
    </div>


    <!--  7.1拆除阶段的碳排放量 -->
    <div class="mt-10" v-if="ifAllLeaf.ifAllLeaf">
        <p style="font-weight: bold; font-size: 20px; color: black;"> 7.1拆除阶段的碳排放量 </p>
        <el-form :model="OCE_csRem" class="flex flex-start flex-wrap gap-4 mt-3" ref="OCE_csRemRef">
            <div class="flex">
                <div class="w-[180px]">Y —污水厂规划建设的投资总额 (万元 ) , 不含征地费。</div>
                <el-form-item prop="Y" :rules="[{ required: true, message: 'Y is required' }]">
                    <el-input v-model="OCE_csRem.Y" style="width: 300px; height:50px;" placeholder="Y" />
                </el-form-item>
            </div>
        </el-form>
    </div>


    <!-- 7.2全生命周期运维阶段的碳排放量-->
    <div class="mt-10" v-if="ifAllLeaf.ifAllLeaf">
        <p style="font-weight: bold; font-size: 20px; color: black;">7.2全生命周期运维阶段的碳排放量</p>
        <el-form :model="OCE_lcom" class="flex flex-start flex-wrap gap-4 mt-3" ref="OCE_csRemRef">
            <div class="flex">
                <div class="w-[180px]">Y —污水厂规划建设的投资总额 (万元 ) , 不含征地费。</div>
                <el-form-item prop="T1" :rules="[{ required: true, message: 'T1 is required' }]">
                    <el-input v-model="OCE_lcom.T1" style="width: 300px; height:50px;" placeholder="T1" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">Y —污水厂规划建设的投资总额 (万元 ) , 不含征地费。</div>
                <el-form-item prop="T2" :rules="[{ required: true, message: 'T2 is required' }]">
                    <el-input v-model="OCE_lcom.T2" style="width: 300px; height:50px;" placeholder="T2" />
                </el-form-item>
            </div>
        </el-form>
        <el-form :model="MrpA07Input" class="flex flex-start flex-wrap gap-4 mt-3" ref="MrpA07InputRef">
            <div class="flex" v-for="(value, key, index) in MrpA07Input" :key="index">
                <div class="w-[180px]">
                    {{ EF_rpjA07Names[index] }}
                </div>
                <el-form-item :prop="key" :rules="[{ required: true, message: ` ${key} is required ` }]">
                    <el-input v-model="MrpA07Input[key]" style="width: 300px; height:50px;" :placeholder="key" />
                </el-form-item>
            </div>
        </el-form>
    </div>



    <!-- 7.3污泥处置阶段的碳排放量（污泥填埋专用） -->
    <div class="mt-10" v-if="ifAllLeaf.ifAllLeaf">
        <p style="font-weight: bold; font-size: 20px; color: black;">7.3污泥处置阶段的碳排放量（污泥填埋专用） </p>
        <el-form :model="OCEs_dCH4lfan" class="flex flex-start flex-wrap gap-4 mt-3" ref="CEs_dtransranRef">
            <div class="flex">
                <div class="w-[180px]">MssmSlud</div>
                <el-form-item prop="MssmSlud" :rules="[{ required: true, message: 'MssmSlud is required' }]">
                    <el-input v-model="OCEs_dCH4lfan.MssmSlud" style="width: 300px; height:50px;"
                        placeholder="MssmSlud" />
                </el-form-item>
                <div class="w-[180px]">MssmWater</div>
                <el-form-item prop="MssmWater" :rules="[{ required: true, message: 'MssmWater is required' }]">
                    <el-input v-model="OCEs_dCH4lfan.MssmWater" style="width: 300px; height:50px;"
                        placeholder="MssmWater" />
                </el-form-item>
            </div>
        </el-form>
    </div>



    <!-- 7.4  。1污泥土地利用后分解产生的CH4和N2O排放 -->
    <div class="mt-10" v-if="ifAllLeaf.ifAllLeaf">
        <p style="font-weight: bold; font-size: 20px; color: black;">7.4 -1污泥土地利用后分解产生的CH4和N2O排放 </p>
        <el-form :model="OCEs_dCH4landan" class="flex flex-start flex-wrap gap-4 mt-3" ref="CEs_dtransranRef">
            <div class="flex">
                <div class="w-[180px]">MssmSlud</div>
                <el-form-item prop="MssmSlud" :rules="[{ required: true, message: 'MssmSlud is required' }]">
                    <el-input v-model="OCEs_dCH4landan.MssmSlud" style="width: 300px; height:50px;"
                        placeholder="MssmSlud" />
                </el-form-item>
                <div class="w-[180px]">MssmWater</div>
                <el-form-item prop="MssmWater" :rules="[{ required: true, message: 'MssmWater is required' }]">
                    <el-input v-model="OCEs_dCH4landan.MssmWater" style="width: 300px; height:50px;"
                        placeholder="MssmWater" />
                </el-form-item>
            </div>
        </el-form>
    </div>
    <!-- 7.4  。2污泥土地利用后分解产生的CH4和N2O排放 -->
    <div class="mt-10" v-if="ifAllLeaf.ifAllLeaf">
        <p style="font-weight: bold; font-size: 20px; color: black;">7.4 -2污泥土地利用后分解产生的CH4和N2O排放 </p>
        <el-form :model="OCEs_dN2Olandan" class="flex flex-start flex-wrap gap-4 mt-3" ref="CEs_dtransranRef">
            <div class="flex">
                <div class="w-[180px]">MssmSlud</div>
                <el-form-item prop="MssmSlud" :rules="[{ required: true, message: 'MssmSlud is required' }]">
                    <el-input v-model="OCEs_dN2Olandan.MssmSlud" style="width: 300px; height:50px;"
                        placeholder="MssmSlud" />
                </el-form-item>
                <div class="w-[180px]">MssmWater</div>
                <el-form-item prop="MssmWater" :rules="[{ required: true, message: 'MssmWater is required' }]">
                    <el-input v-model="OCEs_dN2Olandan.MssmWater" style="width: 300px; height:50px;"
                        placeholder="MssmWater" />
                </el-form-item>
            </div>
        </el-form>
    </div>



    <!-- 7.5污泥填埋的能源消耗碳排放   电力部分  套用3.1 -->
    <div class="mt-10" v-if="ifAllLeaf.ifAllLeaf">
        <p style="font-weight: bold; font-size: 20px; color: black;"> 7.5污泥填埋的能源消耗碳排放 电力部分 </p>
        <el-form :model="OCEsd_ecr" class="flex flex-start flex-wrap gap-4 mt-3" ref="EleCIntRef">
            <div class="flex">
                <div class="w-[180px]">请您选择污水厂的所属区域</div>
                <el-form-item prop="EF_ecp" :rules="[{ required: true, message: 'EF_ecp is required' }]">
                    <el-select v-model="OCEsd_ecr.EF_ecp" placeholder="选择污水厂所属区域" size="large" style="width: 300px">
                        <el-option v-for="item in AreaOptions" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">Eec ,m — 污水处理阶段第 m天的耗电量(kw ●h/d) ;</div>
                <el-form-item prop="Eecm" :rules="[{ required: true, message: 'Eecm is required' }]">
                    <el-input v-model="OCEsd_ecr.Eecm" style="width: 300px; height:50px;" placeholder="Eecm" />
                </el-form-item>
            </div>
        </el-form>
    </div>
    <!-- 7.5污泥填埋的能源消耗碳排放   非电力部分  套用3.2 -->
    <div class="mt-10" v-if="ifAllLeaf.ifAllLeaf">
        <p style="font-weight: bold; font-size: 20px; color: black;">7.5污泥填埋的能源消耗碳排放 非电力部分 </p>
        <el-form :model="OCEsd_fcrA03EF_fcjInput" class="flex flex-start flex-wrap gap-4 mt-3" ref="OCEw_fcmRef">
            <div class="flex">
                <div class="w-[180px]">炼焦煤</div>
                <el-form-item prop="LianJiao" :rules="[{ required: true, message: 'LianJiao is required' }]">
                    <el-input v-model="OCEsd_fcrA03EF_fcjInput.LianJiao" style="width: 300px; height:50px;"
                        placeholder="LianJiao" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">烟煤</div>
                <el-form-item prop="Yan" :rules="[{ required: true, message: 'Yan is required' }]">
                    <el-input v-model="OCEsd_fcrA03EF_fcjInput.Yan" style="width: 300px; height:50px;"
                        placeholder="Yan" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">无烟煤</div>
                <el-form-item prop="NoYan" :rules="[{ required: true, message: 'NoYan is required' }]">
                    <el-input v-model="OCEsd_fcrA03EF_fcjInput.NoYan" style="width: 300px; height:50px;"
                        placeholder="NoYan" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">焦炭</div>
                <el-form-item prop="JiaoC" :rules="[{ required: true, message: 'JiaoC is required' }]">
                    <el-input v-model="OCEsd_fcrA03EF_fcjInput.JiaoC" style="width: 300px; height:50px;"
                        placeholder="JiaoC" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">原油</div>
                <el-form-item prop="YuanOil" :rules="[{ required: true, message: 'YuanOil is required' }]">
                    <el-input v-model="OCEsd_fcrA03EF_fcjInput.YuanOil" style="width: 300px; height:50px;"
                        placeholder="YuanOil" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">汽油</div>
                <el-form-item prop="QiOil" :rules="[{ required: true, message: 'QiOil is required' }]">
                    <el-input v-model="OCEsd_fcrA03EF_fcjInput.QiOil" style="width: 300px; height:50px;"
                        placeholder="QiOil" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">煤油</div>
                <el-form-item prop="MeiOil" :rules="[{ required: true, message: 'MeiOil is required' }]">
                    <el-input v-model="OCEsd_fcrA03EF_fcjInput.MeiOil" style="width: 300px; height:50px;"
                        placeholder="MeiOil" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">柴油</div>
                <el-form-item prop="ChaiOil" :rules="[{ required: true, message: 'ChaiOil is required' }]">
                    <el-input v-model="OCEsd_fcrA03EF_fcjInput.ChaiOil" style="width: 300px; height:50px;"
                        placeholder="ChaiOil" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">液化石油气</div>
                <el-form-item prop="ShiYouQi" :rules="[{ required: true, message: 'ShiYouQi is required' }]">
                    <el-input v-model="OCEsd_fcrA03EF_fcjInput.ShiYouQi" style="width: 300px; height:50px;"
                        placeholder="ShiYouQi" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">炼厂千气</div>
                <el-form-item prop="GanQi" :rules="[{ required: true, message: 'GanQi is required' }]">
                    <el-input v-model="OCEsd_fcrA03EF_fcjInput.GanQi" style="width: 300px; height:50px;"
                        placeholder="GanQi" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">煤焦油</div>
                <el-form-item prop="MeiJiaoOil" :rules="[{ required: true, message: 'MeiJiaoOil is required' }]">
                    <el-input v-model="OCEsd_fcrA03EF_fcjInput.MeiJiaoOil" style="width: 300px; height:50px;"
                        placeholder="MeiJiaoOil" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">天然气</div>
                <el-form-item prop="TianRanQi" :rules="[{ required: true, message: 'TianRanQi is required' }]">
                    <el-input v-model="OCEsd_fcrA03EF_fcjInput.TianRanQi" style="width: 300px; height:50px;"
                        placeholder="TianRanQi" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">焦炉煤气</div>
                <el-form-item prop="JiaoLuQi" :rules="[{ required: true, message: 'JiaoLuQi is required' }]">
                    <el-input v-model="OCEsd_fcrA03EF_fcjInput.JiaoLuQi" style="width: 300px; height:50px;"
                        placeholder="JiaoLuQi" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">焦炭制气</div>
                <el-form-item prop="JiaoCQi" :rules="[{ required: true, message: 'JiaoCQi is required' }]">
                    <el-input v-model="OCEsd_fcrA03EF_fcjInput.JiaoCQi" style="width: 300px; height:50px;"
                        placeholder="JiaoCQi" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">热蒸汽等其他外购买力</div>
                <el-form-item prop="other" :rules="[{ required: true, message: 'other is required' }]">
                    <el-input v-model="OCEsd_fcrA03EF_fcjInput.other" style="width: 300px; height:50px;"
                        placeholder="other" />
                </el-form-item>
            </div>

        </el-form>
    </div>



    <!--  7.6污泥及其产物运输至处置地点产生的碳排放量 -->
    <div class="mt-10" v-if="ifAllLeaf.ifAllLeaf">
        <p style="font-weight: bold; font-size: 20px; color: black;"> 7.6污泥及其产物运输至处置地点产生的碳排放量 </p>
        <el-form :model="CEs_dtransran" class="flex flex-start flex-wrap gap-4 mt-3" ref="CEs_dtransranRef">
            <div class="flex">
                <div class="w-[180px]">MssmSlud</div>
                <el-form-item prop="MssmSlud" :rules="[{ required: true, message: 'MssmSlud is required' }]">
                    <el-input v-model="CEs_dtransran.MssmSlud" style="width: 300px; height:50px;"
                        placeholder="MssmSlud" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">MssmWater</div>
                <el-form-item prop="MssmWater" :rules="[{ required: true, message: 'MssmWater is required' }]">
                    <el-input v-model="CEs_dtransran.MssmWater" style="width: 300px; height:50px;"
                        placeholder="MssmWater" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">Lss,r,k — 第 r种污泥处置方式采用 k种运输方式的 运输距离(km) ;</div>
                <el-form-item prop="Lssrk" :rules="[{ required: true, message: 'Lssrk is required' }]">
                    <el-input v-model="CEs_dtransran.Lssrk" style="width: 300px; height:50px;" placeholder="Lssrk" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">EFs,k —k种运输方式的Co2当量排放因子[kgCo2-eq/(t●km)]</div>
                <el-select v-model="CEs_dtransran.EFs_sk" placeholder="EFs,k —k种运输方式的Co2当量排放因子[kgCo2-eq/(t●km)]"
                    size="large" style="width: 300px">
                    <el-option v-for="item in EFs_skOptions" :key="item.value" :label="item.label"
                        :value="item.value" />
                </el-select>
            </div>
        </el-form>
    </div>





    <!-- 7.8污水排入受纳水体的延伸阶段碳排放量 -->
    <div class="mt-10" v-if="ifAllLeaf.ifAllLeaf">
        <p style="font-weight: bold; font-size: 20px; color: black;">7.8污水排入受纳水体的延伸阶段碳排放量</p>
        <el-form :model="OCE_exN2Oan" class="flex flex-start flex-wrap gap-4 mt-3" ref="CEs_dtransranRef">
            <div class="w-[180px]">EFe父—N2O—受纳水体延伸阶段N2O排放因子(kgN2O-N/kgN)。</div>
            <div class="flex">
                <el-select v-model="OCE_exN2Oan.EF_exN2O" placeholder="EFe父—N2O—受纳水体延伸阶段N2O排放因子(kgN2O-N/kgN)。"
                    size="large" style="width: 300px">
                    <el-option v-for="item in EF_exN2OOptions" :key="item.value" :label="item.label"
                        :value="item.value" />
                </el-select>
            </div>
        </el-form>
    </div>




    <!-- 8.1运维阶段年度碳排放强度 -->
    <div class="mt-10">
        <p style="font-weight: bold; font-size: 20px; color: black;"> 8.1运维阶段年度碳排放强度</p>
        <el-form :model="OCE_lc" class="flex flex-start flex-wrap gap-4 mt-3" ref="CEs_dtransranRef">
            <div>T1 —污水厂服务年限(a) ;</div>
            <div class="flex">
                <el-form-item prop="T1" :rules="[{ required: true, message: 'T1 is required' }]">
                    <el-input v-model="OCE_lc.T1" style="width: 300px; height:50px;" placeholder="T1" />
                </el-form-item>
            </div>
        </el-form>
    </div>



    <!--  8.2年度污染物削减碳排放强度 -->
    <div class="mt-10">
        <p style="font-weight: bold; font-size: 20px; color: black;"> 8.2年度污染物削减碳排放强度 </p>
        <el-form :model="OCE_IomanX" class="flex flex-start flex-wrap gap-4 mt-3" ref="CEs_dtransranRef">
            <div class="flex">
                <div class="w-[180px]">NH3 — Nin, an — 进水 NH3 —Nin,an的年平均浓度(mg/L) ; </div>
                <el-form-item prop="NH3Ninan" :rules="[{ required: true, message: 'NH3Ninan is required' }]">
                    <el-input v-model="OCE_IomanX.NH3Ninan" style="width: 300px; height:50px;" placeholder="NH3Ninan" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">NH3 —NOut, an — 出水 NH3 —NOut, an 的年平均浓度(mg/L) 。</div>
                <el-form-item prop="NH3Noutan" :rules="[{ required: true, message: 'NH3Noutan is required' }]">
                    <el-input v-model="OCE_IomanX.NH3Noutan" style="width: 300px; height:50px;"
                        placeholder="NH3Noutan" />
                </el-form-item>
            </div>
        </el-form>
    </div>




    <!-- 8.3   是否选择基准年和评估年并计算差值 -->
    <div class="mt-10 mb-10">
        <p style="font-weight: bold; font-size: 20px; color: black;">8.3运维阶段碳减排量与碳减排强度差值差值差值</p>
        <el-form :model="ifCompDiff" class="flex flex-start flex-wrap gap-4 mt-3" ref="CEs_dtransranRef">
            <div class="w-[180px]">是否选择基准年和评估年并计算差值</div>
            <div class="flex">
                <el-select v-model="ifCompDiff.ifCompDiff" placeholder="是否选择基准年和评估年并计算差值" size="large"
                    style="width: 300px">
                    <el-option v-for="item in ifCompDiffOptions" :key="item.value" :label="item.label"
                        :value="item.value" />
                </el-select>
            </div>
        </el-form>
    </div>
    <el-card v-if="ifCompDiff.ifCompDiff">

        <div class="mt-10" v-if="ifCompDiff.ifCompDiff">
            <p style="font-weight: bold; font-size: 20px; color: black;">5.3.1 污水厂运维阶段碳减排量 </p>
            <el-form :model="OCR_oman" class="flex flex-start flex-wrap gap-4 mt-3" ref="CEs_dtransranRef">
                <div class="flex">
                    <div class="w-[180px]">CEOm,vy —污水厂运维阶段的评估年度碳排放量 (kgco2- eq/a) ;</div>
                    <el-form-item prop="CE_omvy" :rules="[{ required: true, message: 'CE_omvy is required' }]">
                        <el-input v-model="OCR_oman.CE_omvy" style="width: 300px; height:50px;" placeholder="CE_omvy" />
                    </el-form-item>
                </div>
                <div class="flex">
                    <div class="w-[180px]">CEOm,by, —污水厂运维阶段的基准年度碳排放量 (kgco2- eq/a) 。 </div>
                    <el-form-item prop="CE_omby" :rules="[{ required: true, message: 'CE_omby is required' }]">
                        <el-input v-model="OCR_oman.CE_omby" style="width: 300px; height:50px;" placeholder="CE_omby" />
                    </el-form-item>
                </div>
            </el-form>
        </div>

        <div class="mt-10" v-if="ifCompDiff.ifCompDiff">
            <p style="font-weight: bold; font-size: 20px; color: black;">5.3.2 评估年度相对于基准年度的碳减排强度 </p>
            <el-form :model="OCR_Ioman" class="flex flex-start flex-wrap gap-4 mt-3" ref="CEs_dtransranRef">
                <div class="flex">
                    <div class="w-[180px]">CEIOm,vy — 污水厂 运维 阶 段的 评 估年 度 碳 排 放 强 度 (kg co2 -eq/m3) ;</div>
                    <el-form-item prop="CE_Iomvy" :rules="[{ required: true, message: 'CE_Iomvy is required' }]">
                        <el-input v-model="OCR_Ioman.CE_Iomvy" style="width: 300px; height:50px;"
                            placeholder="CE_Iomvy" />
                    </el-form-item>
                </div>
                <div class="flex">
                    <div class="w-[180px]">CEIOm,by — 污水厂 运维 阶 段的 基 准年 度 碳 排 放 强 度 (kg co2 -eq/m3) 。</div>
                    <el-form-item prop="CE_Iomby" :rules="[{ required: true, message: 'CE_Iomby is required' }]">
                        <el-input v-model="OCR_Ioman.CE_Iomby" style="width: 300px; height:50px;"
                            placeholder="CE_Iomby" />
                    </el-form-item>
                </div>
            </el-form>
        </div>
        <div class="mt-10" v-if="ifCompDiff.ifCompDiff">
            <p style="font-weight: bold; font-size: 20px; color: black;"> 5.3.3 评估年度相对于基准年度的污染物削减碳减排强度 </p>
            <el-form :model="OCR_IomanX" class="flex flex-start flex-wrap gap-4 mt-3" ref="CEs_dtransranRef">
                <div class="flex">
                    <div class="w-[180px]">CEIOm,vy,X — 污水厂运 维 阶段 的 评估 年 度污 染 物削 减碳 排放强度(kgco2-eq/kg) ;</div>
                    <el-form-item prop="CE_IomvyX" :rules="[{ required: true, message: 'CE_IomvyX is required' }]">
                        <el-input v-model="OCR_IomanX.CE_IomvyX" style="width: 300px; height:50px;"
                            placeholder="CE_IomvyX" />
                    </el-form-item>
                </div>
                <div class="flex">
                    <div class="w-[180px]">CEIOm,by,X — 污水厂运 维 阶段 的 基准 年 度污 染 物削 减碳 排放强度(kgco2-eq/kg) 。</div>
                    <el-form-item prop="CE_IombyX" :rules="[{ required: true, message: 'CE_IombyX is required' }]">
                        <el-input v-model="OCR_IomanX.CE_IombyX" style="width: 300px; height:50px;"
                            placeholder="CE_IombyX" />
                    </el-form-item>
                </div>
            </el-form>
        </div>

    </el-card>



    <!--8.4评估年度相对于行业同类平均水平的碳排放强度目标差 -->
    <div class="mt-10">
        <p style="font-weight: bold; font-size: 20px; color: black;">8.4评估年度相对于行业同类平均水平的碳排放强度目标差</p>
        <el-form :model="OCE_Iomang" class="flex flex-start flex-wrap gap-4 mt-3" ref="CEs_dtransranRef">
            <div class="w-[180px]">CEIOm ,av — 行业同 类平 均 水平 运 维 阶 段 的 碳 排 放强 度 (kgco2-eq/m3) </div>
            <div class="flex">
                <el-select v-model="OCE_Iomang.level" placeholder="等级" size="large" style="width: 300px">
                    <el-option v-for="item in B01Level" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <el-select v-model="OCE_Iomang.scale" placeholder="规模" size="large" style="width: 300px">
                    <el-option v-for="item in B01Scale" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <el-select v-model="OCE_Iomang.scope" placeholder="范围" size="large" style="width: 300px">
                    <el-option v-for="item in B01Scope" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>

            </div>
        </el-form>
    </div>



    <!--  9.1 全生命周期碳排放强度 -->
    <div class="mt-10" v-if="ifAllLeaf.ifAllLeaf">
        <p style="font-weight: bold; font-size: 20px; color: black;"> 9.1 全生命周期碳排放强度 </p>
        <el-form :model="OCE_Ilc" class="flex flex-start flex-wrap gap-4 mt-3" ref="CEs_dtransranRef">
            <div class="flex">
                <div class="w-[180px]">T —污水厂服务年限(a) ;</div>
                <el-form-item prop="T" :rules="[{ required: true, message: 'T is required' }]">
                    <el-input v-model="OCE_Ilc.T" style="width: 300px; height:50px;" placeholder="T" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">Qin —服务年限内年平均进水量(m3/a) </div>
                <el-form-item prop="Qin" :rules="[{ required: true, message: 'Qin is required' }]">
                    <el-input v-model="OCE_Ilc.Qin" style="width: 300px; height:50px;" placeholder="Qin" />
                </el-form-item>
            </div>
        </el-form>
    </div>

    <!-- 9.2 去除单位耗氧污染物对应的全生命周期碳排放量 -->
    <!-- 6.2.2-2 -->
    <div class="mt-10" v-if="ifAllLeaf.ifAllLeaf">
        <p style="font-weight: bold; font-size: 20px; color: black;">9.2 去除单位耗氧污染物对应的全生命周期碳排放量 6.2.2-2</p>
        <el-form :model="OX" class="flex flex-start flex-wrap gap-4 mt-3" ref="CEs_dtransranRef">
            <div class="flex">
                <div class="w-[180px]">CODin,lc —服务年限内年平均进水 coD浓度(mg/L) ;</div>
                <el-form-item prop="CODinlc" :rules="[{ required: true, message: 'CODinlc is required' }]">
                    <el-input v-model="OX.CODinlc" style="width: 300px; height:50px;" placeholder="CODinlc" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">CODout,lc —服务年限内年平均出水 coD浓度(mg/L) ;</div>
                <el-form-item prop="CODoutlc" :rules="[{ required: true, message: 'CODoutlc is required' }]">
                    <el-input v-model="OX.CODoutlc" style="width: 300px; height:50px;" placeholder="CODoutlc" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">NH3 —Nin,lc —服务年限内年平均进水 NH3 —N浓度(mg/L) ; </div>
                <el-form-item prop="NH3Ninlc" :rules="[{ required: true, message: 'NH3Ninlc is required' }]">
                    <el-input v-model="OX.NH3Ninlc" style="width: 300px; height:50px;" placeholder="NH3Ninlc" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">NH3 —Nout,lc —服务年限内年平均出水 NH3 —N浓度(mg/L) 。</div>
                <el-form-item prop="NH3Noutlc" :rules="[{ required: true, message: 'NH3Noutlc is required' }]">
                    <el-input v-model="OX.NH3Noutlc" style="width: 300px; height:50px;" placeholder="NH3Noutlc" />
                </el-form-item>
            </div>
        </el-form>
    </div>
    <!-- 6.2.2-1 -->
    <div class="mt-10" v-if="ifAllLeaf.ifAllLeaf">
        <p style="font-weight: bold; font-size: 20px; color: black;">9.2 去除单位耗氧污染物对应的全生命周期碳排放量6.2.2-1 </p>
        <el-form :model="OCE_IlcX" class="flex flex-start flex-wrap gap-4 mt-3" ref="CEs_dtransranRef">
            <div class="flex">
                <div class="w-[180px]">CElc —污水厂全生命周期碳排放量 (kgco2 -eq) ;</div>
                <el-form-item prop="CE_lc" :rules="[{ required: true, message: 'CE_lc is required' }]">
                    <el-input v-model="OCE_IlcX.CE_lc" style="width: 300px; height:50px;" placeholder="CE_lc" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">T —污水厂服务年限(a) ;</div>
                <el-form-item prop="T" :rules="[{ required: true, message: 'T is required' }]">
                    <el-input v-model="OCE_IlcX.T" style="width: 300px; height:50px;" placeholder="T" />
                </el-form-item>
            </div>
        </el-form>
    </div>


    <!--9.3评估年度相对于行业同类平均水平的碳排放强度目标差 -->
    <div class="mt-10">
        <p style="font-weight: bold; font-size: 20px; color: black;">9.3评估年度相对于行业同类平均水平的碳排放强度目标差</p>
        <el-form :model="OCE_Iomang" class="flex flex-start flex-wrap gap-4 mt-3" ref="CEs_dtransranRef">
            <div class="w-[180px]">CEIlc,av —行业同 类 平 均 水 平 的 全 生 命 周 期 碳排 放 强 度(kgco2-eq/m3 )</div>
            <div class="flex">
                <el-select v-model="OCE_Iomang.level" placeholder="等级" size="large" style="width: 300px">
                    <el-option v-for="item in B02Level" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <el-select v-model="OCE_Iomang.scale" placeholder="规模" size="large" style="width: 300px">
                    <el-option v-for="item in B02Scale" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <el-select v-model="OCE_Iomang.scope" placeholder="范围" size="large" style="width: 300px">
                    <el-option v-for="item in B02Scope" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </div>
        </el-form>
    </div>
    <div class="flex flex-col">
        <p style="font-weight: bold; font-size: 20px; color: black;">采取了哪些绿色低碳行为，简单输入：</p>
        <el-input type="textarea" :rows="6" placeholder="绿色低碳行为" v-model="textarealvse" style="width: 800px;"> </el-input>
    </div>
</template>