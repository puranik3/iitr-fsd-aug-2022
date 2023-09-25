import { useDispatch, useSelector } from "react-redux";
import { updateName } from '../actions/creators';

const Profile = () => {
    const dispatch = useDispatch();
    const name = useSelector( state => state.profile.name );

    return (
        <>
            <label
                htmlFor="name"
            >
                Name
            </label>
            <input
                type="text"
                name="name"
                id="name"
                onChange={event => dispatch( updateName( event.target.value ) )}
            />
            Name in store is {name}
        </>
    );
}
 
export default Profile;