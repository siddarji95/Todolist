import React from 'react';
class List extends React.Component{
    render () {
        return (
            <ul id="myUL">
                {this.props.list.map((value, index) => {
                    //console.log(value,index)
                    return (

                        <li key={index} className={value.text.status} onClick={()=>this.props.statusToggle(index)}>
                        {value.text.name}
                        <span className='close' onClick={(e)=>this.props.deleteList(e,index)}>
                        X
                          </span>
                          </li>
                    )
                })}
                </ul>
        )
    }

}
export default List;