import React, { FormEvent, useState } from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import './styles.css';
import { useFormValidator } from '../../hooks/form-validator';
import api from '../../services/api';

function TeacherList() {
  const formValidator = useFormValidator({
    initialValues: {
      week_day: '',
      subject: '',
      time: '',
    },
    validate: function () {},
  });

  const [teachers, setTeachers] = useState([]);

  async function searchTeachers(e: FormEvent) {
    e.preventDefault();
    const response = await api.get('/classes', {
      params: formValidator.values,
    });
    if (response) setTeachers(response.data);
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Esses são os Proffys disponíveis.">
        <form id="search-teachers" onSubmit={searchTeachers}>
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
          <Select
            name="week_day"
            label="Dia da semana"
            value={formValidator.values.week_day}
            onChange={formValidator.handleChange}
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
            label="Hora"
            name="time"
            type="time"
            onChange={formValidator.handleChange}
            value={formValidator.values.time}
          />
          <button type="submit">Buscar</button>
        </form>
      </PageHeader>
      <main>
        {teachers.map((teacher: Teacher) => (
          <TeacherItem key={teacher.id} teacher={teacher} />
        ))}
      </main>
    </div>
  );
}

export default TeacherList;
