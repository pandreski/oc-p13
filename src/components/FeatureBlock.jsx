import PropTypes from 'prop-types';
import style from './FeatureBlock.module.scss';

/**
 * Component displaying a "feature" block.
 * @component
 * @example
 * import icon from '../path/to/image.png';
 * const title = 'Your title';
 * const text = 'Lorem ipsum dolor sit amet...';
 * return (
 *  <FeatureBlock icon={icon} title={title} text={text} />
 * )
 */
function FeatureBlock({ icon, title, text }) {
  return (
    <div className={style.featureItem}>
      <img src={icon} alt="" className={style.featureIcon} />
      <h3 className={style.featureItemTitle}>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

FeatureBlock.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default FeatureBlock;
