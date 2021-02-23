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
import {Component, Watch} from 'vue-property-decorator'
import recordListModel from '@/models/recordListModel'
import tagListMode from '@/models/tagListModel'

const recordList= recordListModel.fetch();

@Component({
components:{NumberPad,Types,FormItem,Tags}
})
export default class Money extends Vue{
tags=window.tagList;
 recordList: RecordItem[]=recordList
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
    // const record2: RecordItem=JSON.parse(JSON.stringify(this.record));
    recordListModel.create(this.record)
 
    // this.recordList.push(this.record)
    // localStorage.setItem('recordList',JSON.stringify(this.recordList))
    console.log(this.recordList)
}
@Watch('recordList')
onRecordListChange(){
    recordListModel.save()
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