import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { fetchCharacter } from '../../redux/characterSlice';
import Masonry from 'react-masonry-css'
import style from './style.module.css'

import Loading from "../../components/Loading";
import Error from "../../components/Error";

function character() {
  const { id } = useParams();
  const character = useSelector((state) => state.character.item);
  const isLoading = useSelector((state) => state.character.isLoading);
  const error = useSelector((state) => state.character.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCharacter(id));
  }, [dispatch]);

  if (error) {
    return <Error message={error} />
  }

  return (
    <div>
      <Masonry
        breakpointCols={4}
        className={style.my_masonry_grid}
        columnClassName={style.my_masonry_grid_column}>
        {isLoading ? <Loading /> :
          <div className={style.character_card} key={character.id}>
            <img className={style.character} src={character.image} alt={character.name} />
            <h3>{character.name}</h3>
            <div>
              <p>Status: {character.status}</p>
              <p>Species: {character.species}</p>
              <p>Type: {character.type}</p>
              <p>Gender: {character.gender}</p>
              <p>Origin: {character.origin.name}</p>
              <p>Location: {character.location.name}</p>
            </div>
          </div>
        }
      </Masonry>
    </div>
  )
}

export default character
