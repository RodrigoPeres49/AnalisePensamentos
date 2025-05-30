import '../../App.js';
import '../../App.css';


function Register(){
    return (

        <div>
            <form className='green' action="">
                <h3>Cadastre-se</h3>

                <label htmlFor="nome">Usuário:</label>
                <input type="text" name="usuario" id="nome" />
                
                <label htmlFor="email">E-mail:</label>
                <input type="text" name="email" id="email" />
                
                <label htmlFor="nome_completo">Nome Completo:</label>
                <input type="text" name="nome_completo" id="nome_completo" />
                
                <label htmlFor="telefone">Telefone:</label>
                <input type="tel" name="telefone" id="telefone" placeholder="(99) 99999-9999" />
                
                <label htmlFor="senha">Senha:</label>
                <input type="password" name="senha" id="senha" />

                <input type="submit" value="Cadastrar" />
            </form>
        </div>

    );
}

export default Register;