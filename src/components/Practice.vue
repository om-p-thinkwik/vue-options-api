<script>
export default {
  data() {
    return {
      name: 'John Doe',
      status: 'active',
      tasks: ['Task One', 'Task Two', 'Task Three'],
      newTask: '',
    }
  },
  methods: {
    toggleStatus() {
      if (this.status === 'active') {
        this.status = 'pending'
      } else if (this.status === 'pending') {
        this.status = 'inactive'
      } else {
        this.status = 'active'
      }
    },
    addTask() {
      if (this.newTask.trim() !== '') {
        this.tasks.push(this.newTask)
        this.newTask = ''
      }
    },
    deleteTask(index) {
      this.tasks.splice(index, 1)
    },
  },
  mounted() {
    try {
      const response = fetch('https://jsonplaceholder.typicode.com/todos')
      const data = response.json()
      this.tasks = data.map((task) => task.title)
    } catch (error) {
      console.log('Error fetching tasks')
    }
  },
}
</script>

<template>
  <h1>{{ name }}</h1>
  <p v-if="status === 'active'">User is active</p>
  <p v-else-if="status === 'pending'">User is pending</p>
  <p v-else>User is inactive</p>

  <form @submit.prevent="addTask">
    <label for="newTask">Add Task</label>
    <input type="text" id="newTask" name="newTask" v-model="newTask" />
    <button type="submit">Submit</button>
  </form>

  <h3>Tasks:</h3>
  <ul>
    <li v-for="(task, index) in tasks" :key="task">
      <span>{{ task }}</span>
      <button @click="deleteTask(index)">Delete</button>
    </li>
  </ul>
  <br />
  <button @click="toggleStatus">Change Status</button>
</template>
