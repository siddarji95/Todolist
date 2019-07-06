import React from 'react';
class List extends React.Component{
    render () {
        return (
            <ul id="myUL">
                {this.props.displayList.map((value, index) => {
                    return (
                        <li key={index} className={value.text.status} id={value.id} onClick={(e)=>this.props.statusToggle(e)}>
                        <div className={`listTitle ${value.text.status}`} id={value.id}>{value.text.name}</div>
                        <span className='dateTime' id={value.id}>{value.text.dateTime} </span>
                        <span className='close' id={value.id} onClick={(e)=>this.props.deleteList(e)}>
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