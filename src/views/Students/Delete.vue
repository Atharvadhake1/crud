<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h4>Delete Student</h4>
      </div>
      <div class="card-body">
        <p>Are you sure you want to delete the student: <strong>{{ student.name }}</strong>?</p>
        <button type="button" class="btn btn-danger" @click="deleteStudent">
          Delete
        </button>
        <RouterLink to="/students" class="btn btn-secondary ml-2">
          Cancel
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "DeleteStudent",
  data() {
    return {
      student: {
        id: "",
        name: "",
        course: "",
        email: "",
        phone: "",
        created_at: "",
      },
    };
  },
  mounted() {
    this.getStudentData(this.$route.params.id);
  },
  methods: {
    getStudentData(studentId) {
  axios.get(`http://localhost:3000/students/${studentId}`).then((res) => {
    this.student = res.data;
    console.log(this.student);  // Log to see if the student data is fetched correctly
  }).catch((err) => {
    console.error("Error fetching student data:", err);
  });
},
    
    deleteStudent() {
      console.log("Delete button clicked");
      axios.delete(`http://localhost:3000/students/${this.student._id}`).then((res) => {
          console.log(res.data.message);
          this.$router.push("/students"); 
        })
        .catch((err) => {
          console.error("Error deleting student:", err);
        });
    },
  },
};
</script>
