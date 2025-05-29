import '../App.js';
import '../App.css';


function User(){
    return(
        <div className=''>
            <form className='green' action="">
                <h2>Bem vindo Usuario</h2>
                <h3>Insira os campos para adicioar os pensamentos:
                </h3>
                <div className='factors'>
                    <label htmlFor="user">Fatores Desencadeantes</label>
                    <p> O que você percebeu ou que ideia passou pela sua mente que desencadeou a preocupação?</p>
                    <textarea name="user" id="" />
                </div>
                <div className='factors'>
                    <label htmlFor="user"> Preocupação</label>
                    <p>O que está ocupando sua mente nesse momento de preocupação?</p>
                    <textarea name="user" id="" />
                </div>
                <div className='factors'>
                    <label htmlFor="user">Tempo de preocupação</label>
                    <p>Por quanto tempo você sentiu essa preocupação? Minutos ou Horas</p>
                    <textarea name="user" id="" />
                </div>
                <div className='factors'>
                    <label htmlFor="user">Desconforto</label>
                    <p>Em uma escala de 0 a 100, o quanto você se sente desconfortável durante essa preocupação?</p>
                    <textarea name="user" id="" />
                </div>
                <div className='factors'>
                    <label htmlFor="user">Classificando a Preocupação</label>
                    <p>Essa é uma preocupação produtiva ou improdutiva?</p>
                    <textarea name="user" id="" />
                </div>
                <div className='factors'>
                    <label htmlFor="user">Controle da situação</label>
                    <p>Como você está agindo para controlar a situação que está causando preocupação?</p>
                    <textarea name="user" id="" />
                </div>
                <button className='purple offwhite-text'>Adicionar</button>
            </form>
        </div>
    )
}

export default User;