import axios from 'axios';
import IGenre from '../models/IGenre';

const getGenresByLibraryId = async ( id : number | string ) => {
    const response = await axios.get( `http://localhost:3001/libraries/${id}/genres` );
    return response.data as IGenre[];
};

export {
    getGenresByLibraryId
};