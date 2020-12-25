import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo.png'

const MusicCard = ( { title, poster, id } ) => {
    const s = title.replaceAll(' ', '-')
    const uri = '/music/'+s
    return(
        <div style={{display : 'flex', flexDirection : 'column', margin : '12px', justifyContent : 'center', alignItems : 'center', textAlign : 'center', padding : 5, borderRadius : 10}}>
            <div key={id} className='single-music'>
                <div className='music-image-container'>
                    <img src={poster} alt='music poster' className='image' />
                </div>
                
            </div>
            <div className='music-content'>
                <h2>
                    {title}
                </h2>
                <p>
                    {title}
                </p>
                <Link  to={uri}>
                    <div className='play-btn'>
                        <img src={logo} alt="play button" style={{width : '20px'}}/>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default MusicCard