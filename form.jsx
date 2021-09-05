import React, {useState} from 'react';
import axios from 'axios';

const Form = ({
    TextInput,
    DateInput,
    Select,
    Option,
    Button,
    ModalPerson
}) => ({
    name,
    birthday,
    city,
    inn,

    updateName,
    updateBirthday,
    updateInn,
    updateCity,

    citiesList
}) => {
    const [person, setPerson] = useState(null);

    const getPerson = () => {
        try {
            const {data} = axios.get('/api/person', {params: inn});
            setPerson(data);
        } catch {
            //
        }     
    };

    return (
        <div>
            <TextInput
                placeholder='Имя'
                value={name}
                onChange={updateName} />
            <DateInput
                placeholder='День рождение'
                value={birthday}
                onChange={updateBirthday} />
            <TextInput
                placeholder='ИНН'
                value={inn}
                onChange={updateInn} />
            <Select
                placeholder='Город'
                value={citiesList.find(({id}) => id === city?.id)?.value}>
                {citiesList.map(({
                    id,
                    value
                }) => (
                    <Option
                        key={id}
                        onClick={() => updateCity({id, value})}>
                        {value}
                    </Option>
                ))}
            </Select>
            <Button onClick={getPerson}>
                Получить информацию по ИНН
            </Button>
            {person && (
                <ModalPerson 
                    value={person}
                    onClose={() => setPerson(null)} />
            )}
        </div>
    )
};

export default Form;