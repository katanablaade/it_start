import { Dispatch, memo } from 'react';
import { Seminar } from '../../types';
import './SeminarItem.css';

type SeminarItemProps = {
  seminar: Seminar;
  setOneSeminar: Dispatch<React.SetStateAction<Seminar | null>>;
  onDeleteSeminars: (id: number) => void;
};

function SeminarItem({
  seminar,
  setOneSeminar,
  onDeleteSeminars,
}: SeminarItemProps) {
  const handleOpenModal = (seminar: Seminar) => setOneSeminar(seminar);
  console.log(seminar.id, ' render');
  return (
    <div className="seminars-list">
      <div className="seminars-list__item">
        <div className="seminars-list__item-number">{seminar.id}</div>
        <div className="seminars-list__item-info">
          {/* <img src={seminar.photo} alt="photo" /> */}
          <div className="seminars-list__item-wrapper">
            <span className="seminars-list__item-title">{seminar.title}</span>
            <span className="seminars-list__item-description">
              {seminar.description}
            </span>
          </div>
        </div>
        <div className="seminars-list__item-time">{seminar.time}</div>
        <button
          onClick={() => handleOpenModal(seminar)}
          className="seminars-list_put-btn"
        >
          Редактировать
        </button>
        <button
          onClick={() => onDeleteSeminars(seminar.id)}
          className="seminars-list_delete-btn"
        >
          Удалить
        </button>
      </div>
    </div>
  );
}

export default memo(SeminarItem);
