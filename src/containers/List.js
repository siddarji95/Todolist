import React from 'react';
class List extends React.Component {
    render() {
        // let yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
        // let tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
        // let today = new Date() 
        return (
            <div className="list">
                <ul>
                    {this.props.displayList.map((value, index) => {
                        let dateTime;
                        // let dueDate = new Date(value.text.dueDate)
                        const { diffDays } = value.text;
                        // let diffTime;
                        // if(value){
                        //      diffTime = (dueDate.getTime() - today.getTime());
                        //      diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
                        // }
                        // console.log(diffDays)
                        if (diffDays === 0) {
                            dateTime = 'Today'
                        }
                        else if (diffDays > 0) {
                            dateTime = `${diffDays} days remaining`;
                        }
                        else if (diffDays < 0) {
                            dateTime = `${Math.abs(diffDays)} days before`;
                        }
                        return (
                            <li key={index} className={value.text.status} title='Click to mark as done' id={value.id} onClick={(e) => this.props.statusToggle(e)}>
                                <div className={`listTitle ${value.text.status}`} id={value.id}>{value.text.name}</div>
                                <span className='dateTime' id={value.id} title={value.text.dueDate}>{dateTime} </span>
                                <span className='close' id={value.id} onClick={(e) => this.props.handleDeleteList(e)}>
                                    X
                          </span>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }

}
export default List;