import { withStyles } from 'material-ui/styles';
import WithRoot from '../hoc/WithRoot';
import WithLayout from '../hoc/WithLayout';

const wrapper = (BaseComponent, styles = {}) => {
  return WithRoot(WithLayout(withStyles(styles)(BaseComponent)));
};

export default wrapper;