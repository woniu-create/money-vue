<template>
    <Layout class-prefix="layout">
        {{recordList}}
       <NumberPad :value.sync="record.amount" @submit="saveRecord" />
       <!-- <Types :value="record.type" @update:value="onUpdateType"/> -->
        <Types :value.sync="record.type"/>
       <Notes @update:value="onUpdateNotes"/>
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
// import model from '@/model.js'
const {model}=require('@/views/model.js')//析构赋值

const recordList: Record[]=model.fetch()
type Record={
    tags: string[];
    notes: string;
    type: string;
    amount: number;//数据类型
    // createAt: Date|undefined;//类/构造函数
    createAt?: Date;//类/构造函数
}

@Component({
components:{NumberPad,Types,Notes,Tags}
})
export default class Money extends Vue{
tags=['衣','食','住','行','打牌'];
 recordList: Record[]=recordList
record: Record={
    tags:[],notes:'',type: '-',amount:0
}


onUpdateTags(value: string[]){
// console.log(value);
 this.record.tags = value
}
onUpdateNotes(value: string){
    // console.log(value);gggg
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
    const record2: Record=JSON.parse(JSON.stringify(this.record));
    record2.createAt=new Date();
    this.recordList.push(record2)

    // this.recordList.push(this.record)
    // localStorage.setItem('recordList',JSON.stringify(this.recordList))
    console.log(this.recordList)
}
@Watch('recordList')
onRecordListChange(){
    window.localStorage.setItem('recordList',JSON.stringify(this.recordList))
}
}
</script>

<style lang="scss">
.layout-content{
    display: flex;
    flex-direction: column-reverse;
}
</style> 