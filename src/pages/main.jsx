import '../App.js';
import '../App.css';


function Main(){
    return(
        <div className=''>
            <form className='green' action="">
                <h2>Login</h2>
                <label htmlFor="user">Usuario</label>
                <input type="text" name="user" id="user" />
                <label htmlFor="password">Senha</label>
                <input type="password" name='password' id='password' />
                <button className='purple offwhite-text'>Logar</button>
                <a className='pink-text' href='#'> não possui conta? Clique aqui para cadastrar.</a>
            </form>
        </div>
    )
}

export default Main;