import React from   'react';
import whatsAppIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

function TeacherItem(){
    return(
        <article className="teacher-item"> 
        <header>
        <img src="https://media-exp1.licdn.com/dms/image/C5103AQG6h-bQpZi1lQ/profile-displayphoto-shrink_200_200/0?e=1602115200&v=beta&t=-P2v6zfmwqkQbjBXdC8I5Dh1E76KZ5rHKPTDPrOEW4Q" alt="Fábio Soares"/>
        <div>
           <strong>Fábio Soares</strong> 
           <span>Computação</span>
        </div>
        </header>
        <p>
            Entusiasta das melhores tecnologias já criadas. 
            <br></br>
            <br></br>
        Apaixonado por teconlogia e por mudar vida das pessoas através do compartilhando o seu conhecimento. Mais de 200 pessoas ja passaram por aqui. 

        </p>
        <footer>    
            <p>
                Preço/hora
                <strong>
                    R$ 120,00
                </strong>
            </p>
        <button type="button">    
            <img src={whatsAppIcon} alt="Whatsapp"/>
            Entrar em contato
        </button>
        </footer>
        </article>
    )
}

export default TeacherItem;