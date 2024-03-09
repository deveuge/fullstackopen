const Filter = ({ value, onChange }) => (
  <p>
    Find countries: <input value={value} onChange={onChange} />
  </p>
);

export default Filter;
