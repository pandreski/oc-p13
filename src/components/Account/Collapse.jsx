import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useApiCategories } from '../../hooks/useApi';
import style from './Collapse.module.scss';

function Collapse() {
  const [editCategory, setEditCategory] = useState(false);
  const [editNotes, setEditNotes] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [currentCategory, setCategory] = useState("2"); // TODO: make it dynamic
  const [currentCategoryLabel, setCategoryLabel] = useState('');
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

  useEffect(() => {
    if (!categories.length) return;

    const { label } = categories.find((elem) => elem.id === currentCategory);
    setCategoryLabel(label);
  }, [currentCategory, categories])

  return (
    <div className={style.wrapper}>
      <div className={style.header} aria-expanded={isOpen} onClick={handleClick}>
        <div className={style.date}>June 20th, 2020</div>
        <div className={style.desc}>Golden sun bakery</div>
        <div className={style.amount}>$5.00</div>
        <div className={style.balance}>$2082.79</div>
      </div>
      <div className={style.body} data-open={isOpen}>
        <div className={style.bodyWrapper}>
          <div className={style.type}>Transaction type: Electronic</div>
          <div className={style.category}>
            <div>Category: </div>
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
          <div className={style.notes}>
            Notes:
            <button className={style.edit} onClick={handleNotes}><i className='fa fa-pencil'></i></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collapse;
