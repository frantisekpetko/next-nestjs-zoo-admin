import { FunctionComponent, ReactNode, JSX } from "react";
import styled from 'styled-components';

/*
const ErrorContainer = styled.div`

`;
*/

const Heading = styled.h5`
    margin: 0;
`

const ErrorWrapper = ({children}: {children: ReactNode}) => {
    return <ul
        className='pl-2 m-2'>
        {children}
    </ul>
}

type Constraint = string[] | { response: { message: string } } | { response: { message: string[] } } | { message: string } | {[property: string]: string};

interface Props {
    message: Constraint
}
 
const ToastErrorMessage: FunctionComponent<Props> = (props) => {
    const renderMessageArray = (errors: any): ReactNode  => {
        console.log('errors', errors);
        let constraints: any = [];
        if (Array.isArray(errors)) {
            constraints = errors.map((constraint, idx) => <li key={idx}>{constraint}</li>);
        }
        if (typeof errors?.response?.message === 'string') {
            constraints = <li>{errors.message}</li>;
        }

        if (Array.isArray(errors?.response?.message)) {
            constraints = errors.response.message.map((constraint: string, idx: number) => <li key={idx}>{constraint}</li>);
        }
        
        if (errors && typeof errors === 'object') {
            Object.keys(errors).map((key: string, idx: number) => {
                errors[key].map((err: any, id: number) => {constraints.push(<li key={`${idx} ${id}`}>{err}</li>)});
            })
        }
        

        return constraints;
    };

    return <>
        <Heading>Oops</Heading>
        <ErrorWrapper>
            {Array.isArray(props.message) || typeof props.message === 'object' ? renderMessageArray(props.message) : <li>{props.message}</li>}
        </ErrorWrapper>
    </>;
}

export default ToastErrorMessage;