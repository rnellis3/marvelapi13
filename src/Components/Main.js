import React from 'react'
import {useState, useEffect, useRef} from 'react'
import Search from './Search'

function Main() {
    const [apiResults, setApiResults] = useState({})
    const [loaded, setLoaded] = useState(false)
    const [custom, setCustom] = useState(false)
    const [noResults, setNoResults] = useState(false)
    const [blank, setBlank] = useState(false)
    const [results, setResults] = useState('')
    const [newSearch, setNewSearch] = useState({})
    // const [isActive, setIsActive] = useState(false)
    // const [activeMain, setActiveMain] = useState({
    //     border: 'solid 2px #000',
    //     boxshadow: '0 6px 6px -6px #000',
    //     gridArea: 'main'
    // })

    let APIArray
    let searchArray
    let randomExamples
    let searchResults

    //need state to hold results
        //once that state updates, generate cards
    //state for no results
    //state for opening page
    //will need to create a switch for cases based on state

    useEffect(async () => {
        const response = await fetch('http://gateway.marvel.com/v1/public/characters?&ts=123&apikey=b10a47de745dba309eba50894e1a9841&hash=f982e55609d27090f55b37d0682ce716')
        const data = await response.json();
        APIArray = data.data.results
        setApiResults(APIArray)
        setLoaded(true)
        console.log(APIArray)
        console.log(data.data.results[0].thumbnail.path)
    }, [])

    const searchAPI = (async () => {
        if(results.length > 1){
            const response = await fetch(`http://gateway.marvel.com/v1/public/characters?nameStartsWith=${results}&ts=123&apikey=b10a47de745dba309eba50894e1a9841&hash=f982e55609d27090f55b37d0682ce716`)
            const data = await response.json();
            console.log(data)
            searchArray = data.data.results
            console.log(searchArray)
            if(searchArray.length === 0){
                console.log('its zero')
                setNoResults(true)
                setCustom(false)
            } else {
                setNewSearch(searchArray)
                setCustom(true)
                setNoResults(false)
            }
        } else {
            console.log('its blank')
        }


        // setNewSearch(data.data.results[0].name)
    })

    function handleChange(e){
        setResults(e.target.value)
        console.log(results)
    }

    function handleSubmit(e){
        e.preventDefault()
        searchAPI()
    }

    function handleKeypress(e){
        if(e.code === "Enter" || e.code === "NumpadEnter"){
            console.log('enter')
            handleSubmit(e)
        }
    }


    // function addActive(e){
    //     console.log(e.target.id)
    //     if(e.target.className == 'card'){
    //         e.target.className = 'card active'
    //         //children elements add as well?
    //         e.target.childNodes.className = 'side2 active'
    //         console.log(e.target.childNodes)
    //         console.log(e.target.className)
    //     } else if ( e.target.className == 'card active') {
    //         e.target.className = 'card'
    //     }
    // }


    function addActive(e){
        console.log(e.target.id)
        if(e.currentTarget.className == 'card'){
            e.currentTarget.className = 'card active';
            console.log(e.target.childNodes)
            console.log(e.target.childNodes[1])
            console.log(e.target.className)
            e.currentTarget.childNodes[0].className = 'mainBorder cardbkg active'
            e.currentTarget.childNodes[1].className = 'side1 cardbkg active'
            e.currentTarget.childNodes[2].className = 'side2 cardbkg active'
        } else if ( e.currentTarget.className == 'card active') {
            e.currentTarget.className = 'card'
            e.currentTarget.childNodes[0].className = 'mainBorder'
            e.currentTarget.childNodes[1].className = 'side1'
            e.currentTarget.childNodes[2].className = 'side2'
        }
    }


    if(!loaded){
        return (
            <div><p>Its loading</p></div>
        )
    } else if (loaded && !custom && !noResults) {
    // randomExamples = apiResults.map(item => <h3 id={item.id} key={item.id} onClick={addActive} className='card' >{item.name} {item.id}</h3>)
    randomExamples = apiResults.map(item =>
    <div id={item.id} key={item.id} onClick={addActive} className='card' >
        <div className='mainBorder'>
        {/* <div> */}
        <h3>{item.name}</h3></div>
        <div className='side1'>
            <h3>Character Description</h3>
        <p>{item.description === '' ? 'Marvel API contained no information' : item.description}</p><a href={`https://marvel.fandom.com/wiki/Special:Search?query=${item.name}&scope=internal&navigationSearch=true`} target="_blank" rel="noopener noreferrer">Find more information</a>
        </div>
        <div className='side2'>
            <img alt='character' src={item.thumbnail.path+'.jpg'}></img>
            {/* <h4 ref={testElement}>{item.id}</h4> */}
            </div>
    </div>)
    //if active is true, classname is card.active if false, just card
    console.log(randomExamples)
    return (
        <div className='container'>
            <Search testClick={searchAPI} handleChange={handleChange} handleKeypress={handleKeypress}/>
            <div className='gallery'>
            {randomExamples}
            </div>
        </div>
    )} else if (custom) {
        searchResults = newSearch.map(item =>
            <div id={item.id} key={item.id} onClick={addActive} className='card' >
                <div className='mainBorder'>
                {/* <div> */}
                <h3>{item.name}</h3></div>
                <div className='side1'>
                    <h3>Character Description</h3>
                <p>{item.description === '' ? 'Marvel API contained no information' : item.description}</p><a href={`https://marvel.fandom.com/wiki/Special:Search?query=${item.name}&scope=internal&navigationSearch=true`} target="_blank" rel="noopener noreferrer">Find more information</a>
                </div>
                <div className='side2'>
                    <img alt='character' src={item.thumbnail.path+'.jpg'}></img>
                    {/* <h4 ref={testElement}>{item.id}</h4> */}
                    </div>
            </div>)
        console.log(newSearch)
        return (
        <div>
        <Search testClick={searchAPI} handleChange={handleChange} handleKeypress={handleKeypress}/>
        <div className='gallery'>
        {searchResults}
        </div>
        </div>
        )
    } else if (noResults) {
        return (
            <div>
            <Search testClick={searchAPI} handleChange={handleChange} handleKeypress={handleKeypress}/>
            <div className='gallery'>
            <p>No results found</p>
            </div>
            </div>
        )
    }

}

export default Main