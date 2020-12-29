<template>
    <div id="revenueStatisticsView">

        <div style="width: 100%;text-align:right">
<!--            <el-button @click="getM()">总店报表</el-button>-->
            <el-button @click="dialogTableVisible = true ,getAllStore()">商户报表</el-button>
        </div>

        <div id="main" style="width: 600px;height:400px;float: left">
        </div>
        <div id="main1" style="width: 600px;height:400px;float: left">
        </div>

        <el-dialog title="商户列表" :visible.sync="dialogTableVisible" width="70%">
            <el-input
                    v-model="search"
                    @input="getAllStore"
                    size="mini"
                    placeholder="输入商户名搜索"/>
            <el-table
                    :data="storeData"
                    style="width: 100%"
                    @row-dblclick="dblclick"
            >
                <el-table-column
                        label="商铺名"
                        width="">
                    <template slot-scope="scope">
                        <i class="el-icon-house"></i>
                        <span style="margin-left: 10px">{{ scope.row.name }}</span>
                    </template>
                </el-table-column>

                <el-table-column
                        label="地址"
                        width="">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top">
                            <p>地址: {{ scope.row.address }}</p>
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{ scope.row.phone}}</el-tag>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage4"
                    :page-sizes="[5, 10, 20, 50]"
                    :page-size="5"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>


        </el-dialog>


    </div>
</template>

<script>
    export default {
        name: "revenueStatisticsView",
        data() {
            return {

                dialogTableVisible: false,
                total: 0,
                page: '',
                rows: '',
                storeData: [],
                currentPage4: 1,

                //    查询条件
                search: '',

                //销售总额
                saleM: [],
                //总收益
                rentalM: [],
                //净收益
                netRentalM: [],
                //商户收益
                storeRentalM: []

            }
        },
        methods: {
            handleSizeChange(val) {
                console.log(val)
            },
            handleCurrentChange(val) {
                console.log(val)
            },
            getAllStore() {
                var _this = this;
                var params = new URLSearchParams();
                params.append("page", _this.page);
                params.append("rows", _this.rows);
                params.append("name", _this.search);

                this.$axios.post("queryAllStore.action", params)
                    .then(function (result) {
                        _this.storeData = result.data.rows;
                        _this.total = result.data.total;
                    })
                    .catch(function (error) {
                        alert(error)
                    })
            },

            dblclick(row) {
                var _this = this
                _this.getM(row.storeId)
                _this.dialogTableVisible = false
            },
            getM(storeid) {
                var _this = this;

                _this.saleM = [];
                _this.rentalM = [];
                _this.netRentalM = [];
                _this.storeRentalM = [];
                var params = new URLSearchParams();
                params.append("year", 2020);
                if (storeid != null) {
                    params.append("storeid", storeid);
                }
                this.$axios.post("HouQueryStatisticsYear.action", params)
                    .then(function (result) {
                        for (var i = 1; i <= 12; i++) {
                            //销售总额
                            if (result.data[i].sale === undefined) {
                                _this.saleM.push(0)
                            } else {
                                _this.saleM.push(result.data[i].sale)
                            }
                            //总收益
                            if (result.data[i].rental === undefined) {
                                _this.rentalM.push(0)
                            } else {
                                _this.rentalM.push(result.data[i].rental)
                            }
                            //商户收益
                            if (result.data[i].storeRental === undefined) {
                                _this.storeRentalM.push(0)
                            } else {
                                _this.storeRentalM.push(result.data[i].storeRental)
                            }
                            //净赚
                            if (result.data[i].netRental === undefined) {
                                _this.netRentalM.push(0)
                            } else {
                                _this.netRentalM.push(result.data[i].netRental)
                            }
                        }
                        if (storeid != null) {
                            _this.storeEcharts()
                        } else {
                            _this.myEcharts()
                        }

                    })
                    .catch(function (error) {
                        alert(error)
                    })
            },


            storeEcharts() {


                var _this = this;
                // 基于准备好的dom，初始化echarts实例
                var myChart = this.$echarts.init(document.getElementById('main1'));

                // 指定图表的配置项和数据
                var option = {
                    title: {
                        text: ''
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    legend: {
                        data: ['销售总额']
                    },
                    xAxis: {
                        data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
                    },
                    yAxis: {
                        type: 'value',
                        name: '单位（元）',
                    },
                    series: [
                        {
                            name: '销售总额',
                            type: 'line',
                            data: _this.saleM
                        }
                    ]
                };

                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            },


            myEcharts() {
                var _this = this;
                // 基于准备好的dom，初始化echarts实例
                var myChart = this.$echarts.init(document.getElementById('main'));

                // 指定图表的配置项和数据
                var option = {
                    title: {
                        text: ''
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    legend: {
                        data: ['总销售额', '总收益', '净收入']
                    },
                    xAxis: {
                        data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
                    },
                    yAxis: {
                        type: 'value',
                        name: '单位（元）',
                    },
                    series: [
                        {
                            name: '总销售额',
                            type: 'line',
                            data: _this.saleM
                        },
                        {
                            name: '总收益',
                            type: 'line',
                            data: _this.rentalM
                        },
                        {
                            name: '净收入',
                            type: 'line',
                            data: _this.netRentalM
                        }
                    ]
                };

                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            }
        },
        mounted() {
            this.getM();
            this.myEcharts();
        }
    }
</script>

<style>

</style>