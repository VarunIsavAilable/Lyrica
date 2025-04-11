import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { SongItem } from "../Search.jsx";
import axios from "axios";
function RecommendSongs() {
   const navigate = useNavigate();
   const [songName, setSongName] = useState("");
   const [songYear, setSongYear] = useState(null);
   const [songArtists, setSongArtists] = useState([]);
   const [recommendations, setRecommendations] = useState([]);
   const [song, setSong] = useState(null);
   const { param } = useParams();
   useEffect(() => {
      const storedSong = JSON.parse(localStorage.getItem("song"));
      if (storedSong) {
         setSong(storedSong)
      } else {
         navigate("/search");
      }
   }, [navigate, param]);
   
   useEffect(() => {
      if (!song || !song.name) return;
      setRecommendations([])
      setSongName(song.name);
      setSongYear(song.year);
   
      const cleanedArtists = song.artists
         .substring(1, song.artists.length - 1)
         .split(',')
         .map(artist => artist.trim())
         .map(artist => artist.substring(1, artist.length - 1));
      setSongArtists(cleanedArtists);
   
      const getRecommendations = async (songName) => {
         try {
            const response = await axios.get(`https://lyrica-i45x.onrender.com/api/recommend/${songName}`);
            setRecommendations(response.data.recommendations);
         } catch (error) {
            console.error("Error fetching recommendations:", error);
         }
      };
   
      getRecommendations(encodeURIComponent(song.name));
   }, [song]);
   

   return (
      <div className="flex justify-center items-center rounded-2xl w-full h-full bg-gray-200">
         <div className="w-full h-full bg-gray-100  border-black border-2 rounded-2xl overflow-hidden shadow-lg">
            {/* Top Bar */}
            <div className="flex justify-between items-center px-4 py-2 bg-black text-white">
               <div
                  className="flex justify-center items-center w-10 h-10 bg-white border border-pink-400 rounded-full cursor-pointer hover:bg-gray-200 transition"
                  onClick={() => navigate("/search")}
               >
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     className="w-5 h-5"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="black"
                     strokeWidth={2.5}
                     strokeLinecap="round"
                     strokeLinejoin="round"
                  >
                     <line x1="19" y1="12" x2="5" y2="12" />
                     <polyline points="12 19 5 12 12 5" />
                  </svg>
               </div>

               {/* Window Control Dots */}
               <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
               </div>
            </div>

            {/* Content Area */}
            <div className="flex flex-col items-center justify-center h-[calc(100%-4rem)] p-4 space-y-1">
               {/* Top Section */}
               <div className="flex w-full h-2/5 bg-green-500 rounded-lg overflow-hidden shadow-inner">
                  <div className="w-2/5 bg-amber-300 border-r border-black rounded-l-lg">
                     <div className="flex flex-col items-center justify-center h-full p-4">
                        <div className="w-full h-2/4 flex items-center justify-start space-x-3 ">
                           <span className="text-3xl font-semibold text-gray-700">{songName}</span>
                           <span className="text-sm text-gray-600 font-semibold">{songYear}</span>
                        </div>
                        <div className="w-full h-2/4 flex items-start justify-start overflow-y-auto scrollbar-thin scrollbar-corner-gray-700 scrollbar-track-black scrollbar-thumb-gray-500">
                           {
                              songArtists.length > 0 ? (
                                 <div className="flex flex-col items-start mt-2 text-zinc-600 font-bold text-lg">
                                    {songArtists.map((artist, index) => (
                                       <span key={index}>{artist}</span>
                                    ))}
                                 </div>
                              ) : (
                                 <p className="text-sm text-gray-600">No artists available</p>
                              )
                           }
                        </div>
                     </div>
                  </div>
                  <div className="w-3/5 bg-amber-300">
                  </div>
               </div>

               <div className="w-full h-3/5 bg-white rounded-lg border border-dashed border-gray-400 flex items-center justify-center text-gray-500 italic">
                  {
                     recommendations.length === 0 ? (
                        <p className="text-center text-gray-500 font-semibold">Loading recommendations...</p>
                     ) : (
                        <ul className="space-y-2 w-full h-full overflow-y-auto scrollbar-thin scrollbar-corner-gray-700 scrollbar-track-black scrollbar-thumb-gray-500">
                           {recommendations.map((song, index) => (
                              <SongItem
                                 key={index}
                                 index={index}
                                 name={song.name}
                                 year={song.year}
                                 artists={song.artists}
                              />
                           ))}
                        </ul>
                     )
                  }
               </div>
            </div>
         </div>
      </div>
   );
}

export default RecommendSongs;
