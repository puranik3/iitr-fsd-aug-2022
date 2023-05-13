import { useState, useEffect } from 'react';
import { Alert, Col, Row, Spinner } from 'react-bootstrap';

import LibrariesListItem from './LibrariesListItem/LibrariesListItem';

import { getLibraries } from '../../services/libraries';
import ILibrary from '../../models/ILibrary';

const LibrariesList = () => {
    const [libraries, setLibraries] = useState([] as ILibrary[]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | Error>(null);

    useEffect(
        () => {
            const helper = async () => {
                try {
                    const data = await getLibraries();
                    setLibraries(data);
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
            <h1>List of libraries</h1>
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
                    <Row xs={1} lg={2} xl={3}>
                        {
                            libraries.map( ( library : any ) => (
                                <Col key={library.id} className="my-3 d-flex">
                                    <LibrariesListItem library={library} />
                                </Col>
                            ))
                        }
                    </Row>
                )
            }
        </>
    );
}
 
export default LibrariesList;