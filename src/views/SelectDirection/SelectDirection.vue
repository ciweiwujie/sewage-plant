<script setup>
import router from '@/router';
const toInputStandard = () => {
    router.push('/inputstandard')
}
const toInputEvaSta = () => {
    router.push('/inputevasta')
}
const toInputFingerpost = () => {
    router.push('/inputfingerpost')
}
// localStorage.setItem('test', 'test')
// sessionStorage.setItem('test', 'test')
// const test = 1.2222
// console.log(test.toFixed(2), 'test');

</script>

<template>
    <div class="flex flex-col">
        <div class="flex justify-around h-20 pl-40 basis-1/5">
            <div>
                <img src="https://www.gds-huanbaogroup.com/templates/guangye/static/image/logo1.png" alt="广东环保">
            </div>
            <div class="pr-24">
                <img src="/src/images/standardselect1.png" alt="危机变革">
            </div>
        </div>
        <div class="flex justify-around bg-white px-8 py-4 font-bold text-5xl text-center z-10 basis-1/5">
            城镇污水处理厂绿色低碳建设（绿色标杆厂）评价
        </div>
        <div class="flex justify-center pt-2 basis-3/5">
            <el-card style="width: 370px" :body-style="{padding: '0px' }" class=" p-0 hover:shadow-[15px_15px_35px_10px_rgba(0,0,0,0.3)]" @click="toInputStandard">
                <div class="h-4 bg-green-800"></div>
                <div class="p-4 text-left text-3xl text-green-800 font-bold h-40 cursor-pointer">
                    污水处理厂低碳运行评价技术规范
                    <!-- (01standard) -->
                </div>
                <div class="p-4 text-lg">
                    <div>中国环境保护产业协会</div>
                    <div>发布日期：2022.07.01</div>
                </div>
                <div class="p-4 text-lg">
                    本标准适用于污水处理厂碳排放强度核算和低碳运行水平评价。
                </div>
            </el-card>
            <el-card style="width: 370px" :body-style="{padding: '0px' }" class=" mx-8  hover:shadow-[15px_15px_35px_10px_rgba(0,0,0,0.3)]" @click="toInputFingerpost" >
                <div class="h-4 bg-orange-400"></div>
                <div class="p-4 text-left text-3xl text-orange-400 font-bold h-40 cursor-pointer">
                    大气污染物与温室气体融合排放清单编制技术指南（试行）
                    <!-- (03fingerpost) -->
                </div>
                <div class="p-4 text-lg">
                    <div>生态环境部</div>
                    <div>发布日期：2024.01</div>
                </div>
                <div class="p-4 text-lg">
                    本指南适用于城镇污水处理厂采用物理、化学、生物方法处理城镇污水所产生的污染物去除量及温室气体排放量核算
                </div>
            </el-card>
            <el-card style="width: 370px" :body-style="{padding: '0px' }" class="  hover:shadow-[15px_15px_35px_10px_rgba(0,0,0,0.3)]" @click="toInputEvaSta">
                <div class="h-4 bg-green-400"></div>
                <div class="p-4 text-left text-3xl text-green-400 font-bold h-40 cursor-pointer">
                    城镇污水处理厂碳减排评估标准指南（试行）
                    <!-- (02evaSta) -->
                </div>
                <div class="p-4 text-lg">
                    <div>中国环境保护产业协会</div>
                    <div>发布日期：2024.03.21</div>
                </div>
                <div class="p-4 text-lg">
                    <div>本标准适用于已建成的城镇污水处理厂的碳排放量化报告编写、碳减排节点分析和问题识别、碳减排方案编制和污水厂碳中和方案可行性分析。</div>
                    <div>本标准适用于新建和改扩建的城镇污水处理厂在设计阶段进行全生命周期碳排放量的估算和制定低碳工艺路径。</div>
                    
                </div>
            </el-card>
        </div>
    </div>

</template>
