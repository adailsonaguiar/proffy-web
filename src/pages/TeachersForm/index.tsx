import React, { useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg';
import { useFormValidator } from '../../hooks/form-validator.js';

import './styles.css';
import api from '../../services/api';

function TeachersForm() {
  const formValidator = useFormValidator({
    initialValues: {
      avatar: '',
      bio: '',
      cost: '',
      from: '',
      name: '',
      subject: '',
      to: '',
      week_day: '',
      whatsapp: '',
    },
    validate: function () {},
  });
  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: '' },
  ]);

  function newScheduleItem() {
    setScheduleItems([...scheduleItems, { week_day: 0, from: '', to: '' }]);
  }

  function setScheduleItemsValue(
    position: number,
    field: string,
    value: string
  ) {
    const newArray = scheduleItems.map((item, index) => {
      if (index === position) return { ...item, [field]: value };
      return item;
    });

    setScheduleItems(newArray);
  }

  function handleCreateClass(e: FormEvent) {
    e.preventDefault();
    api
      .post('classes', {
        ...formValidator.values,
        cost: Number(formValidator.values.cost),
        schedule: scheduleItems,
      })
      .then(() => console.log('Cadastrado com sucesso!'))
      .catch((e) => console.log(e));
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas"
        description="O primeiro passo é preencher esse formulário de inscrição"
      />
      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>
            <Input
              name="name"
              label="Nome completo"
              value={formValidator.values.name}
              onChange={formValidator.handleChange}
            />
            <Input
              name="avatar"
              label="Avatar"
              value={formValidator.values.avatar}
              onChange={formValidator.handleChange}
            />
            <Input
              name="whatsapp"
              label="Whatsapp"
              value={formValidator.values.whatsapp}
              onChange={formValidator.handleChange}
            />
            <TextArea
              name="bio"
              label="Biografia"
              value={formValidator.values.bio}
              onChange={formValidator.handleChange}
            />
          </fieldset>
          <fieldset>
            <legend>Sobre a aula</legend>
            <Select
              name="subject"
              label="Matéria"
              value={formValidator.values.subject}
              onChange={formValidator.handleChange}
              options={[
                { value: 'Artes', label: 'Artes' },
                { value: 'Biologia', label: 'Biologia' },
                { value: 'Matemática', label: 'Matemática' },
              ]}
            />
            <Input
              name="cost"
              label="Custo da sua hora por aula"
              value={formValidator.values.cost}
              onChange={formValidator.handleChange}
            />
          </fieldset>
          <fieldset>
            <legend>
              Horários disponíveis{' '}
              <button type="button" onClick={newScheduleItem}>
                + Novo horário
              </button>
            </legend>
            {scheduleItems.map((scheduleItem, index) => (
              <div
                key={`${index}${scheduleItem.week_day}`}
                className="schedule-item"
              >
                <Select
                  name="week_day"
                  label="Dia da semana"
                  value={scheduleItem.week_day}
                  onChange={(e) =>
                    setScheduleItemsValue(index, 'week_day', e.target.value)
                  }
                  options={[
                    { value: '0', label: 'Domingo' },
                    { value: '1', label: 'Segunda' },
                    { value: '2', label: 'Terça' },
                    { value: '3', label: 'Quarta' },
                    { value: '4', label: 'Quinta' },
                    { value: '5', label: 'Sexta' },
                    { value: '6', label: 'Sábado' },
                  ]}
                />
                <Input
                  name="from"
                  label="Das"
                  type="time"
                  value={scheduleItem.from}
                  onChange={(e) =>
                    setScheduleItemsValue(index, 'from', e.target.value)
                  }
                />
                <Input
                  name="to"
                  label="Até"
                  type="time"
                  value={scheduleItem.to}
                  onChange={(e) =>
                    setScheduleItemsValue(index, 'to', e.target.value)
                  }
                />
              </div>
            ))}
          </fieldset>
          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante! <br />
              Preencha todos os dados
            </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default TeachersForm;
