import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { selectSeason } from './seasonSelectorSlice';

const SeasonSelector: React.FC = () => {
  const dispatch = useDispatch();
  const { season } = useSelector((state: RootState) => ({
    season: state.season.season,
  }));
  return (
    <input
      type="number"
      onChange={(e) =>
        dispatch(selectSeason({ season: e.target.value as unknown as number }))
      }
      value={season}
    />
  );
};

export default SeasonSelector;
