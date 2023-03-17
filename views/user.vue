<template>
  <div class="user">
    <el-card shadow="hover">
      <el-input v-model="keywords" placeholder="请输入商品名称" class="search">
      </el-input>
      <el-button icon="el-icon-search" @click="search"></el-button>
      <el-button type="primary" @click="dialogVisible = true"
        >添加用户</el-button
      >

      <el-table :data="userlist" border stripe>
        <el-table-column prop="name" label="用户名"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="phone" label="手机号"> </el-table-column>

        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-button size="mini" type="success" @click="modi(scope.row)"
              >修改</el-button
            >

            <!-- 删除 -->
            <el-button
              size="mini"
              type="danger"
              @click="deleteMsg(scope.row.name)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分页 -->
    <el-pagination
      :page-size="5"
      layout="prev, pager, next"
      @current-change="currentchange"
      :total="total"
    >
    </el-pagination>
    <!-- 添加用户的对话框 -->
    <el-dialog
      title="添加用户"
      @close="close"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>
        <el-form
          :model="adduser"
          :rules="adduserRules"
          ref="user"
          label-width="100px"
        >
          <el-form-item label="用户名" prop="name">
            <el-input v-model="adduser.name"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="adduser.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="adduser.phone"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户 -->
    <el-dialog
      title="修改用户"
      @close="close"
      :visible.sync="modiVisi"
      width="30%"
    >
      <span>
        <el-form :model="modiuser" ref="user" label-width="100px">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="modiuser.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="modiuser.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="modiuser.phone"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="modiVisi = false">取 消</el-button>
        <el-button type="primary" @click="modiconfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userlist: [],
      page: 0,
      total: 0,
      keywords: "",
      modiVisi: false,
      dialogVisible: false,
      //添加用户的表单数据
      adduser: { name: "", email: "", phone: "" },
      //修改用户的表单数据
      modiuser: { name: "", email: "", phone: "" },

      // adduserRules:{
      name: [
        {
          required: true,
          message: "请输入用户名",
          trigger: "blur",
        },
      ],
      email: [
        {
          required: true,
          message: "请输入邮箱",
          trigger: "blur",
        },
      ],
      phone: [
        {
          required: true,
          message: "请输入手机号",
          trigger: "blur",
        },
      ],
    };

    // }
  },
  methods: {
    // 搜索接口
    searchReq(callback) {
      this.axios
        .get("http://127.0.0.1:3000/usersearch", {
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
        let str = res.data
          .map((item) => {
            return item.name;
          })
          .join(",");
        this.$msgBox(`搜索到用户:${str}`, () => {});
      });
    },
    //添加用户点击确定时按钮事件
    confirm() {
      this.$refs.user.validate((val) => {
        if (val) {
          let { name, email, phone } = this.adduser;
          this.userlist.unshift({ name, email, phone });
          //隐藏添加用户对话框
          this.dialogVisible = false;
        }
      });
    },
    //添加用户弹窗消失触发事件
    close() {
      this.$refs.user.resetFields();
    },
    //修改用户接口
    modiuserReq(user, callback) {
      this.$axios
        .get("http://127.0.0.1:3000/usermodi", {
          params: {
            ...user,
          },
        })
        .then((res) => {
          callback(res.data);
        });
    },
    // 修改用户

    modi(obj) {
      this.modiVisi = true;
      let { name, email, phone } = obj;
      this.modiuser.name = name;
      this.modiuser.email = email;
      this.modiuser.phone = phone;
    },
    //确定修改
    modiconfirm() {
      this.modiuserReq(this.modiuser, (res) => {
        if (res.code == 1) {
          this.$msg("修改用户成功!");
          this.$axios.get("http://127.0.0.1:3000/userlist").then((res) => {
            this.userlist = res.data.data.list;
            this.total = res.data.data.total;
          });
        } else {
          this.$msg(res.msg);
        }
      });
      this.modiVisi = false;
    },
    //删除用户
    userdelete(name, callback) {
      this.$axios
        .get("http://127.0.0.1:3000/userdelete", {
          params: {
            name: name,
          },
        })
        .then((res) => {
          callback(res.data);
        });
    },
    deleteMsg(name) {
      this.$msgBox("此操作将永久删除该用户, 是否继续?", () => {
        this.userdelete(name, (res) => {
          if (res.code == 1) {
            this.$msg("删除用户成功!");
            //重新刷新页面
            this.$axios
              .get("http://127.0.0.1:3000/userlist", {
                params: {
                  page: this.page,
                },
              })
              .then((res) => {
                this.userlist = res.data.data.list;
                this.total = res.data.data.total;
              });
          }
        });

        this.userlist.splice(0, 1);
      });
    },

    // 分页
    currentchange(page) {
      this.$axios
        .get("http://127.0.0.1:3000/userlist", {
          params: {
            page: page-1,
          },
        })
        .then((res) => {
          this.userlist = res.data.data.list;
          this.total = res.data.data.total;
        });
    },
  },
  mounted() {
    this.$axios
      .get("http://127.0.0.1:3000/userlist", {
        params: {
          page: this.page,
        },
      })
      .then((res) => {
        this.userlist = res.data.data.list;
        this.total = res.data.data.total;
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