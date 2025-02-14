<script setup>
import router from '@/router';
import { usefingerpostStore } from '@/stores/fingerpostStore';
import { reactive, defineProps, watch, defineExpose } from 'vue';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import * as XLSX from 'xlsx';
const fingerpostStore = usefingerpostStore()

const props = defineProps({
    data: String,
    iData: String
})
const oneDayResult = reactive({})


// 旧版
// const CH4Rec = reactive(fingerpostStore.CH4Rec)
// const CODTNRem = reactive(fingerpostStore.CODTNRem)
// const SludDis = reactive(fingerpostStore.SludDis)
// const CH4RecPro = reactive(fingerpostStore.CH4RecPro)
// const CODRemPro = reactive(fingerpostStore.CODRemPro)
// const HandleSludPro = reactive(fingerpostStore.HandleSludPro)
// const TNRemProN2O = reactive(fingerpostStore.TNRemProN2O)
// const EleCO2Pro = reactive(fingerpostStore.EleCO2Pro)
// const TotRemCO2 = reactive(fingerpostStore.TotRemCO2)
// const CH4 = reactive(fingerpostStore.CH4)



//新版
const CH4 = reactive(fingerpostStore.CH4)
const tailWaterCH4 = reactive(fingerpostStore.tailWaterCH4)
const CH4Total = reactive(fingerpostStore.CH4Total)
const CH4C = reactive(fingerpostStore.CH4C)
const N2O = reactive(fingerpostStore.N2O)
const tailWaterN2O = reactive(fingerpostStore.tailWaterN2O)
const N2OTotal = reactive(fingerpostStore.N2OTotal)
const N2OC = reactive(fingerpostStore.N2OC)
const AllC = reactive(fingerpostStore.AllC)
const basicalInfo = reactive(fingerpostStore.basicalInfo)
const textarealvse = ref(fingerpostStore.textarealvse)







// 2.1生化反应的计算 与CH4直接排放量完全相同
watch(
    () => [CH4.Qrbi, CH4.CODrai, CH4.CODeai, CH4.SGSlud, CH4.SGWater, CH4.Pvi, CH4.p, CH4.B0, CH4.MCF, CH4.RCH4i],
    ([newQrbi, newCODrai, newCODeai, newSGSlud, newSGWater, newPvi, newP, newB0, newMCF, newRCH4i]) => {
        CH4.ECH4i = ((newQrbi * (newCODrai - newCODeai) / 1000) - ((newSGSlud * (1 - newSGWater / 100)) * newPvi * 0.01 * 1000 * newP)) * newMCF - newRCH4i

        console.log(newQrbi, 'newQrbi');
        console.log(newCODrai, 'newCODrai');
        console.log(newCODeai, 'newCODeai');
        console.log(newSGSlud, 'newSGSlud');
        console.log(newSGWater, 'newSGWater');
        console.log(newPvi, 'newPvi');
        console.log(newP, 'newP');
        console.log(newMCF, 'newMCF');
        console.log(CH4.ECH4i, 'CH4.ECH4i');
        if (newCODrai && newCODeai && newSGSlud && newSGWater && newPvi && newP && newB0 && newMCF && newRCH4i) {
            console.log('全部输入完成');
            if (CH4.ECH4i < 0) {
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
// 2.2尾水排入环境的计算  CH4
watch(
    () => [tailWaterCH4,CH4.CODeai],
    ([newtailWaterCH4,newCODeai]) => {
        tailWaterCH4.ECH4TailWateri = newtailWaterCH4.EFWater * (newtailWaterCH4.Qebi * newCODeai * 0.001)
        console.log(tailWaterCH4.ECH4TailWateri, 'tailWaterCH4.ECH4TailWateri');

    },
    { deep: true }
)


// 2.3甲烷直接排放总量
watch(
    () => [CH4, tailWaterCH4],
    ([]) => {
        CH4Total.EiCH4Total = CH4.ECH4i + tailWaterCH4.ECH4TailWateri
        console.log(CH4Total.EiCH4Total, 'CH4Total.EiCH4Total');
    },
    { deep: true }
)


// 2.4甲烷直接碳排放当量
watch(
    () => [CH4C, CH4Total],
    ([]) => {
        CH4C.EiCH4C = CH4Total.EiCH4Total * CH4C.fCH4
        console.log(CH4C.EiCH4C, 'CH4C.EiCH4C');
    },
    { deep: true }
)


// 3.1  N2O直接排放量的计算   与中环协的2.1N2O直接排放量完全相同
watch(
    () => [N2O.Qrbi, N2O.TNrbi, N2O.TNebi, N2O.EFN2O, N2O.CN2ON2,CH4.SGSlud,CH4.SGWater],
    ([newQrbi, newTNrbi, newTNebi, newEFN2O, newCN2ON2,newSGSlud,newSGWater]) => {
        if (!props.data) {
            ElMessage({
                message: '请先选择日期后再输入',
                type: 'error',
                showClose: true,
                duration: 2000
            })
        }
        N2O.EN2Oi = ((newQrbi * (newTNrbi - newTNebi)/ 1000) - (newSGSlud * (1 - newSGWater/100) * 0 * 1000)) * newEFN2O 
        console.log(N2O.EN2Oi, 'N2O.EN2Oi N2O直接排放量的计算');
    }
)

// 3.2尾水排入环境的计算 N2O
watch(
    () => [tailWaterN2O,tailWaterCH4,N2O.TNebi],
    ([newtailWaterN2O,newtailWaterCH4,newTNebi]) => {
        tailWaterN2O.EN2OTailWateri = newtailWaterN2O.EFWater * (newtailWaterCH4.Qebi * newTNebi * 0.001)
        console.log(tailWaterN2O.EN2OTailWateri, 'tailWaterN2O.EN2OTailWateri');
        console.log(newtailWaterN2O.EFWater, 'newtailWaterN2O.EFWater');
        console.log(newtailWaterCH4.Qebi, 'newtailWaterCH4.Qebi');
        console.log(newTNebi, 'newTNebii');
    },
    { deep: true }
)

// 3.3氧化亚氮总量
watch(
    () => [N2O, tailWaterN2O],
    ([]) => {
        N2OTotal.EiN2OTotal = N2O.EN2Oi + tailWaterN2O.EN2OTailWateri
        console.log(N2OTotal.EiN2OTotal, 'N2OTotal.EiN2OTotal');
    },
    { deep: true }
)


// 3.4氧化亚氮直接碳排放当量
watch(
    () => [N2O, tailWaterN2O],
    ([]) => {
        N2OC.EiN2OC = N2OTotal.EiN2OTotal * N2OC.fN2O
        console.log(N2OC.EiN2OC, 'N2OC.EiN2OC');
    },
    { deep: true }
)

//4.城镇污水厂直接碳排放总量
watch(
    () => [CH4C, N2OC],
    ([]) => {
        AllC.EAllCi = CH4C.EiCH4C + N2OC.EiN2OC
        console.log(AllC.EAllCi, 'AllC.EAllCi');

    },
    { deep: true }
)




const CH4Ref = ref(null)
const tailWaterCH4Ref = ref(null)
const N2ORef = ref(null)
const tailWaterN2ORef = ref(null)
// const CODRemProRef = ref(null)
// const HandleSludProRef = ref(null)
// const TNRemProN2ORef = ref(null)
// const EleCO2ProRef = ref(null)
// const TotRemCO2Ref = ref(null)


const validateAllForm = () => {
    let isCH4RecValid, isCODTNRemValid, isSludDisValid, isCH4RecProValid

    return new Promise((resolve, reject) => {
        Promise.all([
            CH4Ref.value.validate().then(res => isCH4RecValid = res).catch(error => { console.log('CH4Ref validate error', error); isCH4RecValid = false }),
            tailWaterCH4Ref.value.validate().then(res => isCODTNRemValid = res).catch(error => { console.log('tailWaterCH4Ref validate error', error); isCODTNRemValid = false }),
            N2ORef.value.validate().then(res => isSludDisValid = res).catch(error => { console.log('N2ORef validate error', error); isSludDisValid = false }),
            tailWaterN2ORef.value.validate().then(res => isCH4RecProValid = res).catch(error => { console.log('tailWaterN2ORef validate error', error); isCH4RecProValid = false }),
            // CODRemProRef.value.validate().then(res => isCODRemProValid = res).catch(error => { console.log('CODRemProRef validate error', error); isCODRemProValid = false }),
            // HandleSludProRef.value.validate().then(res => isHandleSludProtValid = res).catch(error => { console.log('HandleSludProRef validate error', error); isHandleSludProtValid = false }),
            // TNRemProN2ORef.value.validate().then(res => isTNRemProN2OValid = res).catch(error => { console.log('TNRemProN2ORef validate error', error); isTNRemProN2OValid = false }),
            // EleCO2ProRef.value.validate().then(res => isEleCO2ProValid = res).catch(error => { console.log('EleCO2ProRef validate error', error); isEleCO2ProValid = false }),
            // TotRemCO2Ref.value.validate().then(res => isTotRemCO2Ref = res).catch(error => { console.log('TotRemCO2Ref validate error', error); isTotRemCO2Ref = false }),
        ]).then(() => {
            const isAllValid = isCH4RecValid && isCODTNRemValid && isSludDisValid && isCH4RecProValid
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

const pushAllResult = () => {
    oneDayResult.CH4 = CH4.ECH4i
    oneDayResult.CH4Qrbi = CH4.Qrbi
    oneDayResult.tailWaterCH4 = tailWaterCH4.ECH4TailWateri
    oneDayResult.CH4Total = CH4Total.EiCH4Total
    oneDayResult.CH4C = CH4C.EiCH4C
    oneDayResult.N2O = N2O.EN2Oi
    oneDayResult.tailWaterN2O = tailWaterN2O.EN2OTailWateri
    oneDayResult.N2OTotal = N2OTotal.EiN2OTotal
    oneDayResult.N2OC = N2OC.EiN2OC
    oneDayResult.AllC = AllC.EAllCi
    oneDayResult.basicalInfo = basicalInfo//污水处理厂基本信息
    oneDayResult.textarealvse = textarealvse
    fingerpostStore.mapFingerpost.set(props.data, oneDayResult)
    
    console.log('fingerpostStore.mapFingerpost', fingerpostStore.mapFingerpost);
    // ElMessage('如需继续输入请选择新的日期，如果输入完毕，请点击确认按钮')
    // counter.mapFingerpost.set(props.data, oneDayResult)//data是日期
}

const toShowFingerpost = () => {
    router.push('/showfingerpost')
}

const LowCStyleRef = ref(null)

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
        console.log('1');
        
        // 为 FileReader 对象的 onload 事件定义一个回调函数，该事件在文件读取操作完成(无论是成功还是失败)时触发。
        fileReader.onload = (ev) => {
            try {
                const data = ev.target.result;//获取文件内容
                console.log(data,'data');//这会是一堆看不懂的乱码

                const workbook = XLSX.read(data, { type: 'binary' });//使用xlsx来读取文件，xlsx是一个处理excel文件的库，指定type为binary，因为文件是以二进制字符串的形式读取的
                console.log(workbook, 'workbook');//workbook包含一大堆乱七八糟的信息   workboos是工作簿的意思

                const sheetName = workbook.SheetNames[0];//获取第一个工作表
                console.log(sheetName, 'sheetName');//sheet1

                const sheet = workbook.Sheets[sheetName];//通过工作表名称获取工作表对象
                console.log(sheet, 'sheet');

                excelData = XLSX.utils.sheet_to_json(sheet);//使用 XLSX.utils.sheet_to_json 方法将工作表转换为 JSON 格式的数据，这通常是一个数组，每个元素代表工作表中的一行。
                console.log(excelData, 'excelData');//将工作表打印出来
                ElMessage.success('文件读取成功 请执行一键导入操作')
                // console.log(excelData[3].__EMPTY_2, 'excelData[3]');

            } catch (e) {
                ElMessage.error('文件读取失败')
                console.log(e, 'error');
            }
        };
    }else{
        ElMessage.error('文件格式不正确')
    }
}

const inputAllOneTimes = () => {
    basicalInfo.areaCenter = excelData[2].__EMPTY_1
    basicalInfo.waterYear = excelData[2].__EMPTY_2
    basicalInfo.handleStyle = excelData[2].__EMPTY_3
    basicalInfo.createdTime = excelData[2].__EMPTY_4
    CH4.Qrbi = excelData[2].__EMPTY_5
    CH4.CODrai = excelData[2].__EMPTY_6
    CH4.CODeai = excelData[2].__EMPTY_7
    CH4.SGSlud = excelData[2].__EMPTY_8
    CH4.SGWater = excelData[2].__EMPTY_9
    CH4.Pvi = excelData[2].__EMPTY_10
    CH4.RCH4i = excelData[2].__EMPTY_11
    tailWaterCH4.EFWater = excelData[2].__EMPTY_14
    tailWaterCH4.Qebi = excelData[2].__EMPTY_12
    tailWaterCH4.CODeai = excelData[2].__EMPTY_13
    N2O.Qrbi = excelData[2].__EMPTY_15
    N2O.TNrbi = excelData[2].__EMPTY_16
    N2O.TNebi = excelData[2].__EMPTY_17
    tailWaterN2O.EFWater = excelData[2].__EMPTY_20
    tailWaterN2O.Qebi = excelData[2].__EMPTY_18
    tailWaterN2O.TNeai = excelData[2].__EMPTY_19
    // CH4.MCF = 0.0075
    // CO2Mfj.LianJiao = 0
    // EleCInt.fe = 0.8042
    // EleCInt.Wi = 1800
    // HotCInt.Mhi = 0
    // McgCon.PAM = 1
    // McgCon.CiNaClO = 1
    // McgCon.FeSO4 = 1
    // McgCon.C2H3NaO2 = 1
    // McgM.PAM = 14.25
    // McgM.CiNaClO = 17.8
    // McgM.FeSO4 = 155
    // McgM.C2H3NaO2 = 79
    // TreScaRat.Qda = 10000
    // OxyPolRem.BODrbi = 100
    // OxyPolRem.BODebi = 6
    // OxyPolRem.NH3Nebi = 0.07
    // OxyPolRem.Qebi = 9500
    // WaterOutRat.CODcr = 40
    // OxyConRat.k5 = 0.95

}









defineExpose({ pushAllResult, toShowFingerpost, validateAllForm })








</script>
<template>
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
        <p style="font-weight: bold; font-size: 20px; color: black;">生化反应的计算</p>
        <el-form :model="CH4" class="flex flex-start flex-wrap gap-4 mt-3" ref="CH4Ref">
            <div class="flex">
                <div class="w-[180px]">𝑄rb,𝑖
                    —— 污水处理厂第 i {{ iData }}进水水量，m<sup>3</sup>；</div>
                <el-form-item>
                    <el-input v-model="CH4.Qrbi" style="width: 300px; height:50px;" placeholder="Qrbi" />
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
                    <el-input v-model="CH4.MCF" style="width: 300px; height:50px;" placeholder="MCF" />
                </el-form-item>
            </div>
            <!-- <div class="flex">

                <div class="w-[180px]">𝐵0
                    —— 厌氧过程降解单位 CODCr时 CH4的产率系数，取值为 0.25 kgCH4/kgCODCr；</div>
                <el-form-item prop="B0" :rules="[{ required: true, message: 'B0 is required' }]">
                    <el-input v-model="CH4.B0" style="width: 300px; height:50px;" placeholder="B0" />
                </el-form-item>
            </div> -->
            <div class="flex">

                <div class="w-[180px]">𝜌𝑆
                    —— 污泥中的有机物与 CODCr的转化系数，取值为 1.42 kgCODCr/kgDS；</div>
                <el-form-item prop="p" :rules="[{ required: true, message: 'p is required' }]">
                    <el-input v-model="CH4.p" style="width: 300px; height:50px;" placeholder="p" />
                </el-form-item>
            </div>
        </el-form>
    </div>
    <div class="flex flex-col">
        <p style="font-weight: bold; font-size: 20px; color: black;">CH4尾水排入环境的计算</p>
        <el-form :model="tailWaterCH4" class="flex flex-start flex-wrap gap-4 mt-3" ref="tailWaterCH4Ref">
            
            <div class="flex">
                <div class="w-[180px]">𝑄<sub>eb,𝑖</sub>——城镇污水处理厂排水总量m<sup>3</sup></div>
                <el-form-item prop="Qebi" :rules="[{ required: true, message: 'Qebi is required' }]">
                    <el-input v-model="tailWaterCH4.Qebi" style="width: 300px; height:50px;" placeholder="Qebi" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">Q<sub>eb,𝑖</sub>——城镇污水处理厂第i{{ iData }}平均出水 CODeai浓度，mg/L</div>
                <el-form-item prop="CODeai" :rules="[{ required: true, message: 'CODeai is required' }]">
                    <el-input v-model="CH4.CODeai" style="width: 300px; height:50px;" placeholder="CODeai" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">EF<sub>甲烷水体，i</sub> </div>
                <el-form-item prop="EFWater" :rules="[{ required: true, message: 'EFWater is required' }]">
                    <el-input v-model="tailWaterCH4.EFWater" style="width: 300px; height:50px;" placeholder="EFWater" />
                </el-form-item>
            </div>
        </el-form>
    </div>

    <div class="mt-10">
        <!-- <el-card shadow="hover"> -->
        <p style="font-weight: bold; font-size: 20px; color: black;">N<sub>2</sub>O直接排放量</p>
        <el-form :model="N2O" class="flex flex-start flex-wrap gap-4 mt-3" ref="N2ORef">
            <div class="flex">
                <div class="w-[180px]">𝑄<sub>eb,𝑖</sub>——城镇污水处理厂排水总量m<sup>3</sup></div>
                <el-form-item prop="Qrbi" :rules="[{ required: true, message: 'Qrbi is required' }]">
                    <el-input v-model="N2O.Qrbi" style="width: 300px; height:50px;" placeholder="Qrbi" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">𝑇𝑁<sub>rb.𝑖</sub>—— 污水生物处理单元第 i {{ iData }}平均出水TN浓度，mg/L</div>
                <el-form-item prop="TNrbi" :rules="[{ required: true, message: 'TNrbi is required' }]">
                    <el-input v-model="N2O.TNrbi" style="width: 300px; height:50px;" placeholder="TNrbi" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">𝑇𝑁<sub>eb.𝑖</sub>—— 污水生物处理单元第 i {{ iData }}平均出水TN浓度，mg/L</div>
                <el-form-item prop="TNrbi" :rules="[{ required: true, message: 'TNrbi is required' }]">
                    <el-input v-model="N2O.TNebi" style="width: 300px; height:50px;" placeholder="TNebi" />
                </el-form-item>
            </div>
            <!-- <div class="flex">
                <div class="w-[180px]">EF<sub>氧化亚氮水体，i</sub> </div>
                <el-form-item prop="TNebi" :rules="[{ required: true, message: 'TNebi is required' }]">
                    <el-input v-model="N2O.TNebi" style="width: 300px; height:50px;" placeholder="TNebi" />
                </el-form-item>
            </div> -->
            <div class="flex">
                <div class="w-[180px]">𝐸𝐹<sub>N<sub>2</sub>O</sub> —— N<sub>2</sub>O 排放因子，取值为 0.016
                    kgN<sub>2</sub>O-N/kgTN</div>

                <el-form-item prop="EFN2O" :rules="[{ required: true, message: 'EFN2O is required' }]">
                    <el-input v-model="N2O.EFN2O" style="width: 300px; height:50px;" placeholder="EFN2O" />
                </el-form-item>
            </div>
            <!-- <div class="flex">
                <div class="w-[180px]">𝐶<sub>N<sub>2</sub>O/N<sub>2</sub></sub>——
                    N<sub>2</sub>O/N<sub>2</sub>分子量之比，取值为 44/28</div>
                <el-form-item prop="CN2ON2" :rules="[{ required: true, message: 'CN2ON2 is required' }]">
                    <el-input v-model="N2O.CN2ON2" style="width: 300px; height:50px;" placeholder="CN2ON2" />
                </el-form-item>
            </div> -->
        </el-form>
        <!-- </el-card> -->
    </div>


    <div class="flex flex-col">
        <p style="font-weight: bold; font-size: 20px; color: black;">N2O尾水排入环境的计算</p>
        <el-form :model="tailWaterN2O" class="flex flex-start flex-wrap gap-4 mt-3" ref="tailWaterN2ORef">
            
            <div class="flex">
                <div class="w-[180px]">Qebi ——城镇污水处理厂城镇污水处理过程中年回收的 CH4体积，m3/a；</div>
                <el-form-item prop="Qebi" :rules="[{ required: true, message: 'Qebi is required' }]">
                    <el-input v-model="tailWaterN2O.Qebi" style="width: 300px; height:50px;" placeholder="Qebi" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">𝑇𝑁<sub>ea.𝑖</sub>—— 污水生物处理单元第 i {{ iData }}平均出水TN浓度，mg/L</div>
                <el-form-item prop="TNeai" :rules="[{ required: true, message: 'TNeai is required' }]">
                    <el-input v-model="tailWaterN2O.TNeai" style="width: 300px; height:50px;" placeholder="TNeai" />
                </el-form-item>
            </div>
            <div class="flex">
                <div class="w-[180px]">EFWater <sup>3</sup></div>
                <el-form-item prop="EFWater" :rules="[{ required: true, message: 'EFWater is required' }]">
                    <el-input v-model="tailWaterN2O.EFWater" style="width: 300px; height:50px;" placeholder="EFWater" />
                </el-form-item>
            </div>
        </el-form>
    </div>
    <div class="flex flex-col">
        <p style="font-weight: bold; font-size: 20px; color: black;">采取了哪些绿色低碳行为，简单输入：</p>
        <el-input type="textarea" :rows="6" placeholder="绿色低碳行为" v-model="textarealvse" style="width: 800px;"> </el-input>
    </div>



</template>