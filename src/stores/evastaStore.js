import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
export const useEvaStaStore = defineStore('evaStaStore', () => {

    // 评价等级

    const ifShow = ref(true)

    //建立一个映射，键是日期，值是oneDayResult
    const mapStandard = new Map()
    const mapEvaSta = new Map()
    const mapFingerpost = new Map()


    // 运维阶段核算与全生命周期核算
    const ifAllLeaf = reactive({
        ifAllLeaf: null
    })
    const ifAllLeafOptions = [{
        value: false,
        label: '运维阶段核算'
    },
    {
        value: true,
        label: '全生命周期核算'
    },
    ]


    // 3.2.1化石源碳矿化产生的碳排放量宜按下式计算      2.1化石源碳矿化产生的碳排放量 
    const OCEw_fCO2m = reactive({
        CEw_fCO2m: null,// [1]
        Qinm: null,//用户输入
        CODinm: null,//用户输入
        CODoutm: null,//用户输入
        EFw_CO2: 0.366,   //标注取值范围0.366~0.560
        FCF: 10,   //标注取值范围5%-20%   注意后面要除100
    })


    // 3.2.2外加碳源矿化产生的化石源CO2碳排放量宜按下式计算   2.2外加碳源矿化产生的化石源CO2碳排放量
    const OCEw_eCO2m = reactive({
        CEw_eCO2m: null, //[2]    质量×浓度×因子
        EFw_eCO2: null,  //因子   葡萄糖0.98    乙酸钠0.72；乙酸0.98  甲醇0.92  给用户选择框
        MemCon: null, //浓度
        MemM: null,//质量
    })
    // 各种药剂对应的因子   暂时单选，后面考虑多选
    const OEFw_eCO2Options = [   //v-model绑定EFw_eCO2
        {
            value: 0.98,
            label: '葡萄糖'
        },
        {
            value: 0.72,
            label: '乙酸钠'
        },
        {
            value: 0.98,
            label: '乙酸'
        },
        {
            value: 0.92,
            label: '甲醇'
        },
    ]

    // 3.2.3 污水收集提升和处理阶段排放的CH4和CO2当量   2.3 甲烷碳排放当量     分为可实测和不可实测
    const ifRealTest = reactive({
        ifRealTest: null
    })  // 这个已经被废弃
    const ifRealTestOptions = [
        {
            value: false,
            label: '不可实测'
        },
        {
            value: true,
            label: '可实测'
        },
    ]
    const OCEw_CH4m = reactive({
        CEw_CH4m: null,//[3]/[4]    有实测是3  没实测是4
        ifRealTest: null,//是否可实测
        Qinm: null,   //2.1
        CODinm: null,  //2.1
        CODoutm: null,   //2.1
        EFw_CH4: 0.004,   //标注取值范围0.0040-0.0075
        MpumpCH4m: null,  //黄底框数据  默认为0  如果不为0就是有实测要套入公式3.2.3-1   如为0就是不存在 要套入3.2.3-2
        MgritCH4m: null,  //黄底框数据
        fCH4: 28,   //默认28
        FCH4: 20,  //取值在10.25%-26.19%
    })



    // 3.2.4  污水生物处理脱氮过程排放的 N2O 的CO2当量    2.4 N2O碳排放当量
    const OCEw_N2Om = reactive({
        CEw_N2Om: null,//[5]
        Qinm: null,  //2.1 
        TNinm: null,  //用户输入
        TNoutm: null,   //用户输入
        EFw_N2O: 0.01, //内置参数
        transitionRate: 44 / 28,  //内置参数
        fN2O: 265,  //内置参数
    })



    // 3.2.5 污水处理阶段生化反应的年度碳排放量 2.5 污水处理阶段生化反应年度碳排放量（直接排放）
    const OCEw_ban = reactive({
        CEw_ban: null,//[6]
        CEw_CH4m: null,//[1]
        CEw_N2Om: null,//[2]
        CEw_fCO2m: null,//[4]/[3]看有没有实测  如果MpumpCH4m不为0就是有实测
        CEw_eCO2m: null//[5]
    })



    //第三章节的计算与中环协标准基本一样，可完全套用，注意内置参数的变化即可）
    //  3.3.1  污水处理阶段所运行设备的电力消耗产生的碳排放量   3.1 电力消耗产生的碳排放量
    const OCEw_ecm = reactive({
        CEw_ecm: null,//[7]
        Eecm: null, //用户输入
        EF_ecp: null//用户选择
    })
    const OCEw_ecmCopy = reactive({
        CEw_ecm: null,//[22]
        Eecm: null, //用户输入
        EF_ecp: null//用户选择
    })
    // 各地区对应的电耗碳排放因子fe
    const EleArea = reactive({
        HuaBei: 0.8843,
        DongBei: 0.7769,
        HuaDong: 0.7035,
        HuaZhong: 0.5257,
        XiBei: 0.6671,
        NanFang: 0.5271
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



    // 3.3.2  3.2 用于污水处理阶段的锅炉、热蒸汽生产、设备运转等固定式能源燃料消耗产生的碳排放量，以及外购热源等非电力能源消耗折合的碳排放量（即热耗）
    const OCEw_fcm = reactive({
        CEw_fcm: null,//[8]   分别相乘然后求和
        // Mfcjm: null,
        // EF_fcj: null
    })
    const OCEw_fcmCopy = reactive({
        CEw_fcm: null,//[24]   分别相乘然后求和
        // Mfcjm: null,
        // EF_fcj: null
    })
    const A03EF_fcjInput = reactive({
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
        other: 0
    })
    const A03EF_fcjInputCopy = reactive({
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
        other: 0
    })
    const A03EF_fcjInputCopyCopy = reactive({
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
        other: 0
    })
    const A03EF_fcjData = [
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
        10867,
        110000
    ]
    const A03EF_fcjMfjNames = [
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
        '焦炭制气',
        '热蒸汽等其他外购买力'
    ]



    //  3.3.3  污水处理阶段药剂消耗产生的碳排放量  3.3药剂消耗产生的碳排放量
    const OCEw_ccm = reactive({
        CEw_ccm: null,//[9]
        // Mccjm: null,
        // EF_ccj: null
    })
    const OCEw_ccmCopy = reactive({
        CEw_ccm: null,//[23]
        // Mccjm: null,
        // EF_ccj: null
    })
    // 物耗碳排放量的各种排放因子
    const MatCStyle = reactive({
        Jian: 1.74,
        NaOH: 1.12,
        PAC: 6.19,
        CH3OH: 1.54,
        AlSO4: 0.5,
        PAM: 2.85,
        FeCl3: 2.86,
        CaOH2: 1.11,
        Otherxvning: 2.5,
        CiNaClO: 2.99,
        Cl2: 2,
        O3: 8.01,
        O2H2O: 1.14,
        Otherxiaodu: 1.4,
        Otheryao: 1.6,
        Cifen: 0.0081,
        FeSO4: 0.25,
        C2H3NaO2: 2.9,
        // NaClO: 5.11,
        // Hcl: 1.2
    })
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
        // NaClO: 0,
        // Hcl: 0,
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
        // NaClO: 0,
        // Hcl: 0,
    })
    const McgConCopy = reactive({
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
        // NaClO: 0,
        // Hcl: 0,
    })
    // 药剂质量
    const McgMCopy = reactive({
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
        // NaClO: 0,
        // Hcl: 0,
    })
    //各种化学药剂的质量名称
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
    //各种化学药剂的浓度名称
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







    //  3.3.4 污水处理阶段能源和药剂消耗产生的碳排放量   3.4 污水处理阶段能源和药剂消耗产生的碳排放量（间接排放）
    const OCEw_rean = reactive({
        CEw_rean: null,//[10]
        CEw_fcm: null,//[7]
        CEw_ecm: null,//[8]
        CEw_ccm: null//[9]
    })

    // 3.4.1 污泥浓缩脱水过程的生化反应碳排放量可忽略不计    4.1污泥浓缩脱水过程的碳排放量可忽略不计（大部分用户都可能选择此项，选择此项后后面的计算过程将不再进行）
    const ifJump = reactive({
        ifJump: null
    })
    const ifJumpOptions = [
        {
            value: 1,
            label: '忽略'
        },
        {
            value: 0,
            label: '不忽略'
        },
    ]


    //   3.4.2  污泥厌氧消化沼气收集管路无意泄露的 CH4或沼气火炬燃烧不充分导致的碳排放CO2排放当量  4.2污泥厌氧消化沼气收集管路的无意泄露与火炬不充分燃烧的排放
    const OCEs_CH4adm = reactive({
        CEs_CH4adm: null,//[11]
        Vbiogasm: null,//用户输入
        PCH4: null,//用户输入
        F: 5,  //百分之5
        transitionMol: 16 / 22.4,  //内置参数
        fCH4: 28,//内置参数
    })


    //  3.4.3  单独处理污泥厌氧消化过程产生的沼液时,可根据沼液量与TN 浓度按本标准第3.2.4条规定计算   4.3污泥厌氧消化过程产生沼液的N2O排放
    const OCE_Biogas_N2O = reactive({
        CE_Biogas_N2O: null,//[12]
        TNinm: null,//用户输入
        TNoutm: null,//用户输入
        QBiogasm: null,//用户输入
        EFw_N2O: null,//用户输入
        rate: 1.5714,//默认值
        fN2O: 265//默认值
    })





    //  3.4.4  污泥好氧发酵过程生化反应的碳排放包括 CH4 和 N2O,CO2排放当量宜按下列公式计算     4.4污泥好氧发酵过程生化反应的碳排放
    //3.4.4-1
    const OCEs_CH4afm = reactive({
        CEs_CH4afm: null,//[13]
        // 干污泥：污泥量*1000*（1-含水率）
        MssmSlud: null,  //污泥量  
        MssmWater: null, //含水率
        EFs_CH4af: null,//暂时为0
        fCH4: 28,//默认值
    })


    // 3.4.4-2
    const OCEs_N2Oafm = reactive({
        CEs_N2Oafm: null,//[14]
        // 干污泥：污泥量*1000*（1-含水率）
        // MssmSlud: null,  //污泥量  
        // MssmWater: null, //含水率
        EFs_N2Oaf: null,//暂时为0
        fN2O: 265,//默认值
    })




    // 3.4.5 在污泥干化焚烧或协同焚烧过程,化石源碳被氧化产生的化石源CO2碳排放量  4.5污泥干化焚烧或协同焚烧-化石源碳被氧化产生的CO2碳排放
    const OCEs_fCO2incm = reactive({
        CEs_fCO2incm: null,//[15]
        // MssmSlud: null,//同4.4
        // MssmWater: null,//同4.4
        CF: null,//用户输入
        FCF: 12,//12％  内置参数
        rate: 44 / 12,// 内置参数
    })
    //3.4.6污泥焚烧过程不完全燃烧产生的CH4和N2O的CO2排放当量     4.6污泥干化焚烧或协同焚烧-不完全燃烧产生的CH4和N2O   备注：注意单位换算！3.4.6-1和3.4.6-2均需要补充*10-3。
    //3.4.6-1
    const OCEs_CH4incm = reactive({
        CEs_CH4incm: null,//[16]
        // MssmSlud: null,//同4.4
        // MssmWater: null,//同4.4
        EFs_CH4inc: null,//让用户选择连续燃烧取0，非连续燃烧按A.0.5的表取值。
        fCH4: 28,// 内置参数
    })
    //3.4.6-2
    const OCEs_N2Oincm = reactive({
        CEs_N2Oincm: null,//[17]
        // MssmSlud: null,//同4.4
        // MssmWater: null,//同4.4
        EFs_N2Oinc: 0.99,//内置参数
        fN2O: 265,// 内置参数
    })
    const fireStyles = [  //对应EFs_N2Oinc: null,
        {
            value: 0,
            label: '连续燃烧'
        },
        {
            value: 0.06,
            label: '半连续焚烧加煤机'
        },
        {
            value: 1.88,
            label: '半连续焚烧流化床'
        }, {
            value: 0.60,
            label: '间歇性焚烧加煤机'
        }, {
            value: 2.37,
            label: '间歇性焚烧流化床'
        },

    ]



    //    就是上面的公式
    //3.4.7  污泥热解碳化或气化过程生化反应的碳排放应包括化石源   4.7污泥热解碳化或气化过程生化反应的碳排放计算   相同的公式不同的参数
    //3.4.5的公式
    const OCEs_fCO2incmCop = reactive({
        CEs_fCO2incm: null,//[18]
        MssmSlud: null,//用户输入
        MssmWater: null,//用户输入
        CF: null,//用户输入
        FCF: 12,//12％  内置参数
        rate: 44 / 12,// 内置参数
    })
    //3.4.6-1的公式
    const OCEs_CH4incmCop = reactive({
        CEs_CH4incm: 0,//[19]
        MssmSlud: null,//用户输入
        MssmWater: null,//用户输入
        EFs_CH4inc: null,//让用户选择连续燃烧取0，非连续燃烧按A.0.5的表取值。
        fCH4: 28,// 内置参数
    })
    //3.4.6-2的公式
    const OCEs_N2OincmCop = reactive({
        CEs_N2Oincm: null,//[20]
        MssmSlud: null,//用户输入
        MssmWater: null,//用户输入
        EFs_N2Oinc: 0.99,//内置参数
        fN2O: 265,// 内置参数
    })




    //3.4.8 根据污泥实际处理方法 计算污泥处理生化反应的碳排放总量,应包括化石源 CO2 、CH4和N2O的碳排放量  4.8污泥处理生化反应的碳排放总量
    //绝大部分的污泥处理厂/区一般只采用一种污泥处理工艺，即4.1为一组，4.2和4.3为一组，4.4一组，4.5和4.6为一组以及4.7为一组，可在一个页面单列上述五组工艺的名称让用户选择，选择后再进入对应的页面计算。不选择的工艺默认均为0。
    const OCEs_ban = reactive({
        CEs_ban: null,//[21]
        optionValue: null,  //看用户选择哪一个  选择之后显示对应的
        CEs_CH4rm: null,
        CEs_N2Orm: null,
        CEs_fCO2rm: null,
    })
    const technologyOptions = [
        {
            value: 0,
            label: '4.1'
        },
        {
            value: 1,
            label: '4.2&4.3'
        },
        {
            value: 2,
            label: '4.4'
        },
        {
            value: 3,
            label: '4.5&4.6'
        },
        {
            value: 4,
            label: '4.7'
        }
    ]







    // 3.5.4 污泥处理阶段能源和药剂消耗产生的碳排放量   4.9污泥处理阶段能源和药剂消耗产生的碳排放量    章节对应标准中的3.5.1、3.5.2、3.5.3和3.5.4的计算与前述章节3.1、3.2、3.3和3.4一样，直接套用进来即可。可在本章节计算开始前添加一个选项：“是否对污泥处理厂/区分别计算电耗、药耗与能耗”，若用户选择无，则本章节不展开计算，并默认结果为0
    const ifEleDurEne = reactive({
        ifHave: null,//如果选择了无，则不展开计算  并且默认为0    如果选择是，那就是按照前述章节再计算一次，只不过用户输入的量，结果的名称不同
    })
    const ifEleDurEneOptions = [
        {
            value: false,
            label: '否'
        },
        {
            value: true,
            label: '是'
        }
    ]
    const OCEs_rean = reactive({
        CEs_rean: 0,//【22】、【23】、【24】和【25】
        CEs_ecrm: 0,//
        CEs_fcrm: 0,
        CEs_ccrm: 0
    })
    // 3.1




    // 3.6.1采用热泵技术回收利用污水中蕴含的热能时,相应的替碳量    5.1热泵技术回收污水中热量的替碳量   与3.2共用一套计算逻辑与代码
    const OCA_hpm = reactive({
        CA_hpm: null,//[26]
        Am: null,
        EF_fcj: null,
    })
    const A03EF_fcjInputCop = reactive({
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
        other: 0
    })


    // 3.6.2  采用光伏发电的厂区应使用光伏企业提供的厂内发电量,相应的替碳量   5.2光伏发电替碳量
    const OCA_pvm = reactive({
        CA_pvm: null,//[27]
        Epvm: null,//用户输入
        EF_ecp: null,//用户重新选择
    })

    //  3.6.3 再生水回用的替碳量宜按替代的商业供水的取水 生产和输送的碳排放量   5.3再生水利用替碳量
    const OCA_wsm = reactive({
        CA_wsm: null,//[28]
        Qwsm: null,//用户输入
        EIitj: 0.2,//内置参数
        EIspj: 0.5,//内置参数
        EIwsj: 0.5,//内置参数
        EF_ecp: null,//同3.1
        CEIws: null//用户选择，根据表A.0.6   //对应const A06
    })
    const A06 = [    //表A.0.6
        {
            value: 0.52,
            label: '小型（<5万）'
        },
        {
            value: 0.41,
            label: '中型（5-10万）'
        },
        {
            value: 0.30,
            label: '大型（>10万）'
        },
    ]

    // 3.6.4 污泥厌氧消化沼气利用的替碳量  5.4污泥厌氧消化沼气利用的替碳量
    const OCA_adm = reactive({
        CA_adm: null,//[29]
        Eadm: null,//用户输入
        EF_ecp: null,//内置参数  用户选择 同3.1
        Hadm: null,//用户输入
        EF_fcj: null,//同3.2
        Vngm: null,//用户输入
        EF_fcng: 0.0022
    })
    const A03EF_fcjInput54 = reactive({
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
        other: 0
    })


    // 3.6.5 对于污泥干化焚烧或热解处理过程,相应的替碳量   5.5污泥干化焚烧或热解处理过程的替碳量
    const OCA_incm = reactive({
        CA_incm: null,//[30]
        Eincm: null,//用户输入
        EF_ecp: null,//同3.1
        Hadm: null,//用户输入
        EF_fcj: null,//同3.2
    })
    const A03EF_fcjInput55 = reactive({
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
        other: 0
    })


    // 3.6.6 污泥经过厌氧 好氧或碳化处理后 ,产生的替碳量  5.6污泥经过厌氧、好氧或碳化处理后的替碳量
    const OCA_landm = reactive({
        CA_landm: null,//[31]
        MlandmSlud: null,//同4.4
        MlandmWater: null,//同4.4
        PN: 0.03,//内置参数
        wN: 61,//%  内置参数
        EF_NFERT: 2.166,//内置参数
        Ppo: 0.006,//内置参数
        wpo: 70,//%  内置参数
        EF_PFERT: 1.45,//内置参数
    })



    //3.6.7污泥焚烧制建材产品过程中的碳排放量  5.7污泥焚烧建材产品的替碳量
    //[32]计算过程待补充




    // 3.6.8 污水厂替碳量     5.8 污水厂替碳量    直接按照甲方的来  将【26】-【32】相加
    const OCA_an = reactive({
        CA_an: null,//[33]    
        // CA_hpm: null,//[26]
        // CA_pvm: null,//[27]
        // CA_rm: null,
        // CA_wsm: null,//[28]
        // CA_otherm: null,
    })


    // 3.7.1 污水厂运维阶段的年度碳排放量     6.运维阶段的年度碳排放量  （[34]默认为0）    
    const OCE_oman = reactive({
        CE_oman: null,//[35]     
        CEw_ban: null,//[6]
        CEw_rean: null,//[10]
        CEs_ban: null,//[21]
        CEs_rean: null,//[25]
        CA_an: null,//[33]
        CSan: 0//[34] 默认为0
    })

    //    4.2.2当工程量清单缺乏时 建设阶段的碳排放量可按下式计算   7.1建设阶段的碳排放量
    const OCE_csAdd = reactive({
        CE_cs: null,//[36]
        Y: null//用户输入
    })

    //   4.2.2污水厂拆除阶段的碳排放量   7.1拆除阶段的碳排放量
    const OCE_csRem = reactive({
        CE_cs: null,//[37]
        Y: null//用户输入
    })


    //  4.3.1 污水厂全生命周期运维阶段碳排放量   7.2全生命周期运维阶段的碳排放量
    const OCE_lcom = reactive({
        CE_lcom: null,//[38]  
        T1: null,//用户输入
        CEoman: null,//[35]
        Mrp: null,//用户输入对应种类用了多少质量
        EF_rpj: null, //种类
        T2: null//用户输入
    })
    const EF_rpjA07Names = reactive([
        '热轧碳钢小型型钢',
        '热轧碳钢中型型钢',
        '热轧碳钢中厚板',
        '热轧碳钢H钢',
        '热轧碳钢宽带钢',
        '热轧碳钢钢筋',
        '热轧碳钢棒材',
        '螺旋埋弧焊管',
        '焊接直缝钢管',
        '热轧碳钢无缝钢管',
        '铜单板',
        '聚苯乙烯泡沫管',
        '硬泡聚氨酯板',
        '普通聚苯乙烯',
        '高密度聚乙烯',
        '低密度聚乙烯',
    ])
    const EF_rpjA07Fc = reactive({
        hotRolCSmaSte: 2.31,//热轧碳钢小型型钢
        hotRolCMidSte: 2.365,//热轧碳钢中型型钢
        hotRolCMidPla: 2.4,//热轧碳钢中厚板
        hotRolCHSte: 2.35,//热轧碳钢H钢
        hotRolCWidSte: 2.31,//热轧碳钢宽带钢
        hotRolCBar: 2.34,//热轧碳钢钢筋
        hotRolCSti: 2.34,//热轧碳钢棒材
        sawhPipe: 2.52,//螺旋埋弧焊管
        welStrSeaStePip: 2.53,//焊接直缝钢管
        hotRolCNoSte: 3.15,//热轧碳钢无缝钢管
        cuOne: 0.218,//铜单板
        polFoaTub: 5.02,//聚苯乙烯泡沫管
        rigFoaPolBoa: 5.22,//硬泡聚氨酯板
        OrdPol: 4.62,//普通聚苯乙烯
        higPol: 2.62,//高密度聚乙烯
        lowPol: 2.81,//低密度聚乙烯
    })
    const MrpA07Input = reactive({
        hotRolCSmaSte: 0,//热轧碳钢小型型钢
        hotRolCMidSte: 0,//热轧碳钢中型型钢
        hotRolCMidPla: 0,//热轧碳钢中厚板
        hotRolCHSte: 0,//热轧碳钢H钢
        hotRolCWidSte: 0,//热轧碳钢宽带钢
        hotRolCBar: 0,//热轧碳钢钢筋
        hotRolCSti: 0,//热轧碳钢棒材
        sawhPipe: 0,//螺旋埋弧焊管
        welStrSeaStePip: 0,//焊接直缝钢管
        hotRolCNoSte: 0,//热轧碳钢无缝钢管
        cuOne: 0,//铜单板
        polFoaTub: 0,//聚苯乙烯泡沫管
        rigFoaPolBoa: 0,//硬泡聚氨酯板
        OrdPol: 0,//普通聚苯乙烯
        higPol: 0,//高密度聚乙烯
        lowPol: 0,//低密度聚乙烯
    })





    //4.4.1   脱水污泥填埋或与生活垃圾混合填埋后  7.3污泥处置阶段的碳排放量（污泥填埋专用）
    const OCEs_dCH4lfan = reactive({
        CEs_dCH4lfan: null,//[39]
        MssmSlud: null,//
        MssmWater: null,//
        MCF: 1,//内置参数(无回收)
        transitionSlud: 2.52//内置参数
    })



    // 4.4.2 污泥土地利用后分解产生的CH4、N2O排放的 CO2 当量  7.4污泥土地利用后分解产生的CH4和N2O排放
    // 4.4.2-1
    const OCEs_dCH4landan = reactive({
        CEs_dCH4landan: null,//[40]
        MssmSlud: null,//
        MssmWater: null,//
        EFs_dCH4land: 0.003,//内置参数
        fCH4: 28//内置参数
    })
    //4.4.2-2
    const OCEs_dN2Olandan = reactive({
        CEs_dN2Olandan: null,//[41]
        MssmSlud: null,//
        MssmWater: null,//
        PN: 0.03,//内置参数
        EFs_dN2Oland: 0.011,//内置参数
        fN2O: 265//内置参数
    })



    //  4.4.3污泥及其处理产物进行填埋应包括电力消耗导致和非电力能源消耗导致。 土地利用时消耗能源产生的碳排放    7.5污泥填埋的能源消耗碳排放电力部分套用3.1章节；非电力部分套用3.2章节的计算代码
    // 得出CEsd-ec，r——【42】和CEsd-fc，r——【43】
    // 电力部分
    const OCEsd_ecr = reactive({
        CEw_ecm: null,//[7]
        Eecm: null, //用户输入
        EF_ecp: null//用户选择
    })
    // 非电力部分
    const OCEsd_fcr = reactive({
        CEw_fcm: null,//[8]   分别相乘然后求和
    })
    const OCEsd_fcrA03EF_fcjInput = reactive({
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
        other: 0
    })


    // 4.4.4 污泥及其处理产物运输至处置地点CEs_dtransran产生的碳排放量  7.6污泥及其产物运输至处置地点产生的碳排放量
    const CEs_dtransran = reactive({
        CEs_dtransran: null,//[44]
        MssmSlud: null,//用户输入
        MssmWater: null,//用户输入
        Lssrk: null,//用户输入
        EFs_sk: null,//选择
    })
    const EFs_skOptions = [
        {
            value: 0.1,
            label: '公路'
        },
        {
            value: 0.01,
            label: '铁路和水路'
        },
    ]

    //  4.4.5  污泥处置阶段的碳排放量       7.7污泥处置阶段的碳排放量
    const CEs_dan = reactive({
        CEs_dan: null,//[45]  公式把【39】和【40】这两个值合并了， 计算就是把[39]-[44]这六个量加起来
        // CEs_dCH4ran: null,
        // CEs_dN2Oran: null,
        // CEs_dfcran: null,
        // CEs_decran: null,
        // CEs_dtransran: null
    })


    //  4.5.1 污水排放入受纳水体的延伸阶段碳排放量    7.8污水排入受纳水体的延伸阶段碳排放量
    const OCE_exN2Oan = reactive({
        CE_exN2Oan: null,//[46]
        Qexoutm: null,//2.4
        TNoutm: null,//2.4
        EF_exN2O: null,//选择
        transition: 44 / 28, //内置参数
        fN2O: 265 //内置参数
    })
    const EF_exN2OOptions = [
        {
            value: 0.001,
            label: 'Ⅲ类水'
        },
        {
            value: 0.002,
            label: 'Ⅳ类水'
        },
        {
            value: 0.003,
            label: 'Ⅴ类水'
        },
        {
            value: 0.005,
            label: '劣Ⅴ类'
        },
    ]



    //  4.6.1 污水厂全生命周期碳排放量       7.9全生命周期碳排放量  代入参数：【36】【37】【38】【45】【46】
    const OCE_lc = reactive({
        CE_lc: null,//[47]   甲方给出的示例有问题  根本对应不起来
        CE_cs: null,//[36]   代入建设或者拆除都可以
        CElcom: null,//[38]
        CE_dm: null,//[37]拆除阶段
        T1: null,//用户输入
        CEs_dan: null,//[45]
        CEex_N2Oan: null//[46]
    })

    //  5.2.1  污水厂运维阶段的年度碳排放强度   8.1运维阶段年度碳排放强度
    const OCE_Ioman = reactive({
        CE_Ioman: null,//[48]
        CE_oman: null, //[35]
        Qinan: null,//2.1
    })


    //  5.2.2  污水厂运维阶段的年度污染物削减碳排放强度   8.2年度污染物削减碳排放强度
    const OCE_IomanX = reactive({
        CE_IomanX: null,//[50]
        Xan: null,//[49]
        CE_oman: null,//[35]
        Qinan: null,//2.1
        CODinan: null,//2.1
        CODoutan: null,//2.1
        NH3Ninan: null,//输入
        NH3Noutan: null,//输入
    })


    //    8.3运维阶段碳减排量与碳减排强度   包括5.3.1和5.3.2和5.3.3    备注此处用户需要有两年以上的数据才可以开启此部分计算，由用户先选择某一年为基准年，其他年份为评估年
    const ifCompDiff = reactive({
        ifCompDiff: null
    })
    const ifCompDiffOptions = [
        {
            value: false,
            label: '否'
        },
        {
            value: true,
            label: '是'
        }
    ]
    const baseYear = reactive({
        baseYear: null
    })
    const evalYear = reactive({
        evalYear: null
    })
    // 5.3.1  污水厂运维阶段碳减排量  
    const OCR_oman = reactive({
        CR_oman: null,//[51]     
        CE_omvy: null,//
        CE_omby: null,//
    })
    // 5.3.2  评估年度相对于基准年度的碳减排强度  
    const OCR_Ioman = reactive({
        CR_Ioman: null,//[52]     
        CE_Iomvy: null,
        CE_Iomby: null,
    })
    // 5.3.3  评估年度相对于基准年度的污染物削减碳减排强度  
    const OCR_IomanX = reactive({
        CR_IomanX: null,//[53]     
        CE_IomvyX: null,
        CE_IombyX: null,
    })


    //   5.4.1 待评估污水厂运维年度相对于行业同类平均水平的碳排放强度目标差  8.4评估年度相对于行业同类平均水平的碳排放强度目标差
    const OCE_Iomang = reactive({
        CE_Iomang: null,//[54]
        CE_Iomvy: null,//[48]
        CE_Iomav: null,//选择  根据B01
        level: null, //等级
        scale: null, //规模
        scope: null, //具体范围
    })
    const B01Level = [
        {
            value: 1,
            label: '一级B',
        },
        {
            value: 2,
            label: '一级A',
        },
        {
            value: 3,
            label: '无再生水回用',
        },
        {
            value: 4,
            label: '含再生水回用',
        },
    ]
    const B01Scale = [
        {
            value: 1,
            label: '<1',
        },
        {
            value: 2,
            label: '1-5',
        },
        {
            value: 3,
            label: '5-10',
        },
        {
            value: 4,
            label: '10-20',
        },
        {
            value: 5,
            label: '20-100',
        },
    ]
    const B01Scope = [
        {
            value: 1,
            label: '0-100',
        },
        {
            value: 2,
            label: '100-200',
        },
        {
            value: 3,
            label: '200-300',
        },
        {
            value: 4,
            label: '300-400',
        },
        {
            value: 5,
            label: '>400',
        },
    ]
    const B01Value = reactive([
        // 一级B  这个是等级
        [
            // <1  这个是规模
            [0.70, 0.79, 0.96, 1.17, 1.25],
            // 1-5
            [0.49, 0.6, 0.75, 0.92, 1.21],
            // 5-10
            [0.47, 0.53, 0.66, 0.87, 1.17],
            // 10-20
            [0.36, 0.51, 0.60, 0.82, 0.92],
            // 20-100
            [null, 0.45, 0.57, 0.69, 0.86]
        ],
        // 一级A
        [
            // <1  这个是规模
            [0.79, 0.84, 0.98, 1.2, 1.31],
            // 1-5
            [0.53, 0.69, 0.78, 0.94, 1.3],
            // 5-10
            [0.48, 0.6, 0.78, 0.88, 1.2],
            // 10-20
            [null, 0.58, 0.76, 0.83, 0.93],
            // 20-100
            [null, 0.47, 0.73, 0.82, 0.88]
        ],
        // 无再生水回用
        [
            // <1  这个是规模
            [null, null, 1.40, 1.40, 1.40],
            // 1-5
            [null, null, 1.09, 1.09, 1.09],
            // 5-10
            [null, null, 1.02, 1.02, 1.02],
            // 10-20
            [null, null, 0.96, 0.96, 0.96],
            // 20-100
            [null, null, 0.84, 0.84, 0.84]
        ],
        // 含再生水回用 
        [
            // <1  这个是规模
            [null, null, 1.26, 1.26, 1.26],
            // 1-5
            [null, null, 0.95, 0.95, 0.95],
            // 5-10
            [null, null, 0.92, 0.92, 0.92],
            // 10-20
            [null, null, 0.80, 0.80, 0.80],
            // 20-100
            [null, null, 0.79, 0.79, 0.79]
        ],
    ])
    // 5.4.2   污水厂各处理阶段的碳排放贡献度  8.5碳排放贡献度    
    const OCB_stan = reactive({
        CB_usan: null,//暂时没想好要不要做，沟通一下再确定
        CEs_tan: null,
        CE_oman: null
    })


    //  6.2.1 污水厂全生命周期碳排放强度   9.1 全生命周期碳排放强度
    const OCE_Ilc = reactive({
        CE_Ilc: null,//[55]
        CE_lc: null,//[47]
        T: null,//输入
        Qin: null//输入
    })

    //  6.2.2   污水厂去除单位耗氧污染物量对应的全生命周期碳排放量   9.2 去除单位耗氧污染物对应的全生命周期碳排放量
    //6.2.2-2
    const OX = ref({
        X: null,//[56]
        Qinlc: null,//8.1
        CODinlc: null,//输入
        CODoutlc: null,//输入
        NH3Ninlc: null,//输入
        NH3Noutlc: null//输入
    })
    //6.2.2-1
    const OCE_IlcX = reactive({
        CE_IlcX: null,//[57]
        CE_lc: null,//输入
        T: null,//输入
        X: null//[56]
    })





    //  6.3.1 待评估污水厂相对于行业同类平均水平的全生命周期碳排放强度   9.3评估年度相对于行业同类平均水平的碳排放强度目标差
    const OCE_Ilcg = reactive({
        CE_Ilcg: null,//[58]（可为负值）
        CE_Ilcvy: null,//[55]
        CE_Ilcav: null,//B02选择
        level: null, //等级
        scale: null, //规模
        scope: null, //具体范围
    })
    const B02Level = [
        {
            value: 1,
            label: '一级B',
        },
        {
            value: 2,
            label: '一级A',
        },
        {
            value: 3,
            label: '无再生水回用',
        },
        {
            value: 4,
            label: '含再生水回用',
        },
    ]
    const B02Scale = [
        {
            value: 1,
            label: '<1',
        },
        {
            value: 2,
            label: '1-5',
        },
        {
            value: 3,
            label: '5-10',
        },
        {
            value: 4,
            label: '10-20',
        },
        {
            value: 5,
            label: '20-100',
        },
    ]
    const B02Scope = [
        {
            value: 1,
            label: '0-100',
        },
        {
            value: 2,
            label: '100-200',
        },
        {
            value: 3,
            label: '200-300',
        },
        {
            value: 4,
            label: '300-400',
        },
        {
            value: 5,
            label: '>400',
        },
    ]
    const B02Value = reactive([
        // 一级B  这个是等级
        [
            // <1  这个是规模
            [0.70, 0.79, 0.96, 1.17, 1.25],
            // 1-5
            [0.49, 0.6, 0.75, 0.92, 1.21],
            // 5-10
            [0.47, 0.53, 0.66, 0.87, 1.17],
            // 10-20
            [0.36, 0.51, 0.60, 0.82, 0.92],
            // 20-100
            [null, 0.45, 0.57, 0.69, 0.86]
        ],
        // 一级A
        [
            // <1  这个是规模
            [0.79, 0.84, 0.98, 1.2, 1.31],
            // 1-5
            [0.53, 0.69, 0.78, 0.94, 1.3],
            // 5-10
            [0.47, 0.53, 0.66, 0.87, 1.17],
            // 10-20
            [0.36, 0.51, 0.60, 0.82, 0.92],
            // 20-100
            [null, 0.45, 0.57, 0.69, 0.86]
        ],
        // 无再生水回用
        [
            // <1  这个是规模
            [0.70, 0.79, 0.96, 1.17, 1.25],
            // 1-5
            [0.49, 0.6, 0.75, 0.92, 1.21],
            // 5-10
            [0.47, 0.53, 0.66, 0.87, 1.17],
            // 10-20
            [0.36, 0.51, 0.60, 0.82, 0.92],
            // 20-100
            [null, 0.45, 0.57, 0.69, 0.86]
        ],
        // 含再生水回用 
        [
            // <1  这个是规模
            [0.70, 0.79, 0.96, 1.17, 1.25],
            // 1-5
            [0.49, 0.6, 0.75, 0.92, 1.21],
            // 5-10
            [0.47, 0.53, 0.66, 0.87, 1.17],
            // 10-20
            [0.36, 0.51, 0.60, 0.82, 0.92],
            // 20-100
            [null, 0.45, 0.57, 0.69, 0.86]
        ],
    ])




    //  6.3.2 污水厂全生命周期碳排放节点分析基于各处理阶段的碳排放贡献度   9.4全生命周期的各处理阶段的碳排放贡献度
    const OCB_lcst = reactive({
        CB_lcst: null,//         暂时没想好要不要做，沟通一下再确定
        CE_lcst: null,
        CE_lc: null
    })

    //污水处理厂基本信息
    const basicalInfo = reactive({
        areaCenter: null,//隶属区域中心
        waterYear: null,// 年进水水量
        handleStyle: null,//处理工艺
        createdTime: null,//建厂时间
        useStandard: null//采用评价
    })

    // 绿色低碳行为
    const textarealvse = ref(null)

    return {
        basicalInfo,
        mapStandard, mapEvaSta, mapFingerpost, ifShow,
        ifAllLeaf,
        ifAllLeafOptions,
        OCEw_fCO2m,
        OCEw_eCO2m,
        OCEw_CH4m,
        OCEw_N2Om,
        OCEw_ban,
        OCEw_ecm,
        OCEw_fcm,
        OCEw_ccm,
        OCEw_rean,
        OCEs_CH4adm,
        OCEs_CH4afm,
        OCEs_N2Oafm,
        OCEs_fCO2incm,
        OCEs_CH4incm,
        OCEs_N2Oincm,
        OCEs_ban,
        OCEs_rean,
        OCA_hpm,
        OCA_pvm,
        OCA_wsm,
        OCA_adm,
        OCA_incm,
        OCA_landm,
        OCA_an,
        OCE_oman,
        OCE_csAdd,
        OCE_csRem,
        OCE_lcom,
        OCEs_dCH4lfan,
        OCEs_dCH4landan,
        OCEs_dN2Olandan,
        CEs_dtransran,
        CEs_dan,
        OCE_exN2Oan,
        OCE_Ioman,
        OCE_IomanX,
        OCR_oman,
        OCR_Ioman,
        OCR_IomanX,
        OCE_Iomang,
        OCB_stan,
        OCE_Ilc,
        OX,
        OCE_IlcX,
        OCE_Ilcg,
        OCB_lcst,
        ifRealTest,
        OEFw_eCO2Options,
        AreaOptions,
        A03EF_fcjInput,
        A03EF_fcjData,
        A03EF_fcjMfjNames,
        MatCStyle,
        McgCon,
        McgM,
        ifJump,
        ifJumpOptions,
        OCE_Biogas_N2O,
        fireStyles,
        OCEs_fCO2incmCop,
        OCEs_CH4incmCop,
        OCEs_N2OincmCop,
        technologyOptions,
        ifEleDurEne,
        A03EF_fcjInputCop,
        A06,
        EF_rpjA07Fc,
        MrpA07Input,
        OCEsd_ecr,
        EFs_skOptions,
        EF_exN2OOptions,
        OCE_lc,
        baseYear,
        evalYear,
        MatMNames,
        MatConNames,
        ifRealTestOptions,
        ifEleDurEneOptions,
        A03EF_fcjInputCopy,
        McgConCopy,
        McgMCopy,
        OCEw_ecmCopy,
        OCEw_fcmCopy,
        OCEw_ccmCopy,
        ifCompDiff,
        ifCompDiffOptions,
        B01Level,
        B01Scope,
        B01Scale,
        B01Value,
        B02Level,
        B02Scope,
        B02Scale,
        B02Value,
        A03EF_fcjInputCopyCopy,
        EF_rpjA07Names,
        OCEsd_fcr,
        OCEsd_fcrA03EF_fcjInput,
        A03EF_fcjInput55,
        A03EF_fcjInput54,
        textarealvse
    }
})
