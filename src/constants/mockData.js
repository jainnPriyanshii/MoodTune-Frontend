export const MOCK_SONGS = [
  {
    id: '1',
    title: 'Midnight Jazz',
    artist: 'The Evening Trio',
    album: 'Jazz & Coffee',
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400&q=80',
    duration: '4:58',
    durationSeconds: 298,
    category: 'Jazz & Coffee',
    vibe: '😊 Relaxed Evening',
  },
  {
    id: '2',
    title: 'Soft Rain Echoes',
    artist: 'Lumina Beats',
    album: 'Ambient Spaces',
    image: 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=400&q=80',
    duration: '4:12',
    durationSeconds: 252,
    category: 'Deeply Mellow',
    vibe: '😊 Relaxed Evening',
  },
  {
    id: '3',
    title: 'Velvet Horizon',
    artist: 'Aura Whispers',
    album: 'Chilled Waves',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80',
    duration: '3:30',
    durationSeconds: 210,
    category: 'Soft Energy',
    vibe: '😊 Relaxed Evening',
  },
  {
    id: '4',
    title: 'Autumn Leaves',
    artist: 'Cozy Trio',
    album: 'Hygge Sounds',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&q=80',
    duration: '5:24',
    durationSeconds: 324,
    category: 'Jazz & Coffee',
    vibe: '☕ Cozy Evening',
  },
  {
    id: '5',
    title: 'Coffee Shop Ambient',
    artist: 'The Baristas',
    album: 'Lo-Fi Chill',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&q=80',
    duration: '3:50',
    durationSeconds: 230,
    category: 'Spirited Spark',
    vibe: '☕ Cozy Evening',
  },
  {
    id: '6',
    title: 'Ocean Breeze',
    artist: 'Nature Echoes',
    album: 'Peaceful Soundscapes',
    image: 'https://images.unsplash.com/photo-1439405326854-014607f694d7?w=400&q=80',
    duration: '6:15',
    durationSeconds: 375,
    category: 'Soft Energy',
    vibe: '😊 Relaxed Evening',
  }
];

export const MOCK_PLAYLISTS = [
  {
    id: 'p1',
    name: 'Relaxed Evening',
    icon: 'sunny',
    description: 'Curated for a calm, centering atmosphere.',
    tracksCount: 5,
    tagline: 'The world is slowing down. You\'re finding your center.',
    confidence: {
      happy: '72%',
      neutral: '18%',
      surprise: '10%'
    }
  },
  {
    id: 'p2',
    name: 'Cozy Evening',
    icon: 'cafe',
    description: 'Perfect for sitting back with warm acoustics.',
    tracksCount: 4,
    tagline: 'Take a seat, breathe, and let us find the sounds.',
    confidence: {
      happy: '50%',
      neutral: '40%',
      surprise: '10%'
    }
  },
  {
    id: 'p3',
    name: 'Productive Focus',
    icon: 'book',
    description: 'Clean loops to keep your mind aligned.',
    tracksCount: 6,
    tagline: 'Steady waves of music that keeps you moving forward.',
    confidence: {
      happy: '20%',
      neutral: '75%',
      surprise: '5%'
    }
  }
];

export const MOCK_REFLECTIONS = [
  {
    id: 'ref1',
    mood: 'Rainy Jazz',
    date: 'Yesterday at 9:45 PM',
    note: 'It was raining softly outside. Listened to acoustic piano to wind down.',
    icon: 'cloud-outline'
  },
  {
    id: 'ref2',
    mood: 'Productive Focus',
    date: 'May 30, 2026',
    note: 'Got a lot of writing done with clean, ambient lo-fi loops.',
    icon: 'bulb-outline'
  },
  {
    id: 'ref3',
    mood: 'Calm Reading',
    date: 'May 28, 2026',
    note: 'Enjoyed some vintage vinyl classics while reading in the parlor.',
    icon: 'book-outline'
  }
];

export const MOCK_ARTISTS = [
  {
    id: 'a1',
    name: 'The Evening Trio',
    followers: '1.2M Followers',
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400&q=80',
    bio: 'An acoustic contemporary jazz trio weaving ambient tapestries for calm spaces.',
  },
  {
    id: 'a2',
    name: 'Lumina Beats',
    followers: '850K Followers',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&q=80',
    bio: 'Electronic ambient producer focusing on chillwave and emotional soundscapes.',
  },
  {
    id: 'a3',
    name: 'Aura Whispers',
    followers: '620K Followers',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&q=80',
    bio: 'Experimental acoustic artist creating minimal piano and atmospheric sound textures.',
  }
];
