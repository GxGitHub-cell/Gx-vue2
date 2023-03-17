<template>
  <div class="order">
    <el-card shadow="hover">
      <el-input v-model="keywords" placeholder="请输入商品名称" class="search">
        <el-button
          icon="el-icon-search"
          slot="append"
          @click="search()"
        ></el-button>
      </el-input>

      <el-table :data="orderlist" border stripe>
        <el-table-column prop="order_id" label="订单编号"> </el-table-column>
        <el-table-column prop="order_name" label="商品名称"> </el-table-column>
        <el-table-column prop="order_price" label="订单价格"> </el-table-column>
        <el-table-column prop="order_pay" label="是否付款"> </el-table-column>
        <el-table-column prop="order_send" label="是否发货"> </el-table-column>
        <el-table-column prop="order_time" label="下单时间"> </el-table-column>
        <el-table-column label="操作">
          <!-- 修改訂單按鈕 -->
          <template slot-scope="scope">
            <el-button type="success" @click="modi(scope.row)" size="mini"
              >修改订单</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页效果 -->
      <el-pagination
        :page-size="5"
        layout="prev, pager, next"
        @current-change="currentchange"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 修改订单弹窗 -->
    <el-dialog
      title="修改订单"
      @close="close"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>
        <el-form
          :model="order"
          :rules="ordermodiRules"
          ref="user"
          label-width="100px"
        >
          <el-form-item label="订单编号" prop="id">
            <el-input v-model="order.id" disabled></el-input>
          </el-form-item>
          <el-form-item label="价格" prop="price">
            <el-input v-model="order.price"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      orderlist: [],
      total: 0,
      page: 0,
      dialogVisible: false,
      keywords: "",
      order: { id: "", price: "" },
      ordermodiRules: {
        price: [
          {
            required: true,
            message: "请输入修改后的价格",
            trigger: "blur", //触发时机:失去焦点时
          },
        ],
      },
    };
  },
  methods: {
    //修改订单
    modi(order) {
      this.dialogVisible = true;
      let { order_id, order_price } = order;
      this.order.id = order_id;
      this.order.price = order_price;
    },
    //  搜索接口
    searchReq(callback) {
      this.$axios
        .get("http://127.0.0.1:3000/ordersearch", {
          params: {
            keywords: this.keywords,
          },
        })
        .then((res) => {
          callback(res.data);
        });
    },
    search() {
      if (!this.keywords) return;
      this.searchReq((res) => {
        this.$msgBox(
          `基于关键字${this.keywords}共搜索到${res.data.length}条商品结果`,
          () => {}
        );
      });
    },
    //  修改订单接口
    ordermodiReq(orderid, orderprice, callback) {
      this.$axios
        .get("http://127.0.0.1:3000/ordermodi", {
          params: {
            order_id: orderid,
            order_price: orderprice,
          },
        })
        .then((res) => {
          callback(res.data);
        });
    },
    //弹窗消失触发表单清空事件
    close() {
      this.$refs.user.resetFields();
    },
    /* 修改框确定事件 */
    confirm() {
      this.$refs.user.validate((val) => {
        if (val) {
          this.ordermodiReq(this.order.id, this.order.price, (res) => {
            if (res.code == 1) {
              this.$axios.get("http://127.0.0.1:3000/orderlist").then((res) => {
                this.orderlist = res.data.data.list;
                this.total = res.data.data.total;
              });
              this.$msg("订单修改成功!");
            } else {
              this.$msg(res.msg);
            }
            this.dialogVisible = false;
          });
        }
      });
    },

    // 分页
    currentchange(page) {
      this.$axios
        .get("http://127.0.0.1:3000/orderlist", {
          params: {
            page: page,
          },
        })
        .then((res) => {
          this.orderlist = res.data.data.list;
          this.total = res.data.data.total;
        });
    },
  },
  mounted() {
    //订单列表接口
    this.$axios
      .get("http://127.0.0.1:3000/orderlist", {
        params: {
          page: this.page,
        },
      })
      .then((res) => {
        if (res.data.code == 1) {
          this.orderlist = res.data.data.list;
          this.total = res.data.data.total;
        }
      });
  },
};
</script>
<style scoped lang='less'>
.search {
  width: 200px;
  margin-top: 20px;
  margin-left: 20px;
}
.el-table {
  margin-top: 30px;
}
</style>