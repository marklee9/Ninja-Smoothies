import Vue from 'vue';
import Router from 'vue-router';
import Index from '../components/index/Index.vue';
import AddSmoothie from '../components/addSmoothies/AddSmoothies.vue';
import EditSmoothie from '../components/editSmoothies/EditSmoothies.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/add-smoothie',
      name: 'AddSmoothie',
      component: AddSmoothie
    },
    {
      path: '/edit-smoothie/:smoothie_slug',
      name: 'EditSmoothie',
      component: EditSmoothie
    }
  ]
});
