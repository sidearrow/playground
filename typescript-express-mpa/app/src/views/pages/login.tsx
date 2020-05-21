import React from 'react';

const Component: React.FC = () => {
  return (
    <div>
      <form action="login" method="POST">
        <input type="text" name="loginId" />
        <input type="password" />
        <input type="submit" value="送信" />
      </form>
    </div>
  );
};

export default Component;
