import React, { useEffect, useState } from 'react'
import PlayerComponent from '../components/player'
import { fetchMusic } from '../api/api'
import LoaderComponent from '../components/loader'
import toast from 'react-hot-toast'

const HomePage = () => {
  const [selectedGenre, setSelectedGenre] = useState('')
  const [selectedMood, setSelectedMood] = useState('')
  const [songs, Setsongs] = useState([])

  const [first, Setfirst] = useState(true)

  const genres = [
    'Pop', 'Rock', 'Lo-fi', 'Cinematic', 'EDM'
  ]

  const moods = [
    'Happy', 'Sad', 'Energetic', 'Chill'
  ]
  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem('previous')) || [];
    console.log(existing)
  }, [])


  const handleGenerate = async () => {
    try {
      Setsongs([])
      Setfirst(false)
      console.log('Generating music with:', { genre: selectedGenre, mood: selectedMood })
      const data = await fetchMusic(selectedMood, selectedGenre)
      console.log(data)

      const existing = JSON.parse(localStorage.getItem('previous')) || [];
      data.data.forEach(element => {
        existing.push(element);
      });
      localStorage.setItem('previous', JSON.stringify(existing));


      setTimeout(() => {
        Setsongs(data.data)
      }, 2000);
    } catch (error) {
      toast("Oops something went wrong please try again...")
      Setfirst(true)
    }
  }

  const handleLike = (song) => {
    const existing = JSON.parse(localStorage.getItem('liked')) || [];

    const alreadyExists = existing.some(item => item.previewUrl === song.previewUrl);

    if (alreadyExists) {
      console.log('Already exists');
      toast("Music Already Liked")
    } else {
      existing.push(song);
      localStorage.setItem('liked', JSON.stringify(existing));
      console.log('Song liked:', song);
      toast("Music Liked")
    }
  };




  return (
    <div className={`h-full w-full flex flex-col  items-center p-6 ${first ? 'justify-center' : 'justify-end'}`}>




      <div className={`p-6 w-full max-w-4xl mb-auto mt-auto ${first ? 'hidden' : 'block'}`}>



        {
          songs.length == 0 ? (
            <LoaderComponent />
          ) : (
            <div>
              <div className='flex items-start space-x-3 mb-4'>

                <div className='flex-1 min-w-0'>
                  <div className='bg-gray-100 dark:bg-[#3d5273] rounded-2xl rounded-tl-md px-4 py-3'>
                    <p className='text-gray-800 dark:text-gray-50 text-sm'>
                      Here's your generated {songs[0].genre} track with a {songs[0].mood} mood. Enjoy listening!
                    </p>
                  </div>
                </div>
              </div>
              {
                songs.map((song) => (
                  <div className='flex gap-3' >
                    <div onClick={() => { handleLike(song) }}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 dark:text-gray-300">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                      </svg>

                    </div>
                    <PlayerComponent key={song.freesoundUrl} url={song.previewUrl} title={song.name} mood={song.mood} genre={song.genre} />
                  </div>
                ))
              }
            </div>
          )
        }




      </div>






      <div className='w-full max-w-2xl'>
        {/* Header */}
        {first && <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-800 dark:text-gray-400 mb-2'>Track Music Generator</h1>
          <p className='text-gray-600'>Create unique music tracks</p>
        </div>}

        {/* Main Input Container */}
        <div className='bg-white dark:bg-[#233044] rounded-2xl shadow-lg  p-6 mb-6'>
          {/* Genre and Mood Selectors */}
          <div className='flex flex-col sm:flex-row gap-4 mb-6'>
            {/* Genre Dropdown */}
            <div className='flex-1'>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2'>
                Genre
              </label>
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl 
               focus:ring-2 focus:ring-blue-500 focus:border-transparent 
               transition-all duration-200 
               bg-white dark:bg-gray-800 
               text-gray-900 dark:text-gray-100'
              >
                <option value=''>Select a genre</option>
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>

            {/* Mood Dropdown */}
            <div className='flex-1'>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2'>
                Mood
              </label>
              <select
                value={selectedMood}
                onChange={(e) => setSelectedMood(e.target.value)}
                className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl 
               focus:ring-2 focus:ring-blue-500 focus:border-transparent 
               transition-all duration-200 
               bg-white dark:bg-gray-800 
               text-gray-900 dark:text-gray-100'
              >
                <option value=''>Select a mood</option>
                {moods.map((mood) => (
                  <option key={mood} value={mood}>
                    {mood}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Generate Button */}
          <div className='flex justify-center'>
            <button
              onClick={handleGenerate}
              disabled={!selectedGenre || !selectedMood}
              className='px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105'
            >
              Generate Music
            </button>
          </div>
        </div>





        <div className='mt-6 text-center'>
          <p className='text-sm text-gray-500'>
            Select both genre and mood to generate your music
          </p>
        </div>
      </div>
    </div>
  )
}

export default HomePage