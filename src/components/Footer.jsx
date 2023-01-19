import style from './Footer.module.scss';

/**
 * Component displaying the footer.
 * @component
 * @example
 * return (
 *  <Footer />
 * )
 */
export default function Footer() {
  return (
    <footer className={style.footer}>
      <p className={style.footerText}>Copyright 2020 Argent Bank</p>
    </footer>
  );
}
