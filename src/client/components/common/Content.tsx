import { ReactNode, FC } from 'react';
import PropTypes from 'prop-types';

interface Props {
    children: ReactNode;
}

const Content: FC<Props> = ({ children }) => {
    return (
        <div
            className="
                flex 
                flex-col 
                items-center 
                justify-center 
                content-center 
                flex-1 
                w-full 
                font-bold 
                flex-shrink-0 
                basis-auto
            "
        >
            {children}
        </div>
    );
};

Content.propTypes = {
    children: PropTypes.node.isRequired,
};

Content.displayName = 'Content';

export default Content;
