<template>
    <Layout class-prefix="layout">
        {{record}}
       <NumberPad @update:value="onUpdateAmount"/>
       <Types :value="record.type" @update:value="onUpdateType"/>
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
import {Component} from 'vue-property-decorator'

type Record={
    tags: string[];
    notes: string;
    type: string;
    amount: number;
}

@Component({
components:{NumberPad,Types,Notes,Tags}
})
export default class Money extends Vue{
tags=['衣','食','住','行','打牌']
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
onUpdateType(value: string){
    // console.log(value)
    this.record.type=value
}
onUpdateAmount(value: string){
//   console.log(value)
  this.record.amount=parseFloat(value)
}
}
</script>

<style lang="scss">
.layout-content{
    display: flex;
    flex-direction: column-reverse;
}
</style> 