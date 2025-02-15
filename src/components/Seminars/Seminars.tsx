import { useState, useEffect, useCallback } from 'react';
import { Seminar } from '../../types';
import SeminarItem from '../SeminarItem/SeminarItem';
import services from '../../services/services';
import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Modal from '../Modal/Modal';

import './Seminars.css';

function Seminars() {
  const [seminars, setSeminars] = useState<Seminar[]>([]);
  const [oneSeminar, setOneSeminar] = useState<Seminar | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { getSeminars, deleteSeminars } = services();

  const onSeminars = () => {
    setIsLoading(true);
    getSeminars()
      .then((res) => {
        setSeminars(res);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Ошибка при загрузке семинаров:', error);
        setIsLoading(false);
        setIsError(error);
      });
  };

  const onDeleteSeminars = useCallback((id: number) => {
    const confirmDelete = window.confirm(
      'Вы уверены, что хотите удалить этот семинар?'
    );
    if (confirmDelete) {
      deleteSeminars(id)
        .then((res) => {
          setSeminars((prevSeminars) =>
            prevSeminars.filter((seminar) => seminar.id !== id)
          );
          console.log(`Семинар с id ${id} удален`, res);
        })
        .catch((error) => {
          console.error('Ошибка при удалении семинара:', error);
          setIsError(error);
        });
    }
  }, []);

  const handleCloseModal = () => {
    setOneSeminar(null);
  };

  const updateSeminar = (seminar: Seminar) => {
    setSeminars((prevSeminars) => {
      return prevSeminars.map((item) => {
        if (seminar.id === item.id) {
          return { ...item, ...seminar };
        }
        return item;
      });
    });
  };

  useEffect(() => {
    onSeminars();
  }, []);

  return (
    <div className="seminars-table">
      {oneSeminar ? (
        <Modal
          onClose={handleCloseModal}
          seminar={oneSeminar}
          updateSeminar={updateSeminar}
        />
      ) : null}

      <div className="seminars-table__header">
        <span className="seminars-table__header-number">#</span>
        <span className="seminars-table__header-title">Title</span>
        <span className="seminars-table__header-time">Time</span>
      </div>
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <ErrorMessage />
      ) : (
        seminars.map((seminar) => (
          <SeminarItem
            key={seminar.id}
            seminar={seminar}
            setOneSeminar={setOneSeminar}
            onDeleteSeminars={onDeleteSeminars}
          />
        ))
      )}
    </div>
  );
}

export default Seminars;
