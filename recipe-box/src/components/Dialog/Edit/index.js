import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import ContentClear from 'material-ui/svg-icons/content/clear';
import IconButton from 'material-ui/IconButton';

export default class DialogEdit extends React.Component {

    state = {
        recipe: this.props.initialRecipe,
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
           recipe: this.props.initialRecipe
        });
        this.props.onClose();
    };

    handleSubmit = () => {
        this.props.onSubmit(this.state.recipe);
        this.props.onClose();
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
        const actions = [
            <FlatButton
                label="Cancel"
                onTouchTap={this.handleClose}
                style={{'marginRight': '15px'}}
            />,
            <RaisedButton
                label="Save changes"
                primary={true}
                onTouchTap={this.handleSubmit}
            />
        ];
        return (
            <Dialog
                actions={actions}
                open={open}
                onRequestClose={this.handleClose}
                title='Edit the recipe'
                contentStyle={{'width': '370px'}}
                autoScrollBodyContent={true}
            >
                <TextField
                    floatingLabelText='Title'
                    value={recipe.title}
                    onChange={this.handleTitleChange}
                />
                <p style={{'marginTop': '20px'}} >Ingredients</p>
                {recipe.ingredients.map((ingredient, i) => {
                    return (
                        <div key={recipe.id + '-' + i}>
                            <TextField value={ingredient}
                                       id={recipe.id + '-' + i}
                                       onChange={(e) => {this.handleIngredientChange(e, i)}}
                            />
                            <IconButton onTouchTap={this.deleteIngredient.bind(this, i)}>
                                <ContentClear />
                            </IconButton>
                        </div>
                    )})
                }
                <FlatButton
                    label="Add"
                    onTouchTap={this.handleAddIngredient}
                />,
            </Dialog>
        )
    }
}
