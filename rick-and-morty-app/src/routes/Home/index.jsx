import React, { useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { fetchCharacters } from '../../redux/charactersSlice';
import Masonry from 'react-masonry-css'

import Loading from "../../components/Loading";
import Error from "../../components/Error";

import style from './style.module.css'

function Home() {
  const characters = useSelector((state) => state.characters.items);
  const status = useSelector((state) => state.characters.status);
  const error = useSelector((state) => state.characters.error);
  const NextPage = useSelector((state) => state.characters.page);
  const hasNextPage = useSelector((state) => state.characters.hasNextPage);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCharacters());
    }
  }, [dispatch, status]);

  if (status === 'failed') {
    return <Error message={error} />
  }

  return (
    <>
      <Masonry
        breakpointCols={5}
        className={style.my_masonry_grid}
        columnClassName={style.my_masonry_grid_column}>
        {characters.map((character) => (
          <div key={character.id}>
            <NavLink to={`character/${character.id}`}>
              <img className={style.character} src={character.image} alt={character.name} />
              <div>{character.name}</div>
            </NavLink>
          </div>
        ))
        }
      </Masonry>
      <div className={style.next_page}>
        {status === 'loading' && <Loading />}
        {hasNextPage && status !== 'loading' && <button onClick={() => dispatch(fetchCharacters(NextPage))}>Load More ({NextPage})</button>}
        {!hasNextPage && <div>There is nothing to be shown.</div>}
      </div>
    </>
  );
}

export default Home;
