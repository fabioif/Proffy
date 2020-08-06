import React, {useState, FormEvent} from 'react';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import warningIcon from '../../assets/images/icons/warning.svg';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import api from '../../services/api';
import {useHistory} from 'react-router-dom'
import './styles.css';



function TeacherForm(){

    const history = useHistory();
    const [name,setName] = useState('');
    const [avatar,setAvatar] = useState('');
    const [whatsapp,setwhatsapp] = useState('');
    const [bio,setbio] = useState('');
    const [cost,setcost] = useState('');
    const [subject,setsubject] = useState('');

    const [scheuduleItems, setScheduluItems] = useState([
        { week_day: 0, from: '', to: '' },
    ]);

    
    function addNewsscheuduleItem(){

        setScheduluItems([
            ...scheuduleItems,{
                week_day: 0,
                from: '',
                to: ''
            }
        ]);
    }
    function setscheuduleItemValue(position: number, field: string, value: string){
        const updatescheuduleItems = scheuduleItems.map((scheuduleItem, index) =>{
            if (index === position){
                return { ...scheuduleItem, [field]: value};
            }

            return scheuduleItem;
        });

        setScheduluItems(updatescheuduleItems);
    }
    function handleCreateClass(e: FormEvent){
        e.preventDefault();

        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            scheudule: scheuduleItems
        }).then(() => {
            alert('Cadastro Realizado com Sucesso!');

            history.push('/');
        }).catch(() =>{
            alert('Erro ao cadastrar!');
        });

        console.log({
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            scheudule: scheuduleItems})     
    }

    return(
        <div id="page-teacher-form" className = "container">  
        <PageHeader title = "Que incrível que voce que dar aulas." description="O primeiro passo é preencher esse formulário de inscrição" />     
        <main>  
            <form onSubmit={handleCreateClass}>
            <fieldset>
                <legend>Seus dados</legend>
                <Input name="name" label="Nome Completo" value={name} onChange ={(e) => {setName(e.target.value)}}/>
                <Input name="avatar" label="Avatar" value={avatar} onChange ={(e) => {setAvatar(e.target.value)}}/>
                <Input name="whatsapp" label="whatsapp" value={whatsapp} onChange ={(e) => {setwhatsapp(e.target.value)}}/>
                <Textarea name="bio" label="Biografia"  value={bio} onChange ={(e) => {setbio(e.target.value)}}/>
            </fieldset>

            <fieldset>
                <legend>Sobre a aula</legend>

                <Select 
                name="subject" 
                label="Matéria"
                value={subject} onChange ={(e) => {setsubject(e.target.value)}}
                options={[
                    { value: 'Programação', label: 'Programação'},
                    { value: 'Computação', label: 'Computação'},
                    { value: 'Artes', label: 'Artes'},
                    { value: 'Biologia', label: 'Biologia'},
                ]}
                />
                <Input name="cost" label="Custo da sua hora por aula"
                 value={cost} onChange ={(e) => {setcost(e.target.value)}}/>
            </fieldset>
                <fieldset>
                    <legend>
                        Horários disponivéis
                        <button type = "button" onClick={addNewsscheuduleItem}>
                        + Novo horário
                    </button>
                    </legend>
              {scheuduleItems.map((scheuduleItem, index) => {
                  return(
                    <div key= {scheuduleItem.week_day} className = "scheudule-item">
                    <Select
                  name="subjecweek_day"
                  label="Dia da semana"
                  value ={scheuduleItem.week_day}
                  onChange={e => setscheuduleItemValue(index, 'week_day', e.target.value)}
                  options={[
                      { value: '0', label: 'Domingo'},
                      { value: '1', label: 'Segunda-Feira'},
                      { value: '2', label: 'Terça-Feira'},
                      { value: '3', label: 'Quarta-Feira'},
                      { value: '4', label: 'Quinta-Feira'},
                      { value: '5', label: 'Sexta-Feira'},
                      { value: '6', label: 'Sábado'},
                  ]}
                  />
                  <Input name="from" label="Das" type="time" value ={scheuduleItem.from} onChange={e => setscheuduleItemValue(index, 'from', e.target.value)}/>
                  <Input name ="to" label="Até" type="time" value ={scheuduleItem.to} onChange={e => setscheuduleItemValue(index, 'to', e.target.value)} />

                   </div>
                  )
              })}
                </fieldset>
            <footer>
                <p>
                    <img src={warningIcon} alt="Aviso importante"/>
                    Importante! <br />
                    Preencha todos os dados
                </p>
                <button type='submit'>Salvar Cadastro</button>
            </footer>
            </form>
        </main>
       </div>       
    )
}

export default TeacherForm;