import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import DialogCreate from 'components/Dialog/Create';
import DialogConfirm from 'components/Dialog/Confirm';
import DialogEdit from 'components/Dialog/Edit';
import shortid from 'shortid';


import RecipeCard from 'components/RecipeCard';

import './style.scss';

injectTapEventPlugin();

const MOCK_RECIPES = [
    {
        id: shortid.generate(),
        title: 'Arugula and Watermelon Salad',
        ingredients: [
            '2 (5 ounce) packages arugula',
            '1/2 large watermelon, seeded and cubed',
            '1 red onion, sliced',
            '1 cup crumbled feta cheese'
        ],
    },
    {
        id: shortid.generate(),
        title: 'Summer Chicken Burgers',
        ingredients: [
            '1 ripe avocado, sliced',
            '1 tablespoon lemon juice',
            '1 tablespoon butter',
            '1 large Vidalia onions, sliced into rings',
            '4 boneless, skinless chicken breast halves',
            'salt and pepper to taste',
            '4 hamburger buns',
            '4 tablespoons mayonnaise',
            '4 slices provolone cheese'
        ],
    },
    {
        id: shortid.generate(),
        title: 'Borsch – The Russian Beetroot Soup',
        ingredients: ["4 qt. water", "14 oz. beef stock", "1 small head of cabbage", "5 large potatoes", "1 large carrot", "1 med. beet root", "1 med. onion", "1 bay leaf", "2 tablespoons tomato paste", "3-5 cloves garlic", "verdure (parsley, dill, etc.)", "sour cream"]
    },
    {
        id: shortid.generate(),
        title: 'Russian Herring Under Fur Coat Salad (Shuba or Seledka Pod Shuboi)',
        ingredients: ["3 large potatoes boiled in their jackets, cooled, peeled and finely chopped or shredded", "4 large unppeeled carrots, boiled, cooled, peeled and finely chopped or shredded", "3 large beets boiled in their skins, cooled, peeled and finely chopped or shredded", "1 1/2 cups mayonnaise", "1 medium or large (depending on tastes) red or yellow onion, finely chopped", "4 fillets of pickled herring in oil, finely chopped", "4 large hard-cooked eggs, finely chopped", "Black pepper", "Parsley or dill for garnish (optional)"]
    },
];

export default class RecipeBox extends React.Component {

    state = {
        recipes: [],
        openCreateDialog: false,
        openConfirmDialog: false,
        openEditDialog: false,
        _recipeIdToDelete: '',
    };

    STORAGE_KEY = 'recipes';

    componentDidMount () {
        const localRecipes = this.getRecipesFromLocalStorage();
        this.setState({
            recipes: localRecipes ? localRecipes : MOCK_RECIPES
        })
    }

    handleRecipeDelete = (recipeId) => {
        const recipes = this.state.recipes
            .slice()
            .filter((recipe) => recipe.id !== recipeId);
        this.saveRecipesToLocalStorage(recipes);
        this.setState({recipes})
    };

    handleRecipeChange = (recipeId, editedRecipe) => {
        const recipes = this.state.recipes.slice();
        this.setState({
            recipes: recipes.map((recipe) => recipe.id === recipeId ? editedRecipe : recipe)
        })
    };

    handleRecipeAdd = (newRecipe) => {
        const newRecipeWithId = {...newRecipe, id: shortid.generate()};
        const recipes = [...this.state.recipes, newRecipeWithId];
        this.saveRecipesToLocalStorage(recipes);
        this.setState({recipes})
    };

    saveRecipesToLocalStorage (recipes) {
        localStorage[this.STORAGE_KEY] = JSON.stringify(recipes);
    }

    getRecipesFromLocalStorage () {
        const localRecipes = localStorage[this.STORAGE_KEY];
        if (localRecipes) return JSON.parse(localRecipes);
        return '';
    }

    render () {
        const {recipes, openCreateDialog, openConfirmDialog, openEditDialog, _recipeIdToDelete} = this.state;

        return (
            <MuiThemeProvider>
                <div className="recipe-box-wrapper">
                    <div className="recipe-box">
                        {recipes.map((recipe, i) => {
                            return (
                                <RecipeCard recipe={recipe}
                                            key={i}
                                            onEditRequest=""
                                            onDeleteRequest={(recipeId) => this.openConfirmDialog(recipeId)}
                                />
                            )
                        })}
                    </div>
                    <FloatingActionButton mini={true}
                                          style={{'position': 'fixed', 'top': '20px', 'right': '20px'}}
                                          onTouchTap={this.openCreateDialog}
                    >
                        <ContentAdd />
                    </FloatingActionButton>
                    <DialogCreate open={openCreateDialog}
                                  onSubmit={this.handleRecipeAdd}
                                  onClose={this.closeCreateDialog}
                    />
                    <DialogConfirm open={openConfirmDialog}
                                   idToDelete={_recipeIdToDelete}
                                   onConfirm={this.handleRecipeDelete}
                                   onClose={this.closeConfirmDialog}
                    />
                </div>
            </MuiThemeProvider>
        )
    }

    closeCreateDialog = () => this.setState({openCreateDialog: false});
    openCreateDialog = () => this.setState({openCreateDialog: true});
    openConfirmDialog = (recipeId) => {
        this.setState({
            openConfirmDialog: true,
            _recipeIdToDelete: recipeId
        });
    };
    openEditDialog = () => this.setState({openEditDialog: true});
    closeEditDialog = () => this.setState({openEditDialog: false});
    closeConfirmDialog = () => this.setState({openConfirmDialog: false});
}



