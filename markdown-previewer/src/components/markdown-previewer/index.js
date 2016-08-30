import React, {Component} from 'react';
import marked from 'marked';

import './style.scss';

export default class MarkdownPreviewer extends Component {

    SAMPLE_MARKDOWN = MarkdownPreviewer.getSampleMarkdown();

    state = {
        input: this.SAMPLE_MARKDOWN,
        output: marked(this.SAMPLE_MARKDOWN),
    };

    onInputChange = (e) => {
        const input = e.target.value;
        this.setState({
            input,
            output: marked(input),
        });
    };

    render () {
        const {input, output} = this.state;
        return (
            <div className="markdown-previewer container">
                <div className="col-md-6 col-sm-12">
                    <textarea
                        className="markdown-previewer__textarea form-control"
                        id="input"
                        value={input}
                        onChange={this.onInputChange}>
                    </textarea>
                </div>
                <div className="col-md-6 col-sm-12" dangerouslySetInnerHTML={{__html: output}}></div>
            </div>
        )
    }

    static getSampleMarkdown = function () {
        return 'Head\n=======\n\nSub-head\n--\n \n### Another deeper heading\n \nParagraphs are separated\nby a blank line.\n\nLeave 2 spaces at the end of a line to do a  \nline break\n\nText attributes *italic*, **bold**, \n`monospace`, ~~strikethrough~~ .\n\nShopping list:\n\n  * apples\n  * oranges\n  * pears\n\nNumbered list:\n\n  1. apples\n  2. oranges\n  3. pears\n\n *[Alexander Gazizov](https://www.freecodecamp.com/alexandr-bbm)*'
    };
}