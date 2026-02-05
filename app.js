// State
let currentFilter = 'all';
let currentSort = 'none';

// DOM References
const recipeContainer = document.querySelector('#recipe-container');
const filterButtons = document.querySelectorAll('#filter-buttons button');
const sortButtons = document.querySelectorAll('#sort-buttons button');

// --- Pure Filter Functions ---
const filterByDifficulty = (recipes, difficulty) => {
  if (difficulty === 'all') return recipes;
  return recipes.filter(recipe => recipe.difficulty === difficulty);
};

const filterByTime = (recipes, maxTime) => {
  return recipes.filter(recipe => recipe.time <= maxTime);
};

const applyFilter = (recipes, filterType) => {
  switch (filterType) {
    case 'easy': return filterByDifficulty(recipes, 'easy');
    case 'medium': return filterByDifficulty(recipes, 'medium');
    case 'hard': return filterByDifficulty(recipes, 'hard');
    case 'quick': return filterByTime(recipes, 30);
    default: return recipes;
  }
};

// --- Pure Sort Functions ---
const sortByName = (recipes) => [...recipes].sort((a, b) => a.title.localeCompare(b.title));
const sortByTime = (recipes) => [...recipes].sort((a, b) => a.time - b.time);

const applySort = (recipes, sortType) => {
  switch (sortType) {
    case 'name': return sortByName(recipes);
    case 'time': return sortByTime(recipes);
    default: return recipes;
  }
};

// --- Render Recipes (from Part 1) ---
const createRecipeCard = (recipe) => {
  return `
  <div class="recipe-card" data-id="${recipe.id}">
    <h3>${recipe.title}</h3>
    <div class="recipe-meta">
      <span>⏱️ ${recipe.time} min</span>
      <span class="difficulty ${recipe.difficulty}">${recipe.difficulty}</span>
    </div>
    <p>${recipe.description}</p>
  </div>
  `;
};

const renderRecipes = (recipesToRender) => {
  recipeContainer.innerHTML = recipesToRender.map(createRecipeCard).join('');
};

// --- Update Display ---
const updateDisplay = () => {
  let recipesToDisplay = applyFilter(recipes, currentFilter);
  recipesToDisplay = applySort(recipesToDisplay, currentSort);
  renderRecipes(recipesToDisplay);
  updateActiveButtons();
};

// --- Update Active Button Styles ---
const updateActiveButtons = () => {
  filterButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === currentFilter);
  });
  sortButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.sort === currentSort);
  });
};

// --- Event Listeners ---
const setupEventListeners = () => {
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      currentFilter = btn.dataset.filter;
      updateDisplay();
    });
  });

  sortButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      currentSort = btn.dataset.sort;
      updateDisplay();
    });
  });
};

// --- Initialize ---
updateDisplay();
setupEventListeners();
