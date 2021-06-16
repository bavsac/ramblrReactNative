import Amplify from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native';
import {awsmobile} from './aws-exports';

Amplify.configure(awsmobile);
export default withAuthenticator(apiTest {
  // ...
});

async function getData() { 
    let apiName = 'MyApiName';
    let path = '/path';
    let myInit = { // OPTIONAL
        headers: {} // OPTIONAL
    }
    return await API.get(apiName, path, myInit);
}