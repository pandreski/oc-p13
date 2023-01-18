import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import style from './Collapse.module.scss';

function Collapse() {
  const [editCategory, setEditCategory] = useState(false);
  const [editNotes, setEditNotes] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!isOpen);

    if (!isOpen) {
      setEditCategory(false);
      setEditNotes(false);
    }
  }

  const handleCategory = () => {
    setEditCategory(!editCategory);
  }

  const handleNotes = () => {
    setEditNotes(!editNotes);
  }

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
                <div>
                  <select name="catSelect" id={`catSelect-${uuidv4()}`}>
                    <option value="1">Opt 1</option>
                    <option value="2">Opt 2</option>
                    <option value="3">Opt 3</option>
                    <option value="4">Opt 4</option>
                  </select>
                  <button className={style.edit} onClick={handleCategory}><i className='fa fa-check-square-o'></i></button>
                </div>
              ) : (
                <div>
                  Food
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
