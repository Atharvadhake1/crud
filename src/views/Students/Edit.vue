<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h4>Edit Students</h4>
      </div>
      <div class="card-body">
        <div class="mb-3">
          <label for="">Name</label>
          <input
            type="text"
            v-model="model.student.name"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="">Course</label>
          <input
            type="text"
            v-model="model.student.course"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="">Email</label>
          <input
            type="text"
            v-model="model.student.email"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="">Phone</label>
          <input
            type="text"
            v-model="model.student.phone"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <button type="button" @click="updateStudent" class="btn btn-primary">
            Update
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "studentEdit",
  data() {
    return {
      model: {
        student: {
          name: "",
          course: "",
          email: "",
          phone: "",
        },
      },
    };
  },
  mounted() {
    this.getStudentData(this.$route.params.id);
  },
  methods: {
    
    getStudentData(studentId) {
  axios.get(`http://localhost:3000/students/${studentId}`)
    .then((res) => {
      console.log(res.data);
      this.model.student = res.data;
    })
    .catch((err) => {
      console.error("Error fetching student data:", err);
    });
},
   
    updateStudent() {
      const studentId = this.$route.params.id;
      axios.put(`http://localhost:3000/students/${studentId}/edit`, this.model.student).then((res) => {
          console.log(res.data.message);
          
          this.model.student = {
            name: "",
            course: "",
            email: "",
            phone: "",
          };
        })
        .catch((err) => {
          console.error("Error updating student data:", err);
        });
    },
  },
};
</script>
