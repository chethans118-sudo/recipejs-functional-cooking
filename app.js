const RecipeApp = (() => {

  // -------------------- Recipe Data --------------------
  const recipes = [
    {
      id: 1,
      name: "Boiled Eggs",
      ingredients: ["Eggs", "Water", "Salt"],
      steps: ["Boil water", "Add eggs", "Cook 10 mins"]
    },
    {
      id: 2,
      name: "Pasta with Sauce",
      ingredients: ["Pasta", "Tomato sauce", "Cheese"],
      steps: [
        "Boil pasta",
        {
          text: "Prepare sauce",
          substeps: ["Heat pan", "Add sauce", "Simmer 5 mins"]
        },
        "Combine pasta and sauce"
      ]
    },
    {
      id: 3,
      name: "Grilled Cheese Sandwich",
      ingredients: ["Bread", "Cheese", "Butter"],
      steps: [
        "Butter the bread",
        "Place cheese between slices",
        "Grill until golden",
        {
          text: "Optional filling",
          substeps: ["Add tomato", "Add herbs"]
        }
      ]
    },
    {
      id: 4,
      name: "Salad",
      ingredients: ["Lettuce", "Tomato", "Cucumber", "Dressing"],
      steps: ["Chop vegetables", "Mix in bowl", "Add dressing"]
    }
  ];

  const recipeContainer = document.getElementById("recipe-container");

  // -------------------- Recursive Steps Rendering --------------------
  const renderSteps = (steps, level = 0) => {
    let html = "<ol>";
    steps.forEach(step => {
      if (typeof step === "string") {
        html += `<li>${step}</li>`;
      } else if (typeof step === "object" && step.substeps) {
        html += `<li>${step.text}${renderSteps(step.substeps, level + 1)}</li>`;
      }
    });
    html += "</ol>";
    return html;
  };

  // -------------------- Create Recipe Card --------------------
  const createRecipeCard = recipe => {
    const card = document.createElement("div");
    card.className = "recipe-card";
    card.dataset.recipeId = recipe.id;

    card.innerHTML = `
      <h3>${recipe.name}</h3>
      <button class="toggle-btn" data-toggle="steps" data-recipe-id="${recipe.id}">Show Steps</button>
      <button class="toggle-btn" data-toggle="ingredients" data-recipe-id="${recipe.id}">Show Ingredients</button>
      <div class="steps-container">${renderSteps(recipe.steps)}</div>
      <div class="ingredients-container"><ul>${recipe.ingredients.map(i => `<li>${i}</li>`).join('')}</ul></div>
    `;

    recipeContainer.appendChild(card);
  };

  // -------------------- Toggle Button Handler --------------------
  const handleToggleClick = e => {
    if (!e.target.classList.contains("toggle-btn")) return;

    const recipeId = e.target.dataset.recipeId;
    const toggleType = e.target.dataset.toggle;

    const container = document.querySelector(`.recipe-card[data-recipe-id="${recipeId}"] .${toggleType}-container`);
    container.classList.toggle("visible");

    e.target.textContent = container.classList.contains("visible")
      ? `Hide ${toggleType.charAt(0).toUpperCase() + toggleType.slice(1)}`
      : `Show ${toggleType.charAt(0).toUpperCase() + toggleType.slice(1)}`;
  };

  // -------------------- Initialize App --------------------
  const init = () => {
    console.log("RecipeApp initializing...");
    recipes.forEach(createRecipeCard);
    recipeContainer.addEventListener("click", handleToggleClick);
    console.log("RecipeApp ready!");
  };

  return { init };

})();

// Run on DOM ready
document.addEventListener("DOMContentLoaded", RecipeApp.init);
