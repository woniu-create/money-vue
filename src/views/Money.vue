<template>
    <Layout class-prefix="layout">
        {{record}}
       <NumberPad :value.sync="record.amount" @submit="saveRecord" />
       <!-- <Types :value="record.type" @update:value="onUpdateType"/> -->
        <Types :value.sync="record.type"/>
        <div class="notes">
       <FormItem field-name="备注" 
              placeholder="在这里输入备注"
              @update:value="onUpdateNotes"/>
       </div>
       <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
    </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import NumberPad from "@/components/Money/NumberPad.vue"
import Types from "@/components/Money/Types.vue"
import FormItem from "@/components/Money/FormItem.vue"
import Tags from "@/components/Money/Tags.vue"
import {Component} from 'vue-property-decorator'
import store from '@/store/index2';



@Component({
components:{NumberPad,Types,FormItem,Tags}
})
export default class Money extends Vue{
tags=store.tagList;
 recordList=store.recordList;
record: RecordItem={
    tags:[],notes:'',type: '-',amount:0
}


onUpdateTags(value: string[]){
// console.log(value);
 this.record.tags = value
}
onUpdateNotes(value: string){
    // console.log(value);
 this.record.notes = value
}
// onUpdateType(value: string){
//     // console.log(value)
//     this.record.type=value
// }
onUpdateAmount(value: string){
//   console.log(value)
  this.record.amount=parseFloat(value)
}
saveRecord(){
   store.createRecord(this.record)
}
}
</script>

<style lang="scss">
.layout-content{
    display: flex;
    flex-direction: column-reverse;
}
  .notes{
    padding: 12px 0;
  }
</style> 