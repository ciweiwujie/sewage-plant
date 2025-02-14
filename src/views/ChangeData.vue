<script setup>
import requests from '@/assets/requests';
import { reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus';
const router = useRouter()
const fedialogFormVisible = ref(false)
const fcdialogFormVisible = ref(false)
const formLabelWidth = '140px'
const id = ref()
const fedialogShow = (scope) => {
    id.value = scope.row.id
    fedialogFormVisible.value = true
}
const fcdialogShow = (scope) => {
    id.value = scope.row.id
    fcdialogFormVisible.value = true
}
const fechangeData = async () => {
    await feupdateInfo()
    fedialogFormVisible.value = false
    fegetInfo()
}
const fcchangeData = async () => {
    await fcupdateInfo()
    console.log('进入到了fcchangeData函数');
    fcdialogFormVisible.value = false
    fcgetInfo()
}

// fe获取信息
const fegetInfo = () => {
    requests({
        url: '/api/fegetInfo',
        method: 'post',
    }).then((res) => {
        feModelData[0].address = res[0].content
        feModelData[1].address = res[1].content
        feModelData[2].address = res[2].content
        feModelData[3].address = res[3].content
        feModelData[4].address = res[4].content
        feModelData[5].address = res[5].content
    }).catch((err) => {
        console.log(err);
    })
}

// fc获取信息
const fcgetInfo = () => {
    requests({
        url: '/api/fcgetInfo',
        method: 'post',
    }).then((res) => {
        fcModelData[0].address = res[0].content
        fcModelData[1].address = res[1].content
        fcModelData[2].address = res[2].content
        fcModelData[3].address = res[3].content
        fcModelData[4].address = res[4].content
        fcModelData[5].address = res[5].content
        fcModelData[6].address = res[6].content
        fcModelData[7].address = res[7].content
        fcModelData[8].address = res[8].content
        fcModelData[9].address = res[9].content
        fcModelData[10].address = res[10].content
        fcModelData[11].address = res[11].content
        fcModelData[12].address = res[12].content
        fcModelData[13].address = res[13].content
        fcModelData[14].address = res[14].content
        fcModelData[15].address = res[15].content
    }).catch((err) => {
        console.log(err);
    })
}

// fe更新数据
const feupdateInfo = () => {
    return requests({
        url: '/api/feupdate',
        method: 'post',
        data: {
            id: id.value,
            content: form.fe,
        }
    }).then((res) => {
        console.log(res);
        if (res == 1) {
            ElMessage({
                message: '修改成功',
                type: 'success',
            })
        } else {
            ElMessage({
                message: '修改失败',
                type: 'error',
            })
        }
    }).catch((err) => {
        console.log(err);
    })
}


// fc更新数据
const fcupdateInfo = () => {
    return requests({
        url: '/api/fcupdate',
        method: 'post',
        data: {
            id: id.value,
            content: form.fc,
        }
    }).then((res) => {
        console.log(res);
        if (res == 1) {
            ElMessage({
                message: '修改成功',
                type: 'success',
            })
        } else {
            ElMessage({
                message: '修改失败',
                type: 'error',
            })
        }
    }).catch((err) => {
        console.log(err);
    })
}



fcgetInfo()
fegetInfo()


const feModelData = reactive([
    // 下面一个对象是一行
    {
        date: '华北区域电网',
        name: '北京市、天津市、河北省、山西省、山东省、内蒙古自治区b',
        address: 'No. 189, Grove St, Los Angeles',
        id: 1
    },
    {
        date: '东北区域电网',
        name: '辽宁省、吉林省、黑龙江省、内蒙古自治区c',
        address: 'No. 189, Grove St, Los Angeles',
        id: 2
    },
    {
        date: '华东区域电网',
        name: '上海市、江苏省、浙江省、安徽省、福建省',
        address: 'No. 189, Grove St, Los Angeles',
        id: 3
    },
    {
        date: '华中区域电网',
        name: '河南省、湖北省、湖南省、江西省、四川省、重庆市',
        address: 'No. 189, Grove St, Los Angeles',
        id: 4
    },
    {
        date: '西北区域电网',
        name: '陕西省、甘肃省、青海省、宁夏回族自治区、新疆维吾尔自治区',
        address: 'No. 189, Grove St, Los Angeles',
        id: 5
    },
    {
        date: '南方区域电网',
        name: '广东省、广西壮族自治区、云南省、贵州省、海南省',
        address: 'No. 189, Grove St, Los Angeles',
        id: 6
    },
])

const fcModelData = reactive([
    // 下面一个对象是一行
    {
        date: '碱度',
        name: '北京市、天津市、河北省、山西省、山东省、内蒙古自治区b',
        address: 'No. 189, Grove St, Los Angeles',
        id: 1
    },
    {
        date: '氢氧化钠(50% in H2O)',
        name: '辽宁省、吉林省、黑龙江省、内蒙古自治区c',
        address: 'No. 189, Grove St, Los Angeles',
        id: 2
    },
    {
        date: '甲醇',
        name: '上海市、江苏省、浙江省、安徽省、福建省',
        address: 'No. 189, Grove St, Los Angeles',
        id: 3
    },
    {
        date: '聚合氯化铝（PAC）',
        name: '河南省、湖北省、湖南省、江西省、四川省、重庆市',
        address: 'No. 189, Grove St, Los Angeles',
        id: 4
    },
    {
        date: '硫酸铝',
        name: '陕西省、甘肃省、青海省、宁夏回族自治区、新疆维吾尔自治区',
        address: 'No. 189, Grove St, Los Angeles',
        id: 5
    },
    {
        date: '聚丙烯酰胺（PAM）',
        name: '广东省、广西壮族自治区、云南省、贵州省、海南省',
        address: 'No. 189, Grove St, Los Angeles',
        id: 6
    },
    {
        date: '六水三氯化铁',
        name: '广东省、广西壮族自治区、云南省、贵州省、海南省',
        address: 'No. 189, Grove St, Los Angeles',
        id: 7
    },
    {
        date: '石灰',
        name: '广东省、广西壮族自治区、云南省、贵州省、海南省',
        address: 'No. 189, Grove St, Los Angeles',
        id: 8
    },
    {
        date: '其他絮凝剂',
        name: '广东省、广西壮族自治区、云南省、贵州省、海南省',
        address: 'No. 189, Grove St, Los Angeles',
        id: 9
    },
    {
        date: '次氯酸钠（15% in H2O）',
        name: '广东省、广西壮族自治区、云南省、贵州省、海南省',
        address: 'No. 189, Grove St, Los Angeles',
        id: 10
    },
    {
        date: '液氯',
        name: '广东省、广西壮族自治区、云南省、贵州省、海南省',
        address: 'No. 189, Grove St, Los Angeles',
        id: 11
    },
    {
        date: '臭氧（液）',
        name: '广东省、广西壮族自治区、云南省、贵州省、海南省',
        address: 'No. 189, Grove St, Los Angeles',
        id: 12
    },
    {
        date: '双氧水（50% in H2O）',
        name: '广东省、广西壮族自治区、云南省、贵州省、海南省',
        address: 'No. 189, Grove St, Los Angeles',
        id: 13
    },
    {
        date: '其他消毒剂',
        name: '广东省、广西壮族自治区、云南省、贵州省、海南省',
        address: 'No. 189, Grove St, Los Angeles',
        id: 14
    },
    {
        date: '其他药剂',
        name: '广东省、广西壮族自治区、云南省、贵州省、海南省',
        address: 'No. 189, Grove St, Los Angeles',
        id: 15
    }
])


const toLast = () => {
    router.push({ path: '/showstandard' })
}
const form = reactive({
    fe: '',
    fc: ''
})

</script>

<template>
    <!-- fe -->
    <el-dialog v-model="fedialogFormVisible" title="更改默认值" width="500">
        <el-form :model="form">
            <el-form-item label="请输入新的fe" :label-width="formLabelWidth">
                <el-input v-model="form.fe" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="fedialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="fechangeData">
                    确认
                </el-button>
            </div>
        </template>
    </el-dialog>

    <!-- fc -->
    <el-dialog v-model="fcdialogFormVisible" title="更改默认值" width="500">
        <el-form :model="form">
            <el-form-item label="请输入新的fc" :label-width="formLabelWidth">
                <el-input v-model="form.fc" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="fcdialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="fcchangeData">
                    确认
                </el-button>
            </div>
        </template>
    </el-dialog>
    <div>
        <!-- fe -->
        <div class="flex justify-center m-auto rounded-lg flex-col p-4 w-full">
            <el-table :data="feModelData" stripe style="width: 80%" class="m-auto" :row-style="{ height: '50px' }">
                <!-- 下面是三个列 -->
                <el-table-column prop="date" label="电网名称" width="240" />
                <el-table-column prop="name" label="省份" width="520" />
                <el-table-column prop="address" label="fc[kgCO2/(kW.h)]" width="240px" />
                <el-table-column label="修改">
                    <template #default="scope">
                        <el-button size="small" @click="fedialogShow(scope)">
                            修改
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- fc -->
            <el-table :data="fcModelData" stripe style="width: 80%" class="m-auto mt-8" :row-style="{ height: '50px' }">
                <!-- 下面是三个列 -->
                <el-table-column prop="date" label="化学药剂名称" width="500px" />
                <el-table-column prop="address" label="fe[kgCO2/(kW.h)]" width="500px" />
                <el-table-column label="修改">
                    <template #default="scope">
                        <el-button size="small" @click="fcdialogShow(scope)">
                            修改
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>


    </div>

    <el-button @click="toLast" class="flex justify-center m-auto rounded-lg flex-col p-4 w-[80%] mb-10">
        返回上级
    </el-button>
</template>

<style scoped></style>
