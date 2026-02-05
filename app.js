(() => {
  // ====== State ======
  const state = {
    recipes: [
      {
        id: 1,
        title: "Spaghetti Carbonara",
        description: "Classic Italian pasta dish",
        ingredients: ["spaghetti", "eggs", "bacon", "parmesan"],
        steps: ["Boil pasta", "Cook bacon", "Mix eggs & cheese", "Combine all"]
      },
      {
        id: 2,
        title: "Tomato Soup",
        description: "Comforting tomato soup",
        ingredients: ["tomatoes", "onion", "garlic", "cream"],
        steps: ["Saute onion & garlic", "Add tomatoes", "Simmer", "Blend & serve"]
      },
      {
        id: 3,
        title: "Pancakes",
        description: "Fluffy breakfast pancakes",
        ingredients: ["flour", "milk", "eggs", "sugar", "baking powder"],
        steps: ["Mix dry ingredients", "Add wet ingredients", "Cook on skillet"]
      },
      // Add more recipes as needed
    ],
    searchQuery: "",
    favoritesOnly: false,
    favorites: JSON.parse(localStorage.getItem("recipeFavorites")) || [],
  };

  // ====== DOM References ======
  const recipeContainer = document.getElementById("recipe-container");
  const searchInput = document.getElementById("search-input");
  const clearSearchBtn = document.getElementById("clear-search");
  const favoritesBtn = document.getElementById("favorites-only-btn");
  const recipeCounter = document.getElementById("recipe-counter");

  // ====== Helpers ======
  const saveFavorites = () => {
    localStorage.setItem("recipeFavorites", JSON.stringify(state.favorites));
  };

  const toggleFavorite = (id) => {
    const index = state.favorites.indexOf(id);
    if (index === -1) state.favorites.push(id);
    else state.favorites.splice(index, 1);
    saveFavorites();
    updateDisplay();
  };

  const isFavorited = (id) => state.favorites.includes(id);

  const createRecipeCard = (recipe) => {
    const card = document.createElement("div");
    card.className = "recipe-card";
    card.innerHTML = `
      <h2>${recipe.title}</h2>
      <p>${recipe.description}</p>
      <ul>
        ${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}
      </ul>
      <button class="favorite-btn ${isFavorited(recipe.id) ? "favorited" : ""}" data-id="${recipe.id}">&#10084;</button>
    `;
    return card;
  };

  const applyFilters = () => {
    let filtered = state.recipes;

    // Search filter
    if (state.searchQuery.trim()) {
      const q = state.searchQuery.toLowerCase();
      filtered = filtered.filter(r => 
        r.title.toLowerCase().includes(q) ||
        r.ingredients.some(i => i.toLowerCase().includes(q))
      );
    }

    // Favorites-only filter
    if (state.favoritesOnly) {
      filtered = filtered.filter(r => isFavorited(r.id));
    }

    return filtered;
  };

  const updateDisplay = () => {
    recipeContainer.innerHTML = "";
    const filtered = applyFilters();
    filtered.forEach(r => recipeContainer.appendChild(createRecipeCard(r)));
    recipeCounter.textContent = `Showing ${filtered.length} of ${state.recipes.length} recipes`;
  };

  // ====== Event Handlers ======
  let debounceTimer;
  searchInput.addEventListener("input", (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      state.searchQuery = e.target.value;
      updateDisplay();
      clearSearchBtn.hidden = !state.searchQuery;
    }, 300);
  });

  clearSearchBtn.addEventListener("click", () => {
    searchInput.value = "";
    state.searchQuery = "";
    clearSearchBtn.hidden = true;
    updateDisplay();
  });

  favoritesBtn.addEventListener("click", () => {
    state.favoritesOnly = !state.favoritesOnly;
    favoritesBtn.textContent = state.favoritesOnly ? "Showing Favorites" : "Favorites Only";
    updateDisplay();
  });

  recipeContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("favorite-btn")) {
      const id = parseInt(e.target.dataset.id);
      toggleFavorite(id);
    }
  });

  // ====== Init ======
  const init = () => {
    console.log("App initialized!");
    updateDisplay();
  };

  init();
})();
