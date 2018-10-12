import * as React from 'react';
import { SignIn } from '../../components';
import { Titled } from '../../decorators';

@Titled('Sign In')
class SignInScreen extends React.Component {
    public render() {
        return (
          <div className="bitto-sign-in-screen">
           <SignIn />
         </div>
        );
    }
}

export {
    SignInScreen,
};
