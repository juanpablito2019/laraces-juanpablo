import React, { Component } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/es';

/* 
    "selectAll",
    "undo",
    "redo",
    "bold",
    "italic",
    "blockQuote",
    "ckfinder",
    "imageTextAlternative",
    "imageUpload",
    "heading",
    "imageStyle:full",
    "imageStyle:side",
    "indent",
    "outdent",
    "link",
    "numberedList",
    "bulletedList",
    "mediaEmbed",
    "insertTable",
    "tableColumn",
    "tableRow",
    "mergeTableCells",
*/



class Ckeditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "",
            config: {
                language: 'es'
            },
        }
    }

    UNSAFE_componentWillMount() {
        if (this.props.options) {
            let newConfig = this.state.config;
            newConfig.toolbar = this.props.options;
            this.setState({ config: newConfig });
        }
    }
    render() {

        return (
            <>
                <CKEditor
                    editor={ClassicEditor}
                    config={{
                        language: 'es',
                    }}
                    data={this.props.d}
                    onInit={editor => {
                        let d = editor.getData();
                        this.setState({data: d});
                        // console.log(Array.from(editor.ui.componentFactory.names()))
                    }}
                    config={this.state.config}
                    onChange={(e, editor) => {
                        const data = editor.getData();
                        this.setState({ data });
                    }}
                />
                <textarea
                    className="d-none"
                    name={this.props.name}
                    id={this.props.id}
                    defaultValue={this.state.data}
                ></textarea>
            </>
        );
    }
}

export default Ckeditor;