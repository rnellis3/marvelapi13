import React from 'react'

function Search(props) {
    return (
            <div className='searchArea'>
            <input id='searchVal' type='text' placeholder='Enter a Marvel Character' onChange={(e) => props.handleChange(e)}
            onKeyPress={(e) => props.handleKeypress(e)}></input>
            <button onClick={() => props.testClick()}>Search</button>
            {/* <p>Please enter a valid character name</p> */}
            {/* add something below that will show/hide based on form validation */}
            </div>
    )
}

export default Search
