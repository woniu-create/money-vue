<template>
    <div class="nav-wrapper">
     <div class="content">
        <slot/>
     </div>
      <Nav/>
    </div>
</template>

<script lang="ts">
    export default {
        
    }
</script>

<style lang="scss" scoped>
 .nav-wrapper{
     border: 1px solid green;
     display: flex;
     flex-direction: column;
     height: 100vh;
 }
 .content{
     border: 1px solid blue;
     overflow: auto;
     flex-grow: 1;//把所有高度给content,剩下的给Nav
 }

</style> 