<script setup>
import request from "@/utils/request.js";
import {ElMessage} from "element-plus";

request.get('admin/selectAll').then(res => {
  if (res.code === '200') {
    console.log(res);
  } else {
    ElMessage.error(res.msg);
  }

})
</script>

<template>
<div>
  this is test
</div>
</template>

<style scoped>

</style>