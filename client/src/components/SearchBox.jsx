import "./styles/SearchBox.css";

const SearchBox = ({searchKey, handleChangeSearchKey}) => {

  return (
    <>
      <div
        style={{
          borderTop: "1px solid #999",
          borderLeft: "1px solid #999",
          borderBottom: "1px solid #999",
        }}
      >
        <input
          onChange={handleChangeSearchKey}
          value={searchKey}
          aria-expanded="false"
          id="autoComplete"
          placeholder="Type to search by city or location.."
        />
      </div>
    </>
  );
};

export default SearchBox;
