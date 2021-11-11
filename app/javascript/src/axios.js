import axios from 'axios';
import csrfToken from './utils';

export default axios.create({
  headers: {
    'X-CSRF-TOKEN': csrfToken(),
  },
});
