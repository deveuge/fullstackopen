const Persons = ({ persons, filterName, onClick }) => {
  const allPersons = persons
    .filter((person) => person.name.toLowerCase().includes(filterName.toLowerCase()))
    .map((person) => {
      return (
        <p key={person.name}>
          {person.name} {person.number}
          <button type="button" onClick={() => onClick(person.id)}>
            Delete
          </button>
        </p>
      );
    });
  return <div>{allPersons}</div>;
};

export default Persons;
