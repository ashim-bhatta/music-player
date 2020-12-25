import React, { useState } from 'react';
import './style.css'
import musicList from '../../musics'
import MusicCard from '../../components/musicsCard';
const Home = ( ) => {
    const [ musics ] = useState(musicList)
    return(
        <div>
            
            <div className='musics-list-container'>
                {
                    musics.map(({title, poster, id}) => {
                        return(
                            <div key='title'>
                                <MusicCard 
                                    title={title}
                                    poster = {poster}
                                    id={id}
                                />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
} 

export default Home