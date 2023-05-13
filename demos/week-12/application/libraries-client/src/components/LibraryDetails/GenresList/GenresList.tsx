import { useState, useEffect } from 'react';
import { Alert, Col, Row, Spinner } from 'react-bootstrap';

// import GenresListItem from './GenresListItem/GenresListItem';

import { getGenresByLibraryId } from '../../../services/genres';
import IGenre from '../../../models/IGenre';

type Props = {
    id:  number | string | undefined
}

const GenresList = ( { id } : Props ) => {
    const [genres, setGenres] = useState([] as IGenre[]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | Error>(null);

    useEffect(
        () => {
            const helper = async () => {
                try {
                    const data = await getGenresByLibraryId( id as string );
                    setGenres(data);
                } catch( error ) {
                    setError(error as Error);
                } finally {
                    setLoading(false);
                }
            };

            helper();
        },
        []
    );

    return (
        <>
            <h1>List of Popular Genres</h1>
            <hr />
            {
                loading && (
                    <Spinner animation="border" />
                )
            }
            {
                !loading && error && (
                    <Alert variant="danger">
                        {error.message}
                    </Alert>
                )
            }
            {
                !loading && !error && (
                    <Row xs={1}>
                        {
                            genres.map( genre => (
                                <Col key={genre.id} className="my-3 d-flex">
                                    {genre.name}
                                </Col>
                            ))
                        }
                    </Row>
                )
            }
        </>
    );
}
 
export default GenresList;