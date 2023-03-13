<template>
  <Layout>
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
        <Button type="primary" @click="handleSubmit('queryUserForm')"
          >Query</Button
        >
        <Button @click="handleReset('queryUserForm')" style="margin-left: 8px"
          >Reset</Button
        >
        <Button @click="showAddUserModel=true" style="margin-left: 8px">Add</Button>
      </FormItem>
    </Form>
    <Table :columns="columns" :data="listData"></Table>

    <Modal
      v-model="showAddUserModel"
      title="Add user"
      @on-ok="onAddUserOk"
      @on-cancel="onAddUserCancel"
    >
      <Form
        ref="addUserForm"
        :model="addUserForm"
        :rules="addUserFormRules"
      >
        <FormItem prop="name" label="name">
          <Input type="text" v-model="addUserForm.name" placeholder="name">
            <template #prepend>
              <Icon type="ios-person-outline"></Icon>
            </template>
          </Input>
        </FormItem>
        <FormItem prop="age" label="age">
          <Select v-model="addUserForm.age">
            <Option value="1">1</Option>
            <Option value="18">18</Option>
            <Option value="24">24</Option>
            <Option value="30">30</Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
  </Layout>
</template>

<script>
import { mockListData } from "./utils";
export default {
  data() {
    return {
      queryUserForm: {
        name: "",
        age: 0
      },
      columns: [
        {
          title: "Name",
          key: "name"
        },
        {
          title: "Age",
          key: "age"
        }
      ],
      listData: mockListData,
      showAddUserModel: false,
      addUserForm: {
        name: "",
        age: 0
      },
      addUserFormRules: {
        name: [
          {
            required: true,
            message: "Please fill in the name",
            trigger: "blur"
          }
        ],
        age: [
          { required: true, message: "Please select age.", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {

          const { name, age } = this.queryUserForm;

          this.listData = mockListData.filter(item => {
            return (
              (age && age === item.age) ||
              (name && item.name.includes(name)) ||
              (!age && !name)
            );
          });
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    onAddUserOk() {
      this.$refs['addUserForm'].validate(valid => {
        if (valid) {
          const { name, age } = this.addUserForm;
          this.listData.push({
            id:new Date().getTime(),
            name,
            age:Number(age)
          })
          this.showAddUserModel =false
        } else {
          this.$Message.error('Fail!');
        }
      });
    },
    onAddUserCancel() {
      this.handleReset('addUserForm')
      this.showAddUserModel =false
    },
  }
};
</script>

<style scoped></style>
