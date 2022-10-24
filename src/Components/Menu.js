import styled from "styled-components";
import Select from "react-select";
import Search from "./Search";

const StyledMenu = styled.div`
  width: 90%;
  height: 50px;
  margin: 40px auto;
  display: ${(props) => (props.menuVisible ? "flex" : "none")};

  text-align: center;
  place-content: flex-end;

  & .item {
    margin: auto;
    padding: 1px;
    width: 400px;
    border-radius: 6px;
    border: 2px solid rgb(229, 232, 235);
    box-shadow: 3px 3px 3px gray;
  }
`;

export default function Menu({
  viewMenu,
  sortMenu,
  onViewMenuChange,
  onSortMenuChange,
  selectedViewMenu,
  selectedSortmenu,
  menuVisible,
  text
}) {
  return (
    <StyledMenu menuVisible={menuVisible}>
      <div style={{ width: "30%", minWidth: "400px" }}>
        <Search text={text}/>
      </div>

      <Select
        className="item"
        defaultValue={selectedViewMenu}
        onChange={onViewMenuChange}
        options={viewMenu}
      />
      <Select
        className="item"
        defaultValue={selectedSortmenu}
        onChange={onSortMenuChange}
        options={sortMenu}
      />
    </StyledMenu>
  );
}
