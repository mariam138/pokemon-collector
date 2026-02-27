import "./NavButton.scss";

const NavButton = ({ name, onClick = null }) => {
  return <button className="NavButton" onClick={onClick}>{name}</button>;
};

export default NavButton;
