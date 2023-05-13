import axios from 'axios';
import ILibrary from '../models/ILibrary';

const getLibraries = async () => {
    const response = await axios.get( `http://localhost:3001/libraries` );
    return response.data as ILibrary[];
};

const getLibraryById = async ( id : number | string ) => {
    const response = await axios.get( `http://localhost:3001/libraries/${id}` );
    return response.data as ILibrary;
};

export {
    getLibraries,
    getLibraryById
};