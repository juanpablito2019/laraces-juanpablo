import React, {Component} from 'react';

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            committes: null,
            id: null,
            message: null,

        }
    }

    componentDidMount() {
        // this.getCommites();
    }

    render(){
        return (
            <>
                <div className="row">
                        <div className="col">
                                <h3>Comites agregados recientemente</h3>
                        </div>
                </div>
                <div className="row mt-3">
                    
                </div>
                <div className="row">
                        <div className="col-sm-12 col-md-6 col-lg-6 mt-3">
                                <h3>Aprendices recientes en comites</h3>

                                <ul className="list-group ml-5 mr-5 mt-2">
                                    <li className="alert alert-primary">Juan carlos marin soto <span className="alert-warning"> ID 1835415 </span>  </li>

                                    <li className="alert alert-primary">Roberto carlos muñoz <span className="alert-warning"> ID 1835274 </span> </li>

                                    <li className="alert alert-primary">Santiago robledo <span className="alert-warning"> ID 1748562 </span>  </li>
                                </ul>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-6 mt-3">
                                <h3>Grupos</h3>

                                <canvas id="myChart" width="400" height="400"></canvas>
                        </div>
                </div>
            </>
        )
    }


}
export default Home;
