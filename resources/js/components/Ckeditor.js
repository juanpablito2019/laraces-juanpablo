import React, { Component } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/es';


class Ckeditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ""
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.data!=''){
            this.setState({data: nextProps.data});
        }
        if(nextProps.reset){
            this.setState({data: ""});
        }
    }
    render() {
        
        return (
            <>
                <CKEditor
                    editor={ClassicEditor}
                    data={this.state.data}
                    onInit={editor => {
                        // 
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