<template>
    <Layout class-prefix="layout">
       <NumberPad :value.sync="record.amount" @submit="saveRecord" />
       <!-- <Types :value="record.type" @update:value="onUpdateType"/> -->
        <Types :value.sync="record.type"/>
       <Notes field-name="备注" 
              placeholder="在这里输入备注"
              @update:value="onUpdateNotes"/>
       <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
    </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import NumberPad from "@/components/Money/NumberPad.vue"
import Types from "@/components/Money/Types.vue"
import Notes from "@/components/Money/Notes.vue"
import Tags from "@/components/Money/Tags.vue"
import {Component, Watch} from 'vue-property-decorator'
import recordListModel from '@/models/recordListModel'
import tagListMode from '@/models/tagListModel'

const recordList= recordListModel.fetch();
const tagList=tagListMode.fetch()

@Component({
components:{NumberPad,Types,Notes,Tags}
})
export default class Money extends Vue{
tags=tagList;
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
    const record2: RecordItem=recordListModel.clone(this.record)
    record2.createdAt=new Date();
    this.recordList.push(record2)

    // this.recordList.push(this.record)
    // localStorage.setItem('recordList',JSON.stringify(this.recordList))
    console.log(this.recordList)
}
@Watch('recordList')
onRecordListChange(){
    recordListModel.save(this.recordList)
}
}
</script>

<style lang="scss">
.layout-content{
    display: flex;
    flex-direction: column-reverse;
}
</style> 