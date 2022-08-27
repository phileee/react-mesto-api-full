function Header({children}) {
  return (
    <header className="header">
      <div className="header__logo" />
      <div className='header__info'>
      {children}
      </div>
    </header>
  );
}

export default Header;
