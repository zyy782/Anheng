<template>
  <div class="hello">
    <!-- <h1>{{ msg }}</h1> -->
    <div class="con-header">
      <h1>TO DO List</h1>
    </div>
    <div class="con-body">
      <input type="text" v-model="todoData" @keydown="doAdd($event)" />
      <!-- <button @click="doAdd($event)">添加</button> -->
      <h2>未完成   {{ undoSize.length }}</h2>
      <!-- <h2>未完成</h2> -->
      <ul>
        <template v-for="(item, index) in list">
          <li :key="index" v-if="!item.checked">
            <input type="checkbox" v-model="item.checked" @change="saveList()" />
            {{ item.title }} ------
            <button @click="removeDo(index)">删除</button>
          </li>
        </template>
      </ul>
      <h2>已完成   {{ doSize.length }}</h2>
      <!-- <h2>已完成</h2> -->
      <ul>
        <template v-for="(item, index) in list">
          <li :key="index" v-if="item.checked">
            <input type="checkbox" v-model="item.checked" @change="saveList()" />
            {{ item.title }} ------
            <button @click="removeDo(index)">删除</button>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>
<script>
import storage from '../storage.js'
export default {
  name: 'Content',
  data() {
    return {
      todoData: '',
      list: [],
      undoSize: [],
      doSize: []
    }
  },
  methods: {
    // tolistHasKeyWord(list, keyWords) {
    //   if (!keyWords) return false;
    //   for (let i = 0; i < list.length; i++) {
    //     if (list[i].title == keyWords) {
    //       return true;
    //     }
    //   }
    //   return false;
    // },
    doAdd(e) {
      // console.log(e.keyCode)
      if (this.todoData!='') {
        if (e.keyCode === 13) {
          this.list.push({
            title: this.todoData,
            checked: false
          })
          this.todoData=""
          storage.setItem('list', this.list)

          this.undoSize.push({
            title: this.todoData,
            checked: false
          })
          storage.setItem('list', this.list)
          storage.setItem('undoSize', this.undoSize)
          storage.setItem('doSize', this.doSize)
        }
      } else {
        // alert('请输入内容')
      }
    },

    // if (e.keyCode === 13 && this.keyWords) {
    //   if (!this.tolistHasKeyWord(this.list, this.keyWords)) {
    //     this.list.push({
    //       title: this.todoData,
    //       checked: false
    //     });
    //   }else{
    //     alert("输入的内容重复啦")
    //   }
    // }
    // this.todoData = "";
    removeDo(index) {
      this.list.splice(index, 1)
      storage.setItem('list', this.list)

      //置空
      this.undoSize = []
      this.doSize = []
      var list = storage.getItem('list') //获取最新数据
      if (list) {
        this.list = list
      }
      // console.log(this.list);
      for (var i = 0; i < this.list.length; i++) {
        //遍历最新数据，根据状态checked往undoSize：[]和doSize：[]添加数据对象
        if (this.list[i].checked == false) {
          this.undoSize.push(this.list[i])
          storage.setItem('undoSize', this.undoSize)
        } else {
          this.doSize.push(this.list[i])
          storage.setItem('doSize', this.doSize)
        }
      }
    },
    saveList() {
      // localStorage.setItem('list', JSON.stringify(this.list))
      storage.setItem('list', this.list)
      this.undoSize = []
      this.doSize = []
      var list = storage.getItem('list')
      if (list) {
        this.list = list
      }
      for (var i = 0; i < this.list.lenhth; i++) {
        if (this.list[i].checked == false) {
          this.undoSize.push(this.list[i])
          storage.setItem('undoSize', this.undoSize)
        } else {
          this.doSize.push(this.list[i])
          storage.setItem('doSize', this.doSize)
        }
      }
    }
  },
  // 刷新vue即可触发
  mounted() {
    console.log(2222)
    var list = storage.getItem('list')
    if (list) {
      this.list = list
    }
    for (var i = 0; i < this.list.lenhth; i++) {
      if (this.list[i].checked == false) {
        this.undoSize.push(this.list[i])
        storage.setItem('undoSize', this.undoSize)
      } else {
        this.doSize.push(this.list[i])
        storage.setItem('doSize', this.doSize)
      }
    }
  }
}
</script>

<style scoped>
ul,
li {
  padding: 0;
  margin: 0;
  list-style: none;
}
</style>
