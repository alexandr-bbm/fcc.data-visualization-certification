import React, {PropTypes} from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import ContentClear from 'material-ui/svg-icons/content/clear';
import IconButton from 'material-ui/IconButton';

import './style.scss';

export default class DialogEdit extends React.Component {

    static propTypes = {
        open: PropTypes.bool.isRequired,
        onSubmit: PropTypes.func.isRequired,
        onClose: PropTypes.func.isRequired,
        initialItem: PropTypes.object,
    };

    /**
     *  Item - recipe.
     */
    state = {
        item: this.props.initialItem,
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.initialItem !== this.state.item) {
            this.setState({ item: nextProps.initialItem });
        }
    }

    handleClose = () => {
        this.setState({
            item: this.props.initialItem
        });
        this.props.onClose();
    };

    handleSubmit = () => {
        this.props.onSubmit(this.state.item);
        this.props.onClose();
    };

    deleteIngredient = (i) => {
        const ingredients = this.state.item.ingredients.slice();
        ingredients.splice(i, 1);
        this.setState({
            item: {
                ...this.state.item,
                ingredients
            }
        })
    };

    handleIngredientChange = (e, i) => {
        let ingredients = this.state.item.ingredients.slice();
        ingredients[i] = e.target.value;
        this.setState({
            item: {
                ...this.state.item,
                ingredients: [...ingredients, ]
            }
        })
    };

    handleTitleChange = (e) => {
        this.setState({
            item: {
                ...this.state.item,
                title: e.target.value
            }
        })
    };

    handleAddIngredient = () => {
        this.setState({
            item: {
                ...this.state.item,
                ingredients: [...this.state.item.ingredients, '']
            }
        })
    };

    render () {
        const {open} = this.props;
        const {item} = this.state;
        let formDisabled;
        if (item) {
            formDisabled = item.ingredients.some(ingredient => ingredient == '') || item.title === '';
        } else {
            formDisabled = false
        }
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
                disabled={formDisabled}
            />
        ];
        return (
            <Dialog
                actions={actions}
                open={open}
                onRequestClose={this.handleClose}
                title='Edit the recipe'
                contentStyle={{'width': '600px'}}
                autoScrollBodyContent={true}
            >
            <TextField
                floatingLabelText='Title'
                value={item? item.title : ''}
                onChange={this.handleTitleChange}
                fullWidth={true}
            />
            <p style={{'marginTop': '20px'}} >Ingredients</p>
                {item ? item.ingredients.map((ingredient, i) => {
                    return (
                        <div key={item.id + '-' + i}>
                            <div className="recipe-edit__ingredient-row">
                                <div className="recipe-edit__ingredient-col">
                                    <TextField value={ingredient}
                                               id={item.id + '-' + i}
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
                    )}) : null
                }
                <FlatButton
                    label="Add ingredient"
                    onTouchTap={this.handleAddIngredient}
                />
        </Dialog>
        )
    }
}
