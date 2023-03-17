
function msg(info) {
    //判断message是否存在,不存在弹出信息,存在则不弹出
    let doms = document.getElementsByClassName('el-message')[0];
    if (!doms) {
        this.$message(info);
    }
};

function msgBox(alert,callcack){
    this.$confirm(alert, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        callcack();
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '操作已取消'
        });  
    });        
}

export {msg,msgBox};