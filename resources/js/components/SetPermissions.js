import React, { Component } from 'react';

class SetPermissions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            permissions:[],
            permis: null,
            content:[],
            idRol: null,
            response:Boolean(0)
        }

    }

    Permissions(name) {

        var arreglo = JSON.parse(localStorage.getItem( "permis"));
        var idRol = JSON.parse(localStorage.getItem( "rol_id"));


        var bool = Boolean(0);


        if(idRol == 1){
            bool = true
            this.setState({ response: bool});

        }else{
            arreglo.map(element => {
                if(element == name){
                    bool = true

                    this.setState({ response: bool});
                }
            });

        }


        localStorage.setItem( "bool", JSON.stringify( bool ) ) ;
        return bool

    }

    componentDidMount() {
        this.Permissions(this.props.permis);
    }


    render() {
        return (
            <>
                {this.state.response?(
                    <div className="SetPermissions">
                        {this.props.children}
                    </div>
                ):(
                    <div className="NotSetPermissions">

                    </div>

                )}

            </>
         );
    }
}






export default SetPermissions;
