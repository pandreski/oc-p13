import bannerImage from '../assets/images/bank-tree.jpeg';
import style from './HeroBanner.module.scss';

function HeroBanner() {
  return (
    <div className={style.hero}>
      <img src={bannerImage} className={style.background} alt="" />
      <section className={style.heroContent}>
        <h2 className="sr-only">Promoted Content</h2>
        <p className={style.subtitle}>No fees.</p>
        <p className={style.subtitle}>No minimum deposit.</p>
        <p className={style.subtitle}>High interest rates.</p>
        <p className={style.text}>Open a savings account with Argent Bank today!</p>
      </section>
    </div>
  );
}

export default HeroBanner;
