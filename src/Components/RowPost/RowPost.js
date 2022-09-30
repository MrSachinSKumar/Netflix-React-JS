import React, { useEffect, useState } from 'react'
import './RowPost.css'
import Axios from '../Constants/Axios'
import {imageUrl,API_KEY} from '../Constants/Constants'
import Youtube from 'react-youtube'

function RowPost(props) 
{
    const [movies, setMovies] = useState([])
    const [urlId,setUrlid]=useState('')
    useEffect(() => {

    Axios.get(props.url).then((response)=>
    {
      console.log(response.data.results[0]);
      setMovies(response.data.results)
    })
  },[props.url])

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {autoplay: 1}}

    const handleMovie=(id)=>
    {
      Axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response=>
      {
        console.log(response.data)
        if(response.data.results.length!==0)
        {
          setUrlid(response.data.results[0])
        }
        else
        {
          console.log('No videos available')
        }
          
      })      
    }

  return (
    <div className='row'>
        <h2>{props.title}</h2>
        <div className='posters'>
            {movies.map((obj)=>
            {
                return(
                    <img onClick={()=>handleMovie(obj.id)} className={props.isSmall ? 'smallPoster' : 'poster'} src={`${imageUrl+obj.backdrop_path}`} alt="" />
                )        
            })   
            }
        </div>
        {urlId && <Youtube opts={opts} videoId={urlId.key}/>}
    </div>
  )
}

export default RowPost