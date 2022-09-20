<template>
  <div>
    <div class="search-div">
      <el-form :inline="true" class="demo-form-inline" :model="params">
        <el-form-item label="次运编号">
          <el-input v-model="params.projectId" size="mini" clearable maxlength="4"></el-input>
        </el-form-item>
        <el-form-item label="供应商" style="margin-left: 20px">
          <el-select size="mini" placeholder="" clearable>
            <el-input v-model="params.supplier" size="mini"></el-input>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="initList">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="insert">新增</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" size="mini" @click="refundAndRecord">退税记账</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "RefundTax",
  data() {
    return {
      params: {
        pageNum: '',
        pageSize: '',
        projectId: '',
        supplier: ''
      },
      refundTaxList: []
    }
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
