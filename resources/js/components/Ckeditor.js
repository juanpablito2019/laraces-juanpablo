// import React, {Component} from 'react';
// import CKEditor from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import '@ckeditor/ckeditor5-build-classic/build/translations/es';


// class Editor extends Component {
//     render() {
//         return (
//             <div className="Editor">
//                 <CKEditor
//                     editor={ ClassicEditor }
//                     data=""
//                     config={{
//                         language: 'es'
//                     } }
//                     onInit={ editor => {
//                         // You can store the "editor" and use when it is needed.
//                         console.log( 'Editor esta funcionando!', editor );
//                     } }
//                     onChange={ ( event, editor ) => {
//                         const data = editor.getData();
//                         console.log( { event, editor, data } );
//                     } }
//                 />
//             </div>
//         );
//     }
// }

// export default Editor;


// // // funcion //
// // function Editor() {
// //   const [value, setValue ] = useState("");

// //   const handleOnChange = (e,editor) => {
// //     console.log(editor.getData());
// //   }

// //   return(
// //     <CKEditor
// //       editor={ ClassicEditor }
// //       onChange={handleOnChange}
// //     />
// //   )
// // }



// // // Constante //
// // export const Editor = ()=><CKEditor
// // editor={ ClassicEditor }
// // config={{
// //     language: 'es'
// //   }}

// // onChange={ ( event, editor ) => {
// //     const data = editor.getData();
// //     console.log( { event, editor, data } );
// //   } }

// // onBlur={ ( event, editor ) => {
// //     console.log( 'Blur.', editor );
// //   } }

// // onFocus={ ( event, editor ) => {
// //     console.log( 'Focus.', editor );
// //   } }
// // />