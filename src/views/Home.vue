<template>
  <div class="main-page">
    <div class="btn">250px,自动适配</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  mounted () {
  }
}
</script>

<style scoped lang="less">
.btn {
  background: @fcb;
  width: 250px;
  padding: 0 15px;
  height: 45px;
  line-height: 45px;
  position: relative;
  color: #fff;
  border-bottom: 1px solid #ddd;
  text-align: center;
}
</style>
