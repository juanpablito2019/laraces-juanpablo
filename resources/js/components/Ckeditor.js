import React, { Component } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/es';


class Ckeditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editor: null,
            data: ""
        }
    }
    render() {
        return (
            <>
                <CKEditor
                    editor={ClassicEditor}
                    onInit={editor => {
                        this.setState({ editor })
                    }}
                    onChange={(e, editor) => {
                        const data = editor.getData();
                        this.setState({data});
                    }}
                    config={{
                        language: 'es'
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