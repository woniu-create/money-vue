<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord" />
     <Tabs :data-source="recordTypeList" :value.sync="record.type"/>
    <div class="notes">
      <FormItem
        field-name="备注"
        placeholder="在这里输入备注"
        :value="record.notes"
        @update:value="onUpdateNotes"
      />
    </div>
    <Tags @update:value="record.tags=$event"/>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import FormItem from "@/components/Money/FormItem.vue";
import Tags from "@/components/Money/Tags.vue";
import Tabs from "@/components/Tabs.vue"
import recordTypeList from '@/constants/recordTypeList'
import { Component } from "vue-property-decorator";

@Component({
  components: { Tabs,NumberPad, FormItem, Tags },
})
export default class Money extends Vue {
  get recordList() {
    return this.$store.state.recordList;
  }
  recordTypeList = recordTypeList;
  record: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
  };

  created() {
    this.$store.commit("fetchRecords");
  }
  onUpdateNotes(value: string) {
    // console.log(value);
    this.record.notes = value;
  }
  // onUpdateType(value: string){
  //     // console.log(value)
  //     this.record.type=value
  // }
  onUpdateAmount(value: string) {
    //   console.log(value)
    this.record.amount = parseFloat(value);
  }
  saveRecord() {
   if(!this.record.tags||this.record.tags.length===0){
     return window.alert('请至少选择一个标签')
   }
    //  store.createRecord(this.record)
    this.$store.commit("createRecord", this.record);
    if(this.$store.state.createRecordError === null) {
      window.alert('已保存')
      this.record.notes=''
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .layout-content {
  display: flex;
  flex-direction: column-reverse;
}
.notes {
  padding: 12px 0;
}
</style>
