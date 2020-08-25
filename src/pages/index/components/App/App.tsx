import * as React from 'react';
import './app.css';

import PressedUrl from '../../../../assets/images/pressed.svg';
import SvgFood from '../../../../assets/svgs/food.svg';

const App = (props: any) => (
  <div {...props} styleName="box">
    <img src={PressedUrl} alt="Baby" />
    <SvgFood />
  </div>
);
export default App;
