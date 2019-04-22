import React, { Component } from 'react';
import List from './List';
import fire from './fire';
import './App.css';

class App extends Component {
  constructor(props) {
    console.log(fire)
    super(props)
    this.state = {
      input: '',
      list:[],
      doneTasks:0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    //this.handleClick = this.handleClick.bind(this)
    this.deleteList = this.deleteList.bind(this)
    this.statusToggle = this.statusToggle.bind(this)
  }
  componentWillMount(){
    /* Create reference to messages in Firebase Database */
   
    let listRef = fire.database().ref('list').orderByKey().limitToLast(100);
    listRef.on('child_added', snapshot => {
      /* Update React state when message is added at Firebase Database */
      let listvalue = { text: snapshot.val(), id: snapshot.key };
      let list=[listvalue].concat(this.state.list)
      const doneTasks=list.filter((item,i)=>{
        return item.text.status==='checked'
     }).length;
      this.setState({
         list: list,
         doneTasks: doneTasks
      });
    })
    listRef.on('child_changed', snapshot => {
      let index=-1;
      this.state.list.forEach((item,i)=>{

        if(item.id==snapshot.key){
          index=i
        }
      })
      let listValue = { text: snapshot.val(), id: snapshot.key };
      let list = this.state.list
      list[index]=listValue
      const doneTasks=list.filter((item,i)=>{
        return item.text.status==='checked'
     }).length;
      this.setState({
         list: list,
         doneTasks: doneTasks
      });
      
    })
    listRef.on('child_removed', snapshot => {
      let index=-1;
      this.state.list.forEach((item,i)=>{

        if(item.id==snapshot.key){
          index=i
        }
      })
      const list=this.state.list.filter((item,i)=>{
        return i!==index
     })
     const doneTasks=list.filter((item,i)=>{
      return item.text.status==='checked'
   }).length;
    this.setState({
       list:list,
       doneTasks: doneTasks
    });
    })
  
  }
  handleChange(e) {
    e.preventDefault();
      this.setState({
          list:this.state.list,
          input: e.target.value
      })
     // console.log(this.state)
  }
  statusToggle(index) {  
    
    console.log(this.state)
    const list = this.state.list
    if(list[index].text.status==='')
    list[index].text.status='checked';
    else
    list[index].text.status='';
    const doneTasks= list.filter((item,i)=>{
      return item.text.status==='checked'
   }).length; 
    this.setState({
     // list:list,
     // doneTasks:doneTasks
   });
   let uid=list[index].id;
   fire.database().ref('list/'+uid).update({ status: list[index].text.status });
    // console.log(this.state)
 
  }
  handleSubmit(e){
    e.preventDefault()
    //rooms.push({roomId:this.state.roomId+1,name:name,messages:messages});
    if(this.state.input!==''){
    console.log('here')
    this.currentInput = {};
   this.currentInput.name=this.state.input;
   this.currentInput.status='';
    this.setState({
     // list:[...this.state.list,this.currentInput],
      input:''
    })
    fire.database().ref('list').push(this.currentInput);
    }
  }
  deleteList(e,index){
    e.stopPropagation();
    console.log('deleteList')
    let uid=this.state.list[index].id;
     const list=this.state.list.filter((item,i)=>{
        return i!==index
     })
     const doneTasks=list.filter((item,i)=>{
      return item.status==='checked'
   }).length;
     console.log(list)
     this.setState({
        // list:list,
       // doneTasks:doneTasks
     });
     
     fire.database().ref('list/'+uid).remove();
  }
  render() {
    return (
      <div className="App">
        <div id="myDIV" className="header">
        <form onSubmit={this.handleSubmit}>
         <h2 >My To Do List</h2>
         <input type="text" id="myInput" placeholder="Title..." onChange={this.handleChange} value={this.state.input}/>
         <input className="addBtn" type="submit" value="Add" />
         </form>
       </div>
       <List list={this.state.list} deleteList={this.deleteList} statusToggle={this.statusToggle}/>
   <div className='donetasks'>Total done task:{this.state.doneTasks}/{this.state.list.length}</div>
     </div>
    );
  }
}

export default App;
