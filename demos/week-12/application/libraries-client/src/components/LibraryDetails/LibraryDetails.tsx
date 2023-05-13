import { useState, useEffect } from 'react';
import { Alert, Col, Image, Row, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ILibrary from '../../models/ILibrary';
import { getLibraryById } from '../../services/libraries';
import GenresList from './GenresList/GenresList';

type Params = {
    id: string
};

const LibraryDetails = () => {
    const { id } = useParams<Params>(); // id -> "3" for example

    const [library, setLibrary] = useState<null | ILibrary>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | Error>(null);

    useEffect(
        () => {
            const helper = async () => {
                try {
                    const data = await getLibraryById( id as string );
                    setLibrary(data);
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
                !loading && !error && library && (
                    <>
                        <Row>
                            <Col>
                                <h1>{library.name}</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} lg={4}>
                                <Image
                                    src={`http://localhost:3001${library.imageUrl}`}
                                    fluid
                                />
                            </Col>
                            <Col xs={12} lg={8}>
                                {library.description}
                            </Col>
                        </Row>
                        <Row className="my-5">
                            <Col>
                                <GenresList id={id} />
                            </Col>
                        </Row>
                    </>
                )
            }
        </>
    );
}
 
export default LibraryDetails;