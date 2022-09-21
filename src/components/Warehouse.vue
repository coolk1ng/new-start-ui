<template>
  <div>
    <div class="search-div">
      <el-form :inline="true" class="demo-form-inline" :model="params">
        <el-form-item label="商品名">
          <el-input v-model="params.goodsName" size="mini" clearable></el-input>
        </el-form-item>
        <el-form-item label="仓库" style="margin-left: 20px">
          <el-select v-model="params.warehouse" size="mini" placeholder="" clearable>
            <el-option v-for="item in warehouseParam" :key="item.id" :label="item.wareName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="initList">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="insert">新增</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" size="mini" @click="remove">删除</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <template>
        <el-table
            @selection-change="handleSelectionChange"
            :data="warehouseList"
            style="width: 100%">
          <el-table-column
              type="selection"
              width="55">
          </el-table-column>
          <el-table-column
              type="index"
              width="55">
          </el-table-column>
          <el-table-column
              prop="goodsName"
              label="商品名"
              width="300">
          </el-table-column>
          <el-table-column
              prop="wareName"
              label="仓库"
              width="300">
          </el-table-column>
          <el-table-column
              prop="quantity"
              width="300"
              label="数量">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                  size="mini" type="text" @click="showDialog(scope.row)">编辑
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <div style="float: right">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="params.pageNum"
          :page-size="params.pageSize"
          :total="params.total"
          background
          layout="total, prev, pager, next">
      </el-pagination>
    </div>
    <el-dialog
        :visible.sync="dialog"
        width="50%">
      <el-form ref="form" :model="warehouse" size="mini">
        <el-row>
          <el-form-item label="商品名:">
            <el-input size="mini" v-model="warehouse.goodsName"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="仓库:">
            <el-select v-model="warehouse.warehouse" size="mini">
              <el-option v-for="item in warehouseParam" :key="item.id" :label="item.wareName"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="数量:">
            <el-input size="mini" v-model="warehouse.quantity"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item>
            <el-button type="primary" size="mini" @click="update">保存</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>

import request from "@/util/request";
import {postRequest} from "@/util/req";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Warehouse",
  data() {
    return {
      params: {
        pageNum: 1,
        pageSize: 5,
        goodsName: '',
        warehouse: '',
        total: 0
      },
      dialog: false,
      warehouse: {
        goodsName: '',
        wareName: '',
        warehouse: '',
        quantity: ''
      },
      warehouseParam: [],
      warehouseList: [],
      multipleSelection: []
    }
  },
  created() {
    this.initList()
    this.getAllWarehouse()
  },
  methods: {
    /**
     * 分页数量改变
     * @param val
     */
    handleSizeChange(val) {
      this.params.pageSize = val;
      this.initList();
    },
    /**
     * 分页页数改变
     * @param val
     */
    handleCurrentChange(val) {
      this.params.pageNum = val;
      this.initList();
    },
    initList() {
      request.post('/warehouse/getWarehouseList', this.params).then(res => {
        this.warehouseList = res.data.list
        this.params.total = res.data.total
      }).catch(error => {
        console.log(error)
      })
    },
    showDialog(row) {
      this.getAllWarehouse()
      this.warehouse = row
      this.dialog = true
    },
    getAllWarehouse() {
      request.post('/warehouse/getAllWarehouse').then(res => {
        if (res) {
          this.warehouseParam = res.data
        }
      })
    },
    update() {
      request.post('/warehouse/saveAndUpdateWarehouse', this.warehouse).then(res => {
        if (res) {
          this.dialog = false
        }
      }).catch(error => {
        console.log(error)
      })
    },
    insert() {
      this.dialog = true
    },
    remove() {
      let ids = [];
      this.multipleSelection.forEach(item => {
        ids.push(item.id)
      })
      let data = {'ids': ids}
      postRequest('/warehouse/deleteWarehouse',data).then(res=> {
        if (res) {
          this.initList()
        }
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style scoped>

</style>
