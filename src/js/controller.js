import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

import icons from "url:../img/icons.svg";
import "core-js/stable";
import "regenerator-runtime/runtime";

const recipeContainer = document.querySelector(".recipe");

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

//external function
const renderSpinner = function (parentEl) {
  const markup = `
  <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div> 
  `;
  parentEl.innerHTML = "";
  parentEl.insertAdjacentHTML("afterbegin", markup);
};

// async function
const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;
    renderSpinner(recipeContainer);

    // 1) Loading recipe

    await model.loadRecipe(id);
    const { recipe } = model.state;

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

["hashchange", "load"].forEach((ev) => window.addEventListener(ev, showRecipe));

// window.addEventListener("hashchange", showRecipe);
// window.addEventListener("load", showRecipe);
