'use client';

import { FC } from 'react';
import ContentLoader from 'react-content-loader';
import Grid from '@mui/material/Unstable_Grid2';
import PropTypes, { InferProps, Validator } from 'prop-types';
import { Animal } from 'my-store/models/animal';

interface CardLoaderProps {
    animals: Animal[];
}

const CardLoader: FC<CardLoaderProps> = ({ animals }) => {
    const loaderWidth = 270;
    const loaderHeight = 270;

    return (
        <Grid
            container
            spacing={0}
            justifyContent="center"
            alignItems="center"
            sx={{ paddingBlock: 4, paddingInline: 5 }}
            columnSpacing={8}
            rowSpacing={10}
        >
            {animals.length === 1 ? (
                <SkeletonLoader width={loaderWidth} height={loaderHeight} viewBox={`0 0 ${loaderHeight} ${loaderWidth}`} />
            ) : (
                animals.map((animal: Animal, index: number) => (
                    <Grid
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        key={index}
                    >
                        {/*
                          <ContentLoader
                                speed={3}
                                width={loaderWidth}
                                height={loaderHeight}
                                viewBox={`0 0 ${loaderHeight} ${loaderWidth}`}
                                backgroundColor="#6a6868"
                                foregroundColor="#ecebeb"
                            />
                        
                        */}
                        <SkeletonLoader width={loaderWidth} height={loaderHeight} viewBox={`0 0 ${loaderHeight} ${loaderWidth}`} />
                    </Grid>
                ))
            )}
        </Grid>
    );
};

const SkeletonLoader = ({ width, height, viewBox }: {width: number, height: number, viewBox: string}) => (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: 'hidden' }}
    >
      <rect width={width} height={height} fill="#f3f3f3" />
      <rect x="20" y="20" rx="5" ry="5" width="360" height="10" fill="#e0e0e0" />
      <rect x="20" y="40" rx="5" ry="5" width="300" height="10" fill="#e0e0e0" />
      <circle cx="40" cy="80" r="20" fill="#e0e0e0" />
      <rect x="70" y="70" rx="5" ry="5" width="200" height="20" fill="#e0e0e0" />
      <defs>
        <linearGradient id="shimmer" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#f3f3f3" stopOpacity="1" />
          <stop offset="50%" stopColor="#e0e0e0" stopOpacity="1" />
          <stop offset="100%" stopColor="#f3f3f3" stopOpacity="1" />
        </linearGradient>
      </defs>
      <rect
        x="0"
        y="0"
        width={width}
        height={height}
        fill="url(#shimmer)"
        style={{
          transform: 'translateX(-100%)',
          animation: 'shimmer 1.5s infinite',
        }}
      />
      <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </svg>
);
  


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
