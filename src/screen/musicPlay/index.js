import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import musicLists from '../../musics';
import './style.css'
import { FaPlay, FaStepBackward, FaStepForward } from 'react-icons/fa';
import { GiPauseButton } from 'react-icons/gi';
import ReactPlayer from 'react-player'
import moment from 'moment';
import { useHistory } from "react-router-dom";

const MusicPlay = ( ) => {
    let { songName } = useParams();
    const [ allSongs ] = useState(musicLists)
    const propsUrl = songName.replaceAll('-', ' ')
    const [ isSongPlayed, setIsSongPlayed ] = useState(true)
    const selectedSong = allSongs.filter(song=> song.title === propsUrl)
    const [ playedTime, setPlayedTime ] = useState(0)
    const [ totalTIme, setTotalTime ] = useState(0)
    const [playedPercentage, setPlayedPercentage] = useState(0)
    let history = useHistory();

    useEffect(() => {
        setPlayedPercentage(playedTime/totalTIme*100)
    }, [totalTIme, playedTime])

    const playNextSong = (w) => {
        if(w === '+'){
            const nextID = selectedSong[0].id + 1
            if(nextID < allSongs.length){
                const title = allSongs[nextID].title
                const s = title.replaceAll(' ', '-')
                const uri = '/music/'+s
                history.push(uri)
            }
            else{
                const title = allSongs[0].title
                const s = title.replaceAll(' ', '-')
                const uri = '/music/'+s
                history.push(uri)
            }
        }
        else{
            const nextID = selectedSong[0].id - 1
            if(nextID >= 0){
                const title = allSongs[nextID].title
                const s = title.replaceAll(' ', '-')
                const uri = '/music/'+s
                history.push(uri)
            }
            else{
                const title = allSongs[allSongs.length - 1].title
                const s = title.replaceAll(' ', '-')
                const uri = '/music/'+s
                history.push(uri)
            }
        }
    }
    return(
        <div>
            <div className='selectedSongContainer'>
                <div className='selectedSongDetail'>
                    <div className='selectedSongImageContainer'>
                        <img src={selectedSong[0].poster} alt={'song poster'} className='selectedSongImage'/>
                    </div>
                    <div className='selectedSongNames'>
                        <h2 style={{fontSize : '30px'}}>
                            {selectedSong[0].title}
                        </h2>
                        <p style={{fontSize : '16px', fontWeight : 700, marginTop : '10px'}}>
                            {selectedSong[0].artistName}
                        </p>
                    </div>
                    {/* <input type="file"  onChange={(e) => console.log(typeof e.target.files.file)}/> */}
                </div>
                <div className='songControllerContainer'>
                />
                    <ReactPlayer 
                        url={selectedSong[0].uri} 
                        playing={isSongPlayed} 
                        height={0} 
                        width={0} 
                        onProgress = {(e)=> setPlayedTime( e.playedSeconds )}
                        onDuration={(e) => setTotalTime(e)}
                        playbackRate = {1}
                        volume={1}
                        muted={false}
                        onEnded={() => playNextSong()}
                    />

                   <div className='songMainControl'>
                            <div className='songControlIconContainer' onClick={() => playNextSong('-')}>
                                {<FaStepBackward style={{color : 'rgb(18,0,254),  '}}/>}
                            </div>
                            {isSongPlayed?(
                                <div className='songControlIconContainer'onClick={() => setIsSongPlayed(false)}>
                                {<GiPauseButton style={{fontSize : '14px', color : 'rgb(18,0,254),  '}}/>}
                            </div>
                            ):(
                                <div className='songControlIconContainer' onClick={() => setIsSongPlayed(true)}>
                                {<FaPlay style={{fontSize : '14px', color : 'rgb(18,0,254),  '}}/>}
                            </div>
                            )}
                            <div className='songControlIconContainer' onClick={() => playNextSong('+')}>
                                {<FaStepForward style={{color : 'rgb(18,0,254),  '}}/>}
                            </div>
                   </div>
                   <div className='songProgressContainer'>
                       <h2 style={{fontSize : '18px',letterSpacing  :'01px'}}>{moment.utc(playedTime*1000).format('HH:mm:ss')}</h2>
                       <div className='songProgessBarOuter'>
                           <div style={{backgroundColor : "rgb(18,0,254)", position : 'absolute', left : 0, top : 0, bottom: 0, width : `${playedPercentage}%`, borderRadius : '10px', transition : '0.3s' }}></div>
                       </div>
                       <h2 style={{fontSize : '18px',letterSpacing  :'01px'}}>{moment.utc(totalTIme*1000).format('HH:mm:ss')}</h2>
                   </div>
                    
                </div>
            </div>
        </div>
    )
}

export default MusicPlay