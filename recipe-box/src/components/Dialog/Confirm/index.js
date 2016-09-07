import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

export default class DialogConfirm extends React.Component {
    render () {
        const {open, onConfirm, onClose, idToDelete} = this.props;
        const actions = [
            <FlatButton
                label="Cancel"
                onTouchTap={onClose}
                style={{'marginRight': '15px'}}
            />,
            <RaisedButton
                label="Delete"
                primary={true}
                onTouchTap={() => {
                    onConfirm(idToDelete);
                    onClose();
                }}
            />,
        ];
        return (
            <Dialog
                actions={actions}
                modal={false}
                open={open}
                onRequestClose={onClose}
                contentStyle={{'width': '300px'}}
                title="Are you sure?"
            >
                The action will delete the recipe.
            </Dialog>
        )
    }
}
