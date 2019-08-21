<template>
  <div id="index" class="container">
    <div class="card" v-for="{title, id, ingredients, slug} in smoothies" :key="id">
      <div class="card-content">
        <li class="material-icons delete" @click="deleteSmoothie(id, $event)">delete</li>
        <h2 class="indigo-text"> {{ title }} </h2>
        <ul class="ingredients">
          <li v-for="(ing, i) in ingredients" :key="i">
            <span class="chip">{{ ing }}</span>
          </li>
        </ul>
      </div>
      <span class="btn-floating btn-large halfway-fab pink">
        <router-link :to="{name: 'EditSmoothie', params: {smoothie_slug: slug}}">
          <i class="material-icons edit">edit</i>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init'

export default {
  name: 'index',
  data () {
    return {
      smoothies: []
    }
  },
  created () {
    // fetch data from firestore
    db.collection('smoothies').get()
      .then((snapshot) => {
        snapshot.forEach(doc => {
          let smoothie = doc.data();
          smoothie.id = doc.id;
          this.smoothies.push(smoothie);
        });
      })
  },
  methods: {
    deleteSmoothie (id, e) {
      e.target.parentElement.parentElement.classList.add("fade-out");
      setTimeout(() => {
        db.collection('smoothies').doc(id).delete()
          .then(() => this.smoothies = this.smoothies.filter((item) => item.id !== id));
        }, 300);
    } 
  }
}
</script>

<style scoped lang="css">
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 20px;
    margin-top: 60px;
  }

  .container h2 {
    font-size: 1.8em;
    text-align: center;
    margin-top: 0;
  }

  .container .ingredients {
    margin: 30px auto;
  }

  .container .ingredients li {
    display: inline-block;
  }

  .container .delete {
    position: absolute;
    top: 4px;
    right: 4px;
    cursor: pointer;
    color: #aaa;
    font-size: 1.4em;
  }

  .fade-out {
    visibility: hidden;
    opacity: 0;
    transition: 0.5s;
  }
</style>