import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import { useApiCategories } from '../../hooks/useApi';
import style from './Collapse.module.scss';

function Collapse({ date, amount, balance, label, category, notes, type }) {
  const [editCategory, setEditCategory] = useState(false);
  const [editNotes, setEditNotes] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [currentCategory, setCategory] = useState(category);
  const [currentCategoryLabel, setCategoryLabel] = useState('');
  const [notesText, setNotes] = useState(notes)
  const categories = useApiCategories();

  const handleClick = () => {
    setOpen(!isOpen);

    // Close also edition state for category and notes
    if (!isOpen) {
      setEditCategory(false);
      setEditNotes(false);
    }
  }

  const handleCategory = () => {
    setEditCategory(!editCategory);
  }

  const handleChangeCategory = (e) => {
    e.preventDefault();
    setCategory(e.target.value);
  }

  const handleSubmitCategory = (e) => {
    e.preventDefault();
    handleCategory();
  }

  const handleNotes = () => {
    setEditNotes(!editNotes);
  }

  const handleChangeNotes = (e) => {
    e.preventDefault();
    setNotes(e.target.value);
  }

  const handleSubmitNotes = (e) => {
    e.preventDefault();
    handleNotes();
  }

  useEffect(() => {
    if (!categories.length) return;

    const { label } = categories.find((elem) => elem.id === currentCategory);
    setCategoryLabel(label);
  }, [currentCategory, categories])

  return (
    <div className={style.wrapper}>
      <div className={style.header} aria-expanded={isOpen} onClick={handleClick}>
        <div>{date}</div>
        <div>{label}</div>
        <div>${amount}</div>
        <div>${balance}</div>
      </div>
      <div className={style.body} data-open={isOpen}>
        <div className={style.bodyWrapper}>
          <div>Transaction type: {type}</div>
          <div className={style.editWrapper}>
            <div>Category:&nbsp;</div>
            {
              editCategory ? (
                <form onSubmit={handleSubmitCategory}>
                  <select
                    name="catSelect"
                    id={`catSelect-${uuidv4()}`}
                    value={currentCategory}
                    onChange={handleChangeCategory}
                  >
                    {
                      categories.map((cat) => (
                        <option
                          key={uuidv4()}
                          value={cat.id}
                        >
                          {cat.label}
                        </option>
                      ))
                    }
                  </select>
                  <button className={style.edit} type='submit'><i className='fa fa-check-square-o'></i></button>
                </form>
              ) : (
                <div>
                  {currentCategoryLabel}
                  <button className={style.edit} onClick={handleCategory}><i className='fa fa-pencil'></i></button>
                </div>
              )
            }
          </div>
          <div className={style.editWrapper}>
            <div>Notes:&nbsp;</div>
            {
              editNotes ? (
                <form onSubmit={handleSubmitNotes}>
                  <input type="text" name="notesText" onChange={handleChangeNotes} value={notesText} />
                  <button className={style.edit} type='submit'><i className='fa fa-check-square-o'></i></button>
                </form>
              ) : (
                <div>
                  {notesText}
                  <button className={style.edit} onClick={handleNotes}><i className='fa fa-pencil'></i></button>    
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}

Collapse.propTypes = {
  date: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  balance: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  notes: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}

export default Collapse;
