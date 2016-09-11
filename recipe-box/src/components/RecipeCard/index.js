import React, {PropTypes} from 'react';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';

import IconButton from 'material-ui/IconButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ActionDelete from 'material-ui/svg-icons/action/delete';


import './style.scss';

export default class RecipeCard extends React.Component {

    static propTypes = {
        recipe: PropTypes.object.isRequired,
        onEditRequest: PropTypes.func.isRequired,
        onDeleteRequest: PropTypes.func.isRequired,
    };

    state = {
        expanded: false,
    };

    handleExpandChange = expanded => {
        this.setState({expanded: expanded});
    };

    render () {
        const {recipe, onEditRequest, onDeleteRequest} = this.props;
        return (
            <div className="recipe-card">
                <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
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
                                                onTouchTap={onEditRequest}>
                                        <ContentCreate color="#00BCD4" />
                                    </IconButton>
                                    <IconButton onTouchTap={onDeleteRequest}>
                                        <ActionDelete color="#FF4081" />
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