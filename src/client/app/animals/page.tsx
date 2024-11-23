'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import _SearchField from '@/vendor/SearchField';
import Navigation from '@/components/common/Navigation';
import Footer from '@/components/common/Footer';
import Content from '@/components/common/Content';
import ContentLoader from '@/components/ContentLoader';

import { useStoreActions, useStoreState } from 'my-store';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import EditIcon from '@mui/icons-material/Edit';
import { Pagination } from '@mui/material';
import { useScreenDetector } from '@/hooks/useScreenDetector';

library.add(fab, faChevronRight, faTrash);

const Page = () => {
  const router = useRouter();

  //const { width } = useScreenDetector();
  const width = 800;

  const page = useStoreState((state) => state.animal.page);
  const limit = useStoreState((state) => state.animal.limit);
  const pages = useStoreState((state) => state.animal.pages);
  const getPages = useStoreActions((actions) => actions.animal.getPages);

  const searchString = useStoreState((state) => state.animal.search);
  const setSearchString = useStoreActions((state) => state.animal.setSearch);

  const setPage = useStoreActions((actions) => actions.animal.setPage);

  const getAnimals = useStoreActions((actions) => actions.animal.getAnimals);
  const animals = useStoreState((state) => state.animal.animals);

  const deleteAnimal = useStoreActions((actions) => actions.animal.deleteAnimal);

  const [text, setText] = useState('');

  const pathname = usePathname()
  const searchParams = useSearchParams()
 
  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )

  useEffect(() => {
    router.push(pathname + '?' + createQueryString('page', page.toString()));
    (async () => {
      await getPages({ limit: limit, search: searchString });
      await getAnimals({ page: page, limit: limit, search: searchString });
    })();
  }, []);

  function handleClick(page: number) {
    setPage(page);
    router.push(pathname + '?' + createQueryString('page', page.toString()));
    (async () => {
      await getPages({ limit: limit, search: searchString });
      await getAnimals({ page: page, limit: limit, search: searchString });
    })();
  }

  function filterData() {
    (async () => {
      setPage(1);
      await getPages({ limit: limit, search: searchString });
      const data = await getAnimals({ page: 1, limit: limit, search: searchString });

      if (data.length === 0) {
        setText('No data found');
      } else {
        setText('');
      }
    })();
  }

  function updateSearchString(value: string, e) {
    setSearchString(value);
  }

  async function itemDelete(id) {
    await deleteAnimal(id);
    let actualPage = page;
    if (animals.length == 1) {
      actualPage = page - 1;
      setPage(actualPage);
    }

    await getPages({ limit: limit, search: searchString });
    await getAnimals({ page: actualPage, limit: limit, search: searchString });

    router.push(pathname + '?' + createQueryString('page', actualPage.toString()));
  }

  return (
    <>
      <Navigation/>
      <Content>
        <div className="w-full flex justify-center px-12 h-16 z-50 mt-5">
          <_SearchField
            searchText={searchString}
            placeholder="Search..."
            classNames="search-field mt-8 w-full text-black"
            onEnter={() => filterData()}
            onChange={(value, e) => updateSearchString(value, e)}
            onSearchClick={() => filterData()}
            style={{ marginBottom: text === '' ? '5rem' : '0rem' }}
          />
        </div>

        {animals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 px-12">
            {animals.map((animal) => {
              return (
                <div key={animal.id} className="min-h-96 mb-0">
                  {animal?.images[0]?.urlName !== '' ? (
                    <img
                      className="h-48 w-full object-cover"
                      src={`/images/${animal?.images[0]?.urlName}`}
                      alt={animal.latinname}
                    />
                  ) : (
                    <div className="flex justify-center">
                      <div className="text-8xl text-green-600 h-48 flex items-center justify-center">
                        <i className="ra ra-lion ra-5x"></i>
                      </div>
                    </div>
                  )}

                  <div className="p-4">
                    <h2 className="font-bold text-lg mb-2">{animal.name}</h2>
                    <p className="italic">{animal.latinname}</p>
                  </div>
                  <div className="flex justify-center mt-12">
                    <button
                      className="text-green-600"
                      onClick={() => router.push(`/animals/update/${animal.id}`)}
                    >
                      Update <EditIcon className="ml-2" />
                    </button>
                    <button
                      className="text-red-600 ml-4"
                      onClick={() => itemDelete(animal.id)}
                    >
                      Delete <FontAwesomeIcon className="ml-2" icon="trash" />
                    </button>
                    <button
                      className="text-black ml-4"
                      onClick={() => router.push(`/animals/detail/${animal.id}`)}
                    >
                      Detail <FontAwesomeIcon className="ml-2" icon="chevron-right" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : text !== '' ? (
          <div className="grid grid-cols-1 gap-10 px-12 mt-8 text-center">
            <div className="text-2xl">{text}</div>
          </div>
        ) : (
          <ContentLoader animals={Array(12).fill(0)} />
        )}

        {pages !== null ? (
          <div className="flex justify-center mt-12 mb-4">
            <Pagination
              page={page}
              color="primary"
              count={pages}
              variant="outlined"
              shape="rounded"
              size={width !== null ? (width <= 430 ? 'medium' : 'large') : 'large'}
              onChange={(e, page: number) => handleClick(page)}
              className={`mt-${text === '' ? '12' : '32'} mb-4 px-${width <= 430 ? '4' : '0'}`}
            />
          </div>
        ) : null}
      </Content>
      <Footer />
    </>
  );
};

export default Page;
