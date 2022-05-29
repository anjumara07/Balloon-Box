import './Box.css'
import { useState , useEffect } from 'react'

export const Box = () =>{

    const [state,setState] =useState([])
    const [boxState,setBoxState] =useState([])
    const [value,setValue] = useState("")

    useEffect(() =>{
            setState([{color:`rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`,id:1},
                      {color:`rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`,id:2},
                      {color:`rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`,id:3},
                      {color:`rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`,id:4},
                      {color:`rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`,id:5}
            ])
    },[])


    const handleChange = (e) =>{
        setValue(e.target.value)
    }


    // select balloon and put into the box
    const handleClick = (value) =>{
        const i = +value
        if((state.length !== 0) && (i<=state.length) && i>0){
            const res = state.filter((e,index)=>{
                if(index===i-1){
                    return state[index]
                }
            })
            setBoxState([...boxState,...res])

            const result = state.filter((e,index)=>{
                return index!==i-1
            })
            setState([...result])
        }
        else{
            alert(`${i} Balloon Not Available`)
        }
        setValue("")
    }

    // remove balloon from the box and send back to the same position
    const removeBalloon = (boll) => {
        const result = boxState.filter((e)=>{
            return boll.id===e.id
        })
       
        // to put balloon at the same place
        let array = []
        while((state.length!==0) && (state[0].id < result[0].id)){
            array.push(state.shift())
        }
        setState([...array,...result,...state])        


        // to remove balloon from the box
        const res = boxState.filter((e)=>{
            return boll.id!==e.id
        })
        setBoxState([...res])
    }

    return (
        <>
            <div className="container">
                <div>
                    <div className="box display" >
                        {boxState.map((e)=>{
                            return (
                                <div key={e.id} className="boll" style={{backgroundColor:e.color}} onClick={()=>{removeBalloon(e)}}></div>
                            )
                        })}
                    </div>

                    <div className="button">
                        <input type="number" value={value} placeholder="Enter Ballon Position" onChange={handleChange} />
                        <button onClick={()=>{handleClick(value)}}>SHOOT</button>
                    </div>
                </div>
                
                <div>
                    {state.map((boll)=>{
                        return (
                            <div key={boll.id} className="boll" style={{backgroundColor:boll.color}}></div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}