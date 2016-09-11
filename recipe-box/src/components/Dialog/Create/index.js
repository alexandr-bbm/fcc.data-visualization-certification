import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import ContentClear from 'material-ui/svg-icons/content/clear';
import IconButton from 'material-ui/IconButton';

export default class DialogCreate extends React.Component {

    initialRecipe = {
        title: '',
        ingredients: ['' , '']
    };

    state = {
        recipe: this.initialRecipe
    };

    deleteIngredient = (i) => {
        const ingredients = this.state.recipe.ingredients.slice();
        ingredients.splice(i, 1);
        this.setState({
            recipe: {
                ...this.state.recipe,
                ingredients
            }
        })
    };

    handleClose = () => {
        this.setState({
           recipe: this.initialRecipe
        });
        this.props.onClose();
    };

    handleSubmit = () => {
        this.props.onSubmit(this.state.recipe);
        this.handleClose();
    };

    handleIngredientChange = (e, i) => {
        let ingredients = this.state.recipe.ingredients.slice();
        ingredients[i] = e.target.value;
        this.setState({
            recipe: {
                ...this.state.recipe,
                ingredients: [...ingredients, ]
            }
        })
    };

    handleTitleChange = (e) => {
        this.setState({
            recipe: {
                ...this.state.recipe,
                title: e.target.value
            }
        })
    };

    handleAddIngredient = () => {
        this.setState({
            recipe: {
                ...this.state.recipe,
                ingredients: [...this.state.recipe.ingredients, '']
            }
        })
    };

    render () {
        const {open} = this.props;
        const {recipe} = this.state;
        const formDisabled = recipe.ingredients.some(ingredient => ingredient == '') || recipe.title === '';
        const actions = [
            <FlatButton
                label="Cancel"
                onTouchTap={this.handleClose}
                style={{'marginRight': '15px'}}
            />,
            <RaisedButton
                label="Create"
                primary={true}
                onTouchTap={this.handleSubmit}
                disabled={formDisabled}
            />
        ];
        return (
            <Dialog
                actions={actions}
                open={open}
                onRequestClose={this.handleClose}
                title='Add the recipe'
                contentStyle={{'width': '600px'}}
                autoScrollBodyContent={true}
            >
                <TextField
                    floatingLabelText='Title'
                    value={recipe.title}
                    onChange={this.handleTitleChange}
                    fullWidth={true}
                />
                <p style={{'marginTop': '20px'}} >Ingredients</p>
                {recipe.ingredients.map((ingredient, i) => {
                    return (
                        <div key={ingredient.id + '-' + i}>
                            <div className="recipe-edit__ingredient-row">
                                <div className="recipe-edit__ingredient-col">
                                    <TextField value={ingredient}
                                               id={ingredient.id + '-' + i}
                                               onChange={e => {this.handleIngredientChange(e, i)}}
                                               fullWidth={true}
                                    />
                                </div>
                                <div className="recipe-edit__ingredient-col">
                                    <IconButton onTouchTap={this.deleteIngredient.bind(this, i)}>
                                        <ContentClear color="#676767" />
                                    </IconButton>
                                </div>
                            </div>
                        </div>
                    )
                })
                }
                <FlatButton
                    label="Add ingredient"
                    onTouchTap={this.handleAddIngredient}
                />,
            </Dialog>
        )
    }
}
