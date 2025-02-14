<script setup>
import router from '@/router';
import { ref } from 'vue'
import InputFingerpostComponents from '@/components/InputFingerpostComponents.vue';
import { ElMessage } from 'element-plus';

// 跳转到首页
const toSelect = () => {
    router.push('/')
}



//跳转到展示页面
const toShowPage = () => {
    router.push('/showfingerpost')
    console.log('进入展示界面');
    
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
            console.log(inputComponentsRef.value.validateAllForm(),"1");

            inputComponentsRef.value.pushAllResult()//将输入的数据提交
            ElMessage.success('当前数据已提交成功')

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


</script>

<template>

    <div>

        <!-- 标题 -->
        <div className=" bg-white border-b-2 border-gray-300 p-4 font-bold text-2xl text-center sticky top-0 z-10">
            大气污染物与温室气体融合排放清单编制技术指南（试行）
        </div>

        <div class="flex justify-around mt-8">
            <!-- 选择年/月/日 -->
            <el-card style="width: 250px" shadow="hover">
                <div class="flex justify-around">
                    <el-button @click="handleIfYear" :style="{ backgroundColor: ifYear ? 'skyblue' : '' }">年</el-button>
                    <el-button @click="handleIfMonth"
                        :style="{ backgroundColor: ifMonth ? 'skyblue' : '' }">月</el-button>
                    <el-button @click="handleIfDay" :style="{ backgroundColor: ifDay ? 'skyblue' : '' }">日</el-button>
                </div>
            </el-card>
            <!-- 选择日期范围 -->
            <el-card style="width: 280px" shadow="hover" v-if="ifDay || ifMonth || ifYear">
                <div class="flex justify-center">
                    <div v-if="ifDay">
                        <el-date-picker v-model="nowDay" type="date" placeholder="Pick a day" format="YYYY/MM/DD"
                            value-format="YYYY-MM-DD" @change="change">
                        </el-date-picker>
                    </div>
                    <div class="block" v-else-if="ifMonth">
                        <el-date-picker v-model="nowDay" type="month" placeholder="Pick a month" format="YYYY/MM"
                            value-format="YYYY-MM" @change="change">
                        </el-date-picker>
                    </div>
                    <div class="block" v-else-if="ifYear">
                        <el-date-picker v-model="nowDay" type="year" placeholder="Pick a year" format="YYYY"
                            value-format="YYYY" @change="change">
                        </el-date-picker>
                    </div>
                </div>
            </el-card>

        </div>







        <!-- 输入框 -->
        <InputFingerpostComponents ref="inputComponentsRef" :data="nowDay" :iData="iData" />
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
