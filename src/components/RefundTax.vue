<template>
  <div>
    <div class="search-div">
      <el-form :inline="true" class="demo-form-inline" :model="params">
        <el-form-item label="次运编号">
          <el-input v-model="params.projectId" size="mini" clearable></el-input>
        </el-form-item>
        <el-form-item label="供应商" style="margin-left: 20px">
          <el-input v-model="params.supplier" size="mini" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="initList">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="showDialog">新增</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" size="mini" @click="showRecordDialog">退税记账</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <template>
        <el-table
            @selection-change="handleSelectionChange"
            :data="refundTaxList"
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
              prop="projectId"
              label="次运编号"
              width="100">
          </el-table-column>
          <el-table-column
              prop="brandAttribute"
              label="品牌属性"
              width="100">
          </el-table-column>
          <el-table-column
              prop="demandName"
              width="100"
              label="需方简称">
          </el-table-column>
          <el-table-column
              prop="supplier"
              width="100"
              label="供应商">
          </el-table-column>
          <el-table-column
              prop="receiptName"
              width="100"
              label="发票号">
          </el-table-column>
          <el-table-column
              prop="invoiceAmount"
              width="100"
              label="开票金额">
          </el-table-column>
          <el-table-column
              prop="invoiceTime"
              width="100"
              label="开票日">
          </el-table-column>
          <el-table-column
              prop="taxRate"
              width="100"
              label="税率">
          </el-table-column>
          <el-table-column
              prop="theoryRefundTax"
              width="100"
              label="理论退税">
            <template slot-scope="scope">
              {{ scope.row.theoryRefundTax }}
            </template>
          </el-table-column>
          <el-table-column
              prop="actualRefundTax"
              width="100"
              label="实际退税">
          </el-table-column>
          <el-table-column
              prop="canRefundTax"
              width="100"
              label="可退税">
            <template slot-scope="scope">
              {{ scope.row.canRefundTax === 1 ? '可' : '不可' }}
            </template>
          </el-table-column>
          <el-table-column
              prop="state"
              width="100"
              label="状态">
            <template slot-scope="scope">
              {{ scope.row.state === 1 ? '已退税' : '未退税' }}
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
    <!--弹出框-->
    <el-dialog
        :visible.sync="dialog"
        width="50%">
      <el-form ref="form" :model="refund" size="mini">
        <el-row>
          <el-col :span="9" :offset="2">
            <el-form-item label="次运编号:">
              <el-input size="mini" v-model="refund.projectId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="2">
            <el-form-item label="开票金额:">
              <el-input-number size="mini" v-model="refund.invoiceAmount"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9" :offset="2">
            <el-form-item label="品牌属性:">
              <el-input size="mini" v-model="refund.brandAttribute"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="2">
            <el-form-item label="税率:">
              <el-input size="mini" v-model="refund.taxRate"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9" :offset="2">
            <el-form-item label="需方简称:">
              <el-input size="mini" v-model="refund.demandName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="2">
            <el-form-item label="理论退税:">
              <el-input-number size="mini" v-model="refund.theoryRefundTax"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9" :offset="2">
            <el-form-item label="供应商:">
              <el-input size="mini" v-model="refund.supplier"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="2">
            <el-form-item label="可退税:">
              <el-select v-model="refund.canRefundTax">
                <el-option label="可" value="1"></el-option>
                <el-option label="不可" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9" :offset="2">
            <el-form-item label="发票号:">
              <el-input type="number" size="mini" v-model="refund.receiptName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="2">
            <el-form-item label="开票日:">
              <el-date-picker
                  v-model="refund.invoiceTime"
                  type="date"
                  placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9" :offset="2">
            <el-form-item>
              <el-button type="success" size="mini" @click="save">保存</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="2">
            <el-form-item>
              <el-button type="warning" size="mini" @click="back">返回</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog
        :visible.sync="recordDialog"
        width="70%">
        <el-table
            :data="refundRecordList"
            style="width: 100%">
          <el-table-column
              type="index"
              width="55">
          </el-table-column>
          <el-table-column
              prop="projectId"
              label="次运编号"
              width="100">
          </el-table-column>
          <el-table-column
              prop="demandName"
              width="100"
              label="需方简称">
          </el-table-column>
          <el-table-column
              prop="supplier"
              width="100"
              label="供应商">
          </el-table-column>
          <el-table-column
              prop="invoiceAmount"
              width="100"
              label="开票金额">
          </el-table-column>
          <el-table-column
              prop="invoiceTime"
              width="100"
              label="开票日">
          </el-table-column>
          <el-table-column
              prop="taxRate"
              width="100"
              label="税率">
          </el-table-column>
          <el-table-column
              prop="theoryRefundTax"
              width="100"
              label="理论退税">
          </el-table-column>
          <el-table-column
              width="100"
              label="实际退税">
            <template slot-scope="scope">
              <span>
                <el-input v-model="scope.row.actualRefundTax"></el-input>
              </span>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="success" size="mini" @click="refundAndRecord">保存</el-button>
        <el-button type="warning" size="mini" @click="back">返回</el-button>
    </el-dialog>
  </div>
</template>

<script>
import request from "@/util/request";
import {postRequest} from "@/util/req";

export default {
  name: "RefundTax",
  data() {
    return {
      params: {
        pageNum: 1,
        pageSize: 5,
        projectId: '',
        supplier: '',
        total: 0
      },
      refundTaxList: [],
      multipleSelection: [],
      refundRecordList: [],
      dialog: false,
      recordDialog: false,
      refund: {
        projectId: '',
        brandAttribute: '',
        demandName: '',
        supplier: '',
        receiptName: '',
        invoiceAmount: '',
        invoiceTime: '',
        taxRate: '',
        theoryRefundTax: '',
        actualRefundTax: '',
        canRefundTax: ''
      },
      recordParam: {
        actualRefundTax: ''
      }
    }
  },
  created() {
    this.initList()
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
      request.post('/refundTax/getRefundTaxList', this.params).then(res => {
        this.refundTaxList = res.data.list
        this.params.total = res.data.total
      }).catch(error => {
        console.log(error)
      })
    },
    refundAndRecord() {
      request.post('/refundTax/updateRefundTax',this.refundRecordList).then(res => {
        if (res) {
          this.recordDialog = false
          this.initList()
        }
      })
    },
    showDialog() {
      this.dialog = true
    },
    save() {
      request.post('/refundTax/saveRefundTax', this.refund).then(res => {
        if (res) {
          this.initList()
          this.dialog = false
        }
      }).catch(error => {
        console.log(error)
      })
    },
    back() {
      this.dialog = false
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    showRecordDialog() {
      let ids = [];
      this.multipleSelection.forEach(item => {
        ids.push(item.id)
      })
      if (ids.length < 1) {
        return;
      }
      let data = {'ids': ids}
      this.getRefundTaxByIds(data)
    },
    getRefundTaxByIds(data) {
      postRequest('/refundTax/getRefundTaxByIds', data).then(res => {
        if (res) {
          this.refundRecordList = res.data
          this.recordDialog = true
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>

</style>
