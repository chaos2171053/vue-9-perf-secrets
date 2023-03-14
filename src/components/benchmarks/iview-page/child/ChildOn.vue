<template>
  <div :style="{ opacity: number / 300 }">
    <Layout>
      <QueryForm
        :get-list="getList"
        :on-click-add-user-btn="onClickAddUserBtn"
      />
      <Table :columns="columns" :data="listData"></Table>
      <AddUserModel
        :show-add-user-modal.async="showAddUserModal"
        :add-user="addUser"
      />
    </Layout>
  </div>
</template>

<script>
import QueryForm from "./QueryForm";
import AddUserModel from "./AddUserModal.vue";
import { mockListData } from "../utils";
const catImage = require("../cat.jpg");
export default {
  components: {
    QueryForm,
    AddUserModel
  },
  props: ["number"],
  data() {
    return {
      listData: [],
      showAddUserModal: false,
      columns: [
        {
          title: "avatar",
          key: "avatar",
          render: (h, params) => {
            return h("img", {
              style: {
                width: "200px",
                height: "200px"
              },
              attrs: {
                src: catImage
              }
            });
          }
        },
        {
          title: "Name",
          key: "name"
        },
        {
          title: "Age",
          key: "age"
        }
      ]
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList(name, age) {
      setTimeout(() => {
        this.listData = mockListData.filter(item => {
          return (
            (age && age === item.age) ||
            (name && item.name.includes(name)) ||
            (!age && !name)
          );
        });
        this.$Message.success("Success!");
      }, 1000);
    },
    onClickAddUserBtn() {
      this.showAddUserModal = true;
    },
    addUser(name,age) {
      this.showAddUserModal = false;
      mockListData.push({
        id: new Date().getTime(),
        age: Number(age),
        name,
      });
      this.getList()
    }
  }
};
</script>
