import { ChangeEvent, useState } from 'react';
import { Seminar } from '../../types';

import services from '../../services/services';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Spinner from '../Spinner/Spinner';

import './Modal.css';

type ModalProps = {
  onClose: () => void;
  seminar: Seminar;
  updateSeminar: ({ id, title, description, time }: Seminar) => void;
};

function Modal({ onClose, seminar, updateSeminar }: ModalProps) {
  const [title, setTitle] = useState(seminar.title);
  const [description, setDescription] = useState(seminar.description);
  const [time, setTime] = useState(seminar.time);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { putSeminar } = services();

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };
  const handleTime = (e: ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };

  const onSubmit = () => {
    setIsLoading(true);
    putSeminar({ id: seminar.id, title, description, time })
      .then((res) => {
        updateSeminar(res);
        setIsLoading(false);
        onClose();
        console.log('Cеминар отредактирован');
      })
      .catch((error) => {
        console.log(console.error('Ошибка редактирования семинаров:', error));
        setIsLoading(false);
        setIsError(error);
      });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div id="openModal" className="modal">
      {!isLoading ? (
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              {isError ? (
                <ErrorMessage />
              ) : (
                <h3 className="modal-title">Редактирование семинара</h3>
              )}
              <a
                onClick={onClose}
                href="#close"
                title="Close"
                className="close"
              >
                ×
              </a>
            </div>
            <div className="modal-body">
              <label className="modal-label" htmlFor="title">
                Назание
              </label>
              <input
                className="modal-input"
                onChange={handleTitle}
                onKeyDown={handleKeyDown}
                type="text"
                id="title"
                value={title}
              />
              <label className="modal-label" htmlFor="description">
                Описание
              </label>
              <input
                className="modal-input"
                onChange={handleDescription}
                onKeyDown={handleKeyDown}
                type="text"
                id="description"
                value={description}
              />
              <label className="modal-label" htmlFor="time">
                Время
              </label>
              <input
                className="modal-input"
                onChange={handleTime}
                onKeyDown={handleKeyDown}
                type="text"
                id="time"
                value={time}
              />
              <button className="modal-btn" onClick={onSubmit}>
                Принять
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
}
export default Modal;
