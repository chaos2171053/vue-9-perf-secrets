<template>
  <Modal
    v-model="showModel"
    title="Add user"
    @on-ok="onAddUserOk"
    @on-cancel="onAddUserCancel"
  >
    <Form ref="addUserForm" :model="addUserForm" :rules="addUserFormRules">
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
</template>

<script>
export default {
  props: {
    addUser: {
      type: Function,
      default: () => {}
    },
    showAddUserModal: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    showModel: {
      get() {
        return this.showAddUserModal;
      },
      set(value) {
        this.$emit("update:show-add-user-model", value);
      }
    }
  },
  data() {
    return {
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
    onAddUserOk() {
      this.$refs["addUserForm"].validate(valid => {
        if (valid) {
          const {name,age} = this.addUserForm
          this.addUser(name,age);
          this.showModel = false;
          this.$Message.success("success!");
          this.$emit('update:show-add-user-modal')
          this.$refs["addUserForm"].resetFields();
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    onAddUserCancel() {
      this.showModel = false;
      this.$refs["addUserForm"].resetFields();
    }
  }
};
</script>
