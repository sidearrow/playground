import React, {
  useState,
  ReactEventHandler,
  ChangeEventHandler,
  useContext,
} from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from 'AuthProvider';
import { authService } from 'services/authService';

export const LoginPage: React.FC = () => {
  type FromData = {
    mail: string;
    password: string;
  };

  const history = useHistory();
  const { status, setStatus } = useContext(AuthContext);

  const [formData, setFormData] = useState<FromData>({
    mail: '',
    password: '',
  });
  const handleChangeForm: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit: ReactEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    (async () => {
      const res = await authService.login(formData.mail, formData.password);
      if (res) {
        setStatus(true);
        history.push('/');
      }
    })();
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>メールアドレス</label>
            <input
              type="text"
              className="form-control"
              name="mail"
              value={formData.mail}
              onChange={handleChangeForm}
            />
          </div>
          <div className="form-group">
            <label>パスワード</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChangeForm}
            />
          </div>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <button type="submit" className="btn btn-block btn-primary">
                ログイン
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
