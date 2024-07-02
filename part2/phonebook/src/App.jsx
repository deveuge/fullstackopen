import { useState, useEffect } from "react";
import Filter from "./Components/Filter";
import PersonForm from "./Components/PersonForm";
import Persons from "./Components/Persons";
import PersonService from "./Components/PersonService";
import Notification from "./Components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState(null);

  useEffect(() => {
    PersonService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value);
  };
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const setMessage = (message, type) => {
    setNotificationMessage(message);
    setNotificationType(type);
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((p) => p.name.toLowerCase() === newName.toLowerCase());

    if (!existingPerson) {
      const personObject = {
        name: newName,
        number: newNumber,
      };

      PersonService.create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
          setMessage(`Added ${newName}`, "success");
        })
        .catch((error) => {
          setMessage(`${error.response.data.error}`, "error");
        });
    } else {
      if (existingPerson.number === newNumber) {
        setMessage(`${newName} is already added to phonebook`, "error");
      } else {
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          PersonService.update(existingPerson.id, { ...existingPerson, number: newNumber })
            .then((returnedPerson) => {
              setPersons(
                persons.map((p) => {
                  var person = p.id !== existingPerson.id ? p : returnedPerson;
                  if (p.id == existingPerson.id) {
                    person.number = newNumber;
                  }
                  return person;
                })
              );
              setNewName("");
              setNewNumber("");
              setMessage(`Modified ${newName}`, "success");
            })
            .catch(() => {
              setMessage(`Person '${newName}' was already removed from server`, "error");
              setPersons(persons.filter((p) => p.id !== existingPerson.id));
            });
        }
      }
    }
  };

  const deletePerson = (id) => {
    const personExists = persons.find((p) => p.id === id);

    if (!personExists) {
      setMessage("This person doesn't exist", "error");
    } else {
      PersonService.remove(personExists.id)
        .then(() => {
          setPersons(persons.filter((persons) => persons.id !== id));
          setMessage(`Deleted ${personExists.name}`, "success");
        })
        .catch(() => {
          setMessage(`Person '${personExists.name}' was already removed from server`, "error");
          setPersons(persons.filter((p) => p.id !== id));
        });
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notificationMessage} type={notificationType} />
      <Filter value={filterName} onChange={handleFilterNameChange} />
      <h2>Add new</h2>
      <PersonForm onSubmit={addPerson} newName={newName} onNameChange={handleNameChange} newNumber={newNumber} onNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} filterName={filterName} onClick={deletePerson} />
    </div>
  );
};

export default App;
