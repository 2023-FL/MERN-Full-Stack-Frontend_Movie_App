import { createWebHistory, createRouter } from "vue-router";
import Home from './components/Home.vue'
import About from './components/About.vue';
import NotFound from './components/NotFound.vue';
import DetailsFilm from './components/DetailsFilm.vue';
import DetailsMovie from './components/DetailsMovie.vue';
import user from './components/user.vue';
import staff from './components/staff.vue';
import StaffAccount from './components/StaffAccount.vue';
import UserFilm from './components/UserFilm.vue';

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/film/:id",
    name: "DetailsFilm",
    component: DetailsFilm
  },
  {
    path: "/d/:id",
    name: "DetailsMovie",
    component: DetailsMovie
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound
  },
  {
    path: "/user",
    name: "user",
    component: user
  },
  {
    path: "/staff",
    name: "staff",
    component: staff
  },
  {
    path: "/staffaccount",
    name: "StaffAccount",
    component: StaffAccount
    //props: (route) => ({ endcodedToken: route.params.endcodedToken }),
  },
  {
    path: "/ofilm/:title",
    name: "UserFilm",
    component: UserFilm
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;