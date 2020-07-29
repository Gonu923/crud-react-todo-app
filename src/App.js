import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      title: "React todo app", 
      act: 0,
      index: '', 
      datas: []
    }

  }
  componentDidMount(){
    this.refs.item.focus();
  }
  itemAdd = (e) =>{
    e.preventDefault();
    console.log('Try');

    let datas = this.state.datas;
    let item = this.refs.item.value;
    let amount = this.refs.amount.value;

    if (this.state.act === 0) {
      let data = {
        item, amount
      }
  
      datas.push(data);
    } else {
      let index = this.state.index;
      datas[index].item = item;      
      datas[index].amount = amount;      
    }

    

    this.setState({
      datas:datas, 
      act:0
    });
    this.refs.myform.reset();
    this.refs.item.focus();

    
  }
  itemRemove = (i) => {
    let datas = this.state.datas;
    datas.splice(i,1);
    this.setState({
      datas:datas
    });
    this.refs.myform.reset();
    this.refs.item.focus();
  }

  itemEdit = (i) =>{
    let data = this.state.datas[i];
    this.refs.item.value = data.item;
    this.refs.amount.value = data.amount;
    this.setState({
      act:1,
      index:i
    });
  }
  render(){
    let datas = this.state.datas;
    return (
      <div className="container">
        <div className="row">
          <div className="col-10 mx-auto col-md-8 mt-4">
            <h3 className="text-center text-capitalize">{this.state.title}</h3>
            <div className="card" >
              <div className="card-body">
                <form ref="myform">
                  <div className="form-group">
                    <input type="text" ref="item" className="form-control text-capitalize" placeholder="Add new item"/>
                    <input type="text" ref="amount" className="form-control text-capitalize mt-2" placeholder="Amount of item in kg(eg- 2)"/>
                    <button onClick={(e)=>this.itemAdd(e)}  className="btn btn-block btn-success my-2">Add Item</button>
                  </div>
                </form>
              </div>
            </div>  
            <ul className="list-group">
              <h3 className="text-center text-capitalize mt-5">Todo list</h3>
              {
                datas.map((data, i)=>
                  <li key={i} className="list-group-item text-capitalize d-flex justify-content-between my-2">
                    {data.item}-{data.amount} kg
                    <div className="icons">
                      <button onClick={()=>this.itemEdit(i)}><i className="fas fa-pencil-alt"></i></button>
                      <button onClick={()=>this.itemRemove(i)}><i className="fas fa-trash-alt"></i></button>
                    </div>
                  </li>
                )
              }
            </ul>          
          </div>  
        </div>        
      </div>
    );
  }
  
}

export default App;
