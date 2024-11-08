import { FC } from 'react';
import ContentLoader from 'react-content-loader';
import { Grid } from '@mui/material';
import PropTypes, { InferProps, Validator } from 'prop-types';
import { Animal } from 'my-store/models/animal';

interface CardLoaderProps {
    animals: Animal[];
}

const CardLoader: FC<CardLoaderProps> = ({ animals }) => {
    const loaderWidth = 500;
    const loaderHeight = 500;

    return (
        <Grid container spacing={2} sx={{ padding: '10px' }}>
            {animals.length === 1 ? (
                <ContentLoader
                    speed={3}
                    width={loaderWidth}
                    height={loaderHeight}
                    viewBox={`0 0 ${loaderHeight} ${loaderWidth}`}
                    backgroundColor="#6a6868"
                    foregroundColor="#ecebeb"
                >
                    {/* Add your SVG shapes here */}
                </ContentLoader>
            ) : (
                animals.map((animal: Animal, index: number) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <ContentLoader
                            speed={3}
                            width={loaderWidth}
                            height={loaderHeight}
                            viewBox={`0 0 ${loaderHeight} ${loaderWidth}`}
                            backgroundColor="#6a6868"
                            foregroundColor="#ecebeb"
                        >
                            {/* Add your SVG shapes here */}
                        </ContentLoader>
                    </Grid>
                ))
            )}
        </Grid>
    );
};

CardLoader.propTypes = {
    animals: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            species: PropTypes.string.isRequired,
            age: PropTypes.number.isRequired,
        })
    ).isRequired
};

CardLoader.displayName = 'CardLoader';

export default CardLoader;
