import { forEach } from 'lodash';
import React, { Component } from 'react';

class SetPermissions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            permissions:[],
            permis:null,
            content:[],
            response:Boolean(0)
        }

    }

    async getPermission() {
        let data = await fetch('/userPermissions');
        let res = await data.json();

        let permis =  this.props.permis;

        localStorage.setItem( "permis", JSON.stringify( res ) ) ;

            res.forEach(element => {
                localStorage.setItem( "idRol", JSON.stringify( element.pivot.role_id  ) ) ;
            });

        this.setState({ permissions: res });
        this.setState({ permis: permis });

    }

    Permissions(name) {

        var arreglo = JSON.parse(localStorage.getItem( "permis"));
        var idRol = JSON.parse(localStorage.getItem( "idRol"));

        var bool = Boolean(0);

        arreglo.map(element => {
            if(element == name){
                bool = true

                this.setState({ response: bool});
            }
        });

        if(idRol == 1){
            bool = true
            this.setState({ response: bool});
        }


        localStorage.setItem( "bool", JSON.stringify( bool ) ) ;
        return bool

    }

    componentDidMount() {
        this.getPermission();
        this.Permissions(this.props.permis);
    }


    render() {
        // const { response } = JSON.parse(localStorage.getItem( "bool"));
        // console.log(response)
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
