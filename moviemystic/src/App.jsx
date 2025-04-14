
import { useEffect, useState } from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import './style.css';


export default function App()
{
  const [count, setCount] = useState(0);
  const [movies, setMovies] = useState([
    {
        name: "Bahubali 1",
        image: "/bahubali1.png",
        watchlist : "bi bi-bookmark"
    },
    {
        name: "Athadu",
        image: "/athadu.png",
        watchlist : "bi bi-bookmark"
    },
    {
        name: "Eega",
        image: "/eega.png",
        watchlist : "bi bi-bookmark"
    },
    {
        name: "Hi Nanna",
        image: "/hi-nanna.png",
        watchlist : "bi bi-bookmark"
    },
    {
        name: "Jersey",
        image: "/jersey.png",
        watchlist : "bi bi-bookmark"
    },
    {
        name: "Kick",
        image: "/kick.png",
        watchlist : "bi bi-bookmark"
    },
    {
        name: "Kshanam",
        image: "/kshanam.png",
        watchlist : "bi bi-bookmark"
    },
    {
        name: "Pokiri",
        image: "/pokiri.png",
        watchlist : "bi bi-bookmark"
    },
    {
        name: "Sita Ramam",
        image: "/sitaramam.png",
        watchlist : "bi bi-bookmark"
    }
])
const [selected, setSelected] = useState([]);
const [isModalOpen, setIsModalOpen] = useState(false);

useEffect(() => {
  if (isModalOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
  return () => {
    document.body.style.overflow = "";
  };
}, [isModalOpen]);



const addToWatchList = (ind) => {
  const updatedMovies = [...movies];
  const movie = updatedMovies[ind];

  if (movie.watchlist === "bi bi-bookmark-fill") {
    setCount(count - 1);
    movie.watchlist = "bi bi-bookmark";
    setSelected(selected.filter((m) => m.name !== movie.name));
  } else {
    setCount(count + 1);
    movie.watchlist = "bi bi-bookmark-fill";
    setSelected([...selected, movie]);
  }

  setMovies(updatedMovies);
};

const showSelectedMovies = () => {
  setIsModalOpen(true);
};
const closeModal = () => {
  setIsModalOpen(false);
};


    return(
      <>
        <header>
            <div className="head">
                <img src="/logo.png" alt="logo" width="150"/>
                <h1>MovieMystic</h1>
                <button id="watch-list" onClick={showSelectedMovies} >Watchlist : {count}</button>
            </div>
        </header>
        <section>
            <div id="cards">
                {
                    movies.map( (movie,index)=>{
                        return(
                            <div className="card" key={movie.name}>
                                <img src={movie.image} alt="Image" width="200" height="300"/>
                                <div className="footer">
                                    <p className="title">{movie.name}</p>
                                    <span onClick={()=>{addToWatchList(index)}} id="add" className={movies[index].watchlist}></span>
                                </div>
                            </div>
                        )
                    } )
                }
            </div>
            <div className={`modal ${isModalOpen ? "active" : ""}`} onClick={closeModal}>
              <div className='selected-list' onClick={(e) => e.stopPropagation()}>
                <h2 id='watchlist-title'>Watchlist</h2>
                <div className='close-btn' onClick={closeModal} >X</div>
                {
                  selected.map((item, index) =>
                  {
                    return(
                      <div id='item' key={item.name}>
                        <p id='movie-title'>{item.name}</p>
                        <img src={item.image} alt="image" width="70" height="100"/>
                      </div>
                    )
                  })
                }
              </div>
            </div>
        </section>
      </>
    )
}