import axios from 'axios';
import IGenre from '../models/IGenre';

const baseUrl = process.env.REACT_APP_SERVER_BASE_URL;

const getGenresByLibraryId = async ( id : number | string ) => {
    const response = await axios.get( `${baseUrl}/libraries/${id}/genres` );
    return response.data as IGenre[];
};

export {
    getGenresByLibraryId
};