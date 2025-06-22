import React, { useEffect, useState } from 'react'
import PlayerComponent from '../components/player';

const LikedPage = () => {
    const [songs, Setsongs] = useState([])
    useEffect(() => {
        const existing = JSON.parse(localStorage.getItem('liked')) || [];
        console.log(existing)
        Setsongs(existing.reverse())
    }, [])

    return (
        <div className='w-full h-full flex flex-col  p-10'>
            <h1 className="text-2xl font-bold text-gray-700 mb-10 dark:text-gray-200">
                Previously Generated Tracks
            </h1>

            <div>
                {
                    songs.map((song) => (
                        <PlayerComponent key={song.freesoundUrl} url={song.previewUrl} title={song.name} mood={song.mood} genre={song.genre}/>
                    ))
                }
            </div>

        </div>
    )
}

export default LikedPage
