import React, { Component } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/es';

const editorConfiguration = {
    removePlugins: [
    'Essentials', // deshacer, rehacer
    'MediaEmbed', // Subir video
    'Table', // Tabla
    'ImageUpload', // Subir imagen
    'Bold', // Negrita
    'Italic', // Cursiva
    'Heading', // Encabezado
    'BulletedList',
    'Link', // Enlace
    'List', // Lista de puntos, Lista numerada
    'Paragraph' // Deshabilita comillas
    ]
};


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
                    config={{
                        language: 'es',
                    }}
                    onInit={editor => {
                        this.setState({ editor })
                    }}
                    onChange={(e, editor) => {
                        const data = editor.getData();
                        this.setState({data});
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