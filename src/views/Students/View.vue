<template>
    <div class ="container">
        <div class="card">
            <div class="card-header">
                <h4>
                    Students
                    <RouterLink to ="/students/create" class= "btn btn-primary float-end">
                        Add Students
                    </RouterLink>
                </h4>
            </div>
        
            <div class="card-body">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Course</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Created At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for = "(student, index) in this.students"   :key = "student._id">
                            <td>{{student._id}}</td>
                            <td>{{student.name}}</td>
                            <td>{{student.course}}</td>
                            <td>{{student.email}}</td>
                            <td>{{student.phone}}</td>
                            <td>{{student.created_at}}</td>
                            <td>
                            <RouterLink :to="{ path:'/students/'+ student._id+'/edit'}" class= "btn btn-success">
                                Edit
                            </RouterLink>
                            <RouterLink :to="{ path: '/students/' + student._id + '/delete' }" class="btn btn-danger">
                                Delete
                            </RouterLink>
                            </td>

                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "Students",
    data() {
        return {
            students: []
        }
    },
    mounted() {
        this.getStudents();
    },
    methods: {
        async getStudents() { 
            try {
                const res = await axios.get("http://localhost:3000/students");
                this.students = res.data; // Assign the response directly
                console.log("Fetched students:", this.students);
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        }
    }
}
</script>