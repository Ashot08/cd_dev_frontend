import classes from './Paginator.module.css';

export const NavItem = (props) => {
    return (
        <div
            className={classes.nav__item + ' ' + (props.active ? classes.active : '')}
            onClick={!props.active ? () => props.changePage(props.page) : null}
        >
            {props.page}
        </div>
    )
}
export const Paginator = (props) => {
    const navItems = [];
    for(let i = 0; i < props.count; i++){
        navItems.push(<NavItem active={i === props.page} page={i} key={i} changePage={props.changePage} />)
    }
  return (
      <div className={classes.nav__items}>
          {navItems}
      </div>
  )
}