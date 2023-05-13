import {
    faStar,
    faStarHalfAlt
} from '@fortawesome/free-solid-svg-icons';
import {
    faStar as faEmptyStar
}  from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
    rating: number,
    color: string
};

const Rating = ( { rating, color } : Props ) => {
    const numFullStars = Math.floor( rating ); // 3.7 -> 3
    const numHalfStars = rating - Math.floor( rating ) >= 0.5 ? 1 : 0; // 0.7 >= 0.5 -> 1
    const numEmptyStars = 5 - ( numFullStars + numHalfStars ); // 5 - ( 3 + 1 ) -> 1
    
    return (
        <div style={{ color : color }}>
            {
                Array.from( { length: numFullStars } ).map(
                    i => <FontAwesomeIcon icon={faStar} />
                )
            }
            {
                numHalfStars ? <FontAwesomeIcon icon={faStarHalfAlt} /> : null
            }
            {
                Array.from( { length: numEmptyStars } ).map(
                    i => <FontAwesomeIcon icon={faEmptyStar} />
                )
            }
        </div>
    );
}

Rating.defaultProps = {
    color: 'goldenrod'
}
 
export default Rating;