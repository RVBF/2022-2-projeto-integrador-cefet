import { LoginUsuario } from './login-usuario';

export class LoginVisao {
  getValueInputElement(key: string): HTMLInputElement {
    return document.getElementById(`${key}`) as HTMLInputElement;
  }

  pegarDadosDoFormLogar(): LoginUsuario {
    return new LoginUsuario({
      id: 0,
      login: this.getValueInputElement('login').value,
      senha: this.getValueInputElement('senha').value,
    });
  }

  aoDispararLogar(callback: any): void {
    const logarForm = document.getElementById('formulario-login');
    const functionToSubmit = (elem: SubmitEvent): void => {
      elem.preventDefault();
      callback();
    };

    logarForm!.addEventListener('submit', functionToSubmit);
  }

  showErrorMessage(message: string): void {
    const errorMessage = document.getElementById('errorBar');

    errorMessage!.innerText = message;
    errorMessage!.className = 'show';
    setTimeout(() => {
      errorMessage!.className = errorMessage!.className.replace('show', '');
    }, 2000);
  }

  showSuccessMessage(message: string): void {
    const successMessage = document.getElementById('sucessBar');

    successMessage!.innerText = message;
    successMessage!.className = 'show';
    setTimeout(() => {
      successMessage!.className = successMessage!.className.replace('show', '');
    }, 2000);
  }
}
