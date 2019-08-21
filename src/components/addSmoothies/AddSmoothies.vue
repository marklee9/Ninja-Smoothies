<template>
  <div id="add-smoothies" class="add-smoothie container">
    <h2 class="center-align indigo-text">Add New Smoothie Recipe</h2>
    <form @submit.prevent="addSmoothie">
      <div class="field title">
        <label for="title">Smoothie:</label>
        <input type="text" name="title" v-model="title">
      </div>
      <div class="ingredients">
        <span class="ingredient" v-for="(ing, i) in ingredients" :key="i"> 
          {{ing}}
          <span class="delete" @click="deleteIngredient(i)">X</span>
        </span>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add Ingredient:</label>
        <input type="text" name="add-ingredient" v-model="another" @keydown.tab="addIngredient">
      </div>
      <div class="field center-align">
        <p id ="error-text" class="red-text fadeout">{{ feedback }}</p>
      </div>
      <div class="center-align">
        <button id="add-button" class="btn pink add-smoothie-button">Add Smoothie</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from '@/firebase/init';
import slugify from 'slugify';

export default {
  name: 'AddSmoothie',
  data() {
    return {
      title: null,
      another: null,
      ingredients: [],
      feedback: null,
      slug: null
    }
  },
  methods: {
    addIngredient(e) {
      if (this.another) {
        this.ingredients.push(this.another)
        this.another = this.feedback = null
      } else {
        this.addFeedback("You must add a value to add an ingredient.")
      }
    },
    addSmoothie(e) {
      let { title, ingredients } = this;
      let slugObj = {
        replacement: "-",
        remove: /[$*_+~.()'"!\-:@]/g,
        lower: true
      };
      let slug = slugify(title, slugObj)

      if (title) {
        this.feedback = null;
        db.collection("smoothies")
          .add({title, ingredients, slug})
          .then(() => this.$router.push({ name: 'Index'}))
          .catch((error) => this.addFeedback(error))

      } else {
        this.addFeedback("Please enter title")
      }
    },
    deleteIngredient(index) {
      this.ingredients = this.ingredients.filter((_, i) => i !== index)
    },
    addFeedback(feedback) {
      this.feedback = feedback
      this.fader();
      setTimeout(() => this.fader(), 2000);
      setTimeout(() => this.feedback = null, 3000);
    },
    fader() {
      let errorMessage = document.getElementById("error-text");
      errorMessage.classList.toggle("fadeout");
      errorMessage.classList.toggle("fadein");
    },
  }
}
</script>

<style lang="css">
  div {
    transition: 1s;
  }

  .add-smoothie {
    margin-top: 1rem;
    padding: 20px;
    max-width: 500px;
  }

  .add-smoothie h2 {
    font-size: 2em;
    margin: 20px auto;
  }

  .add-smoothie .field {
    margin: 20px auto;
  }

  .ingredients {
    display: inline-block;
  }

  .ingredients .ingredient {
    color: white;
    border: 0.5px solid rgb(13, 103, 248);
    background-color: rgb(61, 136, 255);
    border-radius: 0.75rem;
    padding: 0.25rem 0.5rem;
    margin: 0.25rem;
  }

  .fadein, .fadeout {
    opacity: 0;
    -moz-transition: opacity 0.5s ease-in-out;
    -o-transition: opacity 0.5s ease-in-out;
    -webkit-transition: opacity 0.5s ease-in-out;
    transition: opacity 0.5s ease-in-out;
  }

  .fadein {
      opacity: 1;
  }

  .delete {
    transform: scaleX(2);
  }
</style>