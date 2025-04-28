import axios from "axios";
import { useEffect, useState } from "react";
import '../css/Movies.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Movies() {
    const [movie, setMovie] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTimes, setSelectedTimes] = useState({});
    const [tickets, setTickets] = useState(0);
    const [modalData, setModalData] = useState(null); // Store data for the modal
    const [showModal, setShowModal] = useState(false); // Control modal visibility

    const getMovies = () => {
        //axios.get('http://localhost:9090/Movie-service/movie-api/get')
        axios.get('http://localhost:8082/P76A_Boot_Rest_MiniProject-Movies/movie-api/getAll')
            .then(response => {
                setMovie(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    };

    useEffect(() => {
        getMovies();
    }, []);

    const handleShowTimeChange = (movieId, time) => {
        setSelectedTimes(prevState => {
            // If the same time is selected again, deselect it
            if (prevState[movieId] === time) {
                return { ...prevState, [movieId]: null };
            } else {
                return { ...prevState, [movieId]: time };  // Select new time
            }
        });
    };

    const handleTickets = (e) => {
        setTickets(e.target.value);
    };

    const openModal = (mvId, sTime, n) => {
        if(n<7)
        {
            //axios.get(`http://localhost:9090/Booking-service/booking-api/book/${mvId}/${n}/${sTime}`)
            axios.get(`http://localhost:9090/Booking-service/booking-api/book/${mvId}/${n}/${sTime}`)
            .then(response => {    
                const movieDetails = movie.find(m => m.movieId === mvId);
                setModalData({
                    moviename: movieDetails.movieName,
                    showtime: sTime,
                    noOfTicket: n,
                    status: response.data // Set the status from the API response
                });
                setShowModal(true); // Open the modal
            })
            .catch(err => console.log(err.message));
        }
        else{
            alert('Only 6 tickets are allowed')
        }
    };
    

    const closeModal = () => {
        setShowModal(false); // Close the modal
        setModalData(null); // Clear modal data
    };


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <div id="card-container">
                {movie.map(m => (
                    <div key={m.movieId} className="card">
                        <div className="card-header">
                            <h3>{m.movieName}</h3>
                        </div>
                        <div className="card-body">
                        <div className="details">
                            <div>
                                <p>{m.language}</p>
                                <p>{m.genres}</p>
                            </div>
                            <div>
                                <p>Actor: {m.actor}</p>
                                <p>Actress: {m.actress}</p>
                                <p>Director: {m.director}</p>
                            </div>
                        </div>
                        <div className="options">
                            {m.showTimes.map((st, index) => (
                                <div key={index}>
                                    <input
                                        type="checkbox"
                                        id={`show_${m.movieId}_${index}`}
                                        name={`showtime_${m.movieId}`}
                                        value={st}
                                        checked={selectedTimes[m.movieId] === st}
                                        onChange={() => handleShowTimeChange(m.movieId, st)} />
                                    <label  htmlFor={`show_${m.movieId}_${index}`} className="showtime-option">
                                        {st}
                                    </label>
                                </div>
                            ))}
                        </div>
                        </div>
                        <div id="card-footer">
                            <div className="ticketDiv">
                                <label htmlFor="noOfTickets">Enter number of tickets</label>
                                <input type="number" id="noOfTickets" name="ticketCount" min="1" max="6" onChange={handleTickets} />
                            </div>
                            <button id="book"
                                onClick={() => openModal(m.movieId, selectedTimes[m.movieId], tickets)} 
                                disabled={!selectedTimes[m.movieId] || tickets <= 0}
                            >
                                Book Tickets
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {showModal && (
                <div className="modal fade show" style={{ display: 'block' }} aria-modal="true" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Booking Confirmation</h5>
                                <button type="button" className="close" onClick={closeModal} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Movie: {modalData?.moviename}</p>
                                <p>Showtime: {modalData?.showtime}</p>
                                <p>Number of Tickets: {modalData?.noOfTicket}</p>
                                <p>Booking Status : {modalData?.status} </p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Movies;
