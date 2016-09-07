import React from 'react';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';

import IconButton from 'material-ui/IconButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ActionDelete from 'material-ui/svg-icons/action/delete';


import './style.scss';

export default class RecipeCard extends React.Component {

    state = {

    };

    handleDelete = () => {
        const {recipe, onDelete} = this.props;
        onDelete(recipe.id, this.closeConfirmDialog);
    };

    handleChange = (recipe) => {
        this.props.onRecipeChange(recipe.id, recipe);
    };

    processChangeIngredient(newIngredients) {
        const {recipe, onRecipeChange} = this.props;
        onRecipeChange(recipe.id, {
            ...recipe,
            ingredients: newIngredients
        });
    }

    render () {
        const {recipe, onEditRequest, onDeleteRequest} = this.props;
        return (
            <div className="recipe-card">
                <Card>
                    <CardHeader
                        title={recipe.title}
                        actAsExpander={true}
                        showExpandableButton={true}
                    />
                    <CardText expandable={true}>
                        <List>
                            <div className="ingredients-row cleaarfix">
                                <div className="ingredients-col ingredients-col_title">Ingredients</div>
                                <div className="ingredients-col ingredients-col_right">
                                    <IconButton tooltip="Edit"
                                                onTouchTap={() => onEditRequest(recipe.id)}>
                                        <ContentCreate />
                                    </IconButton>
                                    <IconButton touch={true}
                                                onTouchTap={() => onDeleteRequest(recipe.id)}>
                                        <ActionDelete />
                                    </IconButton>
                                </div>

                            </div>
                            {recipe.ingredients.map((ingredient, i) => {
                                return (
                                    <div key={i}>
                                        <ListItem primaryText={ingredient} disabled={true} />
                                        <Divider />
                                    </div>
                                )
                            })}
                        </List>
                    </CardText>

                </Card>
            </div>
        );
    }


};