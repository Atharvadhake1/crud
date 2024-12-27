import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StudentView from '../views/Students/View.vue';
import StudentCreate from '../views/Students/Create.vue';
import StudentEdit from '../views/Students/Edit.vue';
import DeleteStudent from '../views/Students/Delete.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/students",
      name: "students",
      component: StudentView,
    },
    {
      path: "/students/create",
      name: "studentCreate",
      component: StudentCreate,
    },
    {
      path: "/students/:id/edit",
      name: "studentEdit",
      component: StudentEdit,
    },
    {
      path: "/students/:id/delete",
      name: "DeleteStudent",
      component: DeleteStudent,
    },
  ],
});

export default router