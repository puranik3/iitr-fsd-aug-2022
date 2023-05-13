import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from '../../utils/Rating/Rating';
import ILibrary from '../../../models/ILibrary';

type Props = {
    library: ILibrary;
};

const LibrariesListItem = ({ library }: Props) => {
    return (
        <Card>
            <Card.Img
                variant="top"
                src={`http://localhost:3001${library.imageUrl}`}
                style={{ height: '200px' }}
            />
            <Card.Body>
                <Card.Title>
                    <div className="d-flex align-items-start justify-content-between text-sm" style={{ height: '76px' }}>
                        <div className="me-2">
                            <div>{library.name}</div>
                            <div>
                                <Rating
                                    rating={library.rating}
                                    color="green"
                                />
                                {library.rating} ({library.noOfRatings})
                            </div>
                        </div>
                        <div style={{ textAlign: 'right'}}>
                            <Link
                                className="btn btn-primary btn-sm"
                                to={`/libraries/${library.id}`}
                                style={{ whiteSpace: 'nowrap' }}
                            >Know more</Link>
                        </div>
                    </div>
                </Card.Title>
                <Card.Text>
                    <strong>Address</strong>: {library.location}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default LibrariesListItem;
