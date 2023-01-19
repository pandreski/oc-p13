import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import { useApiCategories } from '../../hooks/useApi';
import style from './Collapse.module.scss';

/**
 * Component displaying an account's balance preview.
 * @component
 * @example
 * const date = 'May 4th, 2022';
 * const amount = '123.45';
 * const balance = '10,455.34';
 * const label = 'Lorem ipsum';
 * const category = '2';
 * const notes = 'Lorem ipsum dolor sit amet...';
 * const type = 'Electronic';
 * return (
 *  <Collapse
 *    date={date}
 *    amount={amount}
 *    balance={balance}
 *    label={label}
 *    category={category}
 *    notes={notes}
 *    type={type}
 *   />
 * )
 */
function Collapse({ date, amount, balance, label, category, notes, type }) {
  const [editCategory, setEditCategory] = useState(false);
  const [editNotes, setEditNotes] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [currentCategory, setCategory] = useState(category);
  const [currentCategoryLabel, setCategoryLabel] = useState('');
  const [notesText, setNotes] = useState(notes)
  const categories = useApiCategories();

  // Toggle extra-content
  const handleClick = () => {
    setOpen(!isOpen);

    // Close also edition state for category and notes
    if (!isOpen) {
      setEditCategory(false);
      setEditNotes(false);
    }
  }

  // Define if user is editing the category
  const handleCategory = () => {
    setEditCategory(!editCategory);
  }

  // Controller for category value
  const handleChangeCategory = (e) => {
    e.preventDefault();
    setCategory(e.target.value);
  }

  // Category's form submit handler
  const handleSubmitCategory = (e) => {
    e.preventDefault();
    handleCategory();
  }

  // Define if user is editing the notes
  const handleNotes = () => {
    setEditNotes(!editNotes);
  }

  // Controller for notes value
  const handleChangeNotes = (e) => {
    e.preventDefault();
    setNotes(e.target.value);
  }

  // Notes's form submit handler
  const handleSubmitNotes = (e) => {
    e.preventDefault();
    handleNotes();
  }

  useEffect(() => {
    if (!categories.length) return;

    // Get active category's label
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
