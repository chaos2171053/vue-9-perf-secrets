<template>
<Form ref="queryUserForm" :model="queryUserForm" inline>
      <FormItem prop="name">
        <Input type="text" v-model="queryUserForm.name" placeholder="name">
          <template #prepend>
            <Icon type="ios-person-outline"></Icon>
          </template>
        </Input>
      </FormItem>
      <FormItem prop="age">
        <Select v-model="queryUserForm.age">
          <Option :value="1">1</Option>
          <Option :value="18">18</Option>
          <Option :value="24">24</Option>
          <Option :value="30">30</Option>
        </Select>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit()"
          >Query</Button
        >
        <Button @click="handleReset()" style="margin-left: 8px"
          >Reset</Button
        >
        <Button @click="onClickAddUserBtn" style="margin-left: 8px"
          >Add</Button
        >
      </FormItem>
    </Form>
</template>

<script>
export default {
  props:{
    getList:{
      type:Function,
      default:()=>{}
    },
    onClickAddUserBtn:{
       type:Function,
      default:()=>{}
    }
  },
  data(){
    return {
        queryUserForm: {
        name: "",
        age: 0
      },
    }
  },
  methods:{
    handleSubmit() {
      this.$refs['queryUserForm'].validate(valid => {
        if (valid) {
          const { name, age } = this.queryUserForm;
          this.getList(name, age)
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset() {
      this.$refs['queryUserForm'].resetFields();
    },
  }
}
</script>
