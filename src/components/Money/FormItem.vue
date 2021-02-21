<template>
      <div>
          <label class="formItem">
            <span class="name">{{this.fieldName}}</span>
            <input type="text" 
            :value="value"
            @input="onChildChanged($event.target.value)"
            :placeholder="this.placeholder">
          </label>
      </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component,Watch,Prop} from 'vue-property-decorator'

  @Component
  export default class FormItem extends Vue{
    @Prop({default:''}) readonly value!: string

    @Prop({required: true}) fieldName!: string //fieldName! 如不加!,必须要给初始值
    @Prop() placeholder?: string//?表示有可能不存在
    @Watch('value')
        onChildChanged(value: string){
         this.$emit('update:value',value)
        }
  }
</script>

<style lang="scss" scoped>
 .formItem{
     font-size: 14px;
     display: block;
     padding-left:16px;
     display: flex;
     align-items: center;
     .name{
         padding-right: 16px;
     }
     input{
         height: 40px;
         flex-grow: 1;
         background: transparent;
         border: none;
         padding-right: 16px;
     }
 }
</style>