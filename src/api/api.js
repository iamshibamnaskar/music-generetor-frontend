const API_BASE_URL = 'https://music-generetor-backend.onrender.com/api';

export const fetchMusic = async (mood, genre) => {
  try {
    const response = await fetch(`${API_BASE_URL}/fetchmusic`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mood, genre }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    return data; // Expected to contain { url: '...', title: '...', etc. }
  } catch (error) {
    console.error('Error fetching music:', error.message);
    throw error;
  }
};
