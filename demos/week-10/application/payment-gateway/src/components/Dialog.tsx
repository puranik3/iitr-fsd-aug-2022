import { ReactNode } from 'react';
import './Dialog.css';

type Props = {
    show: boolean,
    title: string,
    children: ReactNode
}

// { show: true, title: 'Please confirm payment' }
// const Dialog = ( props : Props ) => {
const Dialog = ( { show, title, children } : Props ) => {
    // const { show, title } = props;
    
    // console.log( props );
    
    return (
        <>
            {
                show && (
                    <div className="dialog-overlay">
                        <div className="dialog">{children}</div>
                    </div>
                )
            }
        </>
    );
};

Dialog.defaultProps = {
    show: true
};
 
export default Dialog;